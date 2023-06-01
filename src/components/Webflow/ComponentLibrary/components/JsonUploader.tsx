import React, { useState } from "react";
import ComponentLibOps from "../classes/ComponentLibOps";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";

function JsonUploader() {
  const [jsonData, setJsonData] = useState(null);
  const [componentName, setComponentName] = useState("");
  const [componentDescription, setComponentDescription] = useState("");

  async function handlePaste(event) {
    const pastedData =
      event.clipboardData.getData("application/json") ||
      event.clipboardData.getData("text");
    try {
      const parsedData = JSON.parse(pastedData);
      if (parsedData.type === "@webflow/XscpData" && parsedData.payload) {
        setJsonData(parsedData);
      } else {
        alert("Invalid JSON format. Please paste valid JSON data.");
      }
    } catch (error) {
      alert("Invalid JSON format. Please paste valid JSON data.");
    }
  }

  async function handleSave() {
    if (!componentName) {
      alert("Please enter a component name.");
      return;
    }

    const storageOps = new StorageOps();
    const componentExists = await storageOps.checkIfComponentWithNameExists(componentName);

    if (componentExists) {
      const overwrite = window.confirm("A component with this name already exists. Do you want to overwrite it?");
      if (!overwrite) return;
    }

    const payload = {
      componentName: componentName,
      componentData: jsonData,
      componentDescription: componentDescription,
    };

    await new StorageOps("tester", "webflowComponent", payload).addStorageItem();
    console.log("saved");

    console.log("Uploaded JSON data:", jsonData);
  }

  return (
    <div>
      <h2>Upload JSON Data</h2>
      <input
        type="text"
        placeholder="Component name"
        value={componentName}
        onChange={(e) => setComponentName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Component description"
        value={componentDescription}
        onChange={(e) => setComponentDescription(e.target.value)}
      />
      <textarea
        placeholder="Paste your JSON data here"
        onPaste={handlePaste}
        style={{ width: "100%", height: "200px" }}
      />
      <button onClick={handleSave}>Save</button>
      {jsonData && (
        <div>
          <h3>Uploaded JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default JsonUploader;
