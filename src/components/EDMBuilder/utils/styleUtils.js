// Convert style object to string
export const styleToString = (styles) => {
    if (!styles || typeof styles !== 'object') {
      return '';
    }
    
    return Object.entries(styles)
      .filter(([_, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        const property = key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        return `${property}: ${value}`;
      })
      .join('; ');
  };