import puppeteer from "puppeteer";

let scrapeImageBird = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: { width: 1920, height: 1080 },
    // args: [`--window-size=1920,1080`],
  });
  const page = await browser.newPage();
  await page.goto("https://yandex.ru/images/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".input__control.mini-suggest__input");
  await page.$eval(
    ".input__control.mini-suggest__input",
    (el) => (el.value = "Ciconia nigra")
  );
  await page.waitForSelector(".websearch-button");
  await page.click(".websearch-button");
  // await page.waitForTimeout(10000);
  const images = await page.evaluate(() => {
    let imagesSRC = [];
    const images = document.querySelectorAll(".serp-item__link img");
    for (let i of images) {
      imagesSRC.push(i.src);
    }

    return imagesSRC;
  });

  console.log(images);
  await browser.close();
};

scrapeImageBird();
