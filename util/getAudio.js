// const fetch = require('node-fetch');
// const fs = require('fs');

// // const url = 'https://voice-text-to-speech.p.rapidapi.com/read';


// const text = "Take a guess what I wish for us if we had a SECOND chance. The first one wasn't really a chance but it ight. I see us living in downtown Europe or USA, I want to take you for a walk on a cold Christmas, holding hands while we use the other hand to hold ice cream, talking only about us, wearing a big black for me and white coat, staring at each other's eyes and the light. But I can't keep that high hope, I'll let time run it, if it really means it'll come to us, and we'll try our given chance"
// const body = {
//     text,
//     voice: "std-en-US-01",
//     format: "mp3",
// }
// // const options = {
// //   method: 'POST',
// //   headers: {
// //     'content-type': 'application/json',
// //     'X-RapidAPI-Key': 'ed7866a312msh0bafdc03242c636p1dd977jsn1836849ee767',
// //     'X-RapidAPI-Host': 'voice-text-to-speech.p.rapidapi.com'
// //   },
// //   body: JSON.stringify(body)
// // };



// const url = 'https://large-text-to-speech.p.rapidapi.com/tts';

// const options = {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': 'ed7866a312msh0bafdc03242c636p1dd977jsn1836849ee767',
//     'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
//   },
//   body: '{"text":"Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away."}'
// };


// module.exports = () => fetch(url, options)
// 	.then(res => res.json())
// 	.then(res => {
//         console.log(res);
//         fs.writeFileSync('out/test.mp3', Buffer.from(res.data.audio,'base64'));
//     })
// 	.catch(err => console.error('error:' + err));
const fetch = require('node-fetch');

const url = 'https://large-text-to-speech.p.rapidapi.com/tts?id=5425b1c0-357b-47cf-a06c-69c5260ea890';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ed7866a312msh0bafdc03242c636p1dd977jsn1836849ee767',
    'X-RapidAPI-Host': 'large-text-to-speech.p.rapidapi.com'
  }
};

module.exports = () => fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));