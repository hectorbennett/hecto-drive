import { css } from "@emotion/react";
import { Slider } from "./Slider";

import { fractionToValue, valueToFraction } from "./utils";

interface UnitProps {
  drive: number;
  gain: number;
  onChangeGain: (gain: number) => void;
  onChangeDrive: (drive: number) => void;
}

export const Unit = ({
  drive,
  gain,
  onChangeGain,
  onChangeDrive,
}: UnitProps) => {
  return (
    <div
      css={css`
        border: 2px solid black;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
        background: #e69c45;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          text-align: center;
          font-family: sans-serif;
        `}
      >
        HectoDrive
      </div>
      <div
        css={css`
          display: flex;
          padding: 80px 60px;
          border: 2px solid black;
          align-items: center;
          justify-content: space-around;
          background: #ffe1be;
          height: 100%;
        `}
      >
        <Slider
          value={fractionToValue(gain, -30, 30)}
          min={-30}
          max={30}
          label="Gain"
          onChange={(value) => onChangeGain(valueToFraction(value, -30, -30))}
        />
        <Slider
          value={drive}
          min={0}
          max={1}
          label="Drive"
          onChange={onChangeDrive}
        />
      </div>
    </div>
  );
};