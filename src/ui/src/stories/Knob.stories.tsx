import type { Meta, StoryObj } from "@storybook/react";
import Knob from "../Knob";
import { useState } from "react";

const meta = {
  component: Knob,
  tags: ["autodocs"],
} satisfies Meta<typeof Knob>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    diameter: 60,
    min: 0,
    max: 10,
    value: 3,
    onChange: (value) => console.log(value),
  },
};

function InteractiveKnob({ min, max }: { min: number; max: number }) {
  const [value, setValue] = useState(50);
  return (
    <Knob diameter={60} min={min} max={max} value={value} onChange={setValue} />
  );
}

export const Interactive = {
  render: () => (
    <div>
      <InteractiveKnob min={0} max={10} />
      <InteractiveKnob min={10} max={100} />
      <InteractiveKnob min={-3000} max={3000} />
    </div>
  ),
};
