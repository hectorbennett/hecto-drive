import { LogsContainer } from "./Console.container";

export const Console = () => {
  const { logs } = LogsContainer.useContainer();
  return (
    <div>
      {logs.map((log: unknown) => (
        <div>
          <code>{log.toString()}</code>
        </div>
      ))}
    </div>
  );
};
