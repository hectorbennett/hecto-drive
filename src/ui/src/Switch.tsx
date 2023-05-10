import { css } from "@emotion/react";
import { ReactNode } from "react";
import shadow from "./shadow";

const gradient1 = "#D1D1D1";
const gradient2 = "#B8B8B8";

const highlightSize = 3;
const highlightColour = "#FFFFFF";
const innerShadowColour = "#8C6B09";

const highlightInnerTop = shadow({
  inset: true,
  x: 0,
  y: highlightSize,
  colour: highlightColour,
});

const shadowInnerBottom = shadow({
  inset: true,
  x: 0,
  y: -highlightSize,
  colour: innerShadowColour,
});

export default function Switch({ onClick }: { onClick: () => void }) {
  return (
    <SwitchOuter onClick={onClick}>
      <SwitchInner />
    </SwitchOuter>
  );
}

interface SwitchOuterProps {
  children: ReactNode;
  onClick: () => void;
}

function SwitchOuter({ children, onClick }: SwitchOuterProps) {
  return (
    <button
      onClick={onClick}
      css={css`
        width: 70px;
        height: 70px;
        background: linear-gradient(180deg, ${gradient1} 0%, ${gradient2} 100%);
        border-radius: 100%;
        box-shadow: ${[
          highlightInnerTop,
          shadowInnerBottom,
          shadow({
            y: 2,
            blur: 2,
            colour: "rgba(0, 0, 0, 0.25)",
          }),
        ].join(", ")};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px;
        margin: 0px;
        outline: 0;
        border: 0;
      `}
    >
      <div
        css={css`
          width: 50px;
          height: 50px;
          background: #9d9d9d;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {children}
      </div>
    </button>
  );
}

function SwitchInner() {
  return (
    <div
      css={css`
        width: 40px;
        height: 40px;
        background: linear-gradient(180deg, ${gradient1} 0%, ${gradient2} 100%);
        border-radius: 100%;
        box-shadow: ${[
          highlightInnerTop,
          shadowInnerBottom,
          shadow({
            y: 5,
            blur: 6,
            colour: "rgba(0, 0, 0, 0.25)",
          }),
          shadow({
            y: 12,
            blur: 30,
            colour: "rgba(0, 0, 0, 0.4)",
          }),
        ].join(", ")};
      `}
    />
  );
}
