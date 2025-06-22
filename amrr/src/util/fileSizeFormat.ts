export const fileSizeFormat = (size: number): string => {
  if (!size) return "0 Bytes";

  const kb = size / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  if (kb >= 1) return `${kb.toFixed(2)} KB`;

  return `${size} Bytes`;
};
