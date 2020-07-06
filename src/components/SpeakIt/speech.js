const getSpeechRecognition = (successCallback, failCallback) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onerror = () => {
    recognition.stop();
    failCallback('error.speechrec');
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    successCallback(result);
    recognition.stop();
  };

  recognition.onspeechend = () => {
    recognition.stop();
  };

  return recognition;
};

export default getSpeechRecognition;
