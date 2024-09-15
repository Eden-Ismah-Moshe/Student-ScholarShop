const puppeteer = require("puppeteer");

// Function to scrape scholarships
async function scrapeScholarships() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Scrape from Milgapo
  await page.goto("https://milgapo.co.il/?milga=bli-hitnadvut", {
    waitUntil: "domcontentloaded",
  });
  const milgapoScholarships = await page.evaluate(() => {
    const scholarships = [];
    document.querySelectorAll("section.mbr-section").forEach((item) => {
      const titleElement = item.querySelector("h3");
      const descriptionElement = item.querySelector("p");
      const linkElement = item.querySelector("a");

      const cleanDescription = (description) =>
        description
          .replace(/•\s*/g, "")
          .replace(/\n+/g, " ")
          .replace(/<<|>>/g, "")
          .trim();

      scholarships.push({
        title: titleElement ? titleElement.innerText : "No title available",
        description: descriptionElement
          ? cleanDescription(descriptionElement.innerText)
          : "No description available",
        link: linkElement ? linkElement.href : "No link available",
        source: "Milgapo",
      });
    });
    return scholarships.slice(1, -8);
  });

  // Scrape from NUIS
  await page.goto(
    "https://www.nuis.co.il/scholarships/?jsf=jet-engine&tax=scholarship-status:36",
    {
      waitUntil: "domcontentloaded",
    }
  );
  const nuisScholarships = await page.evaluate(() => {
    const scholarships = [];
    document.querySelectorAll("div.jet-listing-grid__item").forEach((item) => {
      const titleElement = item.querySelector(".elementor-heading-title");
      const moneyElement = item.querySelector(
        "ul.elementor-icon-list-items > li:nth-child(1) .elementor-icon-list-text"
      );
      const populationElement = item.querySelector(
        "ul.elementor-icon-list-items > li:nth-child(2) .elementor-icon-list-text"
      );
      const linkElement = item.querySelector("a");

      let populationArray = [];
      if (populationElement) {
        const spanElements = populationElement.querySelectorAll("span");
        spanElements.forEach((span) => {
          populationArray.push(span.innerText.trim());
        });
      }

      scholarships.push({
        title: titleElement ? titleElement.innerText : "No title available",
        description:
          (moneyElement ? moneyElement.innerText : "No money available") +
          " - " +
          (populationArray.length > 0
            ? populationArray.join(", ")
            : "No population available"),
        link: linkElement ? linkElement.href : "No link available",
        source: "NUIS",
      });
    });
    return scholarships;
  });

  await browser.close();
  return [...milgapoScholarships, ...nuisScholarships];
}

module.exports = { scrapeScholarships };
