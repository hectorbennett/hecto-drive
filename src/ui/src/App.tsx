/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import { Unit } from "./Unit";

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
    drive: 50,
    gain: 50,
  });

  const setDrive = (drive: number) => {
    setPedalState((s) => ({ ...s, drive }));
    sendToPlugin({ type: "SetDrive", value: drive });
  };

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
      {/* <Pedal
        {...pedalState}
        onChangeDrive={setDrive}
        onChangeGain={setGain}
        onToggleOn={() => setPedalState((s) => ({ ...s, on: !s.on }))}
      /> */}
      <Unit {...pedalState} onChangeDrive={setDrive} onChangeGain={setGain} />
    </div>
  );
}

export default App;
