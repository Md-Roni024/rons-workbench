---
title: Q/A About SkillHub
description: Simple questions and answers for understanding the SkillHub project.
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

# Q/A About SkillHub

## 1. Basic Concept

### Q1.1 - What problem is SkillHub solving?

Today, skills can be stored separately inside each project. This causes duplication, inconsistent versions, and difficulty sharing improvements.

**SkillHub provides one central place to store and reuse skills across projects.**

### Q1.2 - What is SkillHub?

SkillHub is a **central registry for reusable AI agent skills**.

It allows developers to:

* Publish skills
* Discover skills
* Version skills
* Reuse skills across projects
* Update skills when new versions are available

Think of it as a **package registry for AI agent skills**.

### Q1.3 - Why do we need a central SkillHub?

Without SkillHub:

```text
Project A → Skill A copy
Project B → Skill A copy
Project C → Skill A copy
```

The copies can become different over time.

With SkillHub:

```text
                 SkillHub
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
    Project A   Project B   Project C
```

One skill can be maintained and reused by many projects.

### Q1.4 - What is the difference between a SkillHub and a Knowledge Base?

A **Knowledge Base** stores knowledge and evidence.

A **SkillHub** stores reusable instructions for how an AI agent should work.

| Knowledge Base          | SkillHub                             |
| ----------------------- | ------------------------------------ |
| Stores knowledge        | Stores skills                        |
| Provides evidence       | Provides behaviour                   |
| Answers "What is true?" | Answers "How should the agent work?" |
| Project-focused         | Cross-project                        |
| Provenance matters      | Versioning and trust matter          |

### Q1.5 - Who creates a skill?

Usually a developer, technical lead, or subject-matter expert creates a skill.

For example, a senior developer may create a **Spring Boot REST API skill** based on the company's development standards.

### Q1.6 - Who owns a skill?

A skill can have an owner, such as a developer, team, or department responsible for maintaining it.

The owner is responsible for improving the skill and publishing new versions.

### Q1.7 - Who is allowed to publish a skill?

This depends on the organization's permission model.

For an enterprise SkillHub, publishing would normally be restricted to authorized developers, leads, or skill maintainers.


## 2. Skill Structure

### Q2.1 - What is a Skill?

A Skill is a reusable set of instructions that teaches an AI agent **how to perform a particular type of task**.

For example:

```text
Spring Boot REST Skill
PowerBuilder Migration Skill
Jetpack Compose Skill
Jira Workflow Skill
```

### Q2.2 - What is `SKILL.md`?

`SKILL.md` is the main file containing the skill's instructions.

It describes how the agent should perform a particular task.

Example:

```text
spring-rest-conventions/
└── SKILL.md
```

### Q2.3 - Can a skill contain other files or resources?

Yes.

A skill can contain additional resources that help the agent perform the task.

For example:

```text
spring-rest-conventions/
├── SKILL.md
├── examples/
├── templates/
└── resources/
```

### Q2.4 - What should a skill contain?

A skill should contain reusable knowledge about **how to perform a task**.

For example:

* Development conventions
* Procedures
* Patterns
* Examples
* Templates
* Task-specific resources

### Q2.5 - Where does a skill live?

There are two stages.

**In SkillHub:**

```text
SkillHub
└── spring-rest-conventions
    ├── SKILL.md
    └── resources
```

**After materialisation:**

```text
Project
└── .claude
    └── skills
        └── spring-rest-conventions
            └── SKILL.md
```

## 3. Skill Lifecycle

### Q3.1 - What is the lifecycle of a skill?

The basic lifecycle is:

```text
Create
  ↓
Publish
  ↓
Discover
  ↓
Pin
  ↓
Resolve
  ↓
Materialise
  ↓
Use
  ↓
Improve
  ↓
Publish new version
```

### Q3.2 - How is a skill created?

A developer creates the skill using the `SKILL.md` format and adds any required resources.

### Q3.3 - How is a skill published?

The skill is uploaded to SkillHub.

SkillHub stores the skill together with metadata such as:

* Skill ID
* Version
* Owner
* Resources
* Changelog

<span style="color: red;">**The published version becomes immutable.**</span>

### Q3.4 - How is a skill discovered?

Developers search or browse the SkillHub catalogue.

They can see information such as:

* Skill name
* Description
* Version
* Owner
- Changelog (what changed between versions)
- Health/status (current condition and lifecycle state)
  - 🟢 Healthy (working well and actively maintained)
  - 🟡 Needs Review (may have issues or needs attention)
  - 🔴 Deprecated (should no longer be used)
  - ⚪ Draft (not ready for general use)

### Q3.5 - How does a project use a skill?

The project adds a reference to the skill in its behaviour configuration.

For example:

```text
spring-rest-conventions@^2.3
```

The project doesn't need to copy the entire skill into its repository.

### Q3.6 - How is a skill updated?

A new version is published.

For example:

```text
2.3 → existing version
2.4 → improved version
```

Projects using a compatible version range can receive the newer version during the update process.

### Q3.7 - Can an old skill version be changed?

No.

