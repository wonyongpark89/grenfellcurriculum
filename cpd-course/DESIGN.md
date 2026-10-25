---
name: Grenfell CPD reading interface
description: Approved CPD reading design for clearer structure and easier reading within the established identity.
colors:
  paper: "#fdf9f2"
  surface: "#fffefa"
  green: "#006a46"
  deep: "#063c2b"
  ink: "#172b22"
  muted: "#4c6256"
  rule: "#ccd6ca"
  soft: "#eef3e9"
  focus: "#956209"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "46px"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "27px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Nunito Sans, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.6
rounded:
  small: "4px"
  control: "6px"
  panel: "8px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-6: "24px"
  space-8: "32px"
  space-10: "40px"
  space-12: "48px"
  space-16: "64px"
  space-20: "80px"
components:
  button-primary:
    backgroundColor: "{colors.deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.green}"
    textColor: "white"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  reflection-panel:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "{spacing.space-8}"
  reflection-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "{spacing.space-4}"
---

# Design System: Grenfell CPD reading interface

## Overview

**Status: production-approved.** The user approved applying the reading design across the CPD course and committing and pushing the rollout. This course-specific guide extends the existing site identity; the root `DESIGN.md` continues to govern other site surfaces.

Preserve Manrope headings, Nunito Sans reading text, warm paper, deep green ink, flat surfaces and restrained borders. The course reading design makes topic, course position and reading route visible before the main material. Its authority is the current `reading.css`, `reading.js`, `fonts.css`, static course HTML and standalone `activity-theme.css`, rather than the earlier local samples.

## Colors

Frontmatter records the shared reading primitives from `reading.css`. Paper surrounds a near-white reading surface; deep green serves headings and primary actions, action green serves links, muted text serves sources and metadata, and soft green groups reflection or pivotal content. Gold keyboard focus distinguishes location from educational feedback. Correct matching pairs use pale green and checkmarks; wrong choices briefly use red with an accompanying screen-reader announcement. Preserve existing semantics in other activities.

## Typography

`fonts.css` self-hosts Manrope and Nunito Sans WOFF2 files in `reading-assets/`, with swap loading and sans-serif fallbacks. Headings use weight 700, balanced wrapping and modest negative tracking. Desktop reading text uses 18px/1.75, becoming 17px at 520px. Titles use 46px/1.16, 36px at 800px, and 33px at 520px. Section and subsection base sizes are 27px and 20px, with material-specific overrides.

Introductions use 20px/1.65 up to 68ch, becoming 18px/1.7 at 800px. The reader is capped at 74ch and direct paragraphs at 70ch. Captions, citations, labels and navigation use smaller supporting type. Standalone activities use the same families with their retained component hierarchy; `activity-theme.css` sets their body text to 18px/1.7 and 17px at 520px.

## Layout

Course pages use a maximum 1600px shell: a 246px sticky, scrollable sidebar and a flexible main area. Main padding is 48px. The reading grid pairs a column capped at 720px with a 166px sticky outline and a 48px gap. A title-first lesson header precedes the reading. Major sections use a 64px margin, 32px top padding and a single-pixel divider. Spacing follows the frontmatter's 4px scale.

- At 1240px and below, the sidebar is 220px, main side padding is 32px, and the right outline becomes an inline disclosure.
- At 800px and below, the shell stacks, the sidebar becomes a course-menu disclosure, and main padding is 32px vertically and 22px horizontally. Reading sections use 48px spacing and 28px top padding.
- At 600px and below, matching retains two equal columns with a 12px gap and compact 14px/1.55 button text; number and text stack within each button.
- At 520px and below, community evidence and quotations stack, chronology uses a narrower time rail, and comparison cells display their data labels as reading blocks. Other wide source tables remain inside horizontal scroll containers.
- At 1600px and above, main side padding and reading-grid gap become 64px.

The course index is a distinct composition: a 1240px container, responsive 22px-to-72px gutters, a two-column introduction with authentic image, and ruled module rows with module heading beside lesson links. It stacks at 800px. The links page retains source numbering, section headings and readable destination text. Standalone matching uses a 1100px maximum with 22px gutters.

