import React from 'react';
import { Table, Type, Image } from 'lucide-react';
import { COMPONENT_TYPES } from './componentTypes';

export const ComponentConfig = [
  { type: COMPONENT_TYPES.TABLE, icon: <Table className="w-4 h-4" />, label: 'Table' },
  { type: COMPONENT_TYPES.TEXT, icon: <Type className="w-4 h-4" />, label: 'Text' },
  { type: COMPONENT_TYPES.IMAGE, icon: <Image className="w-4 h-4" />, label: 'Image' }
];