Published versions should be **immutable**.

If version `2.3` needs a change, publish `2.4` instead.

This ensures that a project using `2.3` does not suddenly receive unexpected changes.

### Q3.8 - What happens when a skill is improved?

The owner creates and publishes a new version.

For example:

```text
spring-rest-conventions@2.3
             ↓
       improvement
             ↓
spring-rest-conventions@2.4
```

Projects can then move to the newer version according to their version range.


## 4. Skill Registry

### Q4.1 - What does SkillHub store?

SkillHub stores:

* Skill ID
* Version
* `SKILL.md`
* Resources
* Owner
* Changelog
* Hash/signature
* Metadata

### Q4.2 - How is a skill identified?

Each skill has a unique ID.

For example:

```text
spring-rest-conventions
```

A specific version can then be referenced as:

```text
spring-rest-conventions@2.4
```

### Q4.3 - How are skill versions managed?

Skills use versions such as:

```text
1.0.0
1.1.0
2.0.0
```

Each published version is immutable.

### Q4.4 - How can developers search for a skill?

SkillHub provides a catalogue/search mechanism.

For example:

```text
Search: Spring Boot
```

could return:

```text
spring-rest-conventions
spring-security-patterns
spring-testing
```

## 5. Skill Versioning & Pinning

### Q5.1 - What does `skill-id@version` mean?

It identifies a specific version of a skill.

Example:

```text
spring-rest-conventions@2.4
```

means:

> Use exactly version 2.4.

### Q5.2 - What does `skill-id@range` mean?

It specifies an acceptable version range.

For example:

```text
spring-rest-conventions@^2.3
```

means the project can use compatible versions starting from `2.3`, such as `2.4`, according to the versioning rules.

### Q5.3 - Why do projects pin a skill?

Pinning gives the project control over which skill versions it uses.

It prevents an unrelated change in SkillHub from unexpectedly changing the project's behaviour.

### Q5.4 - Where is the skill pin stored?

The proposal is to store it in the project's **behaviour box**.

For example:

```text
skills/
└── spring-rest-conventions.pin
```

or an equivalent behaviour configuration:

```text
spring-rest-conventions@^2.3
```

### Q5.5 - What happens when a new version is released?

The resolver checks whether the new version satisfies the project's version range.

If it does, the project can receive the newer version during `status_update`.


## 6. Skill Delivery

### Q6.1 - How does a project get a skill from SkillHub?

The flow is:

```text
Project Pin
    ↓
SkillHub
    ↓
Find Version
    ↓
Verify Skill
    ↓
Manifest
    ↓
.claude/skills/
```

### Q6.2 - What is `setup_materialise`?

`setup_materialise` is the existing mechanism that prepares a project's local environment with the required instructions and skills.

SkillHub would extend this process so it can also resolve skills from the central registry.

### Q6.3 - How does a skill reach `.claude/skills/`?

The server resolves the project's skill reference and adds the skill to the materialisation manifest.

The agent then writes it to:

```text
.claude/skills/<skill-name>/SKILL.md
```

### Q6.4 - What happens if the developer has modified the local skill?

The system should detect the change using the existing hash/state mechanism.

It should **not silently overwrite the developer's modification**.

Instead, it should surface a conflict for resolution.

### Q6.5 - How does `status_update` update a skill?

`status_update` can check whether a newer compatible version exists.

If one exists, it can refresh the local skill through the same materialisation process.


## 7. Skill vs Knowledge

### Q7.1 - What is the difference between a Skill and Knowledge?

**Knowledge** describes information or facts.

**Skill** describes how an agent should perform work.

Example:

```text
Knowledge:
"Company uses PostgreSQL."

Skill:
"When creating a database query, follow these PostgreSQL conventions..."
```

### Q7.2 - Can a skill become evidence?

No.

A skill should influence **agent behaviour**, not become a source of evidence for the Knowledge Base.

### Q7.3 - Why should a skill never become evidence?

Because skills describe **how the agent should work**, while the KB needs trustworthy sources for **what is true**.

Keeping this boundary prevents reusable agent behaviour from contaminating the knowledge/provenance system.

---

## 8. Skill vs Instructions

### Q8.1 - What is the difference between a Skill and an Instruction?

A simple way to think about it:

**Skill → How to do something**

**Instruction → What the project requires**

For example:

```text
Skill:
"How to build a Spring Boot REST API."

Instruction:
"All APIs in this project must use our company error response format."
```

### Q8.2 - When should something be a Skill instead of an Instruction?

Make it a **Skill** when the knowledge can be reused across many projects.

Make it an **Instruction** when it is specific to a particular project or context.

### Q8.3 - What happens if a Skill and an Instruction conflict?

The platform needs a defined precedence rule.

Generally, project-specific instructions should constrain the use of a general skill.

In simple terms:

```text
Skill = general way of working
Instruction = project-specific constraint
```

---

## 9. Security & Trust

### Q9.1 - Why does SkillHub need signing and hashing?

Because skills directly influence what an AI agent does.

SkillHub should be able to prove that the skill received by a project is the same skill that was published.

