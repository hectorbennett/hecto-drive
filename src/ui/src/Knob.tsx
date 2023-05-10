import { css } from "@emotion/react";
import shadow from "./shadow";
import { ReactNode } from "react";

const gradient1 = "#856F79";
const gradient2 = "#35333e";

const highlightSize = 4;
const highlightColour = "#AAAAAA";
const innerShadowColour = "#000000";

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

const dropShadowSmall = shadow({
  y: 5,
  blur: 6,
  colour: "rgba(0, 0, 0, 0.25)",
});

const dropShadowLarge = shadow({
  y: 12,
  blur: 30,
  colour: "rgba(0, 0, 0, 0.4)",
});

const shadows = [
  highlightInnerTop,
  shadowInnerBottom,
  dropShadowSmall,
  dropShadowLarge,
];

interface KnobProps {
  diameter?: number;
  min: number;
  max: number;
  value: number;
  label?: string;
  onChange?: (value: number) => void;
}

export default function Knob({
  diameter = 60,
  min = 0,
  max = 10,
  value = 5,
  label = "GAIN",
  onChange,
}: KnobProps) {
  const startDrag = (e: React.MouseEvent) => {
    const dragStartValue = value;
    const dragStartY = e.screenY;

    const handleMove = (e: MouseEvent) => {
      const dragCurrY = e.screenY;
      const delta = ((dragCurrY - dragStartY) * (max - min)) / 100;
      const newValue = Math.max(Math.min(dragStartValue - delta, max), min);
      onChange && onChange(newValue);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleMove);
    });
  };

  return (
    <div
      css={css`
        display: inline-flex;
        flex-direction: column;
        align-items: center;
      `}
      onMouseDown={startDrag}
    >
      <div
        css={css`
          width: ${diameter}px;
          height: ${diameter}px;
          background: linear-gradient(
            180deg,
            ${gradient1} 0%,
            ${gradient2} 100%
          );
          border-radius: 100%;
          box-shadow: ${shadows.join(", ")};
        `}
      >
        <MarkerLine
          radius={diameter / 2}
          angle={get_marker_angle(min, max, value)}
        />
      </div>
      <KnobLabel>{label}</KnobLabel>
    </div>
  );
}

const markerlineWidth = 4;
const markerOffset = 4;

interface MarkerLineProps {
  radius: number;
  angle: number;
}

function MarkerLine({ radius, angle }: MarkerLineProps) {
  return (
    <div
      css={css`
        width: ${markerlineWidth}px;
        height: 30%;
        position: relative;
        left: CALC(50% - ${markerlineWidth / 2}px);
        top: ${markerOffset}px;
        background: white;
        transform-origin: ${markerlineWidth / 2}px ${radius - markerOffset}px;
        transform: rotate(${angle}deg);
      `}
    />
  );
}

const get_marker_angle = (min: number, max: number, value: number) => {
  // out of [0, 1]
  const proportion = (value - min) / (max - min);

  // out of [-135, 135]
  return proportion * (135 * 2) - 135;
};

function KnobLabel({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        color: white;
        font-family: "Russo One", sans-serif;
        font-size: 0.8rem;
        margin-top: 0.5rem;
      `}
    >
      {children}
    </div>
  );
}
