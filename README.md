# tsgo crash repro: goroutine stack overflow with recursive functions and `CamelCase<T>` from `type-fest`

## Summary

`tsgo` crashes with a goroutine stack overflow when a file contains two generic
functions with one of them uses the `CamelCase<T>` type from type-fest.

`tsc` on the same file exits cleanly with no errors.

## Environment

```
tsgo:       7.0.0-dev.20260219.1  (@typescript/native-preview)
typescript: 6.0.0-beta                 (tsc, for comparison)
type-fest:  4.38.0
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

`tsgo` exits with type errors or 0 — it should not crash.
`tsc` handles this file cleanly, emitting no errors.

## Actual

Full stack trace can be found here: https://gist.github.com/wadjoh/82adc287ab15357812c8e2da247163c3

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
