import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { EditorView } from '@codemirror/view';
import { autocompletion } from '@codemirror/autocomplete';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { indentUnit } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { indentWithTab } from '@codemirror/commands';
import { Maximize2, Minimize2, Copy } from 'lucide-react';

const htmlTags = [
  { label: 'table', type: 'tag', info: 'HTML table element' },
  { label: 'tr', type: 'tag', info: 'Table row' },
  { label: 'td', type: 'tag', info: 'Table cell' },
  { label: 'div', type: 'tag', info: 'Division or section' },
  { label: 'p', type: 'tag', info: 'Paragraph' },
  { label: 'span', type: 'tag', info: 'Inline container' },
  { label: 'img', type: 'tag', info: 'Image element' },
  { label: 'a', type: 'tag', info: 'Hyperlink' },
  { label: 'style', type: 'tag', info: 'Style information' },
  { label: 'link', type: 'tag', info: 'External resource link' },
  { label: 'meta', type: 'tag', info: 'Metadata' },
  { label: 'title', type: 'tag', info: 'Document title' },
  { label: 'head', type: 'tag', info: 'Document header section' },
  { label: 'body', type: 'tag', info: 'Document body' },
  { label: 'html', type: 'tag', info: 'HTML document root' },
];

const cssProperties = [
  { label: 'background-color', type: 'property', info: 'Sets background color' },
  { label: 'color', type: 'property', info: 'Sets text color' },
  { label: 'font-family', type: 'property', info: 'Sets font family' },
  { label: 'font-size', type: 'property', info: 'Sets font size' },
  { label: 'padding', type: 'property', info: 'Sets padding' },
  { label: 'margin', type: 'property', info: 'Sets margin' },
  { label: 'border', type: 'property', info: 'Sets border' },
  { label: 'width', type: 'property', info: 'Sets width' },
  { label: 'height', type: 'property', info: 'Sets height' },
  { label: 'display', type: 'property', info: 'Sets display type' },
  { label: 'position', type: 'property', info: 'Sets positioning method' },
  { label: 'text-align', type: 'property', info: 'Sets text alignment' },
  { label: 'font-weight', type: 'property', info: 'Sets font weight' },
];

const myCompletions = (context) => {
  const word = context.matchBefore(/\w*/);
  if (!word) return null;

  if (context.pos > 0) {
    const textBefore = context.state.doc.sliceString(0, context.pos);
    
    // If we're inside a style tag or CSS context
    if (textBefore.includes('style="') || textBefore.includes('<style>')) {
      return {
        from: word.from,
        options: cssProperties.map(prop => ({
          label: prop.label,
          type: 'property',
          detail: prop.type,
          info: prop.info
        }))
      };
    }
    
    // For HTML tags
    if (textBefore.slice(-1) === '<' || textBefore.slice(-2) === '</') {
      return {
        from: word.from,
        options: htmlTags.map(tag => ({
          label: tag.label,
          type: 'tag',
          detail: tag.type,
          info: tag.info
        }))
      };
    }
  }

  return null;
};

const EnhancedHTMLEditor = ({ initialCode, onUpdate }) => {
  const [code, setCode] = useState(initialCode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleChange = (value) => {
    setCode(value);
    onUpdate(value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : ''}`}>
      <div className="flex justify-between items-center mb-2 px-4 py-2 bg-gray-800 text-white rounded-t">
        <div className="text-sm font-medium">HTML Editor</div>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-300 hover:text-white rounded"
            title="Copy code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-gray-300 hover:text-white rounded"
            title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {showCopied && (
        <div className="absolute top-12 right-4 bg-gray-800 text-white px-3 py-1 rounded text-sm">
          Copied!
        </div>
      )}

      <CodeMirror
        value={code}
        height={isFullscreen ? '100vh' : '600px'}
        theme={vscodeDark}
        onChange={handleChange}
        extensions={[
          html(),
          javascript(),
          css(),
          autocompletion({ override: [myCompletions] }),
          indentUnit.of('  '),
          EditorView.lineWrapping,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              // Handle document changes here if needed
            }
          }),
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          highlightSelectionMatches: true,
          syntaxHighlighting: true,
        }}
        className={`border border-gray-700 ${isFullscreen ? 'h-screen' : ''}`}
      />

      {/* Status bar */}
      <div className="px-4 py-2 bg-gray-800 text-gray-400 text-sm rounded-b flex justify-between items-center">
        <div>HTML</div>
        <div>Press Ctrl+Space for suggestions</div>
      </div>
    </div>
  );
};

export default EnhancedHTMLEditor;