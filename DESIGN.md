---
name: Missionária HUB
description: A fashion-magazine issue in black ink on white paper, written as a letter to one reader.
colors:
  ink: "#080808"
  paper: "#f8f8f8"
  ink-soft: "#3a3a3a"
  rule: "rgb(8 8 8 / 0.16)"
  rule-on-ink: "rgb(248 248 248 / 0.28)"
typography:
  display:
    fontFamily: "'Prata', 'Times New Roman', serif"
    fontSize: "134.4px"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Prata', 'Times New Roman', serif"
    fontSize: "75.5px"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "'Prata', 'Times New Roman', serif"
    fontSize: "46.1px"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.015em"
  title-small:
    fontFamily: "'Prata', 'Times New Roman', serif"
    fontSize: "26.9px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "'Prata', 'Times New Roman', serif"
    fontSize: "46.1px"
    fontWeight: 400
    lineHeight: 1
    fontFeature: "\"lnum\" 1, \"tnum\" 1"
  body:
    fontFamily: "'Catamaran', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "'Catamaran', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'League Spartan', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.16em"
  button:
    fontFamily: "'Catamaran', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1
  option:
    fontFamily: "'Catamaran', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1
  wordmark:
    fontFamily: "'League Spartan', 'Helvetica Neue', Arial, sans-serif"
    fontSize: "19.5px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.07em"
rounded:
  none: "0px"
spacing:
  margin: "64px"
  gutter: "24px"
  s-1: "8px"
  s-2: "16px"
  s-3: "24px"
  s-4: "32px"
  s-5: "48px"
  s-6: "64px"
  s-7: "96px"
  s-8: "128px"
  respiro: "128px"
  measure: "34em"
  corner-inset: "19.2px"
  corner-mark: "9px"
  option-gap: "8px"
  columns: 12
  columns-narrow: 4
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.5em"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 1.5em"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-on-ink-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-line-on-ink:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
  button-line-on-ink-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  button-opening:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    width: "254px"
    height: "62px"
  option:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.option}"
    rounded: "{rounded.none}"
    padding: "0 1em"
    height: "44px"
  option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  option-compact:
    padding: "0 0.8em"
    height: "40px"
  answer-field:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "8px 0 16px"
  question-number:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "1.9em"
  question-number-answered:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  index-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    padding: "16px 0"
  index-item-current:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "16px 16px"
  fixed-bar:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "64px"
    padding: "0 64px"
  fixed-bar-over-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  black-spread:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "128px 64px"
  corner-mark:
    backgroundColor: "{colors.paper}"
    size: "9px"
---

# Design System: Missionária HUB

## Overview

**Creative North Star: "The Issue Made for One Reader"**

The page is one issue of a fashion magazine, printed for a single reader: the pastor. Coated white paper, true black ink, a high-contrast didone set huge against a plain grotesk, and the voice of a letter from Matheus. Every spread either asks him something or shows him how the work will be done. Density is low on purpose; the vertical breath between sections is the luxury, and the jump in scale between a display line and a reading line carries the whole hierarchy. There are no tints, no grey surfaces, no photographs and no icons; the Missionária symbol is the only image.

Black is an event, not a theme. It arrives four times as a full-bleed spread (the letter, how the team works, sending the answers, the closing verse) carrying white type, diamond corner marks and the symbol at monumental size, cropped by the edge of the page. Everything the reader can touch speaks in two states: at rest it is drawn in ink, active it inverts. Anything not yet done is a dashed line; anything done is solid or filled, so each answer visibly inks the page.

