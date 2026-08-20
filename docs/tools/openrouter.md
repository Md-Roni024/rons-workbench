---
title: OpenRouter
description: One API across many model providers - personal working notes.
domain: Tools
category: AI Tooling
order: 6
tags:
  - openrouter
  - api
  - models
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# OpenRouter

> Personal working notes.

## What it is

A gateway that puts many model providers behind a single OpenAI-compatible
API. One key, one endpoint, one billing account; change the `model` string to
change provider.

## Why I use it

Mostly for comparison. Running the same prompt across models from different
providers is otherwise a matter of juggling several SDKs and several accounts.

- One API key instead of many
- Consistent request and response shape
- Per-request cost visible in the dashboard
- Automatic fallback when a provider is unavailable

## Setup

```typescript
const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
})

const response = await client.chat.completions.create({
  model: 'anthropic/claude-sonnet-4.5',
  messages: [{ role: 'user', content: 'Explain MCP in one paragraph.' }],
})
```

Switching provider is a one-string change:

```typescript
model: 'anthropic/claude-sonnet-4.5'
model: 'meta-llama/llama-3.3-70b-instruct'
```

## What I have learned

- **Good for evaluation, less good for production.** It adds a hop, and you
  inherit its availability alongside the provider's.
- **The lowest-cost route is not always the fastest.** Throughput varies a lot
  between the providers serving the same open model.
- **Provider-specific features may not pass through.** When I need something
  particular to a provider, I go direct to that provider's SDK.

## Gotchas

- Model identifiers are namespaced (`vendor/model`) and change over time. Pin
  them and check periodically.
- Rate limits are per-account, not per-model.

## Related topics

- [LM Studio](/tools/lm-studio)
- [LLM Experiments](/experiments/llm-experiments)
- [What is an LLM?](/ai/llm/introduction)
