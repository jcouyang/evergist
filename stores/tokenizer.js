module.exports = function getAllWords(text) {
  if(!text) return []
  return text.match(/[^\u0000-\u0080]+|\w+/g);
};
