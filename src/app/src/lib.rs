use nih_plug::{
    audio_setup::{AudioIOLayout, AuxiliaryBuffers, PortNames},
    buffer::Buffer,
    context::{gui::AsyncExecutor, process::ProcessContext},
    editor::Editor,
    formatters,
    midi::MidiConfig,
    nih_debug_assert_eq, nih_export_clap, nih_export_vst3,
    params::{range::FloatRange, smoothing::SmoothingStyle, FloatParam, Params},
    plugin::{clap::ClapPlugin, vst3::Vst3Plugin, Plugin, ProcessStatus},
    prelude::Param,
    util,
    wrapper::{clap::features::ClapFeature, vst3::subcategories::Vst3SubCategory},
};
use nih_plug_webview::{HTMLSource, WebViewEditor};
use serde::Deserialize;
use serde_json::json;
use std::{
    num::NonZeroU32,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
};

mod drive;

struct HectoDrive {
    params: Arc<HectoDriveParams>,
}

#[derive(Deserialize)]
#[serde(tag = "type")]
enum Action {
    SetDrive { value: f32 },
    SetGain { value: f32 },
}

#[derive(Params)]
struct HectoDriveParams {
    #[id = "drive"]
    pub drive: FloatParam,
    drive_value_changed: Arc<AtomicBool>,

    #[id = "gain"]
    pub gain: FloatParam,
    gain_value_changed: Arc<AtomicBool>,
}

impl Default for HectoDrive {
    fn default() -> Self {
        Self {
            params: Arc::new(HectoDriveParams::default()),
        }
    }
}

impl Default for HectoDriveParams {
    fn default() -> Self {
        let drive_value_changed = Arc::new(AtomicBool::new(false));
        let d = drive_value_changed.clone();
        let drive_param_callback = Arc::new(move |_: f32| {
            d.store(true, Ordering::Relaxed);
        });

        let gain_value_changed = Arc::new(AtomicBool::new(false));
        let g = gain_value_changed.clone();
        let gain_param_callback = Arc::new(move |_: f32| {
            g.store(true, Ordering::Relaxed);
        });

        Self {
            // Drive
            drive: FloatParam::new(
                "Drive",
                200.0,
                FloatRange::Skewed {
                    min: 100.0,
                    max: 10_000.0,
                    factor: FloatRange::skew_factor(-2.0),
                },
            )
            .with_smoother(SmoothingStyle::Logarithmic(50.0))
            .with_value_to_string(formatters::v2s_f32_gain_to_db(1))
            .with_callback(drive_param_callback),
            drive_value_changed,

            // Gain
            gain: FloatParam::new(
                "Gain",
                util::db_to_gain(0.0),
                FloatRange::Skewed {
                    min: util::db_to_gain(-30.0),
                    max: util::db_to_gain(30.0),
                    factor: FloatRange::gain_skew_factor(-30.0, 30.0),
                },
            )
            .with_smoother(SmoothingStyle::Logarithmic(50.0))
            .with_unit(" dB")
            .with_value_to_string(formatters::v2s_f32_gain_to_db(1))
            .with_string_to_value(formatters::s2v_f32_gain_to_db())
            .with_callback(gain_param_callback),
            gain_value_changed,
        }
    }
}

impl Plugin for HectoDrive {
    type BackgroundTask = ();
    type SysExMessage = ();

    const NAME: &'static str = "Hecto Drive";
    const VENDOR: &'static str = "Hector Bennett";
    const URL: &'static str = "hectorbennett.com";
    const EMAIL: &'static str = "contact@hectorbennett.com";

    const VERSION: &'static str = "0.0.1";