**Motion grammar.** One long ease (`ease-out`, cubic-bezier(0.16, 1, 0.3, 1), and GSAP's `expo.out`) runs through everything. Display lines rise out of line masks, the symbol assembles itself from its three pieces, the six steps of making an app pass horizontally under a pinned frame while a large symbol fills in piece by piece, the failure curve draws with the scroll and jumps when the reader asks for "one more change", and buttons lean a few pixels toward a fine pointer. All of it is opt-in: when the reader prefers reduced motion nothing is hidden, pinned or smoothed, and the page reads complete and still.

Rejected by the user and confirmed by the build: an app landing page with phone mockups and feature cards; an all-black luxury page (it read as morbid); a 3D or lacquered logo; slogan headlines and technical-drawing labels; the church's usual navy, or any blue.

The direction contract asked for one module from the logo's diamond to set the grid. The build keeps the diamond as the only ornament (corner marks, calendar marks) but sets the grid on fluid margins and gutters, not on a diamond-derived unit; this file records the build.

**Key Characteristics:**
- White paper ground, true black ink, black only as full-bleed spreads.
- A didone at one weight, set huge and tight; hierarchy by scale alone.
- Two states for everything interactive: drawn at rest, inverted when active.
- Dashed means not yet; solid means done.
- The flat Missionária symbol, monumental and cropped on black, assembling from three pieces as the process is explained.
- Square corners and 1px hairlines; no shadows, no gradients, no tints.
- Long expo-out choreography that disappears entirely under reduced motion.

## Colors

Two inks and nothing else: a near-true black and a coated white, with a soft black for secondary reading and two translucent hairlines.

### Primary
- **Press Black** (`ink`): all type and rules on paper, the fill of every active state (pressed buttons, selected options, answered question numbers, the current index entry), and the full ground of the black spreads. Against Magazine Paper it reaches about 18.9:1.

### Neutral
- **Magazine Paper** (`paper`): the page ground, and the ink of every type, rule, corner mark and symbol on a black spread. It is a hair off pure white so the page reads as stock, not screen.
- **Soft Ink** (`ink-soft`): section introductions, part subtitles, the "why I ask" notes, captions and sources. Text only, never a surface; about 10.7:1 on paper.
- **Hairline Ink** (`rule`): the quiet 1px row dividers on paper (between questions, index entries, inventory rows, next steps on narrow screens). Structural rules use Press Black instead.
- **Hairline Paper** (`rule-on-ink`): the same quiet row divider on black (team calendar rows, the roles list, the fixed bar's lower edge over a black spread).

Print is the one exception to the pair: the PDF report prints pure black on pure white (#000 on #fff) for paper output.

### Named Rules
**The Two Inks Rule.** Only Press Black and Magazine Paper ever fill a surface. Soft Ink and the hairlines exist only as text and 1px lines; there is no grey panel, no tinted band, no gradient, and no blue.

**The Inversion Rule.** An active state swaps ink and paper; it never introduces a midtone. Hover on a button, a selected option, the current index entry and an answered question number all invert. The only translucency on a control is the disabled state (40% opacity), reserved for a control with nothing left to do.

## Typography

**Display Font:** Prata (with Times New Roman)
**Body Font:** Catamaran (with Helvetica Neue, Arial)
**Label Font:** League Spartan (with Helvetica Neue, Arial)

All three are self-hosted WOFF2 files, preloaded, with `font-display: swap`. Prata ships one weight (400); Catamaran and League Spartan are variable (100 to 900).

**Character:** A sharp, high-contrast didone carries the editorial voice and every number the reader watches; a soft, plain grotesk does the explaining; a geometric grotesk in wide caps names things, the way a masthead or a table head would. Every size is fluid: the frontmatter records each size at the 1280px reference frame, and the stylesheet's `clamp()` custom property is the source (listed in the sidecar).

### Hierarchy
- **Display** (Prata 400, 134.4px at the reference frame, fluid 64px to 200px, line-height 0.88, -0.035em): the two platform names in the study. The questionnaire's part letters use the same size at an even tighter 0.78 line-height and -0.04em.
- **Headline** (Prata 400, 75.5px, fluid 42px to 112px, line-height 1.02, -0.02em, balanced): every section title, the letter's salutation, the numbers of the next steps, the study's centered conclusion, and the step names inside the horizontal passage. The closing verse runs at 1.22 times this size, line-height 0.96, -0.03em.
- **Title** (Prata 400, 46.1px, fluid 30px to 64px, line-height 1.12, -0.015em, balanced): pull quotes, part titles, step names in the grid, and the signature "Matheus".
- **Title Small** (Prata 400, 26.9px, fluid 23px to 36px, line-height 1.3, -0.01em): the text of every question, and the opening line of each platform study.
- **Numeral** (Prata 400, lining tabular figures): every count that changes as the reader works. It appears at Title size (the index total, the curve's change count), at Headline size (the send counter), and at 20px in the fixed bar.
- **Body** (Catamaran 400, 20px, fluid 18px to 23px, line-height 1.6, measure 34em): all reading text. Un-styled page text falls back to 18px at 1.55.
- **Body Small** (Catamaran 400, 15px, fluid 15px to 17px, line-height 1.55): the "why I ask" notes (measure 40em), captions, sources, the index entries and the footer.
- **Label** (League Spartan 500, 12px, fluid 12px to 14px, 0.16em, uppercase, line-height 1.3): table heads, row headers, field-group labels ("Dias", "Período"), definition terms, the passage caption, the verse citation, the save status (at 0.14em) and the question number boxes (at 0.1em).
- **Button** (Catamaran 500, 17px, fluid 17px to 20px, line-height 1) and **Option** (Catamaran 400, 16px, fluid 16px to 18px, line-height 1): control labels, sentence case.
- **Wordmark** (League Spartan 700, 0.07em): "MISSIONÁRIA HUB" beside the symbol; 19.5px in the masthead at the reference frame, 14px in the fixed bar.

The opening headline is the one comp-locked setting: Prata 400 at 59.5px with 73.6px leading and -0.012em at the reference frame, ragged, one masked line per row; on narrow screens fluid 38px to 60px at 1.1, balanced. It is part of the opening spread, not a reusable level.

### Named Rules
**The One-Weight Didone Rule.** Prata is set at 400 only: never bold, never italic, never tracked open. It tightens as it grows, from -0.01em at question size to -0.04em at the part letters.

**The Three Voices Rule.** Prata speaks (titles, quotes, questions, numbers), Catamaran explains (reading text, buttons, options, answers), League Spartan names (caps labels and the wordmark). A voice never borrows another's job: no reading text in Prata, no display lines in Catamaran, no caps sentences in League Spartan.

**The Serif Numeral Rule.** Every count the reader watches change (answers counted in the bar, the index and the send spread, and the curve's changes) is set in Prata with lining tabular figures. Step numbers and part letters are Prata too.

## Layout

The page is a stack of full-width sections on a 12-column grid (`columns`, `gutter` at 24px and `margin` at 64px at the reference frame; fluid 16px to 32px and 20px to 96px). There is no max-width container: margins grow with the viewport, and the reading measure (34em) keeps lines short. All spacing comes from one eight-step scale, `s-1` to `s-8`: 8, 16, 24, 32, 48, 64, 96 and 128px. These are full sizes, reached at 1440px; from `s-3` up the steps shrink fluidly below that, so on a phone `s-8` is 80px and `s-7` is 56px. Nothing is spaced by eye: every gap between blocks, and between the parts of a component, is a step on the scale, and a gap that is not on it is a bug. Only type-relative offsets inside a text block (in em) sit outside it.

**The One Respiro Rule.** Every section breathes `respiro` (`s-8`) above and below. When two paper sections follow each other, the second drops its top padding, so their content is one `s-8` apart, never two. Inside a section the scale is fixed by relationship: title to introduction `s-4`; header to body, and one block to the next, `s-7`; related sub-blocks (the calendar and its four meetings), and a closing statement under the content it sums up, `s-6`; column insets `s-5`; the parts of one item (a question, its note, its field) `s-2` to `s-3`.

Every section header with an introduction repeats one composition: the title spans columns 1 to 7 (1 to 8 for the study) and always starts on the respiro line; the introduction sits at columns 9 to 12 in Soft Ink and always ends at the header's bottom, whichever of the two is taller. The section body opens `s-7` lower on a 1px Press Black rule.

Sections alternate paper and black in a fixed rhythm: opening (paper), letter (black), study, process, team (black), curve, questions, send (black), next steps, closing (black). Paper sections can follow each other; black spreads never touch.

The opening spread is the only comp-locked composition. On wide screens its parts are placed in reference-frame units (one unit is 1/1280 of the viewport width) inside a 656-unit-tall plate, so the first viewport scales as a single image; below 860px it reflows into one column at least one screen tall, with 20px side padding. Ordinary sections never use frame units.

Fixed chrome: the bar is 64px tall (56px on narrow screens); with smooth scrolling on, in-page links stop at the bar's height plus 8px; the questionnaire index sticks 72px from the top.

**Desktop only.** Below 1024px on screen (phones, phones held sideways, tablets upright) the page is replaced by one paper screen: the masthead, a Headline asking the pastor to open the page on a computer, a Body paragraph and a Soft Ink paragraph, the Primary "Mandar o link para o meu e-mail" and the Line "Copiar o link" stacked up to 420px, a Label hint for a desktop window left too narrow, and the symbol filling the remaining height (at least 30% of the screen), cropped by the right edge by 28% of its width and by the bottom edge. The rule is screen only, so printing the report is unaffected. Spacing follows the scale: masthead to Headline `s-8`, Headline to text `s-4`, text to buttons `s-5`.

**Responsive.** The narrow-screen rules below are kept in the stylesheet but are no longer reached on screen. One breakpoint carries the system: at 860px and below the grid drops to 4 columns and every span goes full width; two-column and three-column bodies stack; the masthead and fixed-bar menus hide; the questionnaire index becomes a sticky strip of tabs; button groups go full width; the black-spread symbols move to a 74vw to 78vw crop at the right edge. Two secondary thresholds exist: the six next steps fold from 6 to 3 columns at 1100px, and the pinned horizontal passage runs only at 1024px wide and 620px tall or more (otherwise the steps are a static grid).

### Named Rules
**The Full-Bleed Black Rule.** Black is a whole section, edge to edge, or it is nothing. It never appears as a card, band or panel inside a paper section.

**The Ruled Column Rule.** Adjacent columns are divided by a 1px Press Black rule (Magazine Paper on black), never by a gutter alone, and each section body opens on one: Eklesia beside InPeace, the three-up steps, the six next steps, the questionnaire index beside the form.

## Elevation & Depth

The system is flat. There are no drop shadows, no blur, no gradients and no layered surfaces. Depth comes from three things only: the inversion of ink and paper, the change of scale between a 134px display line and 15px notes, and the symbol cropped by the page edge, which implies a page larger than the screen. `box-shadow` appears twice and neither use is elevation.

### Shadow Vocabulary
- **Bar hairline** (`box-shadow: 0 1px 0 var(--ink)`): the 1px edge under the fixed bar once it is visible; Hairline Paper instead when the bar sits over a black spread. It is a rule, drawn with a shadow so it can transition with the bar.
- **Option ring** (`box-shadow: inset 0 0 0 1px var(--ink)`): doubles an option's 1px border to 2px on hover, without shifting layout.

### Named Rules
**The Flat Paper Rule.** Nothing floats above the page. If an element needs to stand out, it changes scale or inverts; it never lifts.

## Shapes

Every control and container has square corners (`rounded.none`). Lines are 1px: Press Black for structure (the top of each section body, column dividers, part separators, control borders) and Hairline Ink for rows. Heavier lines carry meaning: 2px for the focused answer line and the focus outline, 3px for the passage's progress bar and the real failure curve.

The diamond, a square turned 45°, is the system's only ornament, taken from the top piece of the logo. It appears as 9px corner marks and as the "this meeting happens" marks in the team calendar (12px to 18px). Corner marks take two placements: on black spreads they sit inset from the section corners (`corner-inset`, 19.2px at the frame, fluid 14px to 26px); on the questionnaire they sit centered on the vertices of its ruled frame, which is closed: a Press Black rule on top and one at the bottom, met by the column divider, with `s-5` between the last control and the bottom rule. The send spread omits its bottom-right mark, where the symbol crops that corner.

The only round shapes are the data marks of the failure curve (the change dot and its legend key). Nothing interactive is round.

### Named Rules
**The Square Corner Rule.** Buttons, options, answer fields, number boxes and index tabs all have 0px corners. A rounded control is off-system.

**The Diamond Ornament Rule.** If the page needs an ornament, it is the logo's diamond: corner marks, calendar marks, the symbol itself. No dots, stars, bullets or glyph icons.

**The Dashed Means Not Yet Rule.** A dashed line is a promise: an unanswered question's answer line, a ghost piece of the symbol, the idealized curve. When the thing is done the line turns solid (or the piece fills). Dashes are never decoration.

## Components

### Buttons
Rectangles of ink with a sentence-case label; they invert when touched.
- **Shape:** square corners (0px), 1px Press Black border, at least 52px tall, padding 0 1.5em, Button type.
- **Primary:** Press Black fill, Magazine Paper label. Hover inverts to a paper fill with an ink label (0.22s ease-out).
- **Line:** transparent with an ink border and label; hover fills with ink. Used for every secondary action (previous part, copy, PDF, email, reset the curve).
- **On a black spread:** both variants flip; primary is a paper fill with ink label and inverts to ink on hover, the paper border keeping its edge visible.
- **Opening button:** "Começar as perguntas" in the first viewport, a solid ink block (254 by 62 at the reference frame; full width at 58px on narrow screens), placed by the opening spread rather than styled as a regular button.
- **Focus:** a 2px outline in the current color, offset 4px, on every focusable element.
- **Disabled:** 40% opacity and a not-allowed cursor, used only on the curve's buttons when there is no change left to make or undo.
- **Magnetic pull:** with a fine pointer, the opening button, the send buttons and the curve's buttons drift toward the cursor (up to about 6px across, 5px down; 0.6s expo-out) and settle back on leave.

### Options
Answer choices drawn as outlined ink boxes; choosing one fills it.
- **Style:** transparent, 1px ink border, square corners, at least 44px tall, padding 0 1em, Option type, wrapped in rows with an 8px gap.
- **Hover:** the inset ring doubles the border to 2px; no fill.
- **Selected:** Press Black fill, Magazine Paper label (0.18s). Multiple-choice groups use pressed buttons; single-choice groups are radio groups with roving focus.
- **Compact:** inside the inventory table, 40px tall, padding 0 0.8em, 15px to 16px labels, `s-1` gap.

### Answer Fields
A line to write on, not a box.
- **Style:** no border except a 1px dashed ink line below; transparent; Body type; padding `s-1` 0 `s-2`; the field grows with its content and never shows a resize handle.
- **Focus:** the line turns solid and 2px; no outline ring.
- **Answered:** the line stays solid at 1px.
- **Placeholder:** a mid grey (#6b6b6b, a literal in the questionnaire, not a token) inviting the reader to "write it your way".

### Questions
Each question is a numbered entry that inks itself when answered.
- **Head:** a small outlined number box (1px ink, Label type at 0.1em, 1.9em tall, in a 52px to 72px column) beside the question text in Title Small.
- **Note:** below, a Body Small note in Soft Ink, opened by a run-in "Por que eu pergunto" in Label type and Press Black.
- **Answered:** the number box fills with ink (0.35s), the answer line turns solid, and every counter updates: the bar's n/37, the index total, the part's n/m and the send spread's counter.
- **Rhythm:** questions are separated by Hairline Ink rows; parts by Press Black rules, each opened by a Display-size part letter beside its Title-size name. With scripts on, one part shows at a time, closed by a Line "previous" and a Primary "next: [part]" (stacked full width on narrow screens).

### Navigation
- **Masthead:** the flat symbol (48 units tall), the wordmark and four section links in Catamaran 600 at -0.035em, placed in frame units over the opening. Hidden on narrow screens.
- **Fixed bar:** absent over the opening; once the opening scrolls away it slides down (0.5s), carrying the symbol (30px) with the 14px wordmark, five centered links in 16px Catamaran, and the Numeral answer count at 20px. Links underline with a 1px line growing from the left (0.35s). While its midline is over a black spread the bar inverts to ink with a Hairline Paper edge. While hidden it is inert and out of the tab order.
- **Questionnaire index:** sticky beside the form, opening on the Numeral total ("12 de 37", the "de 37" at half size), then a ruled list of part letter (Prata), name and count. Under the total sits the save status in Label type ("Nada escrito ainda.", "Salvo às 14:32."). Hover and the current part invert to ink, padding in by `s-2`. On narrow screens it becomes a sticky strip under the bar: the total and the save status share one row, and below them a row of bordered tabs (at least 48px wide, letter and count only) scrolls sideways edge to edge, cropped by the screen rather than the margin.

### Hairline Ledgers
Tables and lists are drawn as ledgers: a Press Black rule on top, Hairline rows between, a Label-type head row. Used for the feature inventory (function, where the church uses it today, importance in the new app; one grid shared by every row, so each group of options stays on one line and the columns line up from head to last row), the team's two-week meeting calendar (ten weekday columns, a paper rule splitting the weeks, diamond marks for meetings) and the list of roles (Label term beside Body description, the terms in one column as wide as the longest, so none wraps). On narrow screens the inventory stacks per row and the calendar splits into its two weeks, stacked `s-5` apart, each five days wide with the week named in the head row; nothing scrolls sideways.

### Black Spread
The issue's full-bleed signature.
- **Ground:** Press Black edge to edge, Magazine Paper for all type, rules and marks; text selection inverts to paper on ink.
- **Marks:** four inset diamond corner marks (the send spread drops the bottom-right one, where its symbol crops).
- **Symbol:** the flat symbol in Magazine Paper at monumental size, cropped by the page edge (see below).
- **Uses:** the letter (text at columns 7 to 12), how the team works, sending the answers, and the closing verse (at least one screen tall, footer row on a paper rule).

### The Missionária Symbol
The only brand image, always the official flat geometry.
- **Geometry:** three pieces in the official proportions (diamond, chevron, heart) drawn as one SVG, filled with the current color: Press Black on paper, Magazine Paper on black. Never redrawn, recolored, shaded or given depth; it is outlined or dashed only in the assembly states below.
- **Small:** masthead (48 units tall, wordmark to its right), fixed bar (30px), closing footer (40px, alone).
- **Monumental and cropped:** in the opening, 456 units wide and bleeding past the right edge; in the letter, running from the respiro line to one respiro above the bottom (its top level with the salutation, its bottom level with the signature), cropped by the left edge; in the send spread, 54vw wide, its top level with the title, cropped by the right and bottom edges; in the closing, up to 620px, pushed past the right edge far enough that the edge crops the heart and chevron by about one diamond module. On narrow screens each moves to a 74vw to 78vw crop at the top or right.
- **Entrance:** in the opening the pieces fall into place, heart rising first (1.5s), then chevron (from 0.32s) and diamond (from 0.52s) dropping from above, before the supporting line (0.62s) and the button (0.74s) rise in. In the letter the pieces drift upward at different rates with the scroll (diamond fastest, heart fixed), so the symbol opens up as it passes.
- **Assembly states:** in "how an app is made", each piece can be a ghost (dashed 4/5 stroke at 55% opacity, unfilled), an outline (solid 1.25px stroke that does not scale, unfilled) or filled. Before the first step all three are ghosts; at step 1 the diamond fills; at step 2 chevron and heart are outlined; at step 3 the chevron fills; from step 4 the whole symbol is filled. In the static grid each step carries its own small symbol (44px to 72px). In the pinned passage one large symbol (the smaller of 18vw and 40vh) at the left advances as the step nearest the center changes: outlines draw themselves in (1.1s), fills settle from 94% scale (0.8s), and a 3px ink bar along the bottom tracks progress beside a Label caption ("2 de 6 · Desenhar"). The passage spans the full viewport width. Steps are divided by a rule on their right, and when the reader stops scrolling the passage settles (0.3s to 0.8s) with a whole step against the symbol column, the way a magazine turns whole pages; the last step fills the window, so the passage ends on a full page.

### Failure Curve
Pressman's curve drawn in ink only: axes at 1.5px, the idealized curve dotted (2px, 2/7 dashes), the real curve solid (3px), a 7-unit change dot, annotations in 21px Catamaran. On wide screens the chart takes columns 1 to 8 with its source caption `s-3` under it, and a side panel (columns 9 to 12, behind a Press Black divider) holds the Numeral count, the two buttons stacked full width and the explanation, so the reader can make a change and watch the curve without scrolling. The time axis reveals with the scroll, and each annotation appears whole once the curve reaches it, never cut by the reveal; "Fazer mais uma mudança" morphs the real curve to a new spike (0.9s expo-out) and the Numeral count rises. On narrow screens everything stacks, the in-chart annotations give way to a key below, and strokes thicken (5px real, 3.5px idealized).

### Printed Report
"Salvar em PDF" prints a separate A4 report (18mm 16mm 20mm margins): pure black on white, a 26pt Prata title, 16pt Prata part heads on 0.75pt rules, Catamaran 11pt answers, unanswered questions in italic, and nothing else from the page.

## Do's and Don'ts

### Do:
- **Do** keep every surface Magazine Paper or Press Black; Soft Ink and the two hairlines appear only as text and 1px lines.
- **Do** invert ink and paper for every active state (button hover, selected option, current index entry, answered question number), and keep hover on options to the 2px border ring.
- **Do** set titles, quotes, questions and every changing number in Prata 400, and get hierarchy from scale: Display (134.4px at the reference frame) down to Label (12px).
- **Do** set a section header that has an introduction with the title on columns 1 to 7 and the introduction on columns 9 to 12, bottom-aligned, then start the body on a 1px Press Black rule.
- **Do** draw what is not yet done as a dashed line and turn it solid when it is done.
- **Do** bring black in only as a full-bleed spread with paper type, inset diamond corner marks and the paper symbol cropped by the page edge.
- **Do** keep options at least 44px tall and buttons at least 52px tall, so the oldest member can tap them.
- **Do** gate every scroll animation, smooth scroll, pin and entrance behind the no-reduced-motion check, so the page is complete without them.

### Don't:
- **Don't** use tints, grey fills, gradients, or any color beyond black and white; the church's navy and every other blue are out.
- **Don't** round the corners of controls or containers, and don't add drop shadows or blur; `box-shadow` is allowed only as a 1px hairline.
- **Don't** bold, italicize or track open the didone, and don't set reading text in Prata or display lines in Catamaran.
- **Don't** put a caps label above a section heading; League Spartan caps label table heads, field groups, definition terms and captions only.
- **Don't** render the logo with depth, gloss, gradients, lacquer or 3D; the only non-solid renderings are the dashed ghost and outline states of the assembly sequence.
- **Don't** place black as a card, band or panel inside a paper section, or let two black spreads touch.
- **Don't** add photographs, illustrations, icon sets or glyph arrows; the Missionária symbol is the only image.
- **Don't** use technical-drawing labels (coordinates, figure numbers, stage codes) or slogan headlines; labels name things the way a magazine would.
