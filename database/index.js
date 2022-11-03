const puppeteer = require('puppeteer');
let img = []

let scrapeImages = async () => {
  const browser = await puppeteer.launch({ headless: false, slowMo: 15 });
  const page = await browser.newPage();
  await page.goto("https://yandex.ru/images/");
  let input = ''
  let sumbit = ''
  await page.evaluate(() => {
    input = document.querySelector("input__control.mini-suggest__input");
    sumbit = document.querySelector(
      "websearch-button__text.mini-suggest__button-text"
    );
  });

  await page.click(input);
  await page.$eval(input, el => el.value = 'аист');
  await page.click(sumbit);

  browser.close();
  // return result;
};

scrapeImages().then((value) => {
  console.log("ok");
});