    const AUDIO_IO_LAYOUTS: &'static [AudioIOLayout] = &[
        AudioIOLayout {
            main_input_channels: NonZeroU32::new(2),
            main_output_channels: NonZeroU32::new(2),
            aux_input_ports: &[],
            aux_output_ports: &[],
            names: PortNames::const_default(),
        },
        AudioIOLayout {
            main_input_channels: NonZeroU32::new(1),
            main_output_channels: NonZeroU32::new(1),
            ..AudioIOLayout::const_default()
        },
    ];

    const MIDI_INPUT: MidiConfig = MidiConfig::None;
    const SAMPLE_ACCURATE_AUTOMATION: bool = true;

    fn params(&self) -> Arc<dyn Params> {
        self.params.clone()
    }

    fn process(
        &mut self,
        buffer: &mut Buffer,
        _aux: &mut AuxiliaryBuffers,
        _context: &mut impl ProcessContext<Self>,
    ) -> ProcessStatus {
        for mut channel_samples in buffer.iter_samples() {
            let drive = self.params.drive.smoothed.next();
            let gain = self.params.gain.smoothed.next();

            for sample in channel_samples.iter_mut() {
                *sample = drive::drive(*sample, drive) * gain;
            }
        }

        ProcessStatus::Normal
    }

    fn editor(&mut self, _async_executor: AsyncExecutor<Self>) -> Option<Box<dyn Editor>> {
        let params = self.params.clone();
        let drive_value_changed = self.params.drive_value_changed.clone();
        let gain_value_changed = self.params.gain_value_changed.clone();
        let editor = WebViewEditor::new(
            HTMLSource::String(include_str!("../../ui/dist/index.html")),
            (550, 450),
        )
        .with_background_color((150, 150, 150, 255))
        .with_developer_mode(true)
        .with_event_loop(move |ctx, setter, _window| {
            while let Ok(value) = ctx.next_event() {
                if let Ok(action) = serde_json::from_value(value) {
                    match action {
                        Action::SetDrive { value } => {
                            setter.begin_set_parameter(&params.drive);
                            setter.set_parameter_normalized(&params.drive, value);
                            setter.end_set_parameter(&params.drive);
                        }
                        Action::SetGain { value } => {
                            setter.begin_set_parameter(&params.gain);
                            setter.set_parameter_normalized(&params.gain, value);
                            setter.end_set_parameter(&params.gain);
                        }
                    }
                } else {
                    panic!("Invalid action received from web UI.")
                }
            }

            if drive_value_changed.swap(false, Ordering::Relaxed) {
                let _ = ctx.send_json(json!({
                    "type": "param_change",
                    "param": "drive",
                    "value": params.drive.unmodulated_normalized_value(),
                    "text": params.drive.to_string()
                }));
            }

            if gain_value_changed.swap(false, Ordering::Relaxed) {
                let _ = ctx.send_json(json!({
                    "type": "param_change",
                    "param": "gain",
                    "value": params.gain.unmodulated_normalized_value(),
                    "text": params.gain.to_string()
                }));
            }
        });

        Some(Box::new(editor))
    }

    fn deactivate(&mut self) {}
}

impl ClapPlugin for HectoDrive {
    const CLAP_ID: &'static str = "com.hectorbennett.hecto_drive";
    const CLAP_DESCRIPTION: Option<&'static str> = Some("A smoothed gain parameter example plugin");
    const CLAP_MANUAL_URL: Option<&'static str> = Some(Self::URL);
    const CLAP_SUPPORT_URL: Option<&'static str> = None;
    const CLAP_FEATURES: &'static [ClapFeature] = &[
        ClapFeature::AudioEffect,
        ClapFeature::Stereo,
        ClapFeature::Mono,
        ClapFeature::Utility,
    ];
}

impl Vst3Plugin for HectoDrive {
    const VST3_CLASS_ID: [u8; 16] = *b"HectoDrive.abcde";
    const VST3_SUBCATEGORIES: &'static [Vst3SubCategory] =
        &[Vst3SubCategory::Fx, Vst3SubCategory::Tools];
}

nih_export_clap!(HectoDrive);
nih_export_vst3!(HectoDrive);
