---
title: MCP Data Analyst
description: An agent answering questions about a database through MCP.
domain: Experiments
category: MCP
order: 2
tags:
  - mcp
  - postgres
  - agent
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# MCP Data Analyst

> Personal experiment log. Sample content illustrating the format.

## Goal

Connect an agent to a Postgres database through [MCP](/ai/mcp/) and see
whether it can answer analytical questions asked in plain English — correctly,
and without me writing any integration code.

## Environment

| Item | Value |
| --- | --- |
| Client | Claude Code |
| Server | `@modelcontextprotocol/server-postgres` |
| Database | Local Postgres 16, sample sales schema, ~50k rows |
| Access | Read-only role |

Configuration, in full:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "postgresql://readonly@localhost:5432/sales" }
    }
  }
}
```

## What I tried

Four questions of increasing difficulty:

1. "How many orders were placed last month?"
2. "Which five products have the highest revenue?"
3. "Show monthly revenue for the last year, and flag unusual months."
4. "Why did revenue drop in March?"

## Result

| Question | Outcome |
| --- | --- |
| 1 | Correct immediately |
| 2 | Correct, after inspecting the schema first |
| 3 | Correct query, reasonable flags, useful summary |
| 4 | Confident narrative, only partly supported by the data |

## What worked

- **Zero integration code.** A JSON block was the entire setup, which is the
  actual point of the protocol.
- **Schema discovery.** It listed tables and columns before writing SQL rather
  than guessing at names.
- **Iteration on error.** A query failed on an ambiguous column; it read the
  error and fixed it without help.

## What failed

- **Question 4 is where it broke down.** It produced a causal story — a
  specific customer churning — that the data supported only weakly. The SQL
  was valid; the interpretation overreached.
- **No cost awareness.** Nothing stopped it from writing a query that scanned
  the largest table repeatedly. On a production-sized database that would have
  been a problem.

## What I learned

Descriptive questions are reliable; causal ones are not. The boundary is
roughly whether the answer is *in* the data or *inferred from* it, and the
agent gives no signal that it has crossed it — the tone is identical either
way.

The read-only role did more for my confidence than any amount of prompt
instruction would have. Constraints belong in the system, not the prompt.

## Next steps

- Ask it to state confidence and cite the rows behind each claim.
- Add a statement timeout at the database level and see how it recovers.
- Try the same four questions against a schema it has no naming intuition for.

## Related topics

- [What is MCP?](/ai/mcp/)
- [MCP (tooling notes)](/tools/mcp)
