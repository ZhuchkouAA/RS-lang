const getSpeechRecognition = (successCallback) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;

  // const recoStart = () => {
  //   recognition.start();
  // };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    successCallback(result);
  };

  recognition.onend = () => {
    recognition.start();
  };

  return recognition;
};

export default getSpeechRecognition;
