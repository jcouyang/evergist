module.exports = function getAllWords(text) {
  return text.match(/[^\u0000-\u0080]+|\w+/g);
};
