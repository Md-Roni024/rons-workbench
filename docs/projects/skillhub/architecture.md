---
title: Different SkillHub Architecture
description: Simple questions and answers for understanding different SkillHub architectures and implementations.
domain: Projects
category: SkillHub
order: 2
tags:
  - SkillHub
  - Skills
  - AI Agents
status: learning
created: 2026-08-20
updated: 2026-08-20
---


# Different SkillHub Architecture

SkillHub can be implemented in different ways depending on how skills are discovered, stored, distributed, managed, and used by AI agents.

This document compares different SkillHub architectures and currently operating SkillHub / Skill Manager products.

---

## 1. Hermes Agent

**Type:** Local Skill Manager + Multi-source Skill Hub

Hermes Agent provides a local skill management architecture where skills are stored locally and loaded by the agent when required.

### Architecture

```text
                Skill Sources
                     │
       ┌─────────────┼─────────────┐
       │             │             │
     GitHub       skills.sh    Other Sources
       │             │             │
       └─────────────┼─────────────┘
                     │
             Hermes Skills Hub
                     │
             Search / Install
                     │
                     ▼
             Local Skill Storage
                     │
              ~/.hermes/skills/
                     │
                     ▼
              Skill Discovery
                     │
                     ▼
               Hermes Agent
                     │
                     ▼
                 LLM + Tools
```

### Main Idea

Hermes keeps installed skills in a local skills directory. The agent can discover available skills and load a skill only when it is needed.

### Main Components

- <span style="color: red;">**Skill Sources**</span> — GitHub, skills.sh, official sources, etc.
- <span style="color: red;">**Skills Hub**</span> — Search, inspect, install, update, and manage skills.
- <span style="color: red;">**Local Skill Storage**</span> — Installed skills are stored locally.
- <span style="color: red;">**Skill Discovery**</span> — The agent identifies available skills.
- <span style="color: red;">**Skill Loading**</span> — The complete skill instructions are loaded when required.
- <span style="color: red;">**Agent Execution**</span> — Hermes uses the loaded skill together with its tools.

### Key Characteristic

> **Local-first architecture**

The SkillHub functionality is closely connected to the agent's local environment rather than depending entirely on a centralized enterprise server.

### Good For

* Individual developers
* Local AI agents
* Personal skill collections
* Multi-source skill discovery
* Agent-centric workflows

---

## 2. SkillHub Registry + CLI

Another architecture separates the **central skill registry** from the **AI agent**.

```text
              Central SkillHub
                    │
        ┌───────────┼───────────┐
        │           │           │
      Search      Publish     Version
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
               SkillHub CLI
                    │
                 Install
                    │
                    ▼
             Local Skill Store
                    │
                    ▼
                AI Agent
                    │
                    ▼
                 Use Skill
```

### Main Idea

The SkillHub acts as a **central registry** for skills.

Users or developers can:

* Search for skills
* View skill information
* Install skills
* Publish skills
* Update skills
* Manage versions

The CLI acts as the bridge between the central registry and the local AI agent.

### Key Characteristic

> **Centralized registry + local execution**

The agent does not necessarily communicate with the SkillHub server every time it uses a skill. The skill can be installed locally and then executed by the agent.

### Good For

* Development teams
* Shared skill repositories
* Controlled skill distribution
* Multiple AI agents

---

## 3. Web-Based SkillHub

A SkillHub can also be implemented as a **web application**.

```text
                 Web Browser
                      │
                      ▼
              SkillHub Web UI
                      │
          ┌───────────┼───────────┐
          │           │           │
       Search       Browse      Manage
          │           │           │
          └───────────┼───────────┘
                      │
                      ▼
                SkillHub API
                      │
          ┌───────────┼───────────┐
          │           │           │
       Database     Storage     Security
          │           │           │
          └───────────┼───────────┘
                      │
                      ▼
                Skill Registry
```

### Main Idea

Users interact with the SkillHub through a browser instead of using only a CLI.

