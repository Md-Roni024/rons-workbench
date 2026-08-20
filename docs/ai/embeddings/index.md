---
title: Embeddings
description: Turning text into vectors so that meaning becomes measurable.
domain: AI
category: Embeddings
order: 3
tags:
  - embeddings
  - vectors
  - search
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# Embeddings

> Personal note.

## What is it?

An embedding is a fixed-length list of numbers representing a piece of text,
produced by a model trained so that texts with similar meaning end up close
together in that vector space.

"How do I reset my password?" and "I forgot my login details" share almost no
words, but sit near each other as vectors. That is the entire point.

## Why does it matter?

It makes similarity computable. Keyword search matches characters; embedding
search matches meaning. This is what makes [RAG](/ai/rag/) possible, and it
also gives you clustering, deduplication and recommendation almost for free.

## How does it work?

Text goes through an embedding model and comes out as a vector. Similarity
between two vectors is usually cosine similarity — the angle between them,
ignoring magnitude.

```typescript
/** Cosine similarity of two equal-length vectors. Ranges from -1 to 1. */
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0
  let magA = 0
  let magB = 0

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}
```

At small scale that loop over every stored vector is genuinely fine. A vector
database earns its place when the corpus is large enough that a linear scan
stops being acceptable.

## Example

```text
"reset my password"      ->  [0.021, -0.144, 0.087, ...]
"forgot login details"   ->  [0.019, -0.139, 0.091, ...]   similarity 0.93
"deploy to production"   ->  [-0.201, 0.055, -0.010, ...]  similarity 0.11
```

## My understanding

Two things I had to get straight:

1. **Embeddings from different models are not comparable.** The vector space is
   specific to the model. Changing the embedding model means re-indexing
   everything.
2. **Similar is not the same as relevant.** Two passages can be topically close
   while only one answers the question. That gap is what reranking exists to
   close.

## Questions

- Does embedding a Markdown note whole beat embedding it per-section for a
  knowledge base like this one?
- How much does dimensionality actually matter for a small personal corpus?

## Related topics

- [What is RAG?](/ai/rag/)
- [Tokens](/ai/llm/tokens)
