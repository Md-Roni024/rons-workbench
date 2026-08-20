---
title: Claude Code
description: Agentic coding in the terminal and IDE - personal working notes.
domain: Tools
category: AI Tooling
order: 1
tags:
  - claude-code
  - agent
  - harness
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# Claude Code

> Personal working notes, not documentation. Check the official docs for
> anything authoritative.

## What it is

An agentic coding tool from Anthropic that works in the terminal, in an IDE
extension, and on the web. It reads and edits files, runs commands, and works
through multi-step tasks rather than just completing code.

In the vocabulary I use elsewhere in these notes, it is a
[harness](/ai/agents/harness) — and a good example of how much harness design
matters relative to the underlying model.

## Why I use it

It operates on the whole project rather than the open file, and it can verify
its own work by running the tests. That combination is what makes it useful
for real changes rather than snippets.

## How I use it

The features I reach for most:

| Feature | What it does |
| --- | --- |
| `CLAUDE.md` | Project context loaded automatically every session |
| Skills | Reusable procedures; see [Agent Skills](/ai/skills/fundamentals) |
| MCP servers | Extra tools and data sources; see [MCP](/ai/mcp/) |
| Slash commands | Saved prompts invoked by name |
| Hooks | Shell commands fired on tool events |
| Plan mode | Agree the approach before any file is touched |

## Setup

```bash
npm install -g @anthropic-ai/claude-code
claude
```

Project-level configuration lives in the repository:

```text
<repo>/
├── CLAUDE.md              # project context, conventions, commands
└── .claude/
    ├── settings.json      # permissions, hooks, env
    ├── skills/            # project-specific skills
    └── commands/          # project-specific slash commands
```

## What I have learned

- **`CLAUDE.md` earns its keep.** Build commands, conventions and the things
  that are non-obvious about the project. Keep it short — it is in the context
  of every session, so it competes with actual work.
- **Plan mode before large changes.** Reviewing a plan is much cheaper than
  reviewing a large diff, and course-correcting is nearly free at that stage.
- **Permissions are worth configuring.** Allowlisting the read-only commands I
  run constantly removes most of the interruptions.
- **Skills beat repeating yourself.** Anything explained twice should be a
  skill.

## Gotchas

- A long session eventually fills the [context window](/ai/llm/context-window).
  Finishing a task and starting fresh beats pushing on.
- It follows `CLAUDE.md` closely, so a stale instruction there is actively
  harmful. Same failure mode as a stale
  [skill](/ai/skills/skill-management).

## Related topics

- [What is an AI Harness?](/ai/agents/harness)
- [What are Agent Skills?](/ai/skills/fundamentals)
- [What is Agentic SDLC?](/ai/agents/agentic-sdlc)
