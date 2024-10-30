import { styleToString } from './styleUtils';

export const generateHTML = (structure) => {
  let html = '';
  
  structure.tables.forEach(table => {
    const tableStyles = {
      width: table.styles?.width || '600px',
      margin: '0 auto',
      backgroundColor: table.styles?.backgroundColor || '#ffffff',
      borderCollapse: 'collapse',
      ...table.styles
    };

    html += `<table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="${styleToString(tableStyles)}">\n`;
    
    table.rows.forEach(row => {
      const rowStyles = {
        backgroundColor: row.styles?.backgroundColor || 'transparent',
        ...row.styles
      };

      html += `  <tr style="${styleToString(rowStyles)}">\n`;
      
      row.columns.forEach(column => {
        const columnStyles = {
          padding: column.styles?.padding || '0',
          verticalAlign: column.styles?.verticalAlign || 'top',
          backgroundColor: column.styles?.backgroundColor || 'transparent',
          width: column.styles?.width || 'auto',
          ...column.styles
        };

        html += `    <td class="mobile-stack" style="${styleToString(columnStyles)}">\n`;
        
        column.components.forEach(component => {
          if (component.type === 'text') {
            const textStyles = {
              margin: '0',
              fontSize: component.styles?.fontSize || '16px',
              color: component.styles?.color || '#000000',
              fontFamily: component.styles?.fontFamily || 'Arial, sans-serif',
              paddingTop: component.styles?.paddingTop || '0',
              paddingRight: component.styles?.paddingRight || '0',
              paddingBottom: component.styles?.paddingBottom || '0',
              paddingLeft: component.styles?.paddingLeft || '0',
              ...component.styles
            };
            // Changed from div to p tag
            html += `      <p class="mobile-text" style="${styleToString(textStyles)}">${component.content}</p>\n`;
          } else if (component.type === 'image') {
            const imageStyles = {
              display: 'block',
              width: '100%',
              maxWidth: component.styles?.maxWidth || '100%',
              height: 'auto',
              margin: '0 auto',
              ...component.styles
            };
            html += `      <img src="${component.content}" alt="${component.styles?.alt || ''}" class="mobile-image" style="${styleToString(imageStyles)}" />\n`;
          }
        });
        
        html += '    </td>\n';
      });
      
      html += '  </tr>\n';
    });
    
    html += '</table>\n';
  });

  return html;
};