import { css } from "@emotion/react";
import { KeyboardEvent, ReactNode } from "react";
import { fractionToValue, valueToFraction, round } from "./utils";

/**
 * Slider props
 */
interface SliderProps {
  /** The current value. */
  value: number;

  /** Callback when the value changes. */
  onChange?: (value: number) => void;

  /** The width of the slider. */
  width?: number;

  /** The height of the slider. */
  height?: number;

  /** Minimum possible value. */
  min?: number;

  /** Maximum possible value. */
  max?: number;

  /** The number of decimal places to round to. */
  decimalPlaces?: number;

  /** The slider label. */
  label?: ReactNode;
}

export const Slider = ({
  width = 60,
  height = 200,
  min = 0,
  max = 100,
  decimalPlaces = 0,
  value,
  onChange,
  label,
}: SliderProps) => {
  const fraction = valueToFraction(value, min, max);

  const startDrag = (e: React.MouseEvent) => {
    const dragStartY = e.screenY;

    const handleMove = (e: MouseEvent) => {
      const dragCurrY = e.screenY;
      const pixelsMoved = dragStartY - dragCurrY;
      const fractionMoved = valueToFraction(pixelsMoved, 0, height - width);
      const newValue = Math.max(
        Math.min(fractionToValue(fraction + fractionMoved, min, max), max),
        min,
      );
      onChange && onChange(newValue);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", handleMove);
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      onChange && onChange(Math.max(min, value - 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      onChange && onChange(Math.min(max, value + 1));
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        width: fit-content;
      `}
    >
      <div
        role="slider"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        css={css`
          background: #ffffff;
          border: 2px solid black;
          border-radius: 9999px;
          width: ${width}px;
          height: ${height}px;
          display: flex;
          align-items: end;
          box-sizing: border-box;
          position: relative;
        `}
      >
        <div
          style={{
            height: `${width + fraction * (height - width)}px`,
          }}
          css={css`
            border: 2px solid black;
            border-radius: 9999px;
            width: ${width}px;
            min-height: ${width}px;
            box-sizing: border-box;
            display: flex;
            align-items: start;
            background: #e69c45;
            position: absolute;
            left: -2px;
            bottom: -2px;
          `}
        >
          <div
            css={css`
              border: 2px solid black;
              border-radius: 9999px;
              width: ${width - 2}px;
              min-width: ${width - 2}px;
              height: ${width - 2}px;
              min-height: ${width - 2}px;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: -2px 2px 0px 1px rgb(0, 0, 0);
              margin-left: 2px;
              margin-top: -2px;
              background: #f1ea50;
              z-index: 1000;
              font-family: sans-serif;
              font-size: 22px;
              user-select: none;
            `}
            onMouseDown={startDrag}
          >
            {round(value, decimalPlaces)}
          </div>
        </div>
      </div>
      <label
        css={css`
          font-family: sans-serif;
        `}
      >
        {label}
      </label>
    </div>
  );
};
