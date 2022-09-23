const { default: fetch } = require("node-fetch")

module.exports = (id) => {
  return fetch(`https://t.me/${process.env.telegram_public_channel}/` + id).then(e => e.text()).then(e => {
    return parseSlang(parseVent(escapeHTML(e.split('<meta property="og:description" content="')[1].split('">')[0])))
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
  text = text.replace(start, '')
  text = text.replace(end, '')
  text = text.replace(/(#)([A-Za-z]+)/g, '')
  return text.trim()
}

const slangs = {
  "ENA":"and",
  "U":"you",
  "IM":"i'm",
  "UK":"you know",
  "OMG": "oh my god",
  "IMO": "in my opinion",
  "IMHO": "in my humble opinion",
  "BTW": "by the way",
  "IDK": "I don't know",
  "LMK": "let me know",
  "TBH": "to be honest",
  "TGIF": "thank goodness it's Friday",
  "ROFL": "rolling on floor laughing",
  "BRB": "be right back",
  "BBL": "be back later",
  "TTYL": "talk to you later",
  "THX": "thanks",
  "TY": "thank you",
  "YW": "you're welcome",
  "ASAP": "as soon as possible",
  "POV": "point of view",
  "NBD": "no big deal",
  "OMW": "on my way",
  "DIY": "do it yourself",
  "AKA": "also known as",
  "SMS": "short message service",
  "OATUS": "on a totally unrelated subject",
  "ICYMI": "in case you missed it",
  "STFU": "shut the **** up",
  "BF": "boyfriend",
  "GF": "girlfriend",
  "ILY": "I love you",
  "YOLO": "you only live once",
  "B4": "before",
  "IRL": "in real life",
  "TMI": "too much information",
  "ATM": "at the moment",
  "BFF": "best friends forever",
  "BYOB": "bring your own beer",
  "CU": "see you",
  "UR": "you are",
  "FYI": "for your information",
  "FOMO": "fear of missing out",
  "GR8": "great",
  "SMH": "shaking my head",
  "L8R": "later",
  "JMO": "just my opinion",
  "NVM": "never mind",
  "GL": "good luck",
  "FWIW": "for what it's worth",
  "GBU": "god bless you",
  "IMNSHO": "in my not so humble opinion",
  "RN": "right now",
  "TLDR": "too long, didn't read",
  "QOTD": "quote of the day",
  "TBF": "to be frank",
  "DKDC": "don't know, don't care",
  "IDC": "I don't care",
  "K": "okay",
  "2NITE": "tonight",
  "CWOT": "complete waste of time",
  "LMAO": "laughing my ass off",
  "MU": "miss you",
  "SSDD": "same stuff, different day",
  "XOXO": "hugs and kisses",
  "NE1": "anyone",
  "OTT": "over the top",
  "PLZ": "please",
  "DM": "direct message",
  "RUOK": "are you okay?",
  "SPK": "speak",
  "SRY": "sorry",
  "SUP": "what's up?",
  "TTFN": "ta ta for now",
  "VN": "very nice",
  "WTF": "what the ****",
  "Y": "why",
  "JK": "just kidding",
  "BC": "because",
}
const parseSlang = text => {
  return text.split(/\s/g).map(e=>{
    const ue = e.toUpperCase()
    const s = slangs[ue]
    const age = /[0-9][0-9](M|F)/g.test(ue)
    const age2 = /(M|F)[0-9][0-9]/g.test(ue)
    if(age) return ue.slice(0,2) + " years old " + (ue.slice(2,3) === "M"? "male" : "female")
    if(age2) return ue.slice(1,3) + " years old " + (ue.slice(0,1) === "M"? "male" : "female")
    if(s) return s
    return e
  }).join(" ")
}