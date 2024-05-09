export const getFileSize = (size: number): string => {
  if (size < 1024) return `${size} B`;
  size = size / 1024;
  if (size < 1024) return `${Math.ceil(size)} KB`;
  size = size / 1024;
  if (size < 1024) return `${size.toFixed(2)} MB`;
  size = size / 1024;
  return `${size.toFixed(2)} GB`;
};
