import React from 'react';

const StyleEditor = ({ styles, onUpdate, type }) => {
  const commonStyles = (
    <>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Background Color</label>
        <input
          type="color"
          value={styles.backgroundColor || '#ffffff'}
          onChange={(e) => onUpdate({ backgroundColor: e.target.value })}
          className="w-full h-8 rounded border"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Padding (px)</label>
        <input
          type="number"
          value={parseInt(styles.padding) || 0}
          onChange={(e) => onUpdate({ padding: `${e.target.value}px` })}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Margin (px)</label>
        <input
          type="number"
          value={parseInt(styles.margin) || 0}
          onChange={(e) => onUpdate({ margin: `${e.target.value}px` })}
          className="w-full p-1 border rounded"
        />
      </div>
    </>
  );

  const textStyles = (
    <>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Font Size (px)</label>
        <input
          type="number"
          value={parseInt(styles.fontSize) || 16}
          onChange={(e) => onUpdate({ fontSize: `${e.target.value}px` })}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Text Color</label>
        <input
          type="color"
          value={styles.color || '#000000'}
          onChange={(e) => onUpdate({ color: e.target.value })}
          className="w-full h-8 rounded border"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Text Align</label>
        <select
          value={styles.textAlign || 'left'}
          onChange={(e) => onUpdate({ textAlign: e.target.value })}
          className="w-full p-1 border rounded"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Font Weight</label>
        <select
          value={styles.fontWeight || 'normal'}
          onChange={(e) => onUpdate({ fontWeight: e.target.value })}
          className="w-full p-1 border rounded"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Line Height</label>
        <input
          type="number"
          value={parseFloat(styles.lineHeight) || 1.5}
          onChange={(e) => onUpdate({ lineHeight: e.target.value })}
          className="w-full p-1 border rounded"
          step="0.1"
        />
      </div>
    </>
  );

  const imageStyles = (
    <>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Width</label>
        <select
          value={styles.width || '100%'}
          onChange={(e) => onUpdate({ width: e.target.value })}
          className="w-full p-1 border rounded"
        >
          <option value="100%">Full Width</option>
          <option value="75%">75%</option>
          <option value="50%">50%</option>
          <option value="25%">25%</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Alignment</label>
        <select
          value={styles.margin || '0 auto'}
          onChange={(e) => onUpdate({ margin: e.target.value })}
          className="w-full p-1 border rounded"
        >
          <option value="0 auto">Center</option>
          <option value="0">Left</option>
          <option value="0 0 0 auto">Right</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-gray-600 mb-1">Border Radius (px)</label>
        <input
          type="number"
          value={parseInt(styles.borderRadius) || 0}
          onChange={(e) => onUpdate({ borderRadius: `${e.target.value}px` })}
          className="w-full p-1 border rounded"
        />
      </div>
    </>
  );

  return (
    <div className="border-t mt-2 pt-2 space-y-3">
      {commonStyles}
      {type === 'text' && textStyles}
      {type === 'image' && imageStyles}
    </div>
  );
};

export default StyleEditor;