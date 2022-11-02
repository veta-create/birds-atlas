const fs = require('fs');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

let file = JSON.parse(fs.readFileSync("./birdsJSON.json"));

//получает наименование на русском, возвращает транслитом, с маленькой буквы, заменив пробелы на тире
function generateName(str) {
  var answer = "";
  var converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    " ": "-",
  };

  for (var i = 0; i < str.length; ++i) {
    if (converter[str[i]] == undefined) {
      answer += str[i];
    } else {
      answer += converter[str[i]];
    }
  }

  return answer.toLowerCase();
}

let scrapeImageBird = async (birdName, birdNameInLatin) => {
  const browser = await puppeteer.launch({
    headless: false,
    // defaultViewport: { width: 1920, height: 1080 },
    // args: [`--window-size=1920,1080`],
  });
  const page = await browser.newPage();
  await page.goto("https://yandex.ru/images/");
  await page.waitForTimeout(15000);
  await page.type(
    ".input__control.mini-suggest__input",
    `${birdNameInLatin} jpeg`
  );
  await page.keyboard.press("Enter");
  await page.waitForSelector(".serp-list");
  await page.waitForTimeout(5000);

  let imagesSRC = [];
  for (let i = 0; i < 5; i++) {
    //получаем адреса первых пяти картинок и записываем в imagesSRC
    await page.click(`.serp-item:nth-child(${i + 1}) img`);
    await page.waitForTimeout(5000);
    const imageSRC = await page.evaluate(() => {
      const imageSRC = document.querySelector(".MMImage-Origin");
      return imageSRC.src;
    });
    imagesSRC.push(imageSRC);
    await page.click(".MMViewerModal-Close");
  }

  //скачивает картинку, используя src
  function downloadImage(url, path) {
    return fetch(url).then((res) => {
      res.body.pipe(fs.createWriteStream(path));
    });
  }

  //создаёт папку для птички, называет именем птички транслитом
  fs.mkdirSync(`birdsData/${generateName(birdName)}`, (err) => {
    if (err) throw err;
    console.log("Папка успешно создана");
  });

  //создаёт папку для картинок внутри папки про птичку
  fs.mkdirSync(`birdsData/${generateName(birdName)}/images`, (err) => {
    if (err) throw err;
    console.log("Папка успешно создана");
  });

  //скачивает все картинки, используя массив адресов
  for (let i = 0; i < imagesSRC.length; i++) {
    await downloadImage(
      imagesSRC[i],
      `./birdsData/${generateName(birdName)}/images/${generateName(birdName)}-${
        i + 1
      }.jpeg`
    );
  }

  console.log(imagesSRC);
  await browser.close();
};

for (let i = 0; i < file.birds.length; i++) {
  if (file.birds[i].imagesPath === undefined) {
    let imagesPaths = [];

    // генерирует путь до картинки, добавляет в массив
    for (let j = 0; j < 5; j++) {
      imagesPaths.push(
        `./birdsData/${generateName(file.birds[i].name)}/images/${generateName(
          file.birds[i].name
        )}-${j + 1}.jpeg`
      );
    }

    // присваивает полю imagesPaths в объекте с птицей массив с путями до картинок
    file.birds[i].imagesPaths = imagesPaths;

    await scrapeImageBird(file.birds[i].name, file.birds[i].nameInLatin);

    fs.writeFileSync("./birdsJSON.json", JSON.stringify(file, null, 4));
  }
}
