---
title: User Story
description: 
domain: Projects
category: SkillHub
order: 4
tags:
  - 
status: learning
created: 2026-08-20
updated: 2026-08-20
---

# Skills, authored once — used by every project, every developer

> User story 05 · a standalone SkillHub · the case for building it

A skill is the reusable know-how that shapes how the agent builds: the Spring Boot REST conventions, the Jetpack Compose screen pattern, the PowerBuilder-extraction recipe, the way we open a Jira ticket or push to git. Today each project keeps its own private copy in its behaviour box — so the same skill gets re-authored, drifts, and improvements never travel. A **standalone SkillHub** fixes that: a versioned registry of skills that plugs into the knowledge platform through a pipe the platform already has. This is the case for building it, and the plan for what to build.

**Scenario facts**

- A skill: **SKILL.md + resources**
- Lives in: **a shared hub, not a per-project silo**
- Reuse: **author once, pin anywhere**
- Distribution: **the setup pipe we already built**
- Trust: **signed, pinned, never evidence**

**Capability maturity summary**

| Steps in this story | Live today | Partial · needs work | To build |
| --- | --- | --- | --- |
| 16 | 7 | 2 | 7 |

Filter by **Maturity** to separate the pipe that already runs from the hub we'd build — e.g. show only **To build**. The case for a standalone hub is in [Why a SkillHub](#why-a-standalone-skillhub--and-why-it-belongs-beside-the-kb-not-inside-it); the build plan is in [What to build](#what-to-build--five-pieces-in-order).

**Contents (phases)**

1. Author & publish
2. Discover & pin
3. Materialise
4. Build with it
5. Improve & feed back
- ★ Why a SkillHub
- ⚙ What to build
- ↦ Flow map

## Phase 1 · 01 Author & publish

A skill is written once — in the exact SKILL.md shape Claude Code already loads — and published to the hub as an immutable, versioned, signed unit. The authoring surface exists today; the registry it publishes to is the new piece.

### Step 1 — Author a skill in the SKILL.md format

- **Actor:** Lead / author · **Maturity:** LIVE TODAY · **Surface:** MCP · `behaviour_put`
- **What happens:** The lead writes a skill — say spring-rest-conventions — as a SKILL.md with a name and description plus any bundled resources. Progressive disclosure is native: the description is always visible to the agent, the body loads only when the skill is actually invoked. This is exactly what behaviour_put authors today, lead-only, because behaviour shapes every run.
- **Mechanism:**
  - MCP: `behaviour_put('skills/spring-rest-conventions/SKILL.md', ...)`
  - FILE: `.claude/skills/<name>/SKILL.md` — Claude Code native home (Q7)
- **Produces:** A skill authored in the format the agent already understands.
- **Refs:** REQ-3.9, Q7

### Step 2 — Publish it to the hub as a versioned unit

- **Actor:** SkillHub · **Maturity:** TO BUILD · **Surface:** proposed · registry
- **What happens:** Instead of living only in one project's behaviour box, the skill is published to the standalone SkillHub: an id, a semver version, the SKILL.md and its resources, an owner, and a changelog. A published version is immutable — a later fix becomes a new version, so nothing a project pinned can change under it.
- **Mechanism:**
  - NEW: `POST /skills/{id}/versions` → immutable version
  - NEW: registry stores id · version · body · resources · owner · changelog
- **Change needed:** Build the standalone registry service and its publish API. This is the core new component.
- **Produces:** A reusable skill, addressable as `id@version` across every project.
- **Refs:** REQ-3.9, REQ-3.13

### Step 3 — Sign and hash the published version

- **Actor:** SkillHub · **Maturity:** TO BUILD · **Surface:** proposed · trust anchor
- **What happens:** On publish, the hub hashes and signs the version. Because a skill shapes every build the agent does, it needs a trust anchor the way a knowledge node needs a source — this is the behaviour-side echo of the region-hash provenance the KB already uses. A skill that can't be verified later won't be materialised.
- **Mechanism:**
  - NEW: hash + sign each version at publish
