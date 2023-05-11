// https://www.elementary.audio/resources/distortion-saturation-wave-shaping
use std::f32::consts::PI;

pub fn drive(x: f32, amount: f32) -> f32 {
    let y = x * amount / 100.0;
    if y >= 0.0 {
        y.tanh()
    } else {
        (y.sinh() - 0.2 * y * (PI * y).sin()).tanh()
    }
}

#[test]
fn test_drive() {
    assert_eq!(drive(0.0, 1.0), 0.0);
}
