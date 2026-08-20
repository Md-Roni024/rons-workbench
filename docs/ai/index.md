---
title: AI
description: LLMs, agents, RAG, MCP and the practice of AI engineering.
domain: AI
order: 1
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# AI

My current main focus. This domain covers how large language models actually
work, and how to build reliable systems on top of them.

## Areas

| Area | What it covers |
| --- | --- |
| [LLM](/ai/llm/) | How language models work: tokens, context, sampling |
| [RAG](/ai/rag/) | Retrieving your own data and grounding answers in it |
| [Embeddings](/ai/embeddings/) | Turning text into vectors for search and similarity |
| [Agents](/ai/agents/) | Models that plan, call tools and act in a loop |
| [Skills](/ai/skills/) | Packaging reusable capability for agents |
| [MCP](/ai/mcp/) | A standard protocol for connecting agents to tools and data |
| [Context Engineering](/ai/context-engineering/) | Deciding what goes into the context window |

## Where to start

If you are reading these in order, this is the path that made sense to me:

```
What is an LLM?
    ↓
Tokens → Context window
    ↓
Embeddings → RAG
    ↓
Agents → Harness → Skills
    ↓
MCP → Agentic SDLC
```

## Related domains

- [Tools](/tools/) — the specific software I use to do this
- [Experiments](/experiments/) — what happened when I tried it
