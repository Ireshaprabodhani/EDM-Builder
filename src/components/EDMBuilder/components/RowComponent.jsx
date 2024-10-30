import React from 'react';
import ComponentButton from '../ui/ComponentButton';
import DeleteButton from '../ui/DeleteButton';
import ColumnComponent from './ColumnComponent';
import { Plus } from 'lucide-react';

const RowComponent = ({ 
  row, 
  tableId, 
  onDelete, 
  onAddColumn,
  onDeleteColumn,
  onAddComponent,
  onDeleteComponent 
}) => (
  <div className="border rounded p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium">Row</span>
      <DeleteButton onClick={() => onDelete(tableId, row.id)} />
    </div>

    <ComponentButton
      icon={<Plus className="w-3 h-3" />}
      label="Add Column"
      onClick={() => onAddColumn(tableId, row.id)}
      className="mb-2 text-sm"
    />

    <div className="flex gap-2">
      {row.columns.map(column => (
        <ColumnComponent
          key={column.id}
          column={column}
          tableId={tableId}
          rowId={row.id}
          onDelete={onDeleteColumn}
          onAddComponent={onAddComponent}
          onDeleteComponent={onDeleteComponent}
        />
      ))}
    </div>
  </div>
);

export default RowComponent;