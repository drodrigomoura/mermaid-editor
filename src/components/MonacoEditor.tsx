import Editor, { type OnChange } from "@monaco-editor/react";

type MonacoEditorProps = {
  value: string | undefined;
  onChange: OnChange;
};

export const MonacoEditor = ({ value, onChange }: MonacoEditorProps) => (
  <Editor defaultLanguage="mermaid" defaultValue={value} onChange={onChange} />
);
