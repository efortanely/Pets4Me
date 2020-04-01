import unittest
from selenium import webdriver

class GuiTestSelenium(unittest.TestCase) :

    def setUp(self) :
        self.base_url = "http://pets4.me/"
        self.driver = webdriver.Firefox()
        self.driver.get(self.base_url)

    def test_title(self) :
        self.assertEqual(self.driver.title, "Pets4Me")

    def test_adopt_link(self) :
        adopt_link = self.driver.find_element_by_id("adopt")
        adopt_link.click()
        current_url = self.driver.get_current_url()
        self.assertIn(self.base_url + "pets/" , current_url)

    def tearDown(self) :
        self.driver.close()

if __name__ == "__main__":  # pragma: no cover
    unittest.main()
