import { camelCase, isObject, snakeCase, transform } from 'lodash'
import { CamelCase, SnakeCase } from 'type-fest'

export const camelize = <T extends {}>(obj: T): CamelCase<T> =>
  transform(obj, (acc, value, key) => {
    ;(acc as Record<string, any>)[camelCase(key)] = isObject(value) ? camelize(value) : value
  })

export const snakify = <T extends {}>(obj: T): SnakeCase<T> =>
  transform(
    obj,
    (acc, value, key) => {
      ;(acc as Record<string, any>)[snakeCase(key as string)] = isObject(value)
        ? snakify(value)
        : value
    },
    {} as SnakeCase<T>
  )
