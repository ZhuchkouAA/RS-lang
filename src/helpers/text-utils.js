export const getTextWidthInPx = (text) => {
  const span = document.createElement('span');

  span.style.fontSize = `${16}px`;
  span.style.height = 'auto';
  span.style.width = 'auto';
  span.style.position = 'absolute';
  span.style.whiteSpace = 'no-wrap';
  span.style.top = '-200px';
  span.innerHTML = text;

  document.body.appendChild(span);

  const res = Math.ceil(span.clientWidth) + 10;

  span.remove();

  return res;
};

export const splitSentenceByWord = (sentence) => {
  const text = sentence.replace(/<.?[i,b]>/g, '~');
  const sentencePart = ` ${text} `.split('~').filter((part) => part);
  const startWordIndex = text.indexOf('~');
  const endWordIndex = text.lastIndexOf('~');

  let wordIndex = 1;

  if (startWordIndex === 0) {
    wordIndex = 0;
  }

  if (endWordIndex === sentence.length - 1) {
    wordIndex = 2;
  }

  return {
    wordIndex,
    sentencePart: sentencePart.map((part) => part.trim()),
  };
};

export const getStyleWidthForText = (text) => {
  const wordWidth = getTextWidthInPx(text);
  const doublePadding = 28;
  return { width: `${wordWidth + doublePadding}px` };
};

export const getTemplateForWord = (word) => {
  return '_'.repeat(word.length);
};
