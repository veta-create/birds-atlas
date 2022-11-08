const fs = require('fs');

let file = JSON.parse(fs.readFileSync("./birdsJSON.json"));

for (let i = 0; i < file.birds.length; i++) {
    file.birds[i].relatedBirds = []
    fs.writeFileSync("./birdsJSON.json", JSON.stringify(file, null, 4));
}
