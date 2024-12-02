export const formatTimestamp = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const wait = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));