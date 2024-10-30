import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';

function ImageComponent({ component, onUpdate, onStyleUpdate, onDelete }) {
  const [showStyles, setShowStyles] = useState(false);

  return (
    <div className="border rounded p-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Image</span>
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

      <input
        type="text"
        value={component.content}
        onChange={(e) => onUpdate(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder="Enter image URL"
      />

      <img
        src={component.content}
        alt="Preview"
        style={component.styles}
        className="w-full"
      />

      {showStyles && (
        <div className="border-t mt-2 pt-2 space-y-3">
          {/* Width */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Width</label>
            <select
              value={component.styles.width || '100%'}
              onChange={(e) => onStyleUpdate({ width: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="100%">Full Width (100%)</option>
              <option value="75%">75%</option>
              <option value="50%">50%</option>
              <option value="25%">25%</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          {/* Max Width */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Max Width (px)</label>
            <input
              type="number"
              value={parseInt(component.styles.maxWidth) || 600}
              onChange={(e) => onStyleUpdate({ maxWidth: `${e.target.value}px` })}
              className="w-full p-1 border rounded"
              min="50"
              max="1200"
            />
          </div>

          {/* Alignment */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Alignment</label>
            <select
              value={component.styles.margin || '0'}
              onChange={(e) => onStyleUpdate({ margin: e.target.value })}
              className="w-full p-1 border rounded"
            >
              <option value="0">Left</option>
              <option value="0 auto">Center</option>
              <option value="0 0 0 auto">Right</option>
            </select>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Border Radius (px)</label>
            <input
              type="number"
              value={parseInt(component.styles.borderRadius) || 0}
              onChange={(e) => onStyleUpdate({ borderRadius: `${e.target.value}px` })}
              className="w-full p-1 border rounded"
              min="0"
              max="50"
            />
          </div>

          {/* Padding */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Padding Top (px)</label>
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
              <label className="block text-xs text-gray-600 mb-1">Padding Bottom (px)</label>
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
              <label className="block text-xs text-gray-600 mb-1">Padding Right (px)</label>
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

          {/* Alt Text */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Alt Text</label>
            <input
              type="text"
              value={component.styles.alt || ''}
              onChange={(e) => onStyleUpdate({ alt: e.target.value })}
              className="w-full p-1 border rounded"
              placeholder="Image description for accessibility"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageComponent;