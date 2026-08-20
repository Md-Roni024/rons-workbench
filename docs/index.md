---
layout: home

hero:
  name: Ron's AI Work Bench
  text: Learn. Build. Document.
  tagline: Your personal engineering knowledge base.
  actions:
    - theme: brand
      text: Browse AI
      link: /ai/
    - theme: alt
      text: Today I Learned
      link: /journal/

features:
  - title: AI
    details: LLMs, agents, RAG, MCP and the practice of AI engineering.
    link: /ai/
    linkText: Open domain
  - title: Software Engineering
    details: Architecture, design patterns, system design and programming.
    link: /software-engineering/
    linkText: Open domain
  - title: Tools
    details: The tools I actually use, and how I use them.
    link: /tools/
    linkText: Open domain
  - title: Experiments
    details: Things I tried, what worked, and what did not.
    link: /experiments/
    linkText: Open domain
  - title: Projects
    details: Ongoing work, decisions and open questions.
    link: /projects/
    linkText: Open domain
  - title: Journal
    details: Short daily records of what I learned.
    link: /journal/
    linkText: Open domain
---

## What this is

BaseBox is where I write down what I learn, so that I can find it again months
later. Every page here is a Markdown file in a Git repository — the website is
just a fast, readable interface over those files.

It holds four kinds of writing:

- **What I learn** — concepts explained in my own words, in [AI](/ai/) and
  [Software Engineering](/software-engineering/).
- **What I build** — ongoing work in [Projects](/projects/).
- **What I experiment with** — throwaway attempts and their outcomes in
  [Experiments](/experiments/).
- **What I need to revisit** — anything marked `status: revisit`, plus the
  open questions at the bottom of most notes.

The notes are personal. They are how *I* understand something, not official
documentation, and some of them will be wrong until I come back and fix them.

## Currently exploring

- [Agentic SDLC](/projects/agentic-sdlc/) — using agents across the whole
  development lifecycle, not just code generation
- [AI Harnesses](/ai/agents/harness) — the scaffolding that turns a model into
  a working agent
- [Agent Skills](/ai/skills/fundamentals) — packaging reusable capability for
  agents
- [MCP](/ai/mcp/) — a standard protocol for connecting agents to tools and data

## How I use this

```
I learn something
      ↓
Create a Markdown file
      ↓
Write my understanding
      ↓
git add / commit / push
      ↓
It appears on BaseBox
```

Search is at the top of every page — that is the primary way to find anything.
