import React, { useEffect, useState } from "react";
import webflowData from './Fragments/webflowComponent'
import JsonUploader from "./components/JsonUploader";
import ComponentLibOps from "./classes/ComponentLibOps";


import StorageOps from "../../Utils/LocalStorage/StorageOps";
function ComponentLibrary() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const codeSnippet = document.querySelector(".snippet");

    let textContent = codeSnippet.textContent;


    // Transform data into application/json format
    // const transformedData = {
    //   message: data.message.toUpperCase(),
    //   timestamp: new Date().toISOString()
    // };

    // Set clipboard data to transformed data as application/json
    document.addEventListener("copy", (event) => {
      event.clipboardData.setData("application/json", textContent);
      event.preventDefault();
    });

    // Copy transformed data to clipboard
    document.execCommand("copy");

    // Set "Copied to clipboard" message and reset after 3 seconds
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  async function fetchComponents() {
    await StorageOps.getAllComponents();
  }

  useEffect(() => {
  (async () => {
    console.log( await StorageOps.printAllStorageItems());
    fetchComponents();
  })()



  }, [])




  return (
    <div>
      <JsonUploader></JsonUploader>

      <p className="snippet" style={{ display: 'none' }}   > {JSON.stringify(webflowData)}</p>
      <button onClick={handleCopy}>
        {copied ? "Copied to clipboard" : "Copy this element"}
      </button>
    </div>
  );
}

export default ComponentLibrary;

