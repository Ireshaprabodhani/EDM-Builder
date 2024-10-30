import React, { useState, useEffect } from 'react';
import { Plus, Type, Image, X, Settings, ArrowUp, ArrowDown, Mail } from 'lucide-react';
import { generateId } from './utils/generateId';
import { generateHTML } from './utils/htmlGenerator';
import * as Components from './components/ContentComponents';
import StylePanel from './components/StylePanel/index';
import TestEmailModal from '../testEmail/TestEmailModal';


const EDMBuilder = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [structure, setStructure] = useState({ tables: [] });
  const [editingStyles, setEditingStyles] = useState(null);
  const [previewMode, setPreviewMode] = useState('preview');
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  

  const [columnWidthModal, setColumnWidthModal] = useState({
    show: false,
    tableId: null,
    rowId: null
  });

  const columnWidthPresets = [
    { name: '2 Equal Columns', layout: ['50%', '50%'] },
    { name: '3 Equal Columns', layout: ['33.33%', '33.33%', '33.33%'] },
    { name: '2 Columns (30/70)', layout: ['30%', '70%'] },
    { name: '2 Columns (70/30)', layout: ['70%', '30%'] },
    { name: '3 Columns (25/50/25)', layout: ['25%', '50%', '25%'] },
    { name: 'Full Width', layout: ['100%'] },
  ];

  const ColumnLayoutModal = ({ show, onClose, onSelect }) => {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-lg w-full">
          <h3 className="text-lg font-semibold mb-4">Select Column Layout</h3>
          <div className="grid grid-cols-2 gap-4">
            {columnWidthPresets.map((preset, index) => (
              <button
                key={index}
                onClick={() => onSelect(preset.layout)}
                className="p-4 border rounded hover:bg-gray-50 text-left"
              >
                <div className="font-medium mb-2">{preset.name}</div>
                <div className="flex gap-1">
                  {preset.layout.map((width, i) => (
                    <div
                      key={i}
                      className="h-8 bg-blue-100"
                      style={{ width: width }}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };



  // Add table
  const addTable = () => {
    const newTable = {
      id: generateId(),
      rows: [],
      styles: {
        width: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderCollapse: 'collapse'
      }
    };
    setStructure(prev => ({
      ...prev,
      tables: [...prev.tables, newTable]
    }));
  };
  
  const addFullWidthComponent = (tableId, type) => {
    const row = {
      id: generateId(),
      isFullWidth: true,
      columns: [{
        id: generateId(),
        isFullWidth: true,
        components: [{
          id: generateId(),
          type,
          content: type === 'text' ? 'Full Width Text' : '/api/placeholder/600/200',
          styles: type === 'text' ? {
            fontSize: '24px',
            color: '#000000',
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            width: '100%'
          } : {
            width: '600px',
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto'
          }
        }],
        styles: {
          // padding: '0',
          width: '600px'
        }
      }],
      styles: {
        backgroundColor: 'transparent',
        width: '600px'
      }
    };
  
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: [...table.rows, row]
          };
        }
        return table;
      })
    }));
  };

  // Add row to table
  const addRow = (tableId) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: [...table.rows, {
              id: generateId(),
              columns: [
                {
                  id: generateId(),
                  components: []
                }
              ]
            }]
          };
        }
        return table;
      })
    }));
  };

  // Add column to row
  const addColumns = (tableId, rowId, widths) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.map(row => {
              if (row.id === rowId) {
                const newColumns = widths.map(width => ({
                  id: generateId(),
                  components: [],
                  styles: {
                    backgroundColor: 'transparent',
                    // padding: '10px',
                    verticalAlign: 'top',
                    width: width,
                    display: 'inline-block', // Added for better column behavior
                    boxSizing: 'border-box'   // Added to include padding in width
                  }
                }));
  
                return {
                  ...row,
                  columns: newColumns
                };
              }
              return row;
            })
          };
        }
        return table;
      })
    }));
  };

  const addCustomColumns = (tableId, rowId) => {
    const numColumns = prompt('Enter number of columns (1-6):');
    if (numColumns && !isNaN(numColumns) && numColumns > 0 && numColumns <= 6) {
      const width = `${(100 / parseInt(numColumns)).toFixed(2)}%`;
      const widths = Array(parseInt(numColumns)).fill(width);
      addColumns(tableId, rowId, widths);
    }
  };

  // Update component content
  const updateComponentContent = (tableId, rowId, columnId, componentId, newContent) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.map(row => {
              if (row.id === rowId) {
                return {
                  ...row,
                  columns: row.columns.map(col => {
                    if (col.id === columnId) {
                      return {
                        ...col,
                        components: col.components.map(comp => {
                          if (comp.id === componentId) {
                            return { ...comp, content: newContent };
                          }
                          return comp;
                        })
                      };
                    }
                    return col;
                  })
                };
              }
              return row;
            })
          };
        }
        return table;
      })
    }));
  };

  // Update component styles
  const updateComponentStyles = (tableId, rowId, columnId, componentId, newStyles) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.map(row => {
              if (row.id === rowId) {
                return {
                  ...row,
                  columns: row.columns.map(col => {
                    if (col.id === columnId) {
                      return {
                        ...col,
                        components: col.components.map(comp => {
                          if (comp.id === componentId) {
                            return { ...comp, styles: { ...comp.styles, ...newStyles } };
                          }
                          return comp;
                        })
                      };
                    }
                    return col;
                  })
                };
              }
              return row;
            })
          };
        }
        return table;
      })
    }));
  };

  // Add text or image component to a column
  const addComponent = (tableId, rowId, columnId, type) => {
    if (!tableId || !rowId || !columnId) {
      console.warn('Missing required IDs for adding component');
      return;
    }
  
    const newComponent = {
      id: generateId(),
      type,
      content: type === 'text' ? 'New Text' : '/api/placeholder/400/200',
      styles: type === 'text' ? {
        fontSize: '16px',
        color: '#000000',
        // padding: '10px',
        fontFamily: 'Arial, sans-serif',
        margin: '0', // Added to ensure consistent spacing
        lineHeight: '1.5' // Added for better readability
      } : {
        width: '100%',
        maxWidth: '600px',
        height: 'auto',
        display: 'block',
        margin: '0 auto'
      }
    };
  
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.map(row => {
              if (row.id === rowId) {
                return {
                  ...row,
                  columns: row.columns.map(col => {
                    if (col.id === columnId) {
                      return {
                        ...col,
                        components: [...col.components, newComponent]
                      };
                    }
                    return col;
                  })
                };
              }
              return row;
            })
          };
        }
        return table;
      })
    }));
  };

  // Delete any element
  const deleteElement = (tableId, rowId = null, columnId = null, componentId = null) => {
    setStructure(prev => {
      if (componentId) {
        return {
          ...prev,
          tables: prev.tables.map(table => ({
            ...table,
            rows: table.rows.map(row => ({
              ...row,
              columns: row.columns.map(column => ({
                ...column,
                components: column.components.filter(comp => comp.id !== componentId)
              }))
            }))
          }))
        };
      } else if (columnId) {
        return {
          ...prev,
          tables: prev.tables.map(table => ({
            ...table,
            rows: table.rows.map(row => ({
              ...row,
              columns: row.columns.filter(col => col.id !== columnId)
            }))
          }))
        };
      } else if (rowId) {
        return {
          ...prev,
          tables: prev.tables.map(table => ({
            ...table,
            rows: table.rows.filter(row => row.id !== rowId)
          }))
        };
      } else {
        return {
          ...prev,
          tables: prev.tables.filter(table => table.id !== tableId)
        };
      }
    });
  };

  const moveComponent = (direction, tableId, rowId, columnId, componentId) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => {
        if (table.id === tableId) {
          return {
            ...table,
            rows: table.rows.map(row => {
              if (row.id === rowId) {
                return {
                  ...row,
                  columns: row.columns.map(column => {
                    if (column.id === columnId) {
                      const components = [...column.components];
                      const currentIndex = components.findIndex(comp => comp.id === componentId);
                      
                      if (currentIndex === -1) return column;
                      
                      const newIndex = direction === 'up' 
                        ? Math.max(0, currentIndex - 1)
                        : Math.min(components.length - 1, currentIndex + 1);
                      
                      // Swap components
                      [components[currentIndex], components[newIndex]] = 
                      [components[newIndex], components[currentIndex]];
                      
                      return {
                        ...column,
                        components: components
                      };
                    }
                    return column;
                  })
                };
              }
              return row;
            })
          };
        }
        return table;
      })
    }));
  };

  const updateTableStyles = (tableId, newStyles) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => 
        table.id === tableId 
          ? { ...table, styles: { ...table.styles, ...newStyles } }
          : table
      )
    }));
  };

  const updateRowStyles = (tableId, rowId, newStyles) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => ({
        ...table,
        rows: table.rows.map(row => 
          row.id === rowId 
            ? { ...row, styles: { ...row.styles, ...newStyles } }
            : row
        )
      }))
    }));
  };

  const updateColumnStyles = (tableId, rowId, columnId, newStyles) => {
    setStructure(prev => ({
      ...prev,
      tables: prev.tables.map(table => ({
        ...table,
        rows: table.rows.map(row => ({
          ...row,
          columns: row.columns.map(column => 
            column.id === columnId 
              ? { ...column, styles: { ...column.styles, ...newStyles } }
              : column
          )
        }))
      }))
    }));
  };

  const generateResponsiveHTML = (structure) => {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EDM Preview</title>
    <style>
      /* Reset styles */
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      
      table {
        border-spacing: 0;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        -ms-interpolation-mode: bicubic;
        max-width: 100%;
      }
  
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .mobile-full-width {
          width: 100% !important;
        }
        
        .mobile-padding {
          padding: 10px !important;
        }
  
        .mobile-stack {
          display: block !important;
          width: 100% !important;
        }
  
        .mobile-center {
          text-align: center !important;
        }
  
        .mobile-hide {
          display: none !important;
        }
      }
    </style>
  </head>
  <body>
    ${generateHTML(structure)}
  </body>
  </html>
  `;
  };

  const CodeEditor = ({ code, onChange }) => {
    return (
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[500px] font-mono text-sm p-4 bg-gray-50 border rounded"
        spellCheck="false"
      />
    );
  };

  
  const PreviewSection = ({ structure, setStructure }) => {
    const [code, setCode] = useState('');
    const [editedCode, setEditedCode] = useState('');
    const [isEdited, setIsEdited] = useState(false);
    const [previewMode, setPreviewMode] = useState('preview');
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSendTestEmail = async (emailData) => {
      setIsSending(true);
      try {
        console.log('Sending email:', emailData);
        
        const response = await fetch('http://localhost:3001/api/send-test-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: emailData.to,
            subject: emailData.subject,
            fromName: 'edm-test-mails',
            fromEmail: process.env.REACT_APP_SENDER_EMAIL,
            html: code || editedCode
          }),
          credentials: 'include'
        });
    
        const data = await response.json();
        console.log('Response:', data);
    
        if (!data.success) {
          throw new Error(data.error || 'Failed to send email');
        }
    
        alert('Test email sent successfully!');
        setIsEmailModalOpen(false);
      } catch (error) {
        console.error('Error sending test email:', error);
        alert(`Failed to send test email: ${error.message}`);
      } finally {
        setIsSending(false);
      }
    };
    
  
    useEffect(() => {
      if (structure) {
        const newCode = generateResponsiveHTML(structure);
        setCode(newCode);
        if (!isEdited) {
          setEditedCode(newCode);
        }
      }
    }, [structure, isEdited]);
  
    const parseHTMLToStructure = (htmlString) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      const tables = Array.from(doc.getElementsByTagName('table'));
      
      const newStructure = {
        tables: tables.map(table => {
          const tableId = generateId();
          const rows = Array.from(table.getElementsByTagName('tr'));
          
          return {
            id: tableId,
            styles: extractStyles(table.getAttribute('style')),
            rows: rows.map(row => {
              const rowId = generateId();
              const cells = Array.from(row.getElementsByTagName('td'));
              
              return {
                id: rowId,
                styles: extractStyles(row.getAttribute('style')),
                columns: cells.map(cell => {
                  const columnId = generateId();
                  const components = [];
                  
                  // Parse text components (p tags)
                  Array.from(cell.getElementsByTagName('p')).forEach(p => {
                    components.push({
                      id: generateId(),
                      type: 'text',
                      content: p.innerHTML,
                      styles: extractStyles(p.getAttribute('style'))
                    });
                  });
                  
                  // Parse image components
                  Array.from(cell.getElementsByTagName('img')).forEach(img => {
                    components.push({
                      id: generateId(),
                      type: 'image',
                      content: img.getAttribute('src'),
                      styles: extractStyles(img.getAttribute('style'))
                    });
                  });
                  
                  return {
                    id: columnId,
                    components,
                    styles: extractStyles(cell.getAttribute('style'))
                  };
                })
              };
            })
          };
        })
      };
      
      return newStructure;
    };
  
    const extractStyles = (styleString) => {
      if (!styleString) return {};
      
      const styles = {};
      const styleProps = styleString.split(';').filter(Boolean);
      
      styleProps.forEach(prop => {
        const [key, value] = prop.split(':').map(s => s.trim());
        if (key && value) {
          // Convert kebab-case to camelCase
          const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
          styles[camelKey] = value;
        }
      });
      
      return styles;
    };
  
    const handleCodeChange = (newCode) => {
      setEditedCode(newCode);
      setIsEdited(true);
    };
  
    const handleSave = () => {
      try {
        const newStructure = parseHTMLToStructure(editedCode);
        setStructure(newStructure);
        setCode(editedCode);
        setIsEdited(false);
      } catch (error) {
        console.error('Error parsing HTML:', error);
        alert('Error saving changes. Please check the HTML structure.');
      }
    };
  
    const handleRevert = () => {
      setEditedCode(code);
      setIsEdited(false);
    };
  
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setPreviewMode('preview')}
              className={`px-4 py-2 rounded-lg ${
                previewMode === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setPreviewMode('code')}
              className={`px-4 py-2 rounded-lg ${
                previewMode === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Code
            </button>

            <button
                  onClick={() => setIsEmailModalOpen(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Send Test Email
            </button>

            <TestEmailModal
                  isOpen={isEmailModalOpen}
                  onClose={() => setIsEmailModalOpen(false)}
                  onSend={handleSendTestEmail}
                  isSending={isSending}
            />
          </div>
  
          {previewMode === 'code' && isEdited && (
            <div className="flex gap-2">
              <button
                onClick={handleRevert}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Revert Changes
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          )}
          
        </div>
  
        {previewMode === 'preview' ? (
          <div className="border rounded">
            <div dangerouslySetInnerHTML={{ __html: code || '<p>No content to preview</p>' }} />
          </div>
        ) : (
          <div className="relative">
            <textarea
              value={editedCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-[500px] font-mono text-sm p-4 bg-gray-50 border rounded"
              spellCheck="false"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => navigator.clipboard.writeText(editedCode)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
          
        )}
      </div>
    );
  };

  const PaddingControls = ({ styles, onUpdate }) => (
    <div>
      <label className="block text-xs text-gray-600 mb-1">Padding</label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <input
            type="number"
            value={parseInt(styles.paddingTop) || 0}
            onChange={(e) => onUpdate({ paddingTop: `${e.target.value}px` })}
            className="w-full p-1 border rounded"
            placeholder="Top"
            min="0"
            max="100"
          />
          <span className="text-xs text-gray-500">Top</span>
        </div>
        <div>
          <input
            type="number"
            value={parseInt(styles.paddingRight) || 0}
            onChange={(e) => onUpdate({ paddingRight: `${e.target.value}px` })}
            className="w-full p-1 border rounded"
            placeholder="Right"
            min="0"
            max="100"
          />
          <span className="text-xs text-gray-500">Right</span>
        </div>
        <div>
          <input
            type="number"
            value={parseInt(styles.paddingBottom) || 0}
            onChange={(e) => onUpdate({ paddingBottom: `${e.target.value}px` })}
            className="w-full p-1 border rounded"
            placeholder="Bottom"
            min="0"
            max="100"
          />
          <span className="text-xs text-gray-500">Bottom</span>
        </div>
        <div>
          <input
            type="number"
            value={parseInt(styles.paddingLeft) || 0}
            onChange={(e) => onUpdate({ paddingLeft: `${e.target.value}px` })}
            className="w-full p-1 border rounded"
            placeholder="Left"
            min="0"
            max="100"
          />
          <span className="text-xs text-gray-500">Left</span>
        </div>
      </div>
    </div>
  );
  
  
  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">EDM Builder</h1>

        {/* Tabs */}
        <div className="mb-6 bg-white rounded-lg p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'editor' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'preview' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        {activeTab === 'editor' ? (
          <>
            {/* Add Elements Section */}
           
            <div className="bg-white rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Add Elements</h2>
              <div className="space-y-4">
                {/* Container elements */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Container Elements</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={addTable}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                    >
                      <Plus className="w-4 h-4" /> Add Table Container
                    </button>
                  </div>
                </div>

                {/* Full Width Elements */}
                {structure.tables.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Full Width Elements</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addFullWidthComponent(structure.tables[0].id, 'text')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <Type className="w-4 h-4" /> Add Full Width Text
                      </button>
                      <button
                        onClick={() => addFullWidthComponent(structure.tables[0].id, 'image')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <Image className="w-4 h-4" /> Add Full Width Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tables */}
            <div className="space-y-4">
              {structure.tables.map(table => (
                <div key={table.id} className="bg-white rounded-lg p-4">
                  {/* Table Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Table</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingStyles({ type: 'table', id: table.id })}
                        className="p-1 text-gray-500 hover:text-blue-500"
                        title="Edit Table Styles"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addRow(table.id)}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" /> Add Row
                      </button>
                      <button
                        onClick={() => deleteElement(table.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Table Style Panel */}
                  {editingStyles?.type === 'table' && editingStyles.id === table.id && (
                    <StylePanel
                      styles={table.styles}
                      onUpdate={(newStyles) => updateTableStyles(table.id, newStyles)}
                      type="table"
                    />
                  )}
                  
                  {/* Rows */}
                  <div className="space-y-4">
                    {table.rows.map(row => (
                      <div key={row.id} className="border rounded p-4">
                        {/* Row Header */}
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm font-medium">Row</span>
                          <div className="flex gap-2">
                             <div className="relative">
                                  <button
                                    onClick={() => setColumnWidthModal({
                                      show: true,
                                      tableId: table.id,
                                      rowId: row.id
                                    })}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-sm hover:bg-gray-100"
                                  >
                                    <Plus className="w-3 h-3" /> Add Columns
                                  </button>
                                  <button
                                    onClick={() => addCustomColumns(table.id, row.id)}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-sm hover:bg-gray-100 ml-2"
                                  >
                                    <Plus className="w-3 h-3" /> Custom Columns
                                  </button>
                              </div>
                              <button
                                onClick={() => deleteElement(table.id, row.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                          </div>
                        </div>

                        {/* Row Style Panel */}
                        {editingStyles?.type === 'row' && editingStyles.id === row.id && (
                          <StylePanel
                            styles={row.styles}
                            onUpdate={(newStyles) => updateRowStyles(table.id, row.id, newStyles)}
                            type="row"
                          />
                        )}

                      {/* Column Layout Modal */}
                      <ColumnLayoutModal
                          show={columnWidthModal.show && columnWidthModal.tableId === table.id && columnWidthModal.rowId === row.id}
                          onClose={() => setColumnWidthModal({ show: false, tableId: null, rowId: null })}
                          onSelect={(widths) => {
                            addColumns(table.id, row.id, widths);
                            setColumnWidthModal({ show: false, tableId: null, rowId: null });
                          }}
                        />
                        {/* Columns */}
                        <div className="flex flex-wrap gap-4">
                          {row.columns.map(column => (
                            <div 
                              key={column.id} 
                              className="border rounded p-4 flex-grow"
                              style={{ 
                                width: column.styles?.width || 'auto',
                                minWidth: column.styles?.width === '100%' ? '100%' : '200px',
                                flexBasis: column.styles?.width || 'auto'
                              }}
                            >
                              {/* Column Header */}
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-sm font-medium">Column</span>
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingStyles({ type: 'column', id: column.id })}
                                    className="p-1 text-gray-500 hover:text-blue-500"
                                    title="Edit Column Styles"
                                  >
                                    <Settings className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (table?.id && row?.id && column?.id) {
                                        addComponent(table.id, row.id, column.id, 'text')
                                      }
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-blue-500"
                                    title="Add Text"
                                  >
                                    <Type className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (table?.id && row?.id && column?.id) {
                                        addComponent(table.id, row.id, column.id, 'image')
                                      }
                                    }}
                                    className="flex items-center gap-1 px-2 py-1 text-gray-600 hover:text-blue-500"
                                    title="Add Image"
                                  >
                                    <Image className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (table?.id && row?.id && column?.id) {
                                        deleteElement(table.id, row.id, column.id)
                                      }
                                    }}
                                    className="text-gray-400 hover:text-red-500"
                                    title="Delete Column"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Column Style Panel */}
                              {editingStyles?.type === 'column' && editingStyles.id === column.id && (
                                <StylePanel
                                  styles={column.styles}
                                  onUpdate={(newStyles) => updateColumnStyles(table.id, row.id, column.id, newStyles)}
                                  type="column"
                                />
                              )}

                              {/* Components Container */}
                              <div className="space-y-2">
                                {column.components.map((component, index) => (
                                  <div key={component.id} className="relative">
                                    {/* Move buttons */}
                                    <div className="absolute right-2 top-2 flex flex-col gap-1">
                                      <button
                                        onClick={() => moveComponent('up', table.id, row.id, column.id, component.id)}
                                        className={`p-1 text-gray-400 hover:text-blue-500 ${
                                          index === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={index === 0}
                                        title="Move Up"
                                      >
                                        <ArrowUp className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => moveComponent('down', table.id, row.id, column.id, component.id)}
                                        className={`p-1 text-gray-400 hover:text-blue-500 ${
                                          index === column.components.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        disabled={index === column.components.length - 1}
                                        title="Move Down"
                                      >
                                        <ArrowDown className="w-4 h-4" />
                                      </button>
                                    </div>

                                    {/* Component content */}
                                    {component.type === 'text' ? (
                                      <div className="pr-12">  {/* Added padding for move buttons */}
                                        <Components.TextComponent
                                          component={component}
                                          onUpdate={(newContent) => 
                                            updateComponentContent(table.id, row.id, column.id, component.id, newContent)
                                          }
                                          onStyleUpdate={(newStyles) =>
                                            updateComponentStyles(table.id, row.id, column.id, component.id, newStyles)
                                          }
                                          onDelete={() => deleteElement(table.id, row.id, column.id, component.id)}
                                        />
                                      </div>
                                    ) : (
                                      <div className="pr-12">  {/* Added padding for move buttons */}
                                        <Components.ImageComponent
                                          component={component}
                                          onUpdate={(newContent) =>
                                            updateComponentContent(table.id, row.id, column.id, component.id, newContent)
                                          }
                                          onStyleUpdate={(newStyles) =>
                                            updateComponentStyles(table.id, row.id, column.id, component.id, newStyles)
                                          }
                                          onDelete={() => deleteElement(table.id, row.id, column.id, component.id)}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {structure.tables.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  Click "Add Table" to start building your EDM
                </div>
              )}
            </div>

            
          </>
        ) : (
            
                <PreviewSection 
                  structure={structure} 
                  setStructure={setStructure}
                /> 
        )}
      </div>
    </div>
  );
};

export default EDMBuilder;