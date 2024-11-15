"use client";
import { memo } from 'react';
import MonacoEditor from "@monaco-editor/react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = memo(function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <MonacoEditor
      defaultLanguage="markdown"
      theme="vs-dark"
      value={value}
      onChange={(value) => onChange(value || "")}
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        fontSize: 16,
        fontFamily: "monospace",
        renderWhitespace: "boundary",
        quickSuggestions: false,
        contextmenu: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      height="100%"
    />
  );
})

export default MarkdownEditor;