- **Change needed:** Add per-version hashing and signing at publish time.
- **Produces:** A version whose integrity can be checked wherever it's used.
- **Refs:** REQ-3.2, REQ-4.6

## Phase 2 · 02 Discover & pin

A lead starting or running a project finds the skills the stack needs and pins them into the project's behaviour box by reference — not by copying. The behaviour box stays the single place a project declares its skills; what changes is that an entry can now be a pin.

### Step 4 — Discover skills for the stack

- **Actor:** Lead / author · **Maturity:** TO BUILD · **Surface:** proposed · catalogue
- **What happens:** The lead searches the hub — "Compose screens", "Spring Boot REST", "PowerBuilder extraction", "Jira ticket flow" — and reads each skill's description, owner, and changelog before adopting it. This is the discovery that simply does not exist when every skill hides in a separate project.
- **Mechanism:**
  - NEW: `GET /skills?q=...` → catalogue with descriptions + health
- **Change needed:** Build search/browse over the registry, surfacing description, owner, version, and health.
- **Produces:** A shortlist of vetted skills to adopt, chosen deliberately.
- **Refs:** REQ-3.9

### Step 5 — Pin skill-id@range into the behaviour box

- **Actor:** Lead / author · **Maturity:** TO BUILD · **Surface:** proposed · `behaviour_put` (pin form)
- **What happens:** The lead pins the chosen skills into the project's behaviour box by reference — `spring-rest-conventions@^2.3` — rather than pasting a copy. The behaviour box remains the project's declaration of what shapes its builds; a pin is just a reference-shaped entry in it.
- **Mechanism:**
  - NEW: `behaviour_put` pin form → `skills/<name>.pin = 'id@range'`
  - MCP: lead-only, exactly as behaviour authoring is today
- **Change needed:** Extend `behaviour_put` and the behaviour box to accept a pin (`id@range`) alongside inline skills.
- **Produces:** A project that declares its skills by reference to the hub.
- **Refs:** REQ-3.10, REQ-9.5

### Step 6 — Skills stay scoped to this project, by token

- **Actor:** KB server · **Maturity:** LIVE TODAY · **Surface:** scoping unchanged
- **What happens:** Pins live in the project's behaviour box, and the behaviour box is resolved from the bearer token like everything else — one project, one set of pinned skills. The hub is shared, but a project only ever sees the skills it pinned. No cross-project bleed, no project passed as an argument.
- **Mechanism:**
  - MCP: behaviour box resolved from token (REQ-17.3)
- **Produces:** Shared skills, per-project selection — no scoping compromise.
- **Refs:** REQ-17.3, REQ-16.2

## Phase 3 · 03 Materialise to the workstation

The developer connects and runs setup. The server resolves the pinned skills from the hub, verifies them, and folds them into the same manifest it already builds — which the agent writes into `.claude/skills/`. This is the pipe that already runs; only the source of the skill is new.

### Step 7 — Run setup on connect

- **Actor:** Developer · **Maturity:** LIVE TODAY · **Surface:** MCP · `setup_materialise`
- **What happens:** A junior developer joins the project and runs setup. Today this returns a manifest — CLAUDE.md, AGENTS.md, and every skill in the behaviour box — with hashes and apply instructions, and the agent writes them locally. On Claude Code it's a SessionStart hook; on other clients it's the mandated first action.
- **Mechanism:**
  - MCP: `setup_materialise()` → manifest `{files, hashes, apply}`
  - FILE: skills written under `.claude/skills/<name>/`
- **Produces:** A workstation prepared from the project's declared skills.
- **Refs:** REQ-17.4, REQ-17.5

### Step 8 — Resolve pinned refs from the hub

- **Actor:** KB server · **Maturity:** PARTIAL · **Surface:** proposed · resolver in materialise
- **What happens:** For each pinned skill, the server resolves the range to a concrete version, fetches it from the hub, verifies its signature and hash, and drops the SKILL.md and resources into the same manifest slot inline skills use. Materialise already builds the manifest and bundles skills — the new work is resolving a ref and checking it before it goes in.
- **Mechanism:**
  - NEW: resolve `id@range` → concrete version from hub
  - NEW: verify hash/signature before adding to manifest
  - MCP: reuses the existing manifest + apply path
