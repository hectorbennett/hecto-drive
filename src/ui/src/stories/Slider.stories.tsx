import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "../Slider";
import { useState } from "react";

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
  const [value, setValue] = useState(50);

  return <Slider value={value} onChange={setValue} min={0} max={60} />;
};

export const Interactive = {
  render: () => <InteractiveExample />,
};
