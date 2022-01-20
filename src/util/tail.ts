/**
 * @see https://github.com/Morglod/ts-tuple-hacks <3
 */
export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;
