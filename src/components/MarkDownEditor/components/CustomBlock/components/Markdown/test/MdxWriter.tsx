import React from "react";

function MDXWriter({ content }) {
  const handleClick = () => {
    const markdown = `---\ntitle: My MDX File\n---\n\n${content}`; // Add frontmatter to the MDX content
    const blob = new Blob([markdown], { type: "text/mdx" }); // Create a Blob with the MDX content and type
    const url = URL.createObjectURL(blob); // Create a URL to the Blob

    // Create a link to the Blob URL and click it programmatically to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-mdx-file.mdx";
    a.click();

    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleClick}>Download MDX File</button>
  );
}

export default MDXWriter;
