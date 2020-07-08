const getSpeechRecognition = (successCallback) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    successCallback(result);
  };

  return recognition;
};

export default getSpeechRecognition;
