---
title: Dify
description: Visual builder for LLM applications - personal working notes.
domain: Tools
category: AI Tooling
order: 4
tags:
  - dify
  - workflow
  - rag
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# Dify

> Personal working notes.

## What it is

An open-source platform for building LLM applications through a visual
workflow editor. It bundles prompt management, a RAG pipeline, agent
capabilities and model routing behind a drag-and-drop interface, and publishes
each app as an API.

## Why I am interested

It makes the shape of an LLM application visible. Dragging a retrieval node in
front of an LLM node is the same architecture as [RAG](/ai/rag/), just drawn
rather than written — which is a genuinely useful way to reason about it.

It is also self-hostable, so it can run entirely against
[LM Studio](/tools/lm-studio).

## Setup

```bash
git clone https://github.com/langgenius/dify.git
cd dify/docker
cp .env.example .env
docker compose up -d
```

Then open `http://localhost` and create an app.

## What I have learned

- **Workflows beat chat apps** for anything with more than one step. Explicit
  nodes make the control flow reviewable.
- **The built-in knowledge base is a full RAG pipeline** — chunking,
  embedding, retrieval, reranking — with the knobs exposed. Good for building
  intuition about which knob does what.
- **Connecting a local model needs the OpenAI-compatible provider** pointed at
  the LM Studio endpoint. In Docker that means `host.docker.internal`, not
  `localhost`; see [the experiment](/experiments/dify-lm-studio).

## Gotchas

- Docker Compose brings up a lot of services. It is not lightweight.
- Version upgrades have needed manual migration steps. Read the release notes
  before upgrading.

## Related topics

- [What is RAG?](/ai/rag/)
- [LM Studio](/tools/lm-studio)
- [Dify + LM Studio](/experiments/dify-lm-studio)
