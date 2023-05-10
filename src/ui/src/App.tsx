/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import Pedal from "./Pedal";

const sendToPlugin = (msg: unknown) => {
  /* Send message to nih_plug_webview */
  try {
    // @ts-ignore
    window.sendToPlugin(msg);
  } catch {
    /* noop */
  }
};

function App() {
  const [pedalState, setPedalState] = useState({
    on: false,
    drive: 0.5,
    gain: 0.5,
  });

  const setGain = (gain: number) => {
    setPedalState((s) => ({ ...s, gain }));
    sendToPlugin({ type: "SetGain", value: gain });
  };

  useEffect(() => {
    /* receive messages from nih_plug_webview */
    // @ts-ignore
    window.onPluginMessage = (msg) => {
      switch (msg.type) {
        case "param_change": {
          setPedalState((s) => ({ ...s, [msg.param]: msg.value }));
          break;
        }
      }
    };
  }, []);

  return (
    <div
      css={css`
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
      `}
    >
      <Pedal
        {...pedalState}
        onChangeDrive={(drive) => setPedalState((s) => ({ ...s, drive }))}
        onChangeGain={(gain) => setGain(gain)}
        onToggleOn={() => setPedalState((s) => ({ ...s, on: !s.on }))}
      />
    </div>
  );
}

export default App;
