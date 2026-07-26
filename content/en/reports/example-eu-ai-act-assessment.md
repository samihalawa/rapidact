---
title: "Specimen assessment: Meridian Retail Group"
description: "A complete specimen of the EU AI Act Company Assessment, published so you can read the format and depth before buying."
subject: "Meridian Retail Group"
subjectNote: "Illustrative mid-size EU e-commerce retailer, 180 staff, sells in 6 EU markets"
ref: "SPECIMEN"
specimen: "true"
updated: "2026-07-26"
---

## 01. Your AI inventory

A single inventory of the AI systems the company operates, including customer-facing tools, internal systems and third-party services.

| System | Where it runs | Vendor | Classification |
| --- | --- | --- | --- |
| Customer support chatbot | All storefront pages, bottom-right widget | Intercom Fin | Transparency, Art. 50(1) |
| AI-written product descriptions | ~4,100 product detail pages | In-house, GPT-based pipeline | Transparency, Art. 50(2) |
| Recommendation and ranking engine | Home, category and basket pages | In-house | Out of scope for Art. 50 |
| CV screening and ranking | Careers portal, applicant shortlisting | Third-party ATS module | High-risk, Annex III(4)(a) |
| AI voice agent for order status | Customer service phone line | Third-party voice platform | Transparency, Art. 50(1) |
| Internal code assistant | Engineering team only | GitHub Copilot | Out of scope |

## 02. Risk classification, and why each system lands where it does

The support chatbot and the voice agent both interact directly with natural persons, which brings them within Article 50(1). The obligation is to ensure the person is informed that they are interacting with an AI system, unless that is obvious to a reasonably well-informed user. A branded widget labelled only with a first name does not meet that bar, and a voice agent that opens with a human-sounding greeting clearly does not.

The AI-written product descriptions engage Article 50(2), which concerns synthetic content and its marking in a machine-readable format. This is the obligation companies most often miss, because the output does not feel like "AI content" once it has been edited by a person. Where a human genuinely reviews and takes editorial responsibility for the text, the analysis changes; this section sets out where that line sits for your workflow.

The recommendation engine is assessed as out of scope for Article 50. It does not interact conversationally and does not generate synthetic media. It remains relevant to other regimes, notably the GDPR provisions on automated decision-making and the platform rules on ranking transparency, which are flagged but not assessed here.

CV screening is the system carrying the most exposure. Recruitment and applicant selection fall under Annex III(4)(a), which makes it high-risk rather than transparency-only. That is a materially heavier set of obligations covering risk management, data governance, logging, human oversight and registration. It also runs on a different clock.

The internal code assistant is out of scope. It does not touch external users and does not produce content published to the public. It is listed for completeness, because an inventory that omits systems is not an inventory.

> **Two implementation dates.** Article 50 transparency duties apply from 2 August 2026. The Annex III high-risk obligations relevant to CV screening begin later. Both apply to this company, but they require separate implementation plans.

## 03. What you must disclose, where, and in what words

For the support chatbot, disclosure must be available before the visitor sends their first message, not in a policy page and not after the conversation has begun. In practice this means a persistent line in the widget header or an opening message that states it plainly. Suggested wording: "You are chatting with an AI assistant. Ask for a human at any time and we will transfer you."

For the voice agent, the disclosure must come at the start of the call, in the same language as the call, before any question is asked of the caller. Suggested wording: "This call is handled by an automated AI assistant. Say 'agent' at any point to reach a person."

For AI-written product descriptions, the marking obligation is machine-readable, so a visible badge alone is insufficient. This is satisfied at generation time by embedding provenance metadata in the content pipeline rather than by editing 4,100 pages by hand. The implementation options are set out below in order of effort.

Because Meridian sells into six EU markets, each disclosure must be present in the language in which the service is offered. A single English notice on a Spanish-language storefront does not discharge the duty.

## 04. Your evidence position

Article 50 requires the relevant disclosure outcome. A dated implementation record also helps the company show what was displayed, on which pages and from what date during regulatory, client or insurer reviews.

Meridian can currently produce screenshots taken on the day of a request. That proves the current rendered state, not earlier availability. A proportionate record should therefore begin when the disclosure is published and be updated after material changes.

For the high-risk CV screening system the standard is considerably higher, extending to logs of system operation, documentation of the human oversight actually exercised, and records of the data used. If the ATS vendor holds these, you need a contractual route to obtain them, because the obligation sits with you as the deployer and cannot be delegated by silence.

> **Practical consequence.** Start the implementation record when the disclosure is published. Later screenshots cannot demonstrate an earlier rendered state.

## 05. Prioritised actions

Ordered by deadline, impact and implementation lead time.

| # | Action | Owner | Deadline |
| --- | --- | --- | --- |
| 1 | Open the documentation and logging question with your ATS vendor in writing | Procurement / HR | Start now, long lead time |
| 2 | Add AI disclosure to the support chatbot, in all six market languages | Web team | Before 2 August 2026 |
| 3 | Add an opening AI disclosure to the voice agent script | Customer service | Before 2 August 2026 |
| 4 | Begin a dated disclosure evidence log across the storefront | Web team | Immediately, it cannot be backfilled |
| 5 | Document your editorial review position for AI-written product copy | E-commerce / Legal | Before 2 August 2026 |
| 6 | Add machine-readable provenance marking to the description pipeline | Engineering | Before 2 August 2026 |
| 7 | Prepare the Annex III high-risk compliance programme for CV screening | HR / Legal | Before December 2027 |

## 06. Assessment

Meridian's exposure is concentrated in two places, and they are not the two places the team expected. The chatbot, which prompted the enquiry, is a straightforward fix: a wording change and a disclosure component, achievable in an afternoon at no licence cost.

The real exposure is the CV screening system, which nobody flagged because it was procured as a recruitment feature rather than as AI. It is high-risk under Annex III, it sits with a third-party vendor, and the contractual position on logs and documentation is currently unresolved. That should be opened with the vendor now, because it is the item with the longest lead time and the one you cannot fix unilaterally in the final week.

The product-description pipeline sits in between. It is genuinely arguable in either direction depending on how much editorial control your team exercises, and it is the one item here where we would recommend a documented internal position and, if the volume grows, a short legal opinion. What to put in front of counsel is set out above so that conversation is a narrow question rather than an open brief.

Nothing in this assessment requires you to stop using any system you currently operate.
