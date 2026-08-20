---
title: Tokens
description: The unit LLMs actually operate on, and why it affects cost and behaviour.
domain: AI
category: LLM
order: 2
tags:
  - llm
  - tokens
  - cost
status: understood
created: 2026-08-19
updated: 2026-08-19
---

# Tokens

> Personal note.

## What is it?

A token is the unit a model reads and writes. Not a character, not a word — a
chunk produced by a tokeniser, typically a common word, a word fragment, or a
piece of punctuation.

Rough English figure I use for estimating: about 4 characters per token, or
about 750 words per 1,000 tokens. Code is denser in tokens than prose because
of punctuation and indentation.

## Why does it matter?

Three reasons, all practical:

1. **Cost.** Billing is per token, input and output priced separately, with
   output usually the more expensive of the two.
2. **Limits.** The [context window](/ai/llm/context-window) is measured in
   tokens, not characters.
3. **Behaviour.** Some model weaknesses are tokenisation artefacts. Counting
   letters in a word is hard because the model does not see letters.

## How does it work?

The tokeniser splits text using a learned vocabulary, usually byte-pair
encoding. Frequent sequences get their own token; rare ones fragment into
several.

```text
"tokenisation"  ->  ["token", "isation"]
"BaseBox"       ->  ["Base", "Box"]
```

Non-Latin scripts and unusual identifiers fragment more, which is why the same
sentence can cost noticeably more in one language than another.

## Example

Estimating before sending, so a long document does not fail at the API
boundary:

```typescript
/** Crude estimate. Use the provider token counter when precision matters. */
function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4)
}

const doc = await readFile('notes.md', 'utf-8')
if (estimateTokens(doc) > 150_000) {
  throw new Error('Document too large - chunk it first.')
}
```

## My understanding

Tokens are the currency of everything else. When I am deciding whether to put a
whole file in the prompt or retrieve pieces of it, the question is always a
token-budget question — and the budget is shared between the system prompt,
tool definitions, history, retrieved context and the output.

## Questions

- How much do tokeniser differences between providers actually change cost in
  practice for the same corpus?

## Related topics

- [Context Window](/ai/llm/context-window)
- [Context Engineering](/ai/context-engineering/)
