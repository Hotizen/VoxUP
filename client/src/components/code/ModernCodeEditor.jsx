import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Copy, 
  Download,
  Maximize2,
  Minimize2,
  Lightbulb
} from 'lucide-react';
import Button from '../ui/Button';
import * as monaco from 'monaco-editor';

const ModernCodeEditor = ({ 
  initialValue = "print('Hello, World!')", 
  language = 'python',
  onChange,
  onRun,
  output = '',
  isRunning = false,
  showAIHelp = true
}) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [code, setCode] = useState(initialValue);

  useEffect(() => {
    if (editorRef.current) {
      // Configure Monaco Editor theme
      monaco.editor.defineTheme('voxup-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955' },
          { token: 'keyword', foreground: '569CD6' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
        ],
        colors: {
          'editor.background': '#1e1e1e',
          'editor.foreground': '#d4d4d4',
          'editorLineNumber.foreground': '#858585',
          'editor.selectionBackground': '#264f78',
          'editor.inactiveSelectionBackground': '#3a3d41',
        }
      });

      const editor = monaco.editor.create(editorRef.current, {
        value: initialValue,
        language: language,
        theme: 'voxup-dark',
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        minimap: { enabled: false },
        wordWrap: 'on',
        tabSize: 4,
        insertSpaces: true,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        glyphMargin: false,
      });

      monacoRef.current = editor;

      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        setCode(value);
        onChange?.(value);
      });

      return () => editor.dispose();
    }
  }, [initialValue, language, onChange]);

  const handleRun = () => {
    onRun?.(code);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleReset = () => {
    if (monacoRef.current) {
      monacoRef.current.setValue(initialValue);
      setCode(initialValue);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
        isFullscreen ? 'fixed inset-4 z-50' : ''
      }`}
    >
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-medium ml-4">
            Python Editor
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {showAIHelp && (
            <Button
              variant="ghost"
              size="sm"
              icon={<Lightbulb className="w-4 h-4" />}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              AI Help
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            icon={<Copy className="w-4 h-4" />}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            icon={isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          />
        </div>
      </div>

      {/* Editor */}
      <div className={`${isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-80'}`}>
        <div ref={editorRef} className="w-full h-full" />
      </div>

      {/* Controls */}
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t">
        <div className="flex items-center space-x-2">
          <Button
            variant="primary"
            onClick={handleRun}
            disabled={isRunning}
            icon={isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Reset
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Press Ctrl+Enter to run
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="bg-gray-900 text-green-400 p-4 font-mono text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Output:</span>
          </div>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </motion.div>
  );
};

export default ModernCodeEditor;