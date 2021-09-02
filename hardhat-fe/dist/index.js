"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const task_names_1 = require("hardhat/builtin-tasks/task-names");
const config_env_1 = require("hardhat/internal/core/config/config-env");
const task_names_2 = require("./task-names");
require("./type-extensions");
config_env_1.extendConfig((config) => {
    const defaultConfig = { version: "latest" }; //, fe_binary_path: "bum!" };
    config.fe = Object.assign(Object.assign({}, defaultConfig), config.fe);
});
config_env_1.subtask(task_names_1.TASK_COMPILE_GET_COMPILATION_TASKS, async (_, __, runSuper) => {
    const otherTasks = await runSuper();
    return [...otherTasks, task_names_2.TASK_COMPILE_FE];
});
config_env_1.subtask(task_names_2.TASK_COMPILE_FE, async (_, { config, artifacts }) => {
    const { compile } = await Promise.resolve().then(() => __importStar(require("./compilation")));
    // This plugin is experimental, so this task isn't split into multiple
    // subtasks yet.
    await compile(config.fe, config.paths, artifacts);
});
//# sourceMappingURL=index.js.map