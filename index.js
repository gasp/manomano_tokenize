function cut(string) {
  return string.split(/[\s,.\[\]$\?¿\!¡'"()+-]+/);
}


function count(words, dictionary) {
  return dictionary;
}

module.exports = { cut, count };
