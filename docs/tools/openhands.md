---
title: OpenHands
description: Open-source autonomous software agent - personal working notes.
domain: Tools
category: AI Tooling
order: 2
tags:
  - openhands
  - agent
  - open-source
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# OpenHands

> Personal working notes.

## What it is

An open-source platform for AI software developers. The agent works in a
sandboxed container with a browser, a terminal and a code editor, and can be
pointed at a repository to work through an issue largely on its own.

Formerly OpenDevin.

## Why I am interested

Two reasons:

1. It is open source, so the [harness](/ai/agents/harness) is readable. I can
   see how the loop, the tools and the sandboxing actually work rather than
   inferring it.
2. It is model-agnostic — it can run against a hosted model or a local one via
   [LM Studio](/tools/lm-studio) or [OpenRouter](/tools/openrouter).

## Setup

Runs in Docker:

```bash
docker run -it --rm \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.openhands:/.openhands \
  --name openhands-app \
  docker.all-hands.dev/all-hands-ai/openhands:latest
```

Then open `http://localhost:3000` and configure a model provider.

The Docker socket mount is worth understanding before running it: the agent
spawns its own sandbox containers, which is why it needs access to the
daemon.

## What I have learned

See the full write-up in
[Experiments > OpenHands POC](/experiments/openhands-poc). The short version:

- Scoped, well-described tasks work far better than open-ended ones.
- The sandbox is the feature. Being able to let it run without risking the
  host is what makes autonomy tolerable.
- Model choice changes the outcome sharply — more than I expected.

## Gotchas

- Resource-hungry. Give Docker plenty of memory.
- Long autonomous runs can burn a lot of tokens with nothing to show. Set a
  budget before starting, not after.

## Related topics

- [What is an AI Agent?](/ai/agents/fundamentals)
- [What is an AI Harness?](/ai/agents/harness)
- [OpenHands POC](/experiments/openhands-poc)
- [Docker](/tools/docker)
