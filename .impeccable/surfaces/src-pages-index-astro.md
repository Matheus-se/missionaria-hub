---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Surface: briefing page for Pr. Jacó Junior

Scope: `src/pages/index.astro`, the single page sent to the pastor. Visitor mode: Persuade (he must act: answer and book the call), with a Read passage (process) and an Operate passage (questionnaire) built with Operate precision.

Audience and job: Pr. Jacó Junior, no software knowledge, possibly discouraged by a two-week delay. He reads, answers 37 questions (answers persist on the device), sends them by WhatsApp, copy or PDF, and picks days for a recorded Google Meet call.

Proof and content: `conteudo/textos.md` and `conteudo/perguntas.json` (research on Eklesia and InPeace, November 2026; Pressman failure curve; process; next steps). Only brand asset: the Missionária symbol (`referencias/simbolo-missionaria.svg`, vector rebuilt from the 1024 px app icon) and the MISSIONÁRIA wordmark (League Spartan 700, tracking about 0.07em), always flat. No photographs anywhere.

User steers so far:
- Round 1 (directions): liked Prancha em preto and Esboço de sermão; found the comps cheap; wants more fashion, impressive, GSAP animation, hover, immersive scroll.
- Round 2 (comps on black): too morbid; rejected the 3D lacquer logo; the copy read as AI (slogan headline "Antes de construir, calcular.", technical labels like "Cliente · Etapa · Levantamento de requisitos" and "I. O que já estudamos", the overall tone).
- Pinned now: white paper as the base with black ink, black entering only in a few strong full-bleed blocks, like a fashion magazine; the logo flat, black or white, as the official one; copy conversational, the way Matheus talks to his pastor.

Memorable moment: the flat symbol assembles itself from its three pieces (diamond, chevron, heart) as the page explains how an app gets built, and returns monumental, cropped by the page edge, in the black blocks.

Unresolved: WhatsApp number of Matheus (link opens the contact picker until it is set); real dates for the call.

## Direction contract

THESIS: A fashion magazine issue made for one reader. The pastor opens an issue about his church's app, written as a letter from Matheus, and every spread asks him something or shows him how the work will be done. Refuses the app landing with a phone mockup and feature cards, refuses the all-black luxury cliché, and refuses slogan copy.

OWN-WORLD: Clean white paper ground and true black ink; black enters only as a few full-bleed spreads carrying white type and the monumental flat symbol cropped by the edge. A high-contrast didone set huge against an expanded grotesk for small labels and a plain grotesk for reading; extreme scale contrast is the hierarchy. No tints, no greys as surfaces, no technical-drawing labels. One module from the logo's diamond sets the grid and the corner marks.

STORY: He hears Matheus speaking to him, sees the team studied Eklesia and InPeace, understands how an app gets made and why late changes cost quality, answers, and books the call.

FIRST VIEWPORT: White page. A thin masthead with the flat symbol and MISSIONÁRIA HUB. The conversational headline "Pastor, antes de começar o aplicativo, a gente precisa ouvir o senhor." set very large in the didone, ragged, occupying most of the width. The flat black symbol huge and cropped by the right edge. One plain line on the 37 questions and the 45 minutes, and a black button "Começar as perguntas".

FORM: Grounded candidate 6 of 7 (Prancha em preto) fused with candidate 1 (Esboço de sermão), then translated at the user's explicit request into a white fashion-magazine world with a flat logo; the drawing-board labels and the black field are retired. seed:0b9489c7e48632a1. Raises kept: two states, no midtone (active inverts); one module governs everything; hierarchy by scale alone; unanswered questions drawn as dashed ghost lines; each answer inks the page itself. Motion grammar: GSAP with ScrollTrigger and SplitText; line-mask reveals for display type; the symbol assembling from its three pieces; a pinned horizontal passage for the six steps; the failure curve drawn by scroll with a "make a change" control; magnetic hover and inverting states.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
