import unittest
from sync_official_content import collect_image_refs, rewrite_text


class OfficialSyncTests(unittest.TestCase):
    def test_root_images_and_external_urls(self):
        original = '<img src="/images/mem/image7.png"> [photo](/images/head1.jpg) [external](https://example.org/images/photo.png)'
        expected = '<img src="/mace-san-lab/images/official/mem/image7.png"> [photo](/mace-san-lab/images/official/head1.jpg) [external](https://example.org/images/photo.png)'
        self.assertEqual(rewrite_text(original), expected)
        self.assertEqual(collect_image_refs(original), {'mem/image7.png', 'head1.jpg'})

    def test_internal_routes(self):
        self.assertEqual(rewrite_text('[award](/en/award) <a href="/member">people</a>'),
                         '[award](/mace-san-lab/publications#awards) <a href="/mace-san-lab/members">people</a>')

    def test_no_editorial_corrections(self):
        text = 'Izumi Takhara\n2026.April.\n[<u>GULP</u>] (https://gulp.curtin.edu.au/index.html)'
        self.assertEqual(rewrite_text(text), text)

    def test_rewrite_idempotence(self):
        source = '[Members](/en/member) <img src="/images/mem/image7.png">'
        self.assertEqual(rewrite_text(rewrite_text(source)), rewrite_text(source))


if __name__ == '__main__':
    unittest.main()
