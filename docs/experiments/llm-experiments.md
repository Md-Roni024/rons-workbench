---
title: LLM Experiments
description: Smaller one-off tests that did not warrant their own page.
domain: Experiments
category: LLM
order: 4
tags:
  - llm
  - prompting
  - evaluation
status: practiced
created: 2026-08-19
updated: 2026-08-19
---

# LLM Experiments

> Personal experiment log. A running list of small tests. Anything that grows
> past a few paragraphs gets its own page.

## Goal

Build intuition through small, cheap tests rather than reading about
behaviour second-hand.

## Environment

Mostly [OpenRouter](/tools/openrouter) so the same prompt can be sent to
several models without changing code, plus
[LM Studio](/tools/lm-studio) when the test needs to be free to repeat.

---

## Test 1 — Does temperature matter for extraction?

**What I tried.** The same structured-extraction prompt at temperature 0, 0.3
and 1.0, twenty runs each, against invoice text.

**Result.**

| Temperature | Valid JSON | Field accuracy |
| --- | --- | --- |
| 0.0 | 20/20 | High |
| 0.3 | 20/20 | High |
| 1.0 | 17/20 | Noticeably worse |

**What I learned.** For extraction, temperature 0 and nothing else. The
variation that makes prose interesting is pure downside when the output shape
is fixed.

---

## Test 2 — Does asking for reasoning help classification?

**What I tried.** Classifying support tickets into five categories, with and
without asking for a one-sentence justification before the label.

**Result.** Accuracy improved on the ambiguous cases and was unchanged on the
clear ones. Output tokens roughly tripled.

**What I learned.** Worth it when categories overlap; wasteful when they do
not. The justification is also independently useful — it makes a wrong
classification diagnosable instead of mysterious.

---

## Test 3 — How much does example ordering matter?

**What I tried.** Five few-shot examples in three different orders, same task.

**Result.** Measurably different outputs across orderings. The final example
had the strongest influence on style.

**What I learned.** Put the example closest to the desired output last. Also:
few-shot prompts are less stable than they look, so if a prompt matters, test
it rather than trusting it.

---

## Test 4 — Can a model reliably say "I do not know"?

**What I tried.** Questions with no answer in the provided context, with an
explicit instruction to say when the context is insufficient.

**Result.** With the instruction, refusal was reliable most of the time.
Without it, the model answered anyway in nearly every case.

**What I learned.** Abstention has to be explicitly invited. This is now a
standing line in every [RAG](/ai/rag/) prompt I write.

---

## Next steps

- Turn these into a small repeatable harness rather than ad-hoc runs.
- Add a fixed evaluation set so results are comparable over time.
- Re-run test 1 across model sizes — does temperature sensitivity change?

## Related topics

- [What is an LLM?](/ai/llm/introduction)
- [Context Engineering](/ai/context-engineering/)
- [OpenRouter](/tools/openrouter)
