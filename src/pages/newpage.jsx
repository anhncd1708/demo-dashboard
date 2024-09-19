import React, { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun } from 'docx';

function DocxEditor() {
  const [content, setContent] = useState('');

  // Function to load .docx file
  const loadDocx = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer });
    setContent(result.value);
  };

  // Function to save changes back to .docx
  const saveDocx = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun(content),
            ],
          }),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.docx';
    a.click();
  };

  return (
    <div>
      <input type="file" onChange={(e) => loadDocx(e.target.files[0])} />
      <div contentEditable dangerouslySetInnerHTML={{ __html: content }} />
      <button onClick={saveDocx}>Save</button>
    </div>
  );
}

export default DocxEditor;