export const formatCurrency = (raw: string): string => {
  const digits = raw.replace(/\D/g, '').replace(/^0+(\d)/, '$1');
  if (digits.length === 0) return '';
  if (digits.length === 1) return `0.0${digits}`;
  if (digits.length === 2) return `0.${digits}`;
  return `${digits.slice(0, -2)}.${digits.slice(-2)}`;
};
