import { CamelCase } from "type-fest";

const transform = <TResult>(iteratee: any): TResult => undefined as any;
const camelize = <T extends object>(): CamelCase<T> => transform(camelize);
