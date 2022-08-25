const fetch = require('node-fetch');
const fs = require('fs');
const https = require("https");


let url = 'https://large-text-to-speech.p.rapidapi.com/tts';

let options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': 'ed7866a312msh0bafdc03242c636p1dd977jsn1836849ee767',
    'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
  },
  body: '{"text":""}'
};



const download = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const request = https.get(url, (response) => {
    // check if response is success
    if (response.statusCode !== 200) {
      return cb('Response status was ' + response.statusCode, true);
    }

    response.pipe(file);
  });

  // close() is async, call cb after close completes
  file.on('finish', () => file.close(cb));

  // check for request error too
  request.on('error', (err) => {
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });

  file.on('error', (err) => { // Handle errors
    fs.unlink(dest, () => cb(err.message)); // delete the (partial) file and then return the error
  });
};
function audioGet(url, options, resolve) {
  fetch(url, options)
    .then(res => res.json())
    .then(get => {
      if (get.status !== 'success') {
        setTimeout(() => audioGet(url, options), 10 * 1000)
      } else {
        const dest = `./out/temp/${new Date().getTime()}.wav`
        download(get.url, dest, (e) => {
          console.log("Downloaded narrate audio");
          resolve && resolve(dest)
        })
      }
    })
    .catch(err => console.error('error:' + err));
}

module.exports = (text, resolve) => {
  options.body = JSON.stringify({ text })


  fetch(url, options)
    .then(res => res.json())
    // .then(console.log)
    .then(post => {
      url += '?id=' + post.id
      options.method = "GET"
      options.body = undefined
      options.headers['content-type'] = undefined
      console.log("Waiting for text to be narrated...");
      setTimeout(() => audioGet(url, options, resolve), post.eta * 1000)
    })
    .catch(err => console.error('error:' + err));
}