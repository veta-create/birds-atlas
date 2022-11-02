const fs = require('fs');
const puppeteer = require('puppeteer');

//audio
let file = JSON.parse(fs.readFileSync("./birdsJSON.json"));
let scrapeAudioBird = async (birdName) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://xeno-canto.org/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("input[type=text]");
  // await page.$eval("input[type=text]", (el) => el.value = birdName);
  await page.$eval(
    "input[type=text]",
    (el, birdName) => {
      return (el.value = birdName);
    },
    birdName
  );
  await page.waitForSelector("input[type=submit]");
  await page.click("input[type=submit]");
  await page.waitForSelector(".results");
  await page.click(".results .icon")
  await page.waitForTimeout(30000)

  await browser.close();
};

for (let i = 0; i < file.birds.length; i++) {
    await scrapeAudioBird(file.birds[i].nameInLatin);
}



