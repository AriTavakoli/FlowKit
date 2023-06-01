import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import React, { useState, useEffect } from "react";

interface VoiceInputProps {
  onTranscribe: (transcript: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscribe }) => {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported by your browser. Please use a supported browser.");
      return;
    }

    const webkitRecognition: SpeechRecognition = new (window as any).webkitSpeechRecognition();
    webkitRecognition.continuous = false;
    webkitRecognition.interimResults = true;
    webkitRecognition.lang = "en-US";

    webkitRecognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        }
      }

      // Check if the transcribed text contains the word "stop"
      if (finalTranscript.trim().toLowerCase() === "stop") {
        if (recognition) recognition.stop();
        setIsListening(false);
        return;
      }

      onTranscribe(finalTranscript);
    };

    webkitRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(webkitRecognition);
  }, [onTranscribe]);

  const handleToggle = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
        setIsListening(true);
      }
    }
  };

  return (
      <RippleButton callBack={handleToggle} padding="4px">
        <Icon id={isListening ? "microPhoneOn" : "microPhoneOff"} size={16} color="grey" />
      </RippleButton>
  );
};

export default VoiceInput;
