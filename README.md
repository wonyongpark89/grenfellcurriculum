# The Grenfell Curriculum website

This is a static multi-page website for **The Grenfell Curriculum**. It is designed to work on GitHub Pages, a project domain, or a university-hosted static page without a build process.

## Pages

- `index.html` — brief introduction and selected updates
- `about.html` — project, timeline, team, partners, funders and acknowledgements
- `principles.html` — guiding principles, Education for Disaster Justice and CARE-LEAD
- `cpd.html` — gateway to the Canvas CPD course
- `resources.html` — searchable and filterable open resource repository
- `contact.html` — project contact, accessibility, privacy and copyright statements

## Main contact

General enquiries: `teachgrenfell@soton.ac.uk`

## Editing selected updates

The home page news cards are populated automatically from the `NEWS_ITEMS` array in `assets/js/main.js`.

To add a new update:

1. Open `assets/js/main.js`.
2. Add a new item to `NEWS_ITEMS`.
3. Set `selected: true` for items you want to appear on the homepage.
4. The script sorts selected items by date and shows the latest four.

## Editing resources

Open `resources.html` and duplicate one `<article class="card resource-card">...</article>` block. Keep the `data-subject`, `data-stage`, `data-type`, `data-theme`, `data-format` and `data-search` attributes updated so the filters continue to work.

## Images, logos and photos

The three user-provided watercolour illustrations are stored in `assets/images/` and are used as CSS background images across the main hero sections, not in side panels. They can be replaced by updating the page-level variables in `assets/css/styles.css`.

The team cards use photo placeholders. Replace each placeholder `<div class="photo-placeholder">...</div>` with an approved image when permissions are confirmed.

The partner section includes logo placeholders for:

- University of Southampton
- University of Oxford
- ESRC Impact Acceleration Account
- The Grenfell Foundation
- Grenfell United
- Grenfell Tower Memorial Commission
- The SPACE
- Space Youth

## Design notes

The visual style uses an editorial, institutional layout with a project-specific green identity. The previous top information bar has been removed so the navigation starts directly with the main project header. Typography and component styling have been softened to make the site feel warmer and more approachable, while keeping a professional public-facing tone.

## Publication checks

Before publication, review:

- final resource links and PDFs
- partner/funder logo permissions
- team photo permissions and alt text
- accessibility statement wording
- privacy statement wording
- copyright/resource licensing wording
