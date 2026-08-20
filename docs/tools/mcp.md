---
title: MCP
description: Using MCP servers day to day - personal working notes.
domain: Tools
category: AI Tooling
order: 3
tags:
  - mcp
  - tools
  - configuration
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# MCP (tooling notes)

> Personal working notes. The concept is explained in
> [AI > MCP](/ai/mcp/); this page is about actually running servers.

## Configuring a server

Most clients take the same shape of JSON:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": { "DATABASE_URL": "postgresql://localhost:5432/mydb" }
    }
  }
}
```

In Claude Code, servers can also be added from the CLI:

```bash
claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem ~/notes
claude mcp list
```

## Debugging

The failure mode is almost always that the server did not start, and the
symptom is that its tools are silently absent.

```bash
# Run the server by hand - it should sit waiting on stdio, not exit
npx -y @modelcontextprotocol/server-postgres

# Inspect a server interactively
npx @modelcontextprotocol/inspector npx -y @modelcontextprotocol/server-postgres
```

The inspector is the tool I should reach for first and usually do not.

## What I have learned

- **Connect only what the task needs.** Every server contributes tool
  definitions to the [context window](/ai/llm/context-window). Ten idle
  servers is a real and permanent cost per call.
- **Scope filesystem servers narrowly.** Pointing one at a home directory
  gives an agent far more reach than any single task requires.
- **Environment variables come from the config, not the shell.** A server that
  works when run by hand and fails when launched by the client is nearly
  always missing an env var in its config block.

## Gotchas

- `npx -y` re-resolves the package on each start; it is slow and it means the
  version can change under you. Pin versions for anything you rely on.
- Secrets in a config file are still secrets. Keep them out of a committed
  repository.

## Related topics

- [What is MCP?](/ai/mcp/)
- [MCP Data Analyst](/experiments/mcp-data-analyst)
- [Claude Code](/tools/claude-code)
