import type { Meta, StoryObj } from "@storybook/react";
import { Console } from "../Console";

const meta = {
  component: Console,
  tags: ["autodocs"],
} satisfies Meta<typeof Console>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
