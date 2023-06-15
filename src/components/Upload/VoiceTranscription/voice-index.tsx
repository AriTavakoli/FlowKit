import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import React, { useState, useEffect, useRef } from "react";
import Icon from "@src/components/IconWrapper/Icon";


interface VoiceInputModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const VoiceInputModal: React.FC<VoiceInputModalProps> = ({ isOpen, onRequestClose }) => {
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported by your browser. Please use a supported browser.");
      return;
    }

    const webkitRecognition: SpeechRecognition = new (window as any).webkitSpeechRecognition();
    webkitRecognition.continuous = true;
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

      setTranscript(finalTranscript);
    };

    recognitionRef.current = webkitRecognition;
  }, []);

  const handleStart = () => {
    if (recognitionRef.current) recognitionRef.current.start();
  };

  const handleStop = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
  };

  const modalStyle: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)",
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    margin: "15% auto",
    padding: "20px",
    border: "1px solid #888",
    width: "80%",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <h2>Voice Input</h2>
        <p>{transcript}</p>
        <Icon id="microPhone" size={16} color="grey" />
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default VoiceInputModal;
