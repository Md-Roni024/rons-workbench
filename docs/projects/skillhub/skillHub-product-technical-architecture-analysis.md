# SkillHub — Complete Product, Technical & Architecture Notes

> **Purpose:** Complete notes for understanding the current SkillHub User Story, its relationship with the existing Agentic SDLC product, technical requirements, MCP/API integration, enterprise considerations, and proposed architecture.

---

## 1. Executive Summary

The current product is **Agentic SDLC**. Inside Agentic SDLC, there is a **Behaviour Box / Skill Upload** capability where users can add skills required by a project.

The current problem is that skills are effectively associated with individual projects. The same skill may be recreated or copied into multiple projects, causing:

* duplication
* version drift
* inconsistent implementations
* lack of centralized discovery
* difficulty distributing improvements
* lack of centralized governance and trust

The proposed **standalone SkillHub** solves this by becoming a centralized, reusable, versioned registry of skills.

The most important architectural idea from the current User Story is:

> **SkillHub should be a registry and resolver, not another Knowledge Base.**

The existing Agentic SDLC already has much of the skill delivery mechanism:

```text
Behaviour Box
      ↓
setup_materialise
      ↓
Manifest
      ↓
.claude/skills/
      ↓
Agent uses Skill
```

The new SkillHub becomes the shared source of skills:

```text
SkillHub
   ↓
skill-id@version
   ↓
Behaviour Box
   ↓
Resolver
   ↓
Materialisation
   ↓
.claude/skills/
```

The current story explicitly describes SkillHub as a **package registry plus resolver attached to an existing delivery mechanism**.

---

# 2. Current User Story — What Does It Actually Define?

The current User Story is primarily an **architecture/product lifecycle story**.

It does **not** yet represent a complete technical specification for a standalone enterprise web application.

It defines:

1. Skill format
2. Skill publishing
3. Skill versioning
4. Skill discovery
5. Skill pinning
6. Skill resolution
7. Skill materialisation
8. Skill usage by agents
9. Skill integrity through hash/signature
10. Skill improvement
11. Health feedback
12. Integration with the existing Agentic SDLC pipeline

The story defines:

```text
16 total steps
├── 7 Live Today
├── 2 Partial
└── 7 To Build
```

---

# 3. Core Definition of a Skill

The current story defines a skill as:

```text
SKILL.md + Resources
```

A skill is reusable knowledge/behaviour that tells an agent **how to perform work**.

Examples from the story include:

* Spring Boot REST conventions
* Jetpack Compose screen patterns
* PowerBuilder extraction recipes
* Jira ticket workflows
* Git-related workflows

The intended model is:

```text
Skill
├── SKILL.md
└── Resources
    ├── examples
    ├── templates
    ├── references
    └── other supporting files
```

---

# 4. Main Problem Being Solved

## 4.1 Current project-based model

Today:

```text
Project A
└── Behaviour Box
    └── Spring REST Skill

Project B
└── Behaviour Box
    └── Spring REST Skill

Project C
└── Behaviour Box
    └── Spring REST Skill
```

This creates duplication.

The story identifies several problems:

* skills are re-authored for every project
* copies silently drift apart
* improvements do not travel to other projects
* there is no centralized discovery
* there is no centralized curation/trust mechanism
* useful KB quality signals do not reach the skill itself

---

# 5. Proposed SkillHub Model

Instead:

```text
                    SkillHub
                       │
             ┌─────────┼─────────┐
             │         │         │
          Skill A   Skill B   Skill C
             │
          v2.3.0
             │
             ▼
       Project A
       Project B
       Project C
```

A skill is:

> **Authored once and pinned anywhere.**

---

# 6. Skill Lifecycle

The current story defines five major phases.

```text
Phase 1
Author & Publish
       ↓
Phase 2
Discover & Pin
       ↓
Phase 3
Materialise
       ↓
Phase 4
Build With Skill
       ↓
Phase 5
Improve & Feedback
       ↺
```

---

# 7. Phase 1 — Author & Publish

## Step 1 — Author Skill

Current state:

**LIVE TODAY**

Surface:

```text
MCP → behaviour_put
```

The author creates:

```text
SKILL.md
```

and optionally bundled resources.

The story states that `behaviour_put` already supports skill authoring.

Example:

```text
skills/
└── spring-rest-conventions/
    ├── SKILL.md
    └── resources/
```

---

## Step 2 — Publish Skill to SkillHub

Status:

**TO BUILD**

Proposed:

```http
POST /skills/{id}/versions
```

The SkillHub registry stores:

```text
Skill ID
Version
SKILL.md
Resources
Owner
Changelog
```

Published versions are immutable.

---

## Step 3 — Hash and Sign Skill

Status:

**TO BUILD**

Proposed lifecycle:

```text
Publish
   ↓
Hash
   ↓
Sign
   ↓
Store
```

When consumed:

```text
Download
   ↓
Verify Signature
   ↓
Verify Hash
   ↓
Materialise
```

The purpose is to provide a trust anchor for skills.

