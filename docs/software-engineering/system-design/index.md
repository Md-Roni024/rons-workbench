---
title: System Design
description: Designing for scale, failure and change.
domain: Software Engineering
category: System Design
order: 3
status: learning
created: 2026-08-19
updated: 2026-08-19
---

# System Design

> This section is new.

Notes on designing systems that survive load, partial failure and changing
requirements.

## Planned notes

- Caching strategies and invalidation
- Queues, and what backpressure really means
- Idempotency
- Consistency models
- Rate limiting
- Observability: logs, metrics, traces

## Framing I want to keep

Every system design question eventually reduces to a trade-off between
latency, consistency, cost and operational complexity. Notes here should name
which one is being traded away.