Print uses a single column, removes navigation and optional note entry, and scales type for paper.

## Elevation & Depth

Use flat paper, near-white surfaces, pale supporting panels and restrained rules. There are no decorative shadows or gradients. Do not introduce ornamental page-load animation. Smooth anchor scrolling becomes immediate under reduced motion; wrong-choice shaking also stops under reduced motion.

## Shapes

Use 4px corners for images and navigation cues, 6px for buttons and fields, and 8px for larger panels. Borders are generally 1px. Buttons remain small rounded rectangles. Timeline dots, disclosure marks and correct-match checkmarks communicate structure or state.

## Components

### Static navigation and reading outline

The complete course navigation is present in page HTML, with native week disclosures and `aria-current="page"` on the current lesson. Navigation must remain available without JavaScript. `reading.js` opens the course-menu wrapper at 801px and above and closes it below that boundary, including after resizing. The inline outline closes after a section is chosen. Where direct reading sections exist, an IntersectionObserver updates the desktop outline's active anchor. Preserve skip links, section IDs and previous/next destinations.

### Semantic learning content

Use real headings, lists, figures, captions, quotations, citations and tables. Preserve substantive wording, attribution, dates, definitions and source links. Community evidence, time-ordered events, worked examples, comparisons and CARE/LEAD principles retain their material-specific structures. Other lessons retain semantic reading and exercise units instead of converting all content into identical cards. Video launchers replace authentic thumbnails with titled external iframes only after activation; preserve other existing media and educational embeds.

### Reflection and guidance

Pale panels distinguish reflection prompts. Native disclosures hold optional writing or answer guidance where implemented. Textareas are labelled, vertically resizable and at least 140px high. Notes are not submitted or saved by the reflection controls. Copy reports success through a status message; its fallback selects the text and explains keyboard copying. Preserve existing activity-specific storage or form behavior separately.

### Immediate-feedback matching

The course curriculum page and standalone matching activity share `reading.js`. Select a left-hand numbered theme, then a right-hand lettered statement. Correct pairs turn pale green, show checkmarks and lock with `aria-disabled`; activation is ignored after solving. A wrong right-hand choice flashes red for 500ms and shakes for 380ms; the theme stays selected for another attempt. Reduced motion suppresses the shake. Selection uses `aria-pressed`, and visible gold focus remains distinct from selection.

Native Space/Enter activation and Escape deselection are supported. Selecting the active theme again also deselects it. Polite live announcements explain choices and outcomes; accessible names include selected or correct state. Solving all five pairs displays “All five matches found.” Start again clears solutions, selection, timers and completion, then focuses the first theme. There is no final checking step or pair-management toolbar.

### Glossary

Search filters definitions, groups and both outline variants together. It reports matching terms and exposes an empty state when needed. Clear restores terms and focuses search. Expand/collapse affects visible definitions; individual terms remain native disclosures. Preserve all 69 definitions across their five groups and their source notes.

### Other activities and forms

Moral compass, lesson design, narrative deconstruction and timeline activities retain their own interaction code and layouts, with shared fonts and `activity-theme.css` supplying the approved identity. Preserve controls, educational state colors, iframe sizing and completion behavior. Existing quiz, choice and feedback controls retain their semantics; production reading extensions style their containers and responsive columns. Dark feedback-submit surfaces use pale keyboard focus.

### Buttons and inputs

Primary buttons use deep green with action green hover; secondary buttons use a transparent surface and restrained border. Standard action buttons are at least 44px tall with 10px by 20px padding. Keyboard focus is a 3px gold outline with 4px offset. Search highlights the enclosing field on focus. Keep labels, status messages, touch and keyboard operation available.

## Do's and Don'ts

- **Do** preserve the approved Manrope / Nunito Sans and paper-green identity.
- **Do** use the course-specific shell and typography for CPD routes.
- **Do** retain static navigation, semantic content, source attribution and activity behavior.
- **Do** verify narrow layouts, keyboard focus, menu resizing and reduced motion when changing shared components.
- **Don't** apply the course's 1600px shell to unrelated site pages.
- **Don't** restore the old dropdown or deferred-check curriculum matcher.
- **Don't** replace varied learning materials with generic equal-size cards.