### Q9.2 - How is a skill verified before use?

The published skill has a hash and signature.

When the skill is downloaded:

```text
Published Skill
      ↓
Calculate/verify hash
      ↓
Verify signature
      ↓
Match?
  ├── Yes → Use skill
  └── No  → Reject skill
```

### Q9.3 - What happens if a skill is modified or corrupted?

The verification fails.

The system should refuse to materialise the invalid skill instead of giving the agent potentially unsafe or unexpected instructions.

---

## 10. Project Scope

### Q10.1 - Can multiple projects use the same skill?

Yes.

This is the main purpose of SkillHub.

```text
SkillHub
   │
   ├── Project A
   ├── Project B
   └── Project C
```

### Q10.2 - Can one project use multiple skills?

Yes.

For example:

```text
Project
├── spring-rest-conventions
├── security-patterns
├── testing-patterns
└── jira-workflow
```

### Q10.3 - How does SkillHub keep skills scoped to a project?

The **SkillHub itself is shared**, but each project's behaviour configuration determines which skills that project uses.

The project context is resolved through the existing authentication/token mechanism.

### Q10.4 - Can one project access another project's private skills?

It should not, unless the appropriate permissions explicitly allow it.

Shared/public skills can be available across projects, while private skills can remain restricted.

---

## 11. Feedback & Improvement

### Q11.1 - How does SkillHub know whether a skill is useful?

The proposed system can collect optional feedback from the Knowledge Base.

For example:

* Audit issues
* Coverage failures
* Skill adoption

### Q11.2 - What feedback can the Knowledge Base provide?

The KB can report signals such as:

```text
Skill X
→ used by 20 projects
→ associated with fewer audit issues
→ good coverage results
```

### Q11.3 - How does skill health help improve skills?

SkillHub can use these signals to identify skills that are performing well and skills that may need improvement.

This creates a feedback loop:

```text
Skill
 ↓
Projects
 ↓
Builds
 ↓
KB Audits
 ↓
Skill Health
 ↓
Improvement
 ↓
New Skill Version
```

---

## 12. Architecture

### Q12.1 - Is SkillHub a separate service?

Yes.

The proposal is for SkillHub to be a **standalone service/registry** rather than another part of the Knowledge Base.

### Q12.2 - How does SkillHub communicate with the Knowledge Base?

The KB interacts with SkillHub mainly for:

1. Resolving and retrieving skills.
2. Optionally sending skill-health feedback.

### Q12.3 - What are the main components of SkillHub?

The main pieces are:

```text
SkillHub
├── Registry
├── Publish API
├── Search/Catalogue
├── Version Manager
├── Resolver
├── Signing/Verification
└── Health/Feedback
```

### Q12.4 - What needs to be built for SkillHub V1?

The minimum useful version could be:

```text
1. Skill Registry
2. Skill Publishing
3. Skill Search
4. Skill Versioning
5. Project Skill Pin
6. Skill Resolver
7. Materialisation integration
8. Hash/signature verification
```

Feedback/health can come later if it is not required for the first release.

---

## 13. Important Final Questions

### Q13.1 - Why should SkillHub be separate from the Knowledge Base?

Because they solve different problems.

```text
Knowledge Base
→ What do we know?

SkillHub
→ How should the agent work?
```

Keeping them separate also preserves the KB's project-scoped and provenance-focused architecture.

### Q13.2 - What can we reuse from the existing platform?

A lot of the existing infrastructure can remain.

Especially:

* Behaviour box
* `behaviour_put`
* `setup_materialise`
* Manifest generation
* `.claude/skills/`
* `.kp-state.json`
* `status_update`
* Existing skill format
* Progressive disclosure

The main new capability is the **central registry and resolution of pinned skills**.

### Q13.3 - What is the minimum functionality required for SkillHub V1?

At minimum:

```text
Author
  ↓
Publish
  ↓
Store/version
  ↓
Search
  ↓
Pin
  ↓
Resolve
  ↓
Verify
  ↓
Materialise
  ↓
Use
```

### Q13.4 - What does the complete SkillHub flow look like?

```text
             ┌──────────────┐
             │    Author    │
             └──────┬───────┘
                    │
                 publish
                    ↓
             ┌──────────────┐
             │  SkillHub    │
             │   Registry   │
             └──────┬───────┘
                    │
                 discover
                    ↓
             ┌──────────────┐
             │    Project   │
             │  Pin Skill   │
             └──────┬───────┘
                    │
                  resolve
                    ↓
             ┌──────────────┐
             │   Materialise│
             └──────┬───────┘
                    │
                    ↓
             ┌──────────────┐
             │ .claude/     │
             │ skills/      │
             └──────┬───────┘
                    │
                    ↓
             ┌──────────────┐
             │     Agent    │
             │ Uses Skill   │
             └──────┬───────┘
                    │
                 improve
                    ↓
             New Skill Version
```

## One-Sentence Summary

**SkillHub is a central, versioned registry where the company can author AI-agent skills once and let multiple projects discover, pin, verify, and automatically use those skills through the existing materialisation pipeline.**
