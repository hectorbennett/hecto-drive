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
    drive: {
      value: 1,
      text: "80",
    },
    gain: {
      value: 1,
      text: "30.00 dB",
    },
  });

  const setDrive = (value: number) => {
    sendToPlugin({ type: "SetDrive", value });
  };

  const setGain = (value: number) => {
    sendToPlugin({ type: "SetGain", value });
  };

  useEffect(() => {
    /* receive messages from nih_plug_webview */
    // @ts-ignore
    window.onPluginMessage = (msg) => {
      switch (msg.type) {
        case "param_change": {
          setPedalState((s) => ({
            ...s,
            [msg.param]: {
              value: msg.value,
              text: msg.text.replace(" dB", ""),
            },
          }));
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
      <Unit {...pedalState} onChangeDrive={setDrive} onChangeGain={setGain} />
    </div>
  );
}

export default App;