- **Change needed:** Teach `setup_materialise` to resolve+verify pinned refs and inline the result into the manifest it already produces.
- **Produces:** Hub skills delivered through the existing materialise path.
- **Refs:** REQ-17.5, REQ-3.14

### Step 9 — Hand edits survive; nothing is silently overwritten

- **Actor:** Developer · **Maturity:** LIVE TODAY · **Surface:** file · `.kp-state.json`
- **What happens:** The manifest's apply rule is unchanged: before overwriting any file whose current content doesn't match the hash recorded in `.kp-state.json`, the agent stops and surfaces the conflict. A developer who tweaked a skill locally keeps that edit until a human resolves it — pinning from the hub doesn't trample local work.
- **Mechanism:**
  - FILE: `.kp-state.json {project, kb_version, hashes}`
  - FILE: hash mismatch → surface conflict, never silent overwrite
- **Produces:** Skill delivery that respects local changes.
- **Refs:** REQ-17.9, REQ-13.2

## Phase 4 · 04 Build with the skill

With skills materialised, the developer's agent builds the way the org intends — consistently, across every developer and every project pinned to the same skill. Skills inform how it builds; instructions constrain what it produces.

### Step 10 — The agent loads the skill on demand

- **Actor:** Developer · **Maturity:** LIVE TODAY · **Surface:** file · progressive disclosure
- **What happens:** Implementing a new endpoint, the agent sees spring-rest-conventions by its description and loads the body only when it's relevant — progressive disclosure keeps the context lean. The result is code that follows the house pattern without the developer re-explaining it every time.
- **Mechanism:**
  - FILE: `.claude/skills/spring-rest-conventions/SKILL.md`
  - FILE: description always visible · body loaded when invoked
- **Produces:** Conventionally-correct output, without per-developer drift.
- **Refs:** REQ-9.5, Q7

### Step 11 — Skills inform; instructions constrain

- **Actor:** Developer · **Maturity:** LIVE TODAY · **Surface:** the division of labour
- **What happens:** A skill shapes how the agent builds for the target stack; the project's instructions constrain what it may produce — global procedures load every run, scoped rules only when the agent touches their target. The two compose: the skill knows the Spring Boot idiom, the instruction knows this project's rule for it.
- **Mechanism:**
  - FILE: skills (§3.9) inform how · instructions (§3.10) constrain what
  - FILE: scoped rules load only on their target (REQ-3.11)
- **Produces:** Output that is both idiomatic and within the project's rules.
- **Refs:** REQ-9.5, REQ-3.11

### Step 12 — A skill never becomes evidence

- **Actor:** Developer · **Maturity:** LIVE TODAY · **Surface:** the load-bearing boundary
- **What happens:** However much a skill shapes the build, it produces no knowledge nodes and is never cited as a source — behaviour boxes yield no evidence, by design. This is what lets skills be reused freely from a shared hub: they change how work is done, never what the knowledge base claims is true.
- **Mechanism:**
  - MCP: behaviour boxes produce no knowledge, never cited (REQ-3.2)
- **Produces:** Reusable behaviour that can't contaminate the provenance chain.
- **Refs:** REQ-3.2, REQ-3.9

## Phase 5 · 05 Improve upstream, and let the KB feed the hub

A skill improves once and the improvement reaches everyone; and because the KB already measures build quality, it can tell the hub which skills are working. This closing loop is what makes a shared hub better than shared copies.

### Step 13 — Fix once, publish a new version

- **Actor:** Lead / author · **Maturity:** TO BUILD · **Surface:** proposed · new version
- **What happens:** Someone finds a flaw in spring-rest-conventions and fixes it. Instead of patching one project, they publish 2.4 to the hub. The old version stays immutable for anyone pinned to it; the fix is available to everyone who wants it.
- **Mechanism:**
  - NEW: publish 2.4 (immutable); 2.3 unchanged
- **Change needed:** Registry versioning + changelog (the publish path from phase 1).
- **Produces:** An improvement that exists once, not once per project.
- **Refs:** REQ-3.13

