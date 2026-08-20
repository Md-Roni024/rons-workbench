---
title: Dify + LM Studio
description: Building a fully local LLM application with no external API calls.
domain: Experiments
category: Local LLM
order: 3
tags:
  - dify
  - lm-studio
  - local-llm
  - rag
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# Dify + LM Studio

> Personal experiment log. Sample content illustrating the format.

## Goal

Build a working RAG application where nothing leaves the machine — local
model, local embeddings, local vector store — and find out what that actually
costs in capability.

## Environment

| Item | Value |
| --- | --- |
| Orchestration | [Dify](/tools/dify), self-hosted via Docker Compose |
| Inference | [LM Studio](/tools/lm-studio) local server, port 1234 |
| Model | A 7B instruct model, 4-bit quantised |
| Embeddings | Local embedding model, also via LM Studio |
| Corpus | ~40 Markdown notes |

## What I tried

1. Brought up Dify with Docker Compose.
2. Added LM Studio as an OpenAI-compatible model provider.
3. Created a knowledge base and uploaded the Markdown corpus.
4. Built a workflow: question → retrieve → LLM → answer.
5. Asked questions with known answers and checked them.

## Result

It works end to end. Quality is usable for retrieval and summarisation, and
clearly below a hosted frontier model for anything requiring multi-step
reasoning.

| Aspect | Verdict |
| --- | --- |
| Setup | Half a day, mostly networking |
| Retrieval quality | Good — this is the embedding model's job, and it did it |
| Answer quality | Acceptable for summarising retrieved text |
| Reasoning | Weak on anything needing several steps |
| Tool calling | Unreliable enough that I stopped relying on it |
| Latency | 3-8 seconds to first token |

## What worked

- **The OpenAI-compatible endpoint.** Dify treated LM Studio as just another
  provider, exactly as advertised.
- **Retrieval carried the system.** With good passages in front of it, a small
  model summarises perfectly adequately. This is the strongest argument for
  [RAG](/ai/rag/) I have encountered in practice.
- **Zero marginal cost.** I asked hundreds of questions while tuning, which I
  would not have done against a metered API.

## What failed

- **Networking, for an hour.** Dify in Docker could not reach LM Studio on
  `localhost`, because inside the container that is the container. The fix is
  `host.docker.internal:1234`. Obvious afterwards.
- **Tool calling.** The 7B model produced malformed tool-call JSON often
  enough to be unusable. I dropped the agent node from the workflow.
- **Context limit.** The default context length on load was much smaller than
  the model supported, and long retrievals were silently truncated until I
  raised it.

## What I learned

The split is clear and useful: **retrieval quality is independent of model
size, and answer quality is not.** A local model with good retrieval beats a
large model with bad retrieval on factual questions about your own corpus,
which is exactly the case a personal knowledge base cares about.

Where local falls down is agency. Reliable tool calling seems to need a
capability level the small quantised models do not reach.

Filed for later: this is roughly the architecture that a Phase 3 assistant
over BaseBox would need.

## Next steps

- Try a 13B or 14B quant and see whether tool calling becomes usable.
- Compare local embeddings against a hosted embedding model, keeping the
  generation model fixed.
- Measure retrieval accuracy properly instead of judging by eye.

## Related topics

- [What is RAG?](/ai/rag/)
- [Embeddings](/ai/embeddings/)
- [Docker](/tools/docker)
