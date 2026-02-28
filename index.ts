import { CamelCase } from "type-fest";

function transform<TResult>(iteratee: any): TResult {
  return undefined as any;
}

const camelize = <T extends Record<string, any>>(): CamelCase<T> =>
  transform(camelize);
