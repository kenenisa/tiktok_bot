const Jimp = require('jimp');
const deleteFile = require('./deleteFile');

module.exports = async function opacity(imgPath, opacity, resolve) {
    // Reading Image
    const finalImg = './out/temp/finalImg.png'
    const image = await Jimp.read(imgPath);
    await image.opacity(opacity, function (err) {
        if (err) throw err;
    })
        .write(finalImg);
    await deleteFile(imgPath);
    resolve(finalImg)
}

