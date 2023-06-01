import Dropdown from '@src/components/Util/DropDown/DropDown';
import { SaveLocations } from '@src/types/SaveLocation/SaveLocation';
import React, { useState } from 'react';


const options: SaveLocations[] = [
  { value: 'default', label: 'Default', icon: 'none' },
  { value: 'template', label: 'Global Templates', icon: 'none' },
  { value: 'localFiles', label: 'Local Files', icon: 'none' },
  { value: 'nodeTemplates', label: 'Current Node', icon: 'none' },
  { value: 'cssTemplate', label: 'cssTemplate', icon: 'none' },
  { value: 'webflow', label: 'Webflow', icon: 'none' },
  { value: 'workspaceTemplates', label: 'Workspace Templates', icon: 'none' },
  { value: 'design', label: 'Design', icon: 'none' }
];

export default function SaveLocation({ handleSaveLocationChange }: SaveLocationsProps) {


  const [currentSaveLocation, setCurrentSaveLocation] = useState("Save Location");


  const handleDropdownChange = (selectedOption) => {
    console.log('setting selected renderer', selectedOption.value);
    setCurrentSaveLocation(selectedOption.value);
    handleSaveLocationChange(selectedOption.value);
  };



  return (
    <Dropdown
      icon={true}
      options={options}
      onChange={handleDropdownChange}
      label={currentSaveLocation}
    ></Dropdown>
  )
}


interface SaveLocationsProps {
  handleSaveLocationChange: (saveLocation: string) => void
}
