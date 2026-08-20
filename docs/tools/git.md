---
title: Git
description: Version control, and how this site gets published - personal working notes.
domain: Tools
category: Engineering
order: 8
tags:
  - git
  - version-control
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# Git

> Personal working notes.

## What it is

Distributed version control. For BaseBox it is also the storage layer: the
Markdown files in this repository are the source of truth, and pushing is what
publishes them.

## The BaseBox loop

```bash
git add docs/ai/agents/new-topic.md
git commit -m "Add note on agent supervision"
git push
```

That is the whole publishing workflow. CI builds the site and deploys it.

## Commands I keep forgetting

```bash
# What changed, in detail, before committing
git diff --staged

# Amend the last commit without changing its message
git commit --amend --no-edit

# Undo the last commit but keep the changes in the working tree
git reset --soft HEAD~1

# Discard local changes to one file
git restore docs/ai/llm/tokens.md

# Stash including untracked files
git stash push -u -m "half-written note"

# Search history for when a phrase appeared
git log -S "context engineering" --oneline

# Who last touched each line
git blame docs/.vitepress/config.ts
```

## What I have learned

- **Commit messages are notes to my future self.** For a knowledge base,
  "Update notes" is useless six months later; "Correct the tokens/characters
  ratio in tokens.md" is not.
- **Small commits per note** make the history a usable learning log in its own
  right.
- **`git log -S` is underused.** Searching for when an idea entered the notes
  is often more useful than searching the current text.

## Gotchas

- Line endings on Windows. Set `core.autocrlf` deliberately, or diffs fill
  with phantom whole-file changes:

  ```bash
  git config --global core.autocrlf true
  ```

- Force-pushing a shared branch rewrites history for everyone. On a personal
  repository it is usually fine; the habit still transfers badly.

## On Windows

PowerShell equivalents for the things that differ:

```powershell
# Files changed in the last commit
git diff-tree --no-commit-id --name-only -r HEAD

# Count notes in the knowledge base
(Get-ChildItem docs -Recurse -Filter *.md).Count

# Notes edited in the last week - useful for a weekly review
git log --since="7 days ago" --name-only --pretty=format: |
    Where-Object { $_ -like "docs/*" } |
    Sort-Object -Unique
```

## Related topics

- [Docker](/tools/docker)
