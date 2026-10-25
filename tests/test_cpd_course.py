"""Content and link regressions for the booklet-aligned static CPD course.

Run with: python -m unittest discover -s tests
Only the Python standard library is required.
"""
import json
from html.parser import HTMLParser
from pathlib import Path
import re
import unittest
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
COURSE = ROOT / 'cpd-course'


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


def read(path):
    return (COURSE / path).read_text(encoding='utf-8')


class CourseTests(unittest.TestCase):
    def test_local_links_assets_and_unique_ids(self):
        for path in COURSE.rglob('*.html'):
            page = Page(path.read_text(encoding='utf-8'))
            ids = [a['id'] for _, a in page.elements if 'id' in a]
            self.assertEqual(len(ids), len(set(ids)), str(path))
            for tag, attrs in page.elements:
                for key in ('src', 'href'):
                    target = attrs.get(key, '')
                    url = urlsplit(target)
                    if not target or url.scheme or url.netloc:
                        continue
                    if not url.path:
                        continue
                    local = ((ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/')
                             else path.parent / unquote(url.path)).resolve()
                    self.assertTrue(local.exists(), f'{path.relative_to(ROOT)}: {target}')

    def test_navigation_representations_agree(self):
        mapping = json.loads(read('course-map.json'))
        script = read('site.js').split('var COURSE = ', 1)[1]
        compact, _ = json.JSONDecoder().raw_decode(script)
        self.assertEqual([g['title'] for g in mapping], [g['t'] for g in compact])
        for group, small in zip(mapping, compact):
            self.assertEqual([i['filename'] for i in group['items'] if i['kind'] == 'page'],
                             [i['f'] for i in small['i'] if i['k'] == 'p'])
        files = [i['filename'] for g in mapping for i in g['items'] if i['kind'] == 'page']
        self.assertEqual(len(files), len(set(files)))
        for filename in files:
            self.assertTrue((COURSE / 'pages' / filename).is_file(), filename)
        for filename in ('glossary.html', 'in-memory.html'):
            self.assertIn('pages/' + filename, read('index.html'))

    def test_timeline_content_and_structure(self):
        timeline, _ = json.JSONDecoder().raw_decode(read('activities/timeline-of-failures.html').split('const TL=', 1)[1])
        self.assertEqual([len(timeline[p]['events']) for p in ('before', 'during', 'after')], [5, 4, 5])
        events = [e for phase in timeline.values() for e in phase['events']]
        self.assertTrue(all(len(e) == 4 and e[2] and e[3] for e in events))
        text = re.sub(r'\s+', ' ', json.dumps(timeline, ensure_ascii=False))
        for expected in ('293,368', 'reasonable time', '5,014', '32%', '43 had no self-closer', '30 September 2026'):
            self.assertIn(expected, text)
        for obsolete in ('seven minutes', 'five separate call handlers', 'half a million pounds', 'national security'):
            self.assertNotIn(obsolete, text)
        self.assertIn('timeline-of-failures.html', read('pages/grenfell-tower-a-timeline-of-failures.html'))

    def test_corrected_teaching_content(self):
        expectations = {
            'a-tale-of-two-kensingtons': ('55%', '25%', '2011 Census'),
            'the-demographic-contrast': ('34%', '22%', 'relative deprivation rather than average income'),
            'who-lived-in-the-tower': ('Constantine Gras', 'artist’s permission', 'not tower residents alone', 'Gillian Slovo'),
            'show-me-the-bodies': ('Martin denied making the remark', 'Sam Webb', 'Guidance was revised in 1992'),
            'the-grenfell-tower-inquiry-report': ('02:35', '02:44', '02:47', 'avoid judging residents'),
            'why-did-it-spread-so-quickly': ('dry rising main', 'gas did not play a significant part', 'normal operation'),
            'media-failures-and-delayed-justice-in-hillsborough-and-grenfell': ('Andrew Devine', 'Graham Mackrell', '1998', '116', '49 in full and nine in principle'),
            'the-future-of-grenfell': ('Freehaus', '165 million', '700 organisations', '49 recommendations in full and nine in principle', 'specified buildings'),
            'our-approach': ('p. 8.', 'Centring community voices'),
            'welcome-to-the-course': ('A note on wellbeing', 'The fire burned for over 60 hours'),
        }
        for slug, values in expectations.items():
            source = read('pages/' + slug + '.html')
            text = re.sub(r'\s+', ' ', source)
            for expected in values:
                self.assertIn(expected, text, slug)
        quiz = read('pages/quiz-understanding-grenfell.html')
        self.assertIn('power surges of 2013', quiz)
        self.assertNotIn('Flammable cladding materials', quiz)

    def test_supporting_resources_and_interactions_preserved(self):
        glossary = Page(read('pages/glossary.html'))
        self.assertEqual(sum(tag == 'dt' for tag, _ in glossary.elements), 69)
        memorial = read('pages/in-memory.html').split('<ul class="memorial-names">', 1)[1].split('</ul>', 1)[0]
        self.assertEqual(memorial.count('<li>'), 72)
        self.assertIn('data-cpd-feedback-form', read('pages/course-feedback.html'))
        self.assertIn('id="generateBtn"', read('activities/moral-compass.html'))
        self.assertIn('id="dilemma-reflection"', read('activities/moral-compass.html'))
        for name in ('preview', 'edit', 'copy', 'print'):
            self.assertIn('id="' + name + '"', read('activities/lesson-design.html'))
        matching = read('activities/matching-pairs.html')
        self.assertEqual(matching.count('data-side="theme"'), 5)
        self.assertEqual(matching.count('data-side="requirement"'), 5)
        self.assertIn('match-announcement', matching)
        self.assertIn('Pearson Edexcel', matching)
        self.assertIn('other connections may also be justified', matching)
        for slug in ('glossary', 'in-memory'):
            self.assertIn('Supporting resources', read('pages/' + slug + '.html'))


if __name__ == '__main__':
    unittest.main()