The UI can provide:

* Skill search
* Categories
* Skill details
* Version information
* Author information
* Installation instructions
* Ratings or usage statistics
* Skill publishing
* Skill administration

### Key Characteristic

> **User-friendly centralized management**

This architecture is especially useful when many employees need to discover and manage skills.

### Good For

* Teams
* Organizations
* Non-technical users
* Centralized skill management

---

## 4. Enterprise Centralized SkillHub

For a company with many teams and employees, a centralized enterprise architecture can be used.

```text
                         Enterprise SkillHub
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
          Web UI             REST API           CLI
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                Registry     Database     Storage
                    │           │           │
                    └───────────┼───────────┘
                                │
                    ┌───────────┼───────────┐
                    │           │           │
                  Auth       RBAC        Audit Log
                    │           │           │
                    └───────────┼───────────┘
                                │
                                ▼
                         Skill Distribution
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
          Claude             Hermes            OpenHands
             │                  │                  │
             ▼                  ▼                  ▼
          Developer          Developer          Developer
```

### Main Idea

The SkillHub becomes a **company-wide platform for managing AI skills**.

Different teams can use the same approved skills instead of creating duplicate versions.

### Possible Features

* Central skill registry
* Organization and team management
* Authentication
* Role-Based Access Control (RBAC)
* Private skills
* Public/internal skills
* Skill versioning
* Approval workflow
* Security scanning
* Audit logs
* Usage tracking
* Skill ownership
* Deprecation management
* Agent/client integrations

### Key Characteristic

> **Central governance + distributed execution**

Skills are centrally managed, but agents can install and execute them in their own environments.

### Good For

* Large organizations
* Enterprise AI platforms
* Internal AI agents
* Cross-functional teams
* Governance and security

---

## 5. Git-Based SkillHub

Another approach is to use Git repositories as the primary skill storage mechanism.

```text
              Skill Git Repository
                       │
             ┌─────────┼─────────┐
             │         │         │
          Skill A   Skill B   Skill C
             │         │         │
             └─────────┼─────────┘
                       │
                    Git Clone
                       │
                       ▼
                Local Workspace
                       │
                       ▼
                   AI Agent
```

### Main Idea

Each skill can be maintained as code inside Git.

Git provides:

* Version control
* History
* Branching
* Pull requests
* Code review
* Collaboration

### Key Characteristic

> **Skills are treated like software code**

This can work well for engineering teams because existing Git workflows can be reused.

### Good For

* Software engineering teams
* Internal development
* Code-reviewed skills
* Teams already using Git workflows

---

## 6. Marketplace-Style SkillHub

A SkillHub can also work like an **AI skill marketplace**.

```text
                    Skill Marketplace
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
    Discover            Evaluate            Install
       │                   │                   │
       ▼                   ▼                   ▼
   Categories          Ratings            Package
   Search              Reviews            Version
   Tags                Security           Dependency
                           │
                           ▼
                      Skill Registry
                           │
                           ▼
                        AI Agent
```

### Main Idea

Developers publish skills and users discover and install them.

Possible features:

* Search
* Categories
* Tags
* Ratings
* Reviews
* Popular skills
* Featured skills
* Skill versions
* Dependencies
* Security status
* Installation statistics

### Key Characteristic

> **Discoverability and ecosystem growth**

This model is useful when the goal is to build a large ecosystem of reusable skills.

### Good For

* Public skill ecosystems
* Community-driven development
* Skill marketplaces
* Large-scale skill distribution

---

# 7. Currently Operating SkillHub / Skill Manager Products

Several currently operating products and open-source projects provide skill discovery, skill management, skill registries, or skill marketplaces.

They do not all have the same architecture.

---

## 7.1 Hermes Agent Skills Hub

**Type:** Local Skill Manager + Multi-source Skill Hub

Hermes provides a local Skills Hub for browsing, searching, installing, updating, auditing, and uninstalling skills.

Installed skills are stored locally in:

