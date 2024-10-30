import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

function TextComponent({ component, onUpdate, onStyleUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showStyles, setShowStyles] = useState(false);

  return (
    <div className="border rounded p-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Text</span>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStyles(!showStyles)}
            className="p-1 text-gray-500 hover:text-blue-500"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-500 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <textarea
          value={component.content}
          onChange={(e) => onUpdate(e.target.value)}
          onBlur={() => setIsEditing(false)}
          className="w-full p-2 border rounded min-h-[100px]"
          autoFocus
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={component.styles}
          className="cursor-pointer p-2"
        >
          {component.content || 'Click to edit text'}
        </div>
      )}

      {/* Style Controls */}
      {showStyles && (
        <div className="border-t mt-2 pt-2 space-y-3">
          {/* Font Family */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Family</label>
            <select
              value={component.styles.fontFamily || 'Arial'}
              onChange={(e) => onStyleUpdate({ fontFamily: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Tahoma, sans-serif">Tahoma</option>
              <option value="Trebuchet MS, sans-serif">Trebuchet MS</option>
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Size (px)</label>
            <input
              type="number"
              value={parseInt(component.styles.fontSize) || 16}
              onChange={(e) => onStyleUpdate({ fontSize: `${e.target.value}px` })}
              className="w-full p-1 border rounded"
              min="8"
              max="72"
            />
          </div>

          {/* Font Style */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Style</label>
            <select
              value={component.styles.fontStyle || 'normal'}
              onChange={(e) => onStyleUpdate({ fontStyle: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="italic">Italic</option>
            </select>
          </div>

          {/* Font Weight */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
            <select
              value={component.styles.fontWeight || 'normal'}
              onChange={(e) => onStyleUpdate({ fontWeight: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Light</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Color</label>
            <input
              type="color"
              value={component.styles.color || '#000000'}
              onChange={(e) => onStyleUpdate({ color: e.target.value })}
              className="w-full h-8 rounded border"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Background Color</label>
            <input
              type="color"
              value={component.styles.backgroundColor || '#ffffff'}
              onChange={(e) => onStyleUpdate({ backgroundColor: e.target.value })}
              className="w-full h-8 rounded border"
            />
          </div>

          {/* Text Alignment */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Text Align</label>
            <select
              value={component.styles.textAlign || 'left'}
              onChange={(e) => onStyleUpdate({ textAlign: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </div>

          {/* Line Height */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Line Height</label>
            <input
              type="number"
              value={parseFloat(component.styles.lineHeight) || 1.5}
              onChange={(e) => onStyleUpdate({ lineHeight: e.target.value })}
              className="w-full p-1 border rounded"
              step="0.1"
              min="1"
              max="3"
            />
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Letter Spacing (px)</label>
            <input
              type="number"
              value={parseInt(component.styles.letterSpacing) || 0}
              onChange={(e) => onStyleUpdate({ letterSpacing: `${e.target.value}px` })}
              className="w-full p-1 border rounded"
              min="-3"
              max="10"
            />
          </div>

          {/* Padding */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Padding top (px)</label>
              <input
                type="number"
                value={parseInt(component.styles.paddingTop) || 0}
                onChange={(e) => onStyleUpdate({
                  paddingTop: `${e.target.value}px`,
                  // paddingBottom: `${e.target.value}px`
                })}
                className="w-full p-1 border rounded"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Padding bottom (px)</label>
              <input
                type="number"
                value={parseInt(component.styles.paddingBottom) || 0}
                onChange={(e) => onStyleUpdate({
                  // paddingTop: `${e.target.value}px`,
                  paddingBottom: `${e.target.value}px`
                })}
                className="w-full p-1 border rounded"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Padding Left (px)</label>
              <input
                type="number"
                value={parseInt(component.styles.paddingLeft) || 0}
                onChange={(e) => onStyleUpdate({
                  paddingLeft: `${e.target.value}px`,
                  // paddingRight: `${e.target.value}px`
                })}
                className="w-full p-1 border rounded"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Padding right (px)</label>
              <input
                type="number"
                value={parseInt(component.styles.paddingRight) || 0}
                onChange={(e) => onStyleUpdate({
                  // paddingLeft: `${e.target.value}px`,
                  paddingRight: `${e.target.value}px`
                })}
                className="w-full p-1 border rounded"
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TextComponent;