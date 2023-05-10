import { ReactNode } from "react";
import Knob from "./Knob";
import Logo from "./Logo";
import Switch from "./Switch";
import { css } from "@emotion/react";
import shadow from "./shadow";
import Led from "./Led";

const highlightInnerTop = shadow({
  x: 0,
  y: 30,
  colour: "rgba(255, 255, 255, 0.5)",
});

const shadowInnerBottom = shadow({
  x: 0,
  y: -30,
  colour: "rgba(0, 0, 0, 0.5)",
});

function PedalOuter({ children }: { children: ReactNode }) {
  const gradient1 = "#66fff8";
  const gradient2 = "#0030ee";

  return (
    <div
      css={css`
        background: linear-gradient(180deg, ${gradient1} 0%, ${gradient2} 100%);
        width: 280px;
        height: 520px;
        overflow: hidden;
        user-select: none;
      `}
    >
      <div
        css={css`
          box-shadow: ${[highlightInnerTop, shadowInnerBottom].join(", ")};
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding: 10px;
          align-items: center;
          width: 100%;
          height: 100%;
          height: CALC(100% - 8px);
          margin: 4px 0px;
        `}
      >
        <div
          css={css`
            border: 2px solid white;
            flex: 1;
            border-radius: 13px;
            width: 100%;
            overflow: hidden;
          `}
        >
          {children}
        </div>
        <Logo />
      </div>
    </div>
  );
}

function Knobs({
  gain,
  drive,
  onChangeGain,
  onChangeDrive,
}: {
  gain: number;
  drive: number;
  onChangeGain: (gain: number) => void;
  onChangeDrive: (drive: number) => void;
}) {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          padding: 25px;
          align-items: center;
          width: 100%;
        `}
      >
        <Knob
          diameter={80}
          min={0}
          max={10}
          label="DRIVE"
          value={drive}
          onChange={onChangeDrive}
        />
        <Knob
          diameter={80}
          min={0}
          max={10}
          label="GAIN"
          value={gain}
          onChange={onChangeGain}
        />
      </div>
      <div
        css={css`
          font-size: 3rem;
          font-family: "Arizonia", cursive;
          color: white;
        `}
      >
        Hecto
        <br />
        Drive
      </div>
    </div>
  );
}

function SwitchAndLed({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <Switch onClick={onClick} />
      <div
        css={css`
          position: absolute;
          margin-left: 130px;
        `}
      >
        <Led on={on} />
      </div>
    </div>
  );
}

interface PedalProps {
  on: boolean;
  drive: number;
  gain: number;
  onToggleOn: () => void;
  onChangeGain: (gain: number) => void;
  onChangeDrive: (drive: number) => void;
}

function PedalInner({
  on,
  drive,
  gain,
  onToggleOn,
  onChangeGain,
  onChangeDrive,
}: PedalProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <Knobs
        drive={drive}
        gain={gain}
        onChangeGain={onChangeGain}
        onChangeDrive={onChangeDrive}
      />
      <SwitchAndLed on={on} onClick={onToggleOn} />
    </div>
  );
}

export default function Pedal(props: PedalProps) {
  return (
    <PedalOuter>
      <PedalInner {...props} />
    </PedalOuter>
  );
}
