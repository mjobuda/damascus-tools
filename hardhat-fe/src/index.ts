import { TASK_COMPILE_GET_COMPILATION_TASKS } from "hardhat/builtin-tasks/task-names";
import { extendConfig, subtask } from "hardhat/internal/core/config/config-env";

import { TASK_COMPILE_FE } from "./task-names";
import "./type-extensions";

extendConfig((config) => {
  const defaultConfig = { version: "latest" };
  config.fe = { ...defaultConfig, ...config.fe };
});

subtask(
  TASK_COMPILE_GET_COMPILATION_TASKS,
  async (_, __, runSuper): Promise<string[]> => {
    const otherTasks = await runSuper();
    return [...otherTasks, TASK_COMPILE_FE];
  }
);

subtask(TASK_COMPILE_FE, async (_, { config, artifacts }) => {
  const { compile } = await import("./compilation");

  // This plugin is experimental, so this task isn't split into multiple
  // subtasks yet.
  await compile(config.fe, config.paths, artifacts);
});
