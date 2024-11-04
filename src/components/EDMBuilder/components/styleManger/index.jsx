import React, { useState } from 'react';
import { X, Settings } from 'lucide-react';

const StyleManager = ({ 
  selectedElement,
  onUpdateStyles,
  onClose 
}) => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Style Manager</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {selectedElement ? (
          <div className="space-y-6">
            {/* Typography */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Typography</h4>
              <select
                value={selectedElement.styles?.fontFamily || "'Open Sans', sans-serif"}
                onChange={(e) => onUpdateStyles({ fontFamily: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="sans-serif">Sans Serif</option>
              </select>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">Size</label>
                  <input
                    type="number"
                    value={parseInt(selectedElement.styles?.fontSize) || 16}
                    onChange={(e) => onUpdateStyles({ fontSize: `${e.target.value}px` })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Weight</label>
                  <select
                    value={selectedElement.styles?.fontWeight || 'normal'}
                    onChange={(e) => onUpdateStyles({ fontWeight: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="normal">Regular</option>
                    <option value="600">Semi Bold</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Colors</h4>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">Text Color</label>
                  <input
                    type="color"
                    value={selectedElement.styles?.color || '#000000'}
                    onChange={(e) => onUpdateStyles({ color: e.target.value })}
                    className="w-full h-8 rounded border"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">Background</label>
                  <input
                    type="color"
                    value={selectedElement.styles?.backgroundColor || '#ffffff'}
                    onChange={(e) => onUpdateStyles({ backgroundColor: e.target.value })}
                    className="w-full h-8 rounded border"
                  />
                </div>
              </div>
            </div>

            {/* Spacing */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Spacing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-600">Padding</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Top"
                      value={parseInt(selectedElement.styles?.paddingTop) || 0}
                      onChange={(e) => onUpdateStyles({ paddingTop: `${e.target.value}px` })}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Right"
                      value={parseInt(selectedElement.styles?.paddingRight) || 0}
                      onChange={(e) => onUpdateStyles({ paddingRight: `${e.target.value}px` })}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Bottom"
                      value={parseInt(selectedElement.styles?.paddingBottom) || 0}
                      onChange={(e) => onUpdateStyles({ paddingBottom: `${e.target.value}px` })}
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Left"
                      value={parseInt(selectedElement.styles?.paddingLeft) || 0}
                      onChange={(e) => onUpdateStyles({ paddingLeft: `${e.target.value}px` })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Responsiveness */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Mobile Settings</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedElement.styles?.mobileStack || false}
                    onChange={(e) => onUpdateStyles({ mobileStack: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Stack on Mobile</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedElement.styles?.mobileHide || false}
                    onChange={(e) => onUpdateStyles({ mobileHide: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm">Hide on Mobile</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center py-4">
            Select an element to edit its styles
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleManager;