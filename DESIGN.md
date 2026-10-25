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

The approved CPD reading interface uses Nunito Sans at 18px/1.75 on desktop and 17px at widths up to 520px, with Manrope headings and gold `#956209` keyboard focus (3px outline, 4px offset). Its own shell is capped at 1600px, with a 246px course sidebar, a reading column capped at 720px and a 166px section outline. At widths up to 1240px the sidebar becomes 220px and the outline becomes an inline disclosure; at 800px the shell stacks with 22px side gutters. Lesson titles scale from 46px to 36px at 800px and 33px at 520px. Matching retains two columns with compact controls at 600px; at widths from 1600px, main side padding and reading-grid gap become 64px. `cpd-course/reading.css`, `reading.js` and `fonts.css` govern this course-specific implementation; `cpd-course/DESIGN.md` records its full guidance. Preserve educational state colors and the course's immediate-feedback matching behavior.

Source of truth: `assets/css/redesign.css`, loaded last after page-specific styles. Original component styles remain underneath for responsive behavior and interaction states. Every ancillary page has a skip link and a no-JavaScript navigation fallback. Honor reduced motion.
