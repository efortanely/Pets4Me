import unittest
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

class GuiTestSelenium(unittest.TestCase) :

    def setUp(self) :
        options = Options()
        options.headless = True
        
        self.base_url = "https://pets4.me/"
        self.driver = webdriver.Firefox(options=options)
        self.driver.get(self.base_url)

    def test_title(self) :
        self.assertEqual(self.driver.title, "Pets4Me")

    def test_adopt_link(self) :
        adopt_link = self.driver.find_element_by_link_text("adopt a pet today")
        adopt_link.click()
        current_url = self.driver.current_url
        self.assertIn(self.base_url + "pets/" , current_url)

    def tearDown(self) :
        self.driver.close()

if __name__ == "__main__":  # pragma: no cover
    unittest.main()
