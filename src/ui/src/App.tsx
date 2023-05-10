import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import Pedal from "./Pedal";

const sendToPlugin = (msg: unknown) => {
  /* This is picked up by nih_plug_webview */
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    console.log(gain);
    setPedalState((s) => ({ ...s, gain }));
    sendToPlugin({ type: "SetGain", value: gain });
  };

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
