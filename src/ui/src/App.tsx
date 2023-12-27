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
  const [msg, setMsg] = useState<object>({ Hello: "World" });

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
    // setPedalState((s) => ({ ...s, ...{ drive: state } }));
    sendToPlugin({ type: "SetDrive", value });
  };

  const setGain = (value: number) => {
    // setPedalState((s) => ({ ...s, ...{ gain: state } }));
    sendToPlugin({ type: "SetGain", value });
  };

  useEffect(() => {
    /* receive messages from nih_plug_webview */
    // @ts-ignore
    window.onPluginMessage = (msg) => {
      setMsg(msg);
      switch (msg.type) {
        case "param_change": {
          setPedalState((s) => ({
            ...s,
            [msg.param]: { value: msg.value, text: msg.text },
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
      {/* <Pedal
        {...pedalState}
        onChangeDrive={setDrive}
        onChangeGain={setGain}
        onToggleOn={() => setPedalState((s) => ({ ...s, on: !s.on }))}
      /> */}
      <div
        css={css`
          height: 200px;
          display: flex;
          align-items: center;
        `}
      >
        {JSON.stringify(msg)}
      </div>
      <div
        css={css`
          overflow: hidden;
        `}
      >
        <Unit {...pedalState} onChangeDrive={setDrive} onChangeGain={setGain} />
      </div>
    </div>
  );
}

export default App;
