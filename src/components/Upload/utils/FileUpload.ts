
export const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        onUpload(jsonData);
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }
};

export const handleWorkspaceFileChange = (e, onWorkspaceUpload) => {
  const file = e.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const jsonData = JSON.parse(event.target.result);
      onWorkspaceUpload(jsonData);
    } catch {
      console.error("Invalid workspace file");
    }
  };
  reader.readAsText(file);
};

