import { CamelCase } from 'type-fest'

// type extracted from lodash `transform` function
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/3eefc1af52b4742eb3675be6b582d8e1ea92cb16/types/lodash/common/common.d.ts#L236
type MemoVoidDictionaryIterator<
  T,
  K extends string | number | symbol,
  TResult
> = (acc: TResult, curr: T, key: K, dict: Record<K, T>) => void

function transform<
  T extends object,
  TResult
>(
  object: T,
  iteratee: MemoVoidDictionaryIterator<T[keyof T], keyof T, TResult>,
  accumulator?: TResult
): TResult {
  return object as any
}

const camelize = <T extends Record<string, any>>(obj: T): CamelCase<T> =>
  transform(obj, camelize)
