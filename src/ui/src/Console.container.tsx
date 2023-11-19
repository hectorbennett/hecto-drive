import { useState } from "react";
import { createContainer } from "unstated-next";

const useLogs = () => {
  const [logs, setLogs] = useState<unknown[]>([]);

  const log = (arg: unknown) => {
    console.log(arg);
    setLogs((l) => [...l, arg]);
  };
  return { logs, log };
};

export const LogsContainer = createContainer(useLogs);
