const fs = require('fs');

module.exports = (file) => {
    return new Promise((resolve, reject) => {
        fs.unlink(file, (err) => {
            if (err) return reject(err);
            console.log("Cleaned up " + file);
            resolve();
        } )
    } )
}