# tsgo crash repro: goroutine stack overflow with `CamelCase<T>` + `SnakeCase<T>` from type-fest

## Summary

`tsgo --noEmit` crashes with a goroutine stack overflow when a file contains two generic
functions that both use recursive `type-fest` mapped types (`CamelCase<T>` and `SnakeCase<T>`)
as return types, with lodash `transform` used in the body.

`tsc --noEmit` on the same file exits cleanly with no errors.

## Environment

```
tsgo:       7.0.0-dev.20260219.1  (@typescript/native-preview)
typescript: 5.9.3                 (tsc, for comparison)
type-fest:  4.41.0
lodash:     4.17.21
node:       20.x
os:         darwin arm64
```

## Reproduce

```bash
pnpm install
pnpm check:tsc   # exits 0, no errors
pnpm check:tsgo  # fatal error: stack overflow
```

## Expected

`tsgo --noEmit` exits with type errors or 0 — it should not crash.
`tsc` handles this file cleanly, emitting no errors.

## Actual

```
runtime: goroutine stack exceeds 1000000000-byte limit
runtime: sp=0x... stack=[0x..., 0x...]
fatal error: stack overflow

goroutine NNNN [running]:
github.com/microsoft/typescript-go/internal/checker.(*ArrayTypeMapper).Map(...)
        .../checker/mapper.go:135
github.com/microsoft/typescript-go/internal/checker.(*MergedTypeMapper).Map(...)
        .../checker/mapper.go:231
github.com/microsoft/typescript-go/internal/checker.(*Checker).instantiateTypeWithAlias(...)
        .../checker/checker.go:21667
github.com/microsoft/typescript-go/internal/checker.(*Checker).instantiateType(...)
        .../checker/checker.go:21635
... (repeating until stack exhausted)
```
