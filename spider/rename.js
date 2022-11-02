import fs from "fs";
const srcFolder = "./birdsData";
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

// let addAudioDir = async (birdName) => {
//   //создаёт папку для птички, называет именем птички транслитом
//   fs.mkdirSync(`birdsData/${generateName(birdName)}/audio`, (err) => {
//     if (err) throw err;
//     console.log("Папка успешно создана");
//   });
// };

// for(let i = 0; i < file.birds.length; i++) {
//   addAudioDir(generateName(file.birds[i].name))
// }

// fs.readdir(srcFolder, (err, directories) => {
//   if (err) throw err;
//   for (let i = 0; i < directories.length; i++) {
//     fs.readdir(`${srcFolder}/${directories[i]}/images`, (err, files) => {
//       if (err) throw err;
//       for (let j = 0; j < files.length; j++) {
//         console.log(files[j]);
//         fs.rename(
//           `${srcFolder}/${directories[i]}/images/${files[j]}`,
//           `${srcFolder}/${directories[i]}/images/${directories[i]}-${i+1}.jpeg`,
//           (err) => {
//             if (err) throw err;
//             console.log("rename completed!");
//           }
//         );
//       }
//     });
//   }
// });