### Step 14 — It flows downstream on the next status_update

- **Actor:** KB server · **Maturity:** PARTIAL · **Surface:** MCP · `status_update`
- **What happens:** Every project pinned to `^2.3` picks up 2.4 the next time a developer connects — status_update already does a one-integer version check and brings the local environment current, refreshing changed skills automatically. The distribution of the fix costs nothing new to build; it rides the refresh that already runs on connect.
- **Mechanism:**
  - MCP: `status_update` detects newer resolved version → refresh
  - FILE: changed skill rewritten under `.claude/skills/`, hand edits respected
- **Change needed:** Resolver re-runs inside `status_update` to spot a newer resolved version (same resolver as phase 3).
- **Produces:** One fix, delivered to every project that pinned the range.
- **Refs:** REQ-17.7, REQ-17.8

### Step 15 — The KB reports skill health back to the hub

- **Actor:** KB server · **Maturity:** TO BUILD · **Surface:** proposed · feedback channel
- **What happens:** The KB already knows which skills a project uses and already runs audits and coverage checks — and coverage/precision failures are explicitly diagnostic of which skills need work. An opt-in report sends that signal to the hub: this skill correlates with clean audits, that one with recurring issues.
- **Mechanism:**
  - NEW: opt-in report: pinned skills × audit issues × coverage failures
  - MCP: `audit_run` / coverage already produce the signal (REQ-20.4)
- **Change needed:** Add an opt-in per-project telemetry report keyed by pinned skill.
- **Produces:** Real-outcome signal about each skill, sent to the hub.
- **Refs:** REQ-20.4, REQ-10.4

### Step 16 — The hub turns outcomes into curation

- **Actor:** SkillHub · **Maturity:** TO BUILD · **Surface:** proposed · skill health
- **What happens:** The hub aggregates reports across projects into per-skill health — adoption, audit-issue rate, coverage impact — surfaced right next to the skill in the catalogue. Curation stops being a matter of taste and becomes evidence-led: the skills that demonstrably produce clean builds rise; the ones that don't get flagged for work.
- **Mechanism:**
  - NEW: aggregate reports → per-skill health on the catalogue
- **Change needed:** Aggregate feedback into health metrics shown in discovery (phase 2).
- **Produces:** A registry whose curation is driven by what actually ships well.
- **Refs:** REQ-20.4

## Why a standalone SkillHub — and why it belongs beside the KB, not inside it

> The case

Skills already work per project: the behaviour box holds them, setup writes them to `.claude/skills/`, and status_update keeps them fresh. The gap is not the mechanism — it's that skills are **trapped in one project**. The same recipe is re-authored again and again, drifts between teams, and a fix on one project never reaches the others. A shared hub solves reuse; keeping it **standalone** keeps the KB's per-project, provenance-first design intact.

### Skills siloed in each project

- **Re-authored every project.** The Spring Boot conventions written for the travel app get hand-copied — or reinvented — for the next backend.
- **Silent drift.** Two projects' copies of "the same" skill diverge; nobody knows which is current or correct.
- **Fixes don't travel.** A better PowerBuilder-extraction recipe improves exactly one project. Everyone else keeps the old one.
- **No discovery.** There is no way to answer "what skills do we already have for Compose?" across the org.
- **No curation or trust anchor.** A behaviour box trusts whatever is dropped in it, yet a skill shapes every build — an unvetted one is a liability.
- **The KB's signal is wasted.** Audits and coverage failures already show which skills correlate with problems — but that evidence dies inside the project.

### A shared hub over the pipe we have

- **Author once, pin anywhere.** A skill is published to the hub and pinned into any project's behaviour box by `id@version`.
- **Versioned, so improvements flow.** Publish `2.4`; every project on `^2.3` picks it up on the next status_update — the refresh path is already built.
- **Discoverable.** One catalogue, searchable, with descriptions, owners, and changelogs.
- **Curated and signed.** A hub skill is reviewed and hashed, giving the "behaviour is never evidence" rule an actual trust anchor.
- **Standalone by design.** The hub is cross-project; the KB is deliberately per-project and token-scoped. They meet only at the two seams that already exist.
- **Closes the loop.** KB telemetry — audit issues, coverage failures — flows back to the hub as skill health, so curation is driven by real outcomes.

