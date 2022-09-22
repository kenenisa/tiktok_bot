const { default: fetch } = require("node-fetch")

module.exports = (id) => {
  return fetch("https://t.me/testtestte13/" + id).then(e => e.text()).then(e => {
    return parseVent(escapeHTML(e.split('<meta property="og:description" content="')[1].split('">')[0]))
  })
}


const escapeHTML = (str) => {
  const escapeChars = {
    '¢': 'cent',
    '£': 'pound',
    '¥': 'yen',
    '€': 'euro',
    '©': 'copy',
    '®': 'reg',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '&': 'amp',
    '\'': '#39'
  };
  
  let regexString = '[';
  for (let key in escapeChars) {
    regexString += key;
  }
  regexString += ']';
  
  const regex = new RegExp(regexString, 'g');
  
  return str.replace(regex, function (m) {
    return '&' + escapeChars[m] + ';';
  });
};

const parseVent = (text) => {
  const start = 'Hey Unihorse 🦄\nHide my Identity\nI need to vent'
  const end = `Telegram • Instagram • Twitter`
  text = text.replace(start,'')
  text = text.replace(end,'')
  text = text.replace(/(#)([A-Za-z]+)/g,'')
  return text.trim()
}