import React from 'react';

const StylePanel = ({ styles, onUpdate, type }) => {
  return (
    <div className="border-t mt-2 pt-2 space-y-3">
      {/* Background Color */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Background Color</label>
        <input
          type="color"
          value={styles?.backgroundColor || '#ffffff'}
          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
          className="w-full h-8 rounded border"
        />
      </div>

      {/* Width (for table only) */}
      {type === 'table' && (
        <div>
          <label className="block text-xs text-gray-600 mb-1">Width</label>
          <select
            value={styles?.width || '100%'}
            onChange={(e) => onUpdate({ width: e.target.value })}
            className="w-full p-1 border rounded"
          >
            <option value="100%">Full Width (100%)</option>
            <option value="75%">75%</option>
            <option value="50%">50%</option>
            <option value="600px">600px</option>
            <option value="800px">800px</option>
          </select>
        </div>
      )}

    {type === 'column' && !styles.isFullWidth && (
    <div>
        <label className="block text-xs text-gray-600 mb-1">Column Width</label>
        <select
        value={styles.width || '50%'}
        onChange={(e) => onUpdate({ width: e.target.value })}
        className="w-full p-1 border rounded"
        >
        <option value="25%">25%</option>
        <option value="33%">33%</option>
        <option value="50%">50%</option>
        <option value="66%">66%</option>
        <option value="75%">75%</option>
        <option value="100%">100%</option>
        </select>
    </div>
    )}

      {/* Border */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Border</label>
        <div className="grid grid-cols-3 gap-2">
          <select
            value={styles?.borderStyle || 'none'}
            onChange={(e) => onUpdate({ borderStyle: e.target.value })}
            className="w-full p-1 border rounded"
          >
            <option value="none">None</option>
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
          <input
            type="number"
            value={parseInt(styles?.borderWidth) || 0}
            onChange={(e) => onUpdate({ borderWidth: `${e.target.value}px` })}
            className="w-full p-1 border rounded"
            placeholder="Width"
            min="0"
            max="10"
          />
          <input
            type="color"
            value={styles?.borderColor || '#000000'}
            onChange={(e) => onUpdate({ borderColor: e.target.value })}
            className="w-full h-8 rounded border"
          />
        </div>
      </div>

      {/* Padding */}
      <div>
        <label className="block text-xs text-gray-600 mb-1">Padding (px)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            value={parseInt(styles?.paddingTop) || 0}
            onChange={(e) => onUpdate({
              paddingTop: `${e.target.value}px`,
              paddingBottom: `${e.target.value}px`
            })}
            className="w-full p-1 border rounded"
            placeholder="Vertical"
            min="0"
            max="100"
          />
          <input
            type="number"
            value={parseInt(styles?.paddingLeft) || 0}
            onChange={(e) => onUpdate({
              paddingLeft: `${e.target.value}px`,
              paddingRight: `${e.target.value}px`
            })}
            className="w-full p-1 border rounded"
            placeholder="Horizontal"
            min="0"
            max="100"
          />
        </div>
      </div>

      {/* Vertical Align (for columns only) */}
      {type === 'column' && (
        <div>
          <label className="block text-xs text-gray-600 mb-1">Vertical Align</label>
          <select
            value={styles?.verticalAlign || 'top'}
            onChange={(e) => onUpdate({ verticalAlign: e.target.value })}
            className="w-full p-1 border rounded"
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default StylePanel;