const isValid = (phraseEntity) => {
  if (
    phraseEntity?.phrase &&
    Array.isArray(phraseEntity?.meanings) &&
    phraseEntity?.meanings?.length > 0
  ) {
    return true;
  }
};

function createPhraseJSON(phrase, meanings) {
  const data = {
    phrase: phrase,
    meanings: meanings,
  };

  return data;
}

module.exports = { createPhraseJSON, isValid };
