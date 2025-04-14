import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ onChange, initialValue = "print('Hello, World!')" }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      value: initialValue,
      language: 'python',
      theme: 'vs-dark',
      automaticLayout: true,
    });

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      onChange(code); // Pass code to parent component
    });

    return () => editor.dispose(); // Clean up Monaco editor
  }, [onChange, initialValue]);

  return <div ref={editorRef} className="code-editor" />;
};

export default CodeEditor;
