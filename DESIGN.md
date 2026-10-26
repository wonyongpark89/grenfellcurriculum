# Grenfell Curriculum design system

The user approved the Manrope / Nunito Sans homepage sample on 25 October 2026. The whole-site identity uses calm editorial structure, generous whitespace and flat surfaces. Keep the textual brand in the header without a heart mark; retain the favicon.

## Typography

- Headings and brand: Manrope, weight 700; balanced wrapping and modest negative tracking.
- Body and controls: Nunito Sans, weight 400, with 600–700 for controls.
- Body: 18px desktop, 17px mobile, line-height 1.7. Display headings scale up to 4.7rem.

## Color and surfaces

- Paper: #fdf9f2; white surface: #fffefa.
- Deep green: #063c2b; action green: #006a46.
- Ink: #172b22; muted text: #4c6256; rule: #ccd6ca.
- Quiet tinted section: #eef3e9.
- Keyboard focus: 3px deep-green outline, 4px offset; pale outline on dark sections.
- Selection: #bdd9bc with deep-green text.

Use restrained 1px borders, 6–8px corners and no decorative shadows or gradients. Buttons are rectangular with small rounded corners. Reserve meaningful activity and framework colors for their established semantics, including slider scales and feedback.

Cards and panels use complete 1px outlines and pale surfaces, including within dark sections; pair them with ink text and deep-green headings. Border-only editorial dividers remain on unboxed homepage pathways and update rows. The EDJ diagram's published white raster canvas is composited against the page paper with multiply blending; its labels, dimensions and hotspot geometry remain unchanged. Dark course surfaces use pale focus outlines.

## Layout and behavior

The shared maximum width is 1240px. Desktop content and header gutters use clamp(22px, 5vw, 72px). Standard mobile content has 22px side gutters. Ancillary page introductions use an unboxed cream surface and large headings. Content sections use 48–80px vertical spacing, scaled down on phones. Team portraits, interactive diagrams, forms, repository filters, pagination and activity controls retain their original structure and behavior.

The root homepage has its own scoped composition. Shared typography, header, buttons and footer apply globally; ancillary hero/card/grid overrides exclude `.page-home`. Course pages are handled separately.

The course's reading interface uses 17px body text on desktop and 16px on small phones, with gold `#956209` focus outlines to distinguish keyboard focus from green activity states. These course-specific tokens are defined in `cpd-course/redesign.css`; educational state colors remain unchanged.

Source of truth: `assets/css/redesign.css`, loaded last after page-specific styles. Original component styles remain underneath for responsive behavior and interaction states. Every ancillary page has a skip link and a no-JavaScript navigation fallback. Honor reduced motion.

## CPD landing page

The user approved sample 2, “Place first”, on 26 October 2026, with the redundant middle dark-green weekly navigation strip removed. This composition applies only to `cpd-course/index.html`, styled by `cpd-course/landing.css`; the lesson shell and all lesson guidance below remain authoritative for reading pages.

Lead with the existing aerial illustration at `assets/images/opener-week1-aerial.jpg`, reused unchanged. On desktop, the image fills the hero behind a cream inset introduction containing the course title, subtitle, description, green start-course button and compact course facts. Retain Manrope headings, Nunito Sans body text, and the shared paper, deep-green and action-green colors. Use flat surfaces without decorative shadows.

The landing-page content and header have a maximum width of 1240px with 52px desktop side gutters, reducing to 32px at 1000px and 20px at 700px. At the mobile breakpoint, stack the image, cream introduction and course contents in that order; the introduction no longer overlays the image. These gutter values are scoped to this landing page.

Keep the weekly course outline simple: native `details` / `summary` disclosures with fine dividers, week numbers, descriptive titles, short summaries and plus/minus indicators. Expanded weeks show a start-week link and grouped lesson links, in two columns on desktop and one on mobile. Place the introductory and supporting resource links alongside this outline. Do not restore a separate dark-green weekly navigation strip between the hero and course contents. Preserve keyboard focus, native disclosure behavior without JavaScript and reduced-motion support.

## CPD content visualisations

The previous course shell remains authoritative: retain its index, sidebar, page layout, typography and palette. Enhance existing material within that theme. The community figure reproduces page 18 of the resource book: four dot grids, a language summary and a stacked faith-and-belief bar, with the complete figures and Census scope. It reflows to two columns on phones. Fire chronology uses time rails; CARE–LEAD uses the resource book’s eight green line icons; the Hillsborough/Grenfell comparison uses one accessible table with labelled stacked rows on phones. The simple immediate-feedback matcher stays within the original standalone activity and iframe, using the course theme. Do not restore the rejected reading-shell rollout.


## CPD reading hierarchy and activities

The Survivors’ Accounts page reproduces the workbook’s central tower schematic, highlighting floors 20, 18 and 13 and connecting each to its survivor’s account. On narrow screens or without JavaScript, show the labelled tower above the complete accounts. Preserve the source text and quotations; this figure uses the workbook’s unboxed quotation treatment.

The course keeps its established green-and-cream theme, fonts, index and sidebar. Page titles lead, with the course/week context underneath. Lesson h2/h3 headings use distinct sizes and generous space above; section rhythm comes from whitespace rather than repeated rules. The footer keeps one quiet boundary, while navigation groups, glossary entries, resource rows, activity answers and CARE–LEAD entries use spacing.

Quotations use an unfilled surface, a dotted green outline, 6px corners, larger reading text and smaller upright attribution. Reflection and quiz panels share consistent padding, headings and input styling; expandable answers sit inside the same green activity panel as their question and reflection field, following the quiz page. Writing fields stay visible without opening an expandable; standalone reflections are available before an activity is completed. Only answer guidance is expandable. Keep educational feedback colors and all existing activity behavior. The repeated temporary-platform and unsaved-notes notices have been removed at the user's request. The feedback form retains its specific submission disclosure.


## CPD lesson presentation revisions

All lesson paragraphs, figures, source notes and the feedback form use the shared content width. Avoid nested fixed-width wrappers. Resource headings put a small outlined Read / Watch / Read & listen label immediately beside the title, without an enclosing card. Source lines and figure captions use the same muted 0.88rem style.

The residents lesson is split into community context and lives/voices; the media lesson is split into Hillsborough and Grenfell/comparison. Preserve the existing URLs and course sequence, but use descriptive lesson titles without part numbers or supplementary part links. Fire locations use side-by-side maps with bounded heights, with an accessible dated list for 1991–2009–2017. Failure mechanisms, investigation figures and reform commitments use aligned semantic lists. Feedback section numbers sit directly beside their headings; field edges align below. The Week 3 conclusion pairs an understated project link with a deep-green feedback invitation.


Only links to external websites open a new tab/window. Course navigation, links elsewhere on grenfellcurriculum.com (including absolute URLs), same-page anchors and skip links open in the current tab. Resource badges align to the centre of the title’s first line. Lesson introductions and activity iframes have a clear space above them. Keep reflection exercises outside timeline panels. The survivor-theatre clips are pending copyright permission, with a November 2026 availability note.
