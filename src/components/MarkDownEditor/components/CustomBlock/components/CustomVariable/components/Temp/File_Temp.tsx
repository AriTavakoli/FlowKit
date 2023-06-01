const FileTemp = ({
  handleFileChange,
  fileName, // Use the fileName prop
  setFileName,
}) => {
  const handleLocalFileChange = (e) => {
    // Call the handleFileChange from the parent
    handleFileChange(e);

    const file = e.target.files[0];
    if (!file) {
      return;
    }

    // Store the file name
    const fileName = file.name;
    //get first 20 characters of file name
    const shortFileName = fileName.substring(0, 20);

    setFileName(shortFileName); // Update the file name in the parent component
  };

  return (
    <div>
      <input type="file" onChange={handleLocalFileChange} />
      {fileName && (
        <div>
          <p>File Name: {fileName}</p>
        </div>
      )}
    </div>
  );
};


export default FileTemp;