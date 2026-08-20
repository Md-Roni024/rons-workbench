---
title: OpenHands POC
description: Can an open-source autonomous agent close a real ticket?
domain: Experiments
category: Agents
order: 1
tags:
  - openhands
  - agent
  - poc
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# OpenHands POC

> Personal experiment log. Sample content illustrating the format.

## Goal

Find out whether [OpenHands](/tools/openhands) can take a realistically-sized
task on a codebase I know and produce a change I would actually merge — with
no intervention once it starts.

## Environment

| Item | Value |
| --- | --- |
| OpenHands | Docker image, `latest` |
| Host | Windows 11, Docker Desktop, 16 GB allocated |
| Repository | Small TypeScript service, roughly 8k lines |
| Task | Add pagination to one list endpoint, with tests |

## What I tried

1. Started the container and pointed it at the repository.
2. Gave it the task as a short paragraph, the way I would brief a person.
3. Let it run without intervening, and read the trace afterwards.
4. Repeated with a much more specific brief naming the files involved.

## Result

| Run | Brief | Outcome |
| --- | --- | --- |
| 1 | One paragraph, no file hints | Plausible change, wrong layer. Tests not run. |
| 2 | Named the files and the expected shape | Working change, tests written and passing |

Run 2 produced a diff I would have accepted after normal review.

## What worked

- **Exploration.** It found the relevant files quickly without being told
  where to look, which I had expected to be the weak point.
- **The sandbox.** Letting it run commands freely was comfortable precisely
  because it was contained. That changed how I supervised it.
- **Test writing.** Given an existing test file as an example, the new tests
  matched the house style closely.

## What failed

- **Run 1 solved the wrong problem well.** It added pagination at the
  repository layer where the convention is to do it at the query layer. Nothing
  in the brief said so, and it did not ask.
- **It did not verify by default.** In run 1 it never ran the test suite, so
  it had no signal that anything was wrong.
- **Long silences.** Several minutes of tool calls with no visible progress. I
  nearly killed it twice.

## What I learned

The gap between run 1 and run 2 was entirely in the brief, not the agent. The
same conclusion I keep reaching from a different direction: the specification
and the verification loop matter more than raw capability. This is the
[harness](/ai/agents/harness) argument again, and it maps directly onto
[Agentic SDLC](/ai/agents/agentic-sdlc) — the plan step is where the value is.

Concretely: name the constraints that are obvious to you and invisible in the
code, and make sure the agent has a way to check itself.

## Next steps

- Re-run with a project convention file in the repository and see whether run
  1's brief now succeeds.
- Try a task that spans several files with a real dependency between them.
- Compare the same task against [Claude Code](/tools/claude-code) with an
  identical brief.