### The reframe: the distribution pipe is already built — the hub is a registry on the far end of it

The platform already resolves a project's skills, bundles them into a manifest, writes them into `.claude/skills/` on connect, and refreshes the changed ones every session — that is `setup_materialise` and `status_update` working today. The only thing missing is **where the skills come from**: a local copy in one behaviour box, versus a pinned reference into a shared, versioned registry. So the SkillHub is not a second knowledge base to build and operate — it is a **package registry plus a resolver** bolted onto a delivery mechanism that already runs in production.

### Why not just make the KB hold shared skills? Because the KB is per-project and provenance-bound — a registry is neither

Every KB tool is scoped to one project by the bearer token, on purpose (a poisoned source can't redirect a call because the project isn't an argument). A shared skill registry is the opposite shape: cross-project, no provenance chain, no per-project isolation. Cramming it inside the KB would break the scoping the whole platform depends on — the same wrong-store-for-the-job error the chat story rejected. Keep the KB provenance-first and per-project; keep the hub shared and versioned; let them integrate at the behaviour-box seam.

## What to build — five pieces, in order

> The build plan

Small, sequenced, and each usable on its own. The hard delivery problem is already solved; what's left is a registry, a pin, a resolver, a trust check, and a feedback channel.

### 1 · The registry

A standalone service storing skills as `id`, semver `version`, `SKILL.md` body, bundled resources, owner, and changelog. A published version is immutable; a new fix is a new version. Browse and search over descriptions.

### 2 · Pin by reference

Extend the behaviour box so a skill can be a `skill-id@range` pin instead of an inline copy. `behaviour_put` gains a "pin" form; the lead's authoring stays exactly where it is.

### 3 · The resolver

Teach `setup_materialise` to resolve pinned refs from the hub, resolve the range to a concrete version, and drop the skill into the same manifest it already builds. `status_update` then detects a newer resolved version like any other change.

### 4 · Sign & verify

Each published version is hashed and signed at the hub; the resolver verifies the hash on the way into the manifest — mirroring the region-hash idea already used for source provenance. A tampered or swapped skill is refused at the door.

### 5 · The feedback channel

A small, opt-in report from each KB back to the hub: which skills a project pins, and how they correlate with audit issues and coverage failures (REQ-20.4). The hub turns that into per-skill health, so curation follows real outcomes.

### Kept as-is

The `SKILL.md` format, progressive disclosure, the manifest, hand-edit protection via `.kp-state.json`, and the "behaviour never becomes evidence" rule — none of it changes. The hub feeds the pipe; it doesn't replace it.

## Navigable flow map

> The lifecycle of a skill

A skill is authored and published to the hub (versioned, signed), pinned into a project's behaviour box by reference, resolved and materialised into the developer's `.claude/skills/`, and used to build. The KB's audit and coverage signals loop back to the hub as skill health, which drives the next version.

**Skill delivery path:**

1. **Author skill** (SKILL.md · lead) — Phase 1
2. → *publish* → **SkillHub** (version · sign · to build) — Phase 1
3. → *pin ref* → **Pin in behaviour box** (`skill-id@range`) — Phase 2
4. → *resolve* → **Resolve + manifest** (setup pipe · live) — Phase 3
5. → *materialise → `.claude/skills/`* → **Build with it** (`.claude/skills/` · live) — Phase 4

**Health feedback loop:** Build with it / KB → *KB health → next version* → SkillHub

Legend: solid arrows = skill delivery · dashed arrows = health feedback · highlighted boxes (SkillHub, Pin in behaviour box) = to build.

---

Grounded in `platform/` — `idea.md` §3.2 (behaviour boxes), §9.5, §17.4–17.7 (setup / status_update), Q7 (native skill homes) · `devmode.py` (manifest + skills materialise).

Skills · reuse · a registry over the pipe we have