---

# 8. Phase 2 — Discover & Pin

## Step 4 — Discover Skills

Status:

**TO BUILD**

Proposed API:

```http
GET /skills?q=...
```

The catalogue should expose at least:

* description
* owner
* version
* health

Example:

```text
Search:
"Spring REST"

Results:
├── Spring REST Conventions
├── Spring Security
├── Spring Boot Testing
└── Spring API Documentation
```

---

# 9. Step 5 — Pin Skill

Instead of copying a skill into the project:

```text
Copy SKILL.md
```

the project stores a reference:

```text
spring-rest-conventions@^2.3
```

The story proposes extending `behaviour_put` to support this pin form.

The important distinction is:

```text
Inline Skill
    ↓
Actual content stored in project

Pinned Skill
    ↓
Reference stored in project
    ↓
Actual content comes from SkillHub
```

---

# 10. Project Scoping

The SkillHub is shared across projects.

However, the project should only receive skills that it has selected/pinned.

Conceptually:

```text
SkillHub
   │
   ├── Skill A
   ├── Skill B
   ├── Skill C
   └── Skill D
        │
        ▼
Project Token
        │
        ▼
Behaviour Box
        │
        ├── Skill A
        └── Skill C
```

The current story says project scoping remains token-based and does not change.

---

# 11. Phase 3 — Materialisation

## Step 7 — Setup

Status:

**LIVE TODAY**

Existing mechanism:

```text
setup_materialise()
```

It produces a manifest containing things such as:

```text
CLAUDE.md
AGENTS.md
Skills
Hashes
Apply instructions
```

Skills are ultimately written into:

```text
.claude/skills/
```

---

# 12. Step 8 — Resolve SkillHub Reference

Current status:

**PARTIAL**

Example:

```text
Behaviour Box:

spring-rest-conventions@^2.3
```

The resolver needs to:

```text
1. Read skill reference
2. Contact SkillHub
3. Resolve version range
4. Select concrete version
5. Download skill
6. Verify signature
7. Verify hash
8. Add to manifest
9. Materialise locally
```

---

# 13. Step 9 — Protect Local Changes

The current system already has `.kp-state.json`.

Conceptually:

```text
SkillHub Version
       ↓
Materialised Skill
       ↓
.kp-state.json
       ↓
Hash comparison
```

If the developer modified the local skill:

```text
Expected Hash ≠ Current Hash
```

then the system should:

```text
STOP
 ↓
Show conflict
 ↓
Human resolves
```

It should not silently overwrite the developer's change.

---

# 14. Phase 4 — Agent Uses Skill

Once materialised:

```text
.claude/skills/
└── spring-rest-conventions/
    └── SKILL.md
```

The agent can load the skill when relevant.

The current story emphasizes **progressive disclosure**:

```text
Description
   ↓
Always visible

SKILL.md body
   ↓
Loaded when relevant
```

This helps keep the agent's context smaller.

---

# 15. Skill vs Instructions

The story makes an important distinction:

```text
Skill
   ↓
Informs HOW the agent works

Instructions
   ↓
Constrain WHAT the agent can produce
```

Example:

```text
Skill:
Spring Boot REST conventions

Project instruction:
All APIs must use company response wrapper
```

Together:

```text
Agent
 ↓
Spring idiomatic implementation
 +
Company project constraints
```

---

# 16. Skill Is Not Evidence

One of the strongest boundaries in the current story:

> A skill should never become knowledge-base evidence.

Skills affect **behaviour**.

Knowledge Base content represents **knowledge/evidence**.

Therefore:

```text
Skill
  ↓
Agent behaviour

Knowledge Base
  ↓
Evidence / knowledge
```

The story explicitly states that behaviour boxes produce no knowledge and are never cited as evidence.

This boundary should remain in the architecture.

---

# 17. Phase 5 — Improve and Feedback

## Step 13 — Publish New Version

Example:

```text
spring-rest-conventions

2.3.0
   ↓
Bug discovered
   ↓
2.4.0
```

The old version remains unchanged.

```text
2.3.0 → immutable
2.4.0 → new version
```

---

# 18. Version Range Behaviour

A project can pin:

```text
spring-rest-conventions@2.3.0
```

or potentially:

```text
spring-rest-conventions@^2.3
```

With a range:

```text
^2.3
```

the resolver may eventually select:

```text
2.4
```

when the project's refresh process runs.

The story proposes using the existing `status_update` mechanism for this.

---

# 19. Skill Health

The existing KB already generates signals such as:

```text
Audit issues
Coverage failures
```

The proposed system can report these against the skills being used.

Example:

```text
Project A
  uses Skill X
  ↓
Audit results
  ↓
Skill X health signal
  ↓
SkillHub
```

The story proposes this as an **opt-in telemetry mechanism**.

---

# 20. SkillHub Health

SkillHub can aggregate:

```text
Adoption
Audit issue rate
Coverage impact
```

and display a health signal for each skill.

Conceptually:

```text
Skill
├── Adoption: 42 projects
├── Audit issue rate: Low
├── Coverage impact: High
└── Health: Good
```

The story proposes using these outcomes to drive skill curation.

---

# 21. Why SkillHub Should Be Separate From the Knowledge Base

The current story gives a strong architectural argument.

The KB is:

```text
Per-project
Token-scoped
Provenance-focused
Evidence-oriented
```

SkillHub is:

```text
Cross-project
Shared
Versioned
Reusable
Behaviour-oriented
```

Therefore:

```text
Do NOT:

SkillHub → inside Knowledge Base

Prefer:

SkillHub
   │
   │ integration seam
   ▼
Behaviour Box
   │
   ▼
Agentic SDLC
```

The story explicitly argues that putting the shared registry inside the KB would conflict with the KB's project-scoped/provenance-first design.

---

# 22. Existing vs New Components

## Existing

According to the current story:

```text
behaviour_put
setup_materialise
status_update
Manifest
.claude/skills/
.kp-state.json
Progressive disclosure
Project/token scoping
Audit signals
Coverage signals
```

## New

The main proposed additions are:

```text
SkillHub Registry
Skill publishing API
Skill catalogue/search
Skill pin support
Skill resolver
Hash/signature verification
Skill feedback channel
Skill health aggregation
```

The current build plan explicitly identifies five major pieces:

1. Registry
2. Pin by reference
3. Resolver
4. Sign & verify
5. Feedback channel

---

# 23. SkillHub Should Not Be Just a File Upload UI

This is an important product decision.

Bad framing:

```text
SkillHub
└── Upload Skill
```

Better framing:

```text
Enterprise Skill Registry

├── Discover
├── Create
├── Upload
├── Validate
├── Review
├── Publish
├── Version
├── Govern
├── Consume
├── Monitor
└── Improve
```

The existing User Story strongly supports the registry/discovery/versioning/consumption model, but the broader enterprise UI/governance model below is a **recommended extension**, not something fully specified in the current story.

---

# 24. Recommended SkillHub Web UI

## Main Navigation

```text
SkillHub
│
├── Dashboard
│
├── Skill Catalogue
│
├── My Skills
│
├── Create Skill
│
├── Review Queue
│
├── Analytics
│
└── Administration
```

---

# 25. Dashboard

Possible dashboard:

```text
Total Skills
      128

Published
      104

Draft
       16

Under Review
        8

Active Versions
      246
```

Additional information:

```text
Most Used Skills
Recently Published
Recently Updated
Skills Requiring Review
Unhealthy Skills
Deprecated Skills
```

These dashboard capabilities are **proposed product requirements**, not explicitly defined in the current User Story.

---

# 26. Skill Catalogue

The central discovery page should provide:

```text
Search
Filter
Sort
Categories
Tags
Owner
Technology
Version
Status
Health
Usage
```

Example:

```text
Search: "Spring Boot"

--------------------------------------------------
Spring REST Conventions
v2.4.0
Backend Platform Team
Health: Good
Used by: 42 projects

[View] [Pin]
--------------------------------------------------

Spring Security
v3.1.0
Security Team
Health: Excellent
Used by: 37 projects

[View] [Pin]
--------------------------------------------------
```

The current story specifically calls for catalogue search and descriptions/owner/version/health.

---

# 27. Skill Details Page

Recommended structure:

```text
Skill Name
Version
Owner
Status
Health

Tabs:

Overview
SKILL.md
Resources
Versions
Changelog
Usage
Health
Permissions
```

Example:

```text
Spring REST Conventions

Version: 2.4.0
Owner: Backend Platform
Status: Published

Description:
Company-standard REST conventions...

Tags:
Spring Boot
REST
Java
Backend

Reference:
spring-rest-conventions@^2.3
```

---

# 28. Skill Creation

Recommended flow:

```text
Create Skill
     ↓
Basic Information
     ↓
Upload SKILL.md
     ↓
Upload Resources
     ↓
Validate
     ↓
Preview
     ↓
Save Draft
     ↓
Submit for Review
```

---

# 29. Skill Validation

This is a recommended enterprise addition.

Before publishing:

```text
SKILL.md
   ↓
Parser
   ↓
Validation
   ├── Format
   ├── Metadata
   ├── Required fields
   ├── Resource references
   ├── Version
   └── Policy
```

Potential result:

```text
Validation: PASS

✓ Valid SKILL.md
✓ Valid metadata
✓ Resources valid
✓ No broken references
✓ Version valid
```

For enterprise deployment, security scanning could also be added.

This functionality is **not explicitly specified by the current User Story** and should therefore be treated as a proposed requirement.

---

# 30. Skill Approval Workflow

Recommended enterprise lifecycle:

```text
Draft
  ↓
Review
  ↓
Approved
  ↓
Published
  ↓
Deprecated
  ↓
Archived
```

Possible roles:

```text
Skill Author
Skill Reviewer
Skill Owner
Skill Administrator
Platform Administrator
```

Again, this is a recommended enterprise extension; the current story does not define a complete RBAC/approval model.

