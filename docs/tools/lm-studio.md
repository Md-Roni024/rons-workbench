---
title: LM Studio
description: Running models locally on my own machine - personal working notes.
domain: Tools
category: AI Tooling
order: 5
tags:
  - lm-studio
  - local-llm
  - inference
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# LM Studio

> Personal working notes.

## What it is

A desktop application for discovering, downloading and running open-weight
models locally. It also exposes a local server with an OpenAI-compatible API,
which is the part I use most.

## Why I use it

- **Privacy.** Nothing leaves the machine.
- **Cost.** No per-token billing while experimenting.
- **Offline.** Works with no network.
- **Compatibility.** The OpenAI-compatible endpoint means most tools can point
  at it with a base-URL change and nothing else.

## Setup

Download a model in the UI, then start the local server. It listens on port
1234 by default:

```bash
curl http://localhost:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "local-model",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

Pointing an existing SDK at it:

```typescript
const client = new OpenAI({
  baseURL: 'http://localhost:1234/v1',
  apiKey: 'lm-studio', // ignored, but the SDK requires a value
})
```

## What I have learned

- **Quantisation is the main trade-off.** A 4-bit quant of a larger model
  usually beats a full-precision smaller one, and fits in far less memory.
- **Memory is the binding constraint,** not compute. Roughly: model file size
  plus context overhead must fit in available RAM or VRAM.
- **Local models are noticeably weaker at tool calling.** This is what limited
  the [Dify + LM Studio](/experiments/dify-lm-studio) experiment more than
  anything else.

## Gotchas

- Context length must be set when loading the model; the default is often much
  smaller than the model supports.
- The first token after loading is slow. Keep the model resident between calls
  when benchmarking, or the numbers are meaningless.

## Related topics

- [Dify + LM Studio](/experiments/dify-lm-studio)
- [OpenRouter](/tools/openrouter)
- [Tokens](/ai/llm/tokens)
