import React from 'react';
import ComponentButton from '../ui/ComponentButton';
import DeleteButton from '../ui/DeleteButton';
import RowComponent from './RowComponent';
import { Plus } from 'lucide-react';

const TableComponent = ({ 
  table, 
  onDelete,
  onAddRow,
  onDeleteRow,
  onAddColumn,
  onDeleteColumn,
  onAddComponent,
  onDeleteComponent
}) => (
  <div className="border rounded p-4">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">Table</h3>
      <DeleteButton onClick={() => onDelete(table.id)} />
    </div>

    <ComponentButton
      icon={<Plus className="w-4 h-4" />}
      label="Add Row"
      onClick={() => onAddRow(table.id)}
      className="mb-2"
    />

    <div className="space-y-2">
      {table.rows.map(row => (
        <RowComponent
          key={row.id}
          row={row}
          tableId={table.id}
          onDelete={onDeleteRow}
          onAddColumn={onAddColumn}
          onDeleteColumn={onDeleteColumn}
          onAddComponent={onAddComponent}
          onDeleteComponent={onDeleteComponent}
        />
      ))}
    </div>
  </div>
);

export default TableComponent;