---

# 31. Recommended Enterprise Architecture

A suitable starting architecture:

```text
                         ┌─────────────────────┐
                         │   SkillHub Web UI   │
                         │                     │
                         │ React / Next.js     │
                         └──────────┬──────────┘
                                    │
                                 HTTPS
                                    │
                         ┌──────────▼──────────┐
                         │    SkillHub API     │
                         │                     │
                         │ REST API            │
                         │ Authentication      │
                         │ Authorization       │
                         │ Registry            │
                         │ Versioning          │
                         │ Publishing          │
                         │ Search              │
                         │ Governance          │
                         │ Audit               │
                         └───────┬──────┬──────┘
                                 │      │
                       ┌─────────┘      └─────────┐
                       ▼                          ▼
                ┌─────────────┐           ┌──────────────┐
                │ PostgreSQL  │           │ Object Store │
                │             │           │              │
                │ Metadata    │           │ SKILL.md     │
                │ Versions    │           │ Resources    │
                │ Users       │           │ Packages     │
                │ RBAC        │           └──────────────┘
                │ Audit       │
                └─────────────┘
```

---

# 32. Recommended Backend Architecture

For the initial enterprise implementation, a **modular monolith** is a good starting point.

```text
SkillHub Backend
│
├── Identity
├── Skills
├── Versions
├── Publishing
├── Validation
├── Search
├── Governance
├── Permissions
├── Audit
├── Analytics
└── Integration
```

This is preferable to immediately creating many microservices.

Later, high-scale modules can be extracted.

---

# 33. Suggested Technology Direction

The technology stack is not specified by the current User Story.

Therefore, the following is a **proposed architecture based on the existing engineering context**, not a requirement from the document.

Possible stack:

```text
Frontend:
React / Next.js

Backend:
ASP.NET Core Web API

Database:
PostgreSQL

Object Storage:
S3-compatible storage / MinIO / Azure Blob / AWS S3

Search:
PostgreSQL initially
→ OpenSearch/Elasticsearch if scale requires it

Authentication:
Enterprise OIDC/OAuth2

Authorization:
RBAC + project/team policies

Integration:
REST API + MCP

Deployment:
Docker
Kubernetes when required
```

---

# 34. Database Model

A conceptual model:

```text
Organization
    │
    ├── Users
    ├── Teams
    └── Skills
          │
          ▼
        Skill
          │
          ├── SkillVersion
          │      ├── version
          │      ├── content
          │      ├── checksum
          │      ├── signature
          │      ├── changelog
          │      └── status
          │
          ├── Owner
          ├── Tags
          ├── Category
          └── Permissions
```

Potential tables:

```text
organizations
users
teams
roles
skills
skill_versions
skill_resources
skill_tags
skill_categories
skill_owners
skill_permissions
skill_reviews
skill_publish_events
skill_usage
skill_health
audit_logs
```

The actual database schema is **not defined in the current story**.

---

# 35. PostgreSQL vs Object Storage

Recommended separation:

## PostgreSQL

Store metadata:

```text
Skill ID
Name
Description
Owner
Version
Status
Tags
Category
Checksum
Signature
Created By
Created At
Published At
```

## Object Storage

Store artifacts:

```text
SKILL.md
Resources
Templates
Examples
Images
Packages
```

Conceptually:

```text
PostgreSQL
     │
     │ object_key
     ▼
Object Storage
     │
     ├── SKILL.md
     ├── resources/
     ├── examples/
     └── assets/
```

This is a recommended architecture decision rather than something explicitly stated in the User Story.

---

# 36. REST API

The current story explicitly proposes:

```http
POST /skills/{id}/versions
GET  /skills?q=...
```

For a complete implementation, a possible API surface is:

```http
GET    /api/skills
POST   /api/skills

GET    /api/skills/{id}
PATCH  /api/skills/{id}

GET    /api/skills/{id}/versions
POST   /api/skills/{id}/versions

GET    /api/skills/{id}/versions/{version}

POST   /api/skills/{id}/submit
POST   /api/skills/{id}/approve
POST   /api/skills/{id}/publish

POST   /api/skills/{id}/deprecate

GET    /api/skills/{id}/health
GET    /api/skills/{id}/usage
```

These additional endpoints are **proposed**, not part of the current User Story.

---

# 37. MCP Integration

MCP should be treated as an integration mechanism between AI agents and SkillHub.

Possible MCP operations:

```text
skill_search
skill_get
skill_get_version
skill_check_update
skill_install
```

Potential administrative operations:

```text
skill_create
skill_publish
skill_deprecate
```

should be more restricted.

Recommended model:

```text
                         SkillHub
                            │
              ┌─────────────┴─────────────┐
              │                           │
          REST API                     MCP
              │                           │
              ▼                           ▼
           Web UI                  AI Agents / IDE
```

---

# 38. Why REST + MCP?

REST is appropriate for:

```text
Web UI
Enterprise applications
CI/CD
Backend services
Administration
```

MCP is appropriate for:

```text
AI agents
Agentic workflows
IDE integrations
Tool-aware LLM clients
```

Therefore:

```text
REST = System/API integration

MCP = Agent/tool integration
```

---

# 39. Agentic SDLC Integration

The integration should look like:

```text
                  SkillHub
                     │
              Skill Reference
                     │
                     ▼
              Behaviour Box
                     │
             skill-id@range
                     │
                     ▼
             setup_materialise
                     │
                     ▼
                 Resolver
                     │
              ┌──────┴──────┐
              │             │
           Resolve        Verify
           version        hash/sign
              │             │
              └──────┬──────┘
                     ▼
                  Manifest
                     │
                     ▼
              .claude/skills/
                     │
                     ▼
                   Agent
```

The current User Story describes this exact conceptual integration.

---

# 40. Important Architectural Boundary

Keep these responsibilities separate.

## SkillHub

Owns:

```text
Skill catalogue
Skill versions
Skill ownership
Skill publishing
Skill governance
Skill discovery
Skill integrity
Skill health
```

## Agentic SDLC

Owns:

```text
Project
Behaviour Box
Project skill selection
Materialisation
Local skill delivery
Agent execution context
```

## Knowledge Base

Owns:

```text
Knowledge
Evidence
Sources
Provenance
Project-scoped knowledge
```

---

# 41. Overall Architecture

```text
                         ┌───────────────────────┐
                         │       SkillHub        │
                         │                       │
                         │ Registry              │
                         │ Catalogue             │
                         │ Versioning            │
                         │ Governance            │
                         │ Search                │
                         │ Health                │
                         └───────────┬───────────┘
                                     │
                         skill-id@version/range
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   Agentic SDLC        │
                         │                       │
                         │ Behaviour Box         │
                         │ Resolver              │
                         │ Materialisation       │
                         │ Manifest              │
                         └───────────┬───────────┘
                                     │
                                     ▼
                              .claude/skills/
                                     │
                                     ▼
                                  Agent
                                     │
                                     ▼
                                   Build
                                     │
                                     ▼
                                KB Signals
                                     │
                                     ▼
                              Skill Health
                                     │
                                     └──────────→ SkillHub
```

---

# 42. Enterprise Security

Skills directly influence agent behaviour, so they should be treated as trusted software artifacts.

Recommended flow:

```text
Upload
  ↓
Validation
  ↓
Security Scan
  ↓
Policy Check
  ↓
Review
  ↓
Hash
  ↓
Sign
  ↓
Publish
```

Consumption:

```text
Request
  ↓
Authorization
  ↓
Download
  ↓
Signature Verification
  ↓
Checksum Verification
  ↓
Version Validation
  ↓
Materialisation
```

The hash/signature portion is directly supported by the current User Story.

The security scanning/policy steps are recommended enterprise extensions.

---

# 43. Versioning Strategy

Use immutable versions.

Example:

```text
Skill:
spring-rest-conventions

Versions:
1.0.0
1.1.0
1.2.0
2.0.0
2.1.0
```

Never modify:

```text
2.1.0
```

Instead publish:

```text
2.1.1
```

Potential semantic versioning model:

```text
MAJOR.MINOR.PATCH

MAJOR
Breaking change

MINOR
Backward-compatible capability

PATCH
Bug/security/documentation fix
```

The current User Story establishes immutable versions but does not define the complete semantic-versioning policy.

---

# 44. Skill Reference Model

The project should store a reference:

```text
skill-id@range
```

Examples:

```text
spring-rest@^2.3
java-coding@2.1.0
postgresql-best-practices@^1.5
react-ui@~3.2
```

The resolver converts:

```text
^2.3
```

into:

```text
2.4.1
```

or another valid concrete version according to the version-resolution policy.

The exact version resolution algorithm should be formally specified before implementation.

---

# 45. Skill States

Recommended:

```text
DRAFT
REVIEW
APPROVED
PUBLISHED
DEPRECATED
ARCHIVED
```

Possible version states:

```text
DRAFT
PUBLISHED
DEPRECATED
REVOKED
```

The current story explicitly defines immutable published versions but does not define a complete state machine.

---

# 46. RBAC

For enterprise use, consider:

```text
Platform Admin
    │
    ├── Full SkillHub administration
    │
SkillHub Admin
    │
    ├── Catalogue management
    ├── Governance
    │
Skill Owner
    │
    ├── Create
    ├── Update
    ├── Publish
    │
Reviewer
    │
    ├── Review
    └── Approve
    │
Developer
    │
    ├── Discover
    ├── View
    └── Consume
```

This is a recommended extension.

---

# 47. Multi-Tenancy / Organization Model

For a 500+ employee enterprise, a possible model:

```text
Organization
│
├── Global Skills
│
├── Departments
│   ├── Engineering
│   ├── QA
│   ├── Data
│   └── Security
│
└── Teams
    ├── Backend
    ├── Frontend
    ├── AI
    └── DevOps
```

Skill visibility could become:

