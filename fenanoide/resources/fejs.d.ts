/* tslint:disable */
/* eslint-disable */
/**
* @param {string} text_buffer
* @returns {any}
*/
export function compile_to_ast(text_buffer: string): any;
/**
* @param {string} text_buffer
* @returns {any}
*/
export function compile_to_lowered_ast(text_buffer: string): any;
/**
* @param {string} text_buffer
* @returns {any}
*/
export function get_token(text_buffer: string): any;
/**
* @param {string} text_buffer
* @returns {any}
*/
export function compile(text_buffer: string): any;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly compile_to_ast: (a: number, b: number) => number;
  readonly compile_to_lowered_ast: (a: number, b: number) => number;
  readonly get_token: (a: number, b: number) => number;
  readonly compile: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
