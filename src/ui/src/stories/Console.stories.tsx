import type { Meta, StoryObj } from "@storybook/react";
import { Console } from "../Console";
import { LogsContainer } from "../Console.container";
import { useEffect } from "react";

const meta = {
  component: Console,
  tags: ["autodocs"],
} satisfies Meta<typeof Console>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
  decorators: [
    (Component) => {
      const { logs, log } = LogsContainer.useContainer();

      useEffect(() => {
        log("hello world");
        log("hello world 2");
        log("hello world 3");
      }, []);

      console.log(logs);

      return (
        <div>
          <Component />
        </div>
      );
    },
    (Component) => {
      return <LogsContainer.Provider>{<Component />}</LogsContainer.Provider>;
    },
  ],
};