```text
GLOBAL
DEPARTMENT
TEAM
PRIVATE
```

Again, this is an enterprise design recommendation rather than an explicit requirement in the current story.

---

# 48. Search Architecture

Initial version:

```text
PostgreSQL
   ↓
Full-text search
```

As the system grows:

```text
SkillHub
   │
   ├── PostgreSQL
   │
   └── OpenSearch
```

Search fields:

```text
Name
Description
Tags
Technology
Framework
Category
Owner
Version
```

Potential future semantic search:

```text
User:
"I need a skill for Spring REST API development"

        ↓

Embedding / semantic search

        ↓

Relevant Skills
```

Semantic search is a future enhancement and is not specified by the current User Story.

---

# 49. Auditability

Recommended audit events:

```text
SkillCreated
SkillUpdated
SkillSubmitted
SkillApproved
SkillPublished
SkillDownloaded
SkillPinned
SkillDeprecated
SkillArchived
PermissionChanged
VersionCreated
```

Example:

```text
2026-08-21
User: developer01
Action: Published
Skill: spring-rest
Version: 2.4.0
```

This is particularly useful for enterprise governance.

---

# 50. Observability

Recommended metrics:

```text
Skill downloads
Skill adoption
API latency
Search latency
Resolver failures
Materialisation failures
Signature verification failures
Publishing failures
```

Potential dashboards:

```text
SkillHub Health
API Health
Registry Health
Integration Health
```

These operational requirements are not specified in the current story and should be added to the technical specification.

---

# 51. Scalability Strategy

Start simple:

```text
Web UI
   ↓
API
   ↓
PostgreSQL
   +
Object Storage
```

Then scale:

```text
                    Load Balancer
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
            API 1      API 2      API 3
              │          │          │
              └──────────┼──────────┘
                         │
                    PostgreSQL
                         │
                    Object Store
```

The API should ideally remain stateless.

---

# 52. Caching

Skills are versioned and immutable.

That makes them excellent candidates for caching.

Example:

```text
Skill v2.4.0
    ↓
Immutable
    ↓
Cache safely
```

Potential cache:

```text
Redis
```

or HTTP/CDN caching for public/internal artifact delivery.

This is a proposed optimization, not part of the current User Story.

---

# 53. Why Immutable Versions Help Scalability

Suppose:

```text
Skill A v2.4.0
```

is downloaded 10,000 times.

Because it never changes:

```text
Cache
CDN
Object Storage
Local Agent Cache
```

can safely reuse the same artifact.

This is one of the strongest reasons to keep versions immutable.

---

# 54. Recommended MVP

Don't implement everything at once.

## MVP Phase 1

Build:

```text
SkillHub Web UI
       ↓
SkillHub API
       ↓
PostgreSQL
       +
Object Storage
```

Features:

```text
Create Skill
Upload SKILL.md
Upload resources
View Skills
Search Skills
Create Version
Publish Version
View Changelog
```

---

# 55. MVP Phase 2 — Agentic SDLC Integration

Add:

```text
Skill Pin
      ↓
Behaviour Box
      ↓
Resolver
      ↓
SkillHub
      ↓
Manifest
      ↓
.claude/skills/
```

Implement:

```text
GET Skill
Resolve Version
Download Artifact
Hash Verification
Materialisation
```

This corresponds closely to the current User Story's core integration path.

---

# 56. Phase 3 — Enterprise Governance

Add:

```text
RBAC
Approval Workflow
Audit Logs
Organization/Team
Skill Ownership
Deprecation
Security Policies
```

---

# 57. Phase 4 — Health & Analytics

Add:

```text
Skill Adoption
Usage
Audit Signals
Coverage Signals
Health
Recommendations
```

This follows the feedback loop proposed by the current story.

---

# 58. Phase 5 — Advanced Agent Integration

Add:

```text
MCP Server
IDE integrations
AI agent discovery
Agent-based skill recommendation
Semantic search
Automated skill quality analysis
```

These are future capabilities, not requirements established by the current User Story.

---

# 59. What Should Be Reused From Agentic SDLC?

Do **not** rebuild:

```text
Skill materialisation
Manifest mechanism
.claude/skills/
Project behaviour mechanism
Local change protection
Progressive disclosure
Existing setup pipeline
Existing status refresh mechanism
```

The current story explicitly says these mechanisms should remain as-is.

Instead, add:

```text
SkillHub Registry
      ↓
Resolver
      ↓
Existing Materialisation Pipeline
```

---

# 60. What Should SkillHub Own?

SkillHub should own:

```text
Skill identity
Skill metadata
Skill versions
Skill artifacts
Skill ownership
Skill visibility
Skill lifecycle
Skill approval
Skill publishing
Skill integrity
Skill discovery
Skill health
```

---

# 61. What Should Agentic SDLC Own?

Agentic SDLC should own:

```text
Project
Project behaviour
Selected skills
Skill pins
Project-specific configuration
Materialisation
Local environment
Agent execution
```

---

# 62. What Should the Knowledge Base Own?

KB should continue to own:

