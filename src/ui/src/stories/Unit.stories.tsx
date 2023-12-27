import type { Meta, StoryObj } from "@storybook/react";
import { Unit } from "../Unit";

const meta = {
  component: Unit,
  tags: ["autodocs"],
} satisfies Meta<typeof Unit>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    drive: 0.5,
    gain: 0.5,
  },
};
