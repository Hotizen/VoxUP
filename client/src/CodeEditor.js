import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: `print("Hello, World!")`,
      language: 'python',
      theme: 'vs-dark',
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      onChange(code); // Pass code to parent component
    });

    return () => editor.dispose(); // Clean up Monaco editor
  }, [onChange]);

  return <div ref={editorRef} style={{ height: '400px', width: '100%' }} />;
};

export default CodeEditor;
