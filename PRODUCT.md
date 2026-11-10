# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (user's choice). Static output, no server. The first surface is a single briefing page, read on a computer. On screens narrower than 1024px it shows only a note asking the pastor to open the link on a computer (the user's decision after reviewing the phone version).

## Users

- **Pr. Jacó Junior**, pastor of Igreja Missionária Central de Maringá (IMCM). He commissioned Missionária HUB, uses InPeace because "it has everything", and knows nothing about software. He reads the briefing on his own time, answers long questions, and books a recorded Google Meet call for requirements analysis. He may be a little discouraged because the briefing arrived two weeks late.
- **Members of IMCM**, including older members who prefer Eklesia today. They are the future app's main audience.
- **The Software Ministry team**: volunteers led by Matheus Henrique. Most of them do not work with software and learn the process while doing it.

## Product Purpose

Missionária HUB will be the church's own app, replacing the two paid platforms in use today (Eklesia and InPeace). The project is in requirements analysis. The first deliverable is a briefing page that:

1. shows the pastor the team studied both platforms;
2. asks him every question needed to understand his pain with them;
3. books a recorded Google Meet call for requirements analysis;
4. explains, in plain language, how software gets made (requirements, diagrams, rituals, software factory) and why changes made late cost quality.

Success: the pastor answers, books the call, and finishes reading more confident in the project than before.

## Positioning

An app built by the church's own volunteers for one congregation, shaped by listening to the pastor and to the members who use Eklesia and InPeace today, instead of a generic platform rented per month.

## Operating Context

- Today the church runs two platforms side by side. Older members prefer Eklesia; the pastor prefers InPeace for its breadth, but it is expensive.
- The church's public app "Missionária" (iOS id1632426583, Android `com.inpeaceapp.igrejamissionariacentralmaringa.pr`) and the site missionaria.inpeaceapp.com both run on InPeace.
- The pastor will hand over admin access to Eklesia and InPeace later; the team has not seen either admin panel yet.
- Answers return through the pastor's own WhatsApp, a copy-to-clipboard, and a PDF save. Answers persist on his device so he can stop and continue.
- The requirements call happens on Google Meet and is recorded with the pastor's consent.

## Capabilities and Constraints

- The future app's feature set is undecided; the questionnaire exists to discover it.
- Native app vs. web app for Missionária HUB is undecided.
- No backend for the briefing page. No analytics, no form service.
- Research facts (checked November 2026): Eklesia is a Maringá company (its Google Play developer address is Rua Francisco Glicério 1205, Zona 07, Maringá-PR); Eklesia bundles its member app at no extra cost with its management system and has discontinued browser access to its member portal; InPeace Grace costs R$125/month without a native app, the Life plan with a native app is quoted per church, MyKids and Voluts are contracted separately, and online giving through Asaas charges per transaction (Pix 0,93% + R$0,10; card 4,5% + R$0,29 on donations).

## Brand Commitments

- Name: **Missionária HUB**.
- The Missionária logo (symbol: diamond, chevron and heart shape; wordmark MISSIONÁRIA) is the only brand asset allowed in the build. Source: `referencias/logo-imcm-inpeace.png` (340×112, white on transparent), to be redrawn as vector.
- Palette direction pinned by the user: black and white, an elegant black, no blue (the church's usual navy is out). Professional and clean.
- Type direction pinned by the user: modern and elegant, mixed faces with a fashion-editorial feel, as if made by an expensive designer.
- The reference photo the user sent must not appear anywhere in the product.
- Voice: Brazilian Portuguese written for a pastor with no software knowledge. Warm, respectful, concrete, didactic. No AI-sounding prose. Volunteer work: rules read as care, never as punishment.

## Evidence on Hand

- Public research on Eklesia and InPeace (features, plans, fees, public store reviews), November 2026.
- The church's InPeace portal structure: Home, Giving, Live, Devotional, annual Bible reading (a Google Drive PDF), Bible, Messages, News, Publications, Ministries, Spotify, Pastoral team.
- Pressman's software failure curve (idealized vs. real curve with a spike at each change), supplied by the user: `referencias/curva-de-falhas-pressman.jpg`.
- Absent, never to be fabricated: what the church pays today, member counts, usage numbers, testimonials, delivery dates.

## Product Principles

1. Listen before building: every feature traces back to something the pastor or a member said.
2. The oldest member is the benchmark: if it is hard for them, it is not done.
3. Change is cheap on paper and expensive in a published app.
4. Teach while building: the volunteer team learns the process in the open, and the pastor sees it.

## Accessibility & Inclusion

Older members are a core audience: large readable type, high contrast, generous tap targets, no reliance on hover or tiny controls. Desktop only: the page needs a large screen (the moving chart, the sideways passage, long typed answers). The pastor will likely tap the link on his phone first, so the narrow-screen note is written in Matheus's voice, explains why, reminds him the WhatsApp link also shows up on WhatsApp on his computer, and offers to email or copy the link.