```text
Project knowledge
Documents
Knowledge nodes
Evidence
Sources
Provenance
Citations
Audit/coverage signals
```

The key rule remains:

```text
Skill ≠ Evidence
```

---

# 63. Complete Conceptual Architecture

```text
                         ┌─────────────────────────┐
                         │      SkillHub Web UI    │
                         │                         │
                         │ Dashboard               │
                         │ Catalogue               │
                         │ Skill Details           │
                         │ Upload/Create           │
                         │ Versions                │
                         │ Review                  │
                         │ Administration          │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      SkillHub API       │
                         │                         │
                         │ Skills                  │
                         │ Versions                │
                         │ Publishing              │
                         │ Search                  │
                         │ Governance              │
                         │ RBAC                    │
                         │ Audit                   │
                         │ Health                  │
                         └───────┬────────┬────────┘
                                 │        │
                    ┌────────────┘        └─────────────┐
                    ▼                                   ▼
             ┌─────────────┐                    ┌──────────────┐
             │ PostgreSQL  │                    │ Object Store │
             │             │                    │              │
             │ Metadata    │                    │ SKILL.md     │
             │ Versions    │                    │ Resources    │
             │ Users       │                    │ Packages     │
             │ RBAC        │                    └──────────────┘
             │ Audit       │
             └─────────────┘


                              INTEGRATION

                         ┌─────────────────────┐
                         │      MCP Server     │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         AI Agents / IDEs


                         ┌─────────────────────┐
                         │    Agentic SDLC     │
                         │                     │
                         │ Behaviour Box       │
                         │        │            │
                         │        ▼            │
                         │ Skill Pin            │
                         │        │            │
                         │        ▼            │
                         │ Resolver             │
                         │        │            │
                         │        ▼            │
                         │ Verification         │
                         │        │            │
                         │        ▼            │
                         │ Manifest             │
                         │        │            │
                         │        ▼            │
                         │ .claude/skills/      │
                         └─────────┬───────────┘
                                   │
                                   ▼
                                  Agent
                                   │
                                   ▼
                                 Build
                                   │
                                   ▼
                             KB / Health
                                   │
                                   ▼
                              SkillHub
```

---

# 64. Key Architectural Principles

## Principle 1 — Author Once, Reuse Everywhere

```text
One Skill
   ↓
Many Projects
```

---

## Principle 2 — Immutable Versions

```text
Published version
      ↓
Never modified
```

---

## Principle 3 — Pin by Reference

```text
Project
   ↓
skill-id@version/range
```

not:

```text
Project
   ↓
Copied Skill
```

---

## Principle 4 — SkillHub Is Not KB

```text
SkillHub → reusable behaviour

KB → project knowledge/evidence
```

---

## Principle 5 — Existing Delivery Pipe Should Be Reused

```text
SkillHub
   ↓
Resolver
   ↓
Existing materialisation pipeline
```

---

## Principle 6 — Trust Before Materialisation

```text
Resolve
 ↓
Verify
 ↓
Materialise
```

---

## Principle 7 — Separate Web/API and Agent Interfaces

```text
Web UI
 ↓
REST API

AI Agent
 ↓
MCP
```

---

## Principle 8 — Enterprise Governance

Skills should have:

```text
Owner
Version
Status
Permissions
Audit
Integrity
Lifecycle
```

---

# 65. Current User Story vs Proposed Enterprise Product

| Area              | Current User Story | Recommended SkillHub |
| ----------------- | ------------------ | -------------------- |
| Skill format      | Defined            | Keep                 |
| SKILL.md          | Defined            | Keep                 |
| Resources         | Defined            | Keep                 |
| Registry          | Proposed           | Build                |
| Versioning        | Defined            | Build                |
| Search            | Proposed           | Build                |
| Pinning           | Proposed           | Integrate            |
| Resolver          | Proposed           | Build                |
| Materialisation   | Existing           | Reuse                |
| Hash              | Proposed           | Build                |
| Signature         | Proposed           | Build                |
| Web UI            | Mostly undefined   | Design               |
| Dashboard         | Not defined        | Add                  |
| RBAC              | Not defined        | Add                  |
| Approval          | Not defined        | Add                  |
| Audit             | Not fully defined  | Add                  |
| Security scanning | Not defined        | Consider             |
| Multi-tenancy     | Not defined        | Consider             |
| Object storage    | Not defined        | Recommended          |
| Search engine     | Not defined        | Decide               |
| MCP               | Existing/mentioned | Extend               |
| REST API          | Partially defined  | Complete             |
| Health            | Proposed           | Build                |
| Analytics         | Partially proposed | Extend               |
| CI/CD             | Not defined        | Add later            |
| HA/DR             | Not defined        | Enterprise NFR       |
| Observability     | Not defined        | Add                  |

---

# 66. The Most Important Insight

The current story should **not be interpreted as:**

```text
"Build a website where users upload SKILL.md."
```

It should be interpreted as:

```text
"Build a centralized enterprise registry that allows
skills to be authored once, versioned, trusted,
discovered, pinned by projects, resolved through the
existing Agentic SDLC delivery pipeline, and improved
through real-world feedback."
```

The source itself summarizes the intended build as:

```text
Registry
+
Pin
+
Resolver
+
Sign/Verify
+
Feedback
```

---

# 67. Recommended Final Product Definition

## SkillHub

**SkillHub is an enterprise platform for centrally authoring, managing, versioning, discovering, governing, and distributing reusable AI-agent skills across projects and teams.**

Its primary responsibilities are:

```text
Author
   ↓
Validate
   ↓
Review
   ↓
Publish
   ↓
Version
   ↓
Discover
   ↓
Pin
   ↓
Resolve
   ↓
Verify
   ↓
Distribute
   ↓
Measure
   ↓
Improve
```

Its relationship with Agentic SDLC is:

```text
SkillHub
    │
    │ Shared Skill Registry
    ▼
Agentic SDLC
    │
    │ Project-specific Skill Selection
    ▼
Behaviour Box
    │
    │ Resolution
    ▼
Materialisation
    │
    ▼
Agent Environment
```

---

# 68. Suggested Next-Level Specification Structure

When converting this into the actual project specification, use:

```text
01. Product Vision
02. Problem Statement
03. Goals & Non-Goals
04. Personas
05. User Stories
06. Functional Requirements
07. Skill Lifecycle
08. Skill Versioning
09. Skill Registry
10. Skill Discovery
11. Skill Governance
12. RBAC
13. Web UI Requirements
14. REST API Specification
15. MCP Specification
16. Agentic SDLC Integration
17. Database Design
18. Object Storage Design
19. Search Architecture
20. Security Architecture
21. Audit & Compliance
22. Health & Analytics
23. Scalability
24. Availability
25. Observability
26. Deployment Architecture
27. CI/CD
28. Disaster Recovery
29. MVP Scope
30. Enterprise Roadmap
```

This would turn the current conceptual User Story into a **proper implementation-ready SkillHub system specification**.

---

# 69. Final Architecture in One Diagram

```text
                              ┌──────────────────────┐
                              │      USERS           │
                              │                      │
                              │ Authors              │
                              │ Reviewers            │
                              │ Developers           │
                              │ Administrators       │
                              └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │   SkillHub Web UI    │
                              └──────────┬───────────┘
                                         │
                                         ▼
                              ┌──────────────────────┐
                              │    SkillHub API      │
                              ├──────────────────────┤
                              │ Registry             │
                              │ Versioning           │
                              │ Publishing           │
                              │ Validation           │
                              │ Search               │
                              │ Governance           │
                              │ RBAC                 │
                              │ Audit                │
                              │ Health               │
                              └───────┬───────┬──────┘
                                      │       │
                       ┌──────────────┘       └──────────────┐
                       ▼                                     ▼
                ┌─────────────┐                      ┌──────────────┐
                │ PostgreSQL  │                      │ Object Store │
                └─────────────┘                      └──────────────┘
                       │                                     │
                       └────────────────┬────────────────────┘
                                        │
                              ┌─────────▼─────────┐
                              │   Skill Registry  │
                              └─────────┬─────────┘
                                        │
                               skill-id@version
                                        │
                         ┌──────────────┴──────────────┐
                         │                             │
                         ▼                             ▼
                 ┌──────────────┐             ┌──────────────┐
                 │ MCP Server   │             │ REST Clients │
                 └──────┬───────┘             └──────────────┘
                        │
                        ▼
                 ┌────────────────────────────────┐
                 │         Agentic SDLC           │
                 │                                │
                 │       Behaviour Box             │
                 │             │                  │
                 │             ▼                  │
                 │      Skill Reference           │
                 │             │                  │
                 │             ▼                  │
                 │         Resolver               │
                 │             │                  │
                 │             ▼                  │
                 │     Hash/Signature Verify      │
                 │             │                  │
                 │             ▼                  │
                 │        Manifest                │
                 │             │                  │
                 │             ▼                  │
                 │      .claude/skills/           │
                 │             │                  │
                 └─────────────┼──────────────────┘
                               │
                               ▼
                             AGENT
                               │
                               ▼
                             BUILD
                               │
                               ▼
                        Quality / Audit
                               │
                               ▼
                         Skill Health
                               │
                               └──────────────→ SkillHub
```

---

## Bottom Line

The existing User Story gives you a **strong foundation for the SkillHub integration model**, especially the idea of:

**Registry → Pin → Resolve → Verify → Materialise → Build → Feedback.**

What it does **not yet give you** is the complete standalone enterprise product specification: Web UI, RBAC, governance, database schema, complete API contracts, security policies, deployment, observability, HA/DR, and detailed NFRs.

So the best next step is to **keep the existing lifecycle/integration story intact**, then create a second layer of requirements around it for the standalone SkillHub product.

Which should I turn this into next: **(A) full SRS/FRD**, **(B) detailed architecture + ERD + API design**, or **(C) UI/UX screens + user flows**?
