import puppeteer from "puppeteer";
import fs from "fs";

let file = JSON.parse(fs.readFileSync("./birdsJSON.json"));

let scrapeInfoBird = async (birdName) => {
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: {width: 1920, height: 1080},
    // args: [`--window-size=1920,1080`]
  });
  const page = await browser.newPage();
  await page.goto("https://ru.wikipedia.org/wiki/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("input[name=search]");
  await page.$eval(
    "input[name=search]",
    (el, birdName) => {
      return (el.value = birdName);
    },
    birdName
  );
  await page.waitForSelector("#searchButton");
  await page.click("#searchButton");
  await page.waitForSelector(".vector-body");

  const text = await page.evaluate(() => {
    let text = [];
    const pharagraphs = document.querySelectorAll("p");
    for (let p of pharagraphs) {
      text.push(p.textContent);
    }

    return text;
  });

  await browser.close();
  return text;
};

for (let i = 0; i < file.birds.length; i++) {
  if (file.birds[i].article === undefined) {
    file.birds[i].article = await scrapeInfoBird(file.birds[i].name);
    console.log(file.birds[i].article);
    fs.writeFileSync("./birdsJSON.json", JSON.stringify(file, null, 4));
  }
}
