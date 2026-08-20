---
title: Programming
description: Language-level concepts and everyday craft.
domain: Software Engineering
category: Programming
order: 4
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# Programming

> This section is new.

Language-level notes. Expected to grow towards TypeScript, C# and .NET.

## Planned notes

- TypeScript type-level basics worth knowing
- Async and concurrency models compared
- Error handling: exceptions versus result types
- Testing strategy beyond unit tests
- SQL and PostgreSQL fundamentals

## Example of the format I want

Short, concrete, and with a runnable snippet:

```typescript
/** Narrowing with a type predicate - the pattern I reach for most. */
function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

const names: string[] = maybeNames.filter(isDefined)
```

And the same idea in C#, which is where this section is heading next:

```csharp
/// <summary>Pattern matching as the C# equivalent of narrowing.</summary>
public static string Describe(object value) => value switch
{
    null            => "nothing",
    string { Length: 0 } => "an empty string",
    string s        => $"a string of {s.Length} characters",
    int n when n < 0 => "a negative number",
    int n           => $"the number {n}",
    _               => "something else",
};
```
