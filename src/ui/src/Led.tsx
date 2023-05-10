import { css } from "@emotion/react";
import shadow from "./shadow";

const shadowInnerTop = shadow({
  inset: true,
  y: 1,
  colour: "rgba(0, 0, 0, 0.4)",
});

const highlightInnerBottom = shadow({
  inset: true,
  y: -1,
  colour: "rgba(255, 255, 255, 0.5)",
});

const shadowGlow1 = shadow({
  blur: 3,
  spread: 2,
  colour: "rgb(255, 125, 125)",
});

const shadowGlow2 = shadow({
  blur: 8,
  spread: 2,
  colour: "rgb(255, 0, 48, 0.5)",
});

export default function Led({ on }: { on: boolean }) {
  const background = on
    ? `radial-gradient(
        circle,
        #FFAA38 20%,
        #F40009 100%
      )`
    : `radial-gradient(
        circle,
        rgba(0, 0, 0, 0.4) 20%,
        rgba(0, 0, 0, 0.1) 70%
    );`;

  let shadows = [shadowInnerTop, highlightInnerBottom];

  if (on) {
    shadows = [...shadows, shadowGlow1, shadowGlow2];
  }

  return (
    <div
      css={css`
        width: 16px;
        height: 16px;
        background: ${background};
        border-radius: 100%;
        box-shadow: ${shadows.join(", ")};
      `}
    >
      <div
        css={css`
          width: 3px;
          height: 3px;
          background: white;
          left: 5px;
          position: absolute;
          top: 3px;
          border-radius: 100%;
          opacity: 0.8;
        `}
      />
    </div>
  );
}
