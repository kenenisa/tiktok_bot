const fs = require("fs");
[
    './out',
    './out/final',
    './out/temp',
    './assets',
    './assets/music'
].forEach(newDest=>{
    if (!fs.existsSync(newDest)) fs.mkdirSync(newDest);
})