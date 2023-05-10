import { useState } from "react";
import { css } from "@emotion/react";
import "./App.css";
import Pedal from "./Pedal";

function App() {
  const [pedalState, setPedalState] = useState({
    on: false,
    drive: 5,
    gain: 7,
  });

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
        onChangeGain={(gain) => setPedalState((s) => ({ ...s, gain }))}
        onToggleOn={() => setPedalState((s) => ({ ...s, on: !s.on }))}
      />
    </div>
  );
}

export default App;
