/*
 * extract words from a string
 * @param {String}
 * @return {Map} dictionary of words and occurence
 */
const tokenize = (string) => count(cut(string), new Map());

/*
 * cut sentences un words
 * @param {String}
 * @return {Array} of words
 */
function cut(string) {
  return string.split(/[\s,.\[\]$\?¿\!¡’\\&%^*|$€£§=…'"()+-]+/);
}

/*
 * count
 * @param {Array} words
 * @param {Map} dictionary with {word: occurence}
 * @return {Map} dictionary
 */
function count(words, dictionary = new Map()) {
  words.forEach((word) => {
    const w = word.toLowerCase();
    if (dictionary.has(w)) {
      const occurence = dictionary.get(w);
      dictionary.set(w, occurence + 1);
    }
    else dictionary.set(w, 1);
  });
  return dictionary;
}

module.exports = { cut, count, tokenize };
