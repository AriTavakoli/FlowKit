import React from 'react';
import './toggleButton.scss'

interface CustomToggleButtonProps {
  featureName: string;
  isEnabled: boolean;
  onToggle: (featureName: string, selectedValue: boolean) => void;
}

const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({
  featureName,
  isEnabled,
  onToggle,
}) => {
  const handleChange = () => {
    onToggle(featureName, !isEnabled);
  };

  return (
    <div className="custom-toggle-button" onClick={handleChange}>
      <div className={`toggle-knob ${isEnabled ? 'active' : ''}`}></div>
    </div>
  );
};

export default CustomToggleButton;
