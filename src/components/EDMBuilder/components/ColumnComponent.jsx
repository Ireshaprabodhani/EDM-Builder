import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import DeleteButton from '../ui/DeleteButton';
import ComponentButton from '../ui/ComponentButton';
import StyleEditor from './StyleEditor';
import { ComponentConfig } from '../constants/componentConfig';
import { COMPONENT_TYPES } from '../constants/componentTypes';
import TextComponent from './ContentComponents/TextComponent';
import ImageComponent from './ContentComponents/ImageComponent';

const ColumnComponent = ({ 
  column, 
  tableId, 
  rowId, 
  styles,
  onDelete, 
  onAddComponent, 
  onDeleteComponent,
  onUpdateContent,
  onUpdateStyles 
}) => {
  const [showStyleEditor, setShowStyleEditor] = useState(false);

  return (
    <div className="flex-1 border rounded p-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Column</span>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStyleEditor(!showStyleEditor)}
            className="text-blue-500 hover:text-blue-600"
          >
            <Settings className="w-3 h-3" />
          </button>
          <DeleteButton onClick={() => onDelete(tableId, rowId, column.id)} />
        </div>
      </div>

      {showStyleEditor && (
        <StyleEditor 
          styles={styles}
          onUpdate={(newStyles) => onUpdateStyles(tableId, rowId, column.id, null, newStyles)}
        />
      )}

      <div className="flex flex-wrap gap-1 mb-2">
        {ComponentConfig.map(comp => (
          <ComponentButton
            key={comp.type}
            icon={comp.icon}
            label={comp.label}
            onClick={() => onAddComponent(tableId, rowId, column.id, comp.type)}
            className="text-sm"
          />
        ))}
      </div>

      <div className="space-y-2" style={styles}>
        {column.components.map(component => (
          <div key={component.id}>
            {component.type === COMPONENT_TYPES.TEXT ? (
              <TextComponent
                content={component.content}
                styles={component.styles}
                onDelete={() => onDeleteComponent(tableId, rowId, column.id, component.id)}
                onUpdate={(newContent) => onUpdateContent(tableId, rowId, column.id, component.id, newContent)}
                onStyleUpdate={(newStyles) => onUpdateStyles(tableId, rowId, column.id, component.id, newStyles)}
              />
            ) : (
              <ImageComponent
                src={component.content}
                styles={component.styles}
                onDelete={() => onDeleteComponent(tableId, rowId, column.id, component.id)}
                onUpdate={(newSrc) => onUpdateContent(tableId, rowId, column.id, component.id, newSrc)}
                onStyleUpdate={(newStyles) => onUpdateStyles(tableId, rowId, column.id, component.id, newStyles)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnComponent;