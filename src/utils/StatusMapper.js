export const getStatus = (id) => {
    const statusMap = {
      0: 'Open',
      1: 'In Progress',
      2: 'Completed'
    };
  
    return statusMap[id] || 'Unknown Status';
  };