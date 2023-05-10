import type { Meta, StoryObj } from "@storybook/react";
import Pedal from "../Pedal";

const meta = {
  component: Pedal,
  tags: ["autodocs"],
} satisfies Meta<typeof Pedal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    on: true,
    drive: 5,
    gain: 5,
  },
};
