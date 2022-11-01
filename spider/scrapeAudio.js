import puppeteer from "puppeteer";
import fs from "fs"
//audio
let scrapeAudioBird = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://xeno-canto.org/", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector("input[type=text]");
  await page.$eval("input[type=text]", (el) => el.value = "Ciconia nigra");
  await page.waitForSelector("input[type=submit]");
  await page.click("input[type=submit]");
  await page.waitForSelector(".results");
  await page.click(".results .icon")
  await page.waitForTimeout(30000)

  await browser.close();
};

scrapeAudioBird()


