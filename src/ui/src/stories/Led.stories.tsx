import type { Meta, StoryObj } from "@storybook/react";
import Led from "../Led";

const meta = {
  component: Led,
  tags: ["autodocs"],
} satisfies Meta<typeof Led>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Example: Story = {
  args: {
    on: true,
  },
};
