const {exec} = require("child_process");


const command  = (cmd)  => new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            reject(err);
        } else {
            resolve("DONE! command"+ Math.floor(Math.random() * 100));
        }
    });
});

module.exports = command