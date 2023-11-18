import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../Slider";
import { useState } from "react";
import { css } from "@emotion/react";

const meta = {
  component: Slider,
  tags: ["autodocs"],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    min: 0,
    max: 100,
    value: 80,
    label: "Volume",
  },
};

const InteractiveExample = () => {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0.1);
  const [value4, setValue4] = useState(0.01);

  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Slider value={value1} onChange={setValue1} min={0} max={60} />
      <Slider value={value2} onChange={setValue2} min={-100} max={100} />
      <Slider value={value3} onChange={setValue3} min={0} max={3} />
      <Slider value={value4} onChange={setValue4} min={0} max={0.1} />
    </div>
  );
};

export const Interactive = {
  render: () => <InteractiveExample />,
};