```text
~/.hermes/skills/
```

Hermes can work with multiple skill sources, including GitHub, skills.sh, ClawHub, LobeHub, and other sources.

### Architecture Type

> **Multi-source discovery + local skill management + local execution**

### Best For

* Individual developers
* Local AI agents
* Personal skill collections
* Agent-centric workflows

---

## 7.2 iFlytek SkillHub

**Type:** Centralized Skill Registry / Enterprise SkillHub

iFlytek SkillHub is an open-source, self-hosted agent skill registry designed for organizations to publish, discover, version, and manage reusable skills.

```text
                  SkillHub Server
                       │
          ┌────────────┼────────────┐
          │            │            │
       Publish       Search       Version
          │            │            │
          └────────────┼────────────┘
                       │
                 Skill Registry
                       │
             ┌─────────┴─────────┐
             │                   │
           Web UI              CLI
             │                   │
             └─────────┬─────────┘
                       │
                       ▼
                   AI Agents
```

### Main Features

* Self-hosted
* Private skill registry
* Skill publishing
* Skill discovery
* Skill versioning
* Namespaces
* Tags
* CLI installation
* Enterprise-oriented governance
* Private/on-premise deployment

### Architecture Type

> **Centralized enterprise registry + distributed agent execution**

### Best For

* Companies
* Large teams
* Internal/private skills
* Enterprise AI platforms
* Governance and controlled skill distribution

**This is one of the most relevant projects for an enterprise SkillHub investigation.**

---

## 7.3 skills.sh

**Type:** Public Skill Directory / Ecosystem

skills.sh is a public directory for AI agent skills.

Its primary focus is skill discovery and distribution rather than enterprise governance.

```text
             Skill Repositories
                     │
                     ▼
                 skills.sh
                     │
              Search / Discover
                     │
                     ▼
                  AI Agents
```

### Architecture Type

> **Public skill directory + distributed skill sources**

### Best For

* Discovering community skills
* Finding popular skills
* Public skill distribution
* Agent ecosystem discovery

---

## 7.4 ClawHub

**Type:** Community Skill Marketplace / Registry

ClawHub provides a community-oriented ecosystem for discovering and distributing agent skills.

```text
             Skill Authors
                  │
                  ▼
               ClawHub
                  │
          Search / Discover
                  │
                  ▼
              AI Agents
```

### Architecture Type

> **Community marketplace / registry**

### Best For

* Community skills
* Public skill sharing
* Skill discovery
* Agent ecosystem

---

## 7.5 LobeHub

**Type:** AI Agent Platform + Skill Ecosystem

LobeHub is broader than a traditional SkillHub. It provides an AI agent ecosystem where skills and other agent capabilities can be discovered and used.

```text
                 LobeHub
                    │
        ┌───────────┼───────────┐
        │           │           │
      Agents      Skills      Tools
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
                 AI Agent
```

### Architecture Type

> **AI agent platform + skill ecosystem**

### Best For

* Agent discovery
* Skill discovery
* Agent workflows
* End-user AI applications

---

# 8. Product Comparison

| Product               | Type                      | Centralized | Self-Hosted | CLI | Web UI | Enterprise Focus |
| --------------------- | ------------------------- | ----------: | ----------: | --: | -----: | ---------------: |
| **Hermes Skills Hub** | Local Skill Manager / Hub |          No |         Yes | Yes |     No |              Low |
| **iFlytek SkillHub**  | Enterprise Registry       |         Yes |         Yes | Yes |    Yes |         **High** |
| **skills.sh**         | Public Skill Directory    |         Yes |          No | Yes |    Yes |              Low |
| **ClawHub**           | Community Registry        |         Yes |          No |   — |    Yes |              Low |
| **LobeHub**           | Agent + Skill Ecosystem   |         Yes |   Yes/Cloud | Yes |    Yes |           Medium |

---

# 9. Architecture Comparison

The different approaches can be summarized as follows:

| Architecture            | Storage          | Discovery                | Management  | Best For               |
| ----------------------- | ---------------- | ------------------------ | ----------- | ---------------------- |
| **Hermes Local Hub**    | Local            | Local / Multiple sources | Local       | Individual developers  |
| **Registry + CLI**      | Central + Local  | CLI                      | CLI         | Developers             |
| **Web SkillHub**        | Central          | Web                      | Web         | Teams                  |
| **Enterprise SkillHub** | Central + Local  | Web + CLI + API          | Centralized | Large organizations    |
| **Git-Based Hub**       | Git repositories | Git / UI                 | Git         | Engineering teams      |
| **Marketplace Hub**     | Central registry | Web                      | Web         | Large skill ecosystems |

---

# 10. Important Architectural Pattern

Across most implementations, the architecture can be understood using four main layers:

```text
┌───────────────────────────────┐
│       Skill Sources           │
│ GitHub / Registry / Authors   │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Skill Registry          │
│ Search / Metadata / Versions  │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│      Skill Distribution        │
│ Web / CLI / API / Packages    │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│       Agent Runtime           │
│ Claude / Hermes / OpenHands   │
└───────────────────────────────┘
```

The biggest architectural difference is **where the skills are managed and where they are executed**.

* **Local architecture** → Management and execution are close together.
* **Centralized architecture** → Management happens centrally, execution happens locally.
* **Git-based architecture** → Git becomes the source of truth.
* **Marketplace architecture** → Discovery and distribution become the primary focus.
* **Enterprise architecture** → Governance, security, access control, and auditing become important.

---

# 11. Enterprise SkillHub Direction

For an enterprise environment, a **central registry + distributed agent execution** architecture is a strong approach.

```text
                     Enterprise SkillHub
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
         Web                CLI                API
          │                  │                  │
          └──────────────────┼──────────────────┘
                             │
                      Skill Registry
                             │
              ┌──────────────┼──────────────┐
              │              │              │
          Metadata       Versioning      Storage
              │              │              │
              └──────────────┼──────────────┘
                             │
                    Security / Governance
                             │
              ┌──────────────┼──────────────┐
              │              │              │
             RBAC          Audit         Approval
              │              │              │
              └──────────────┼──────────────┘
                             │
                       Distribution
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
       Claude             Hermes            OpenHands
          │                  │                  │
          ▼                  ▼                  ▼
     Local Skills       Local Skills       Local Skills
```

### Recommended Principles

1. **Central Registry** — One trusted source of internal skills.
2. **Local Execution** — Agents execute skills in their own environment.
3. **Web + CLI + API** — Support different developer workflows.
4. **Versioning** — Every skill should have a version.
5. **RBAC** — Control who can publish, modify, approve, and use skills.
6. **Security Scanning** — Scan skills before they become available.
7. **Approval Workflow** — Allow organizations to approve trusted skills.
8. **Audit Logging** — Track publishing, installation, updates, and usage.
9. **Multiple Agents** — Support Claude, Hermes, OpenHands, and future agents.
10. **External Sources** — Optionally allow importing trusted community skills.

---

# 12. Overall Comparison

The current SkillHub ecosystem can be viewed as a spectrum:

```text
Local                                             Enterprise
  │                                                   │
  ▼                                                   ▼

Hermes ───── skills.sh ───── ClawHub ───── LobeHub ───── iFlytek SkillHub
  │             │               │             │               │
  │             │               │             │               │
Local Hub    Public        Community      Agent          Enterprise
Manager      Directory     Registry       Platform       Registry
```

The major difference is **who controls the skills**.

* **Hermes** → User/agent controlled
* **skills.sh** → Public ecosystem
* **ClawHub** → Community controlled
* **LobeHub** → Platform ecosystem
* **iFlytek SkillHub** → Organization controlled

For an enterprise with many employees and teams, the **iFlytek-style centralized registry** combined with **Hermes-style local agent execution** is a particularly useful architecture to investigate further.
