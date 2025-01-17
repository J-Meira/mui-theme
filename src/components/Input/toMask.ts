const cpf = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const cnpj = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

const creditCard = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d+?$)/, '$1');
};

const currency = (value: string, maxSize?: number) => {
  if (value.length === 0) return '';

  const onlyNumbers = value
    .replace(/\D/g, '')
    .replace(/^(0+)(\d)/g, '$2')
    .slice(0, maxSize);

  if (onlyNumbers.length === 1) return `0,0${onlyNumbers}`;
  if (onlyNumbers.length === 2) return `0,${onlyNumbers}`;

  return `${onlyNumbers
    .slice(0, -2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')},${onlyNumbers.slice(-2)}`;
};

const document = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');
  if (!onlyNumbers || onlyNumbers.length <= 11) return cpf(value);

  return cnpj(value);
};

const phone = (value: string) => {
  const onlyNumbers = value.replace(/\D/g, '');
  if (onlyNumbers.length < 11)
    return onlyNumbers
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d+?$)/, '$1');

  return onlyNumbers
    .replace(/(\d{0})(\d)/, '$1($2')
    .replace(/(\d{2})(\d)/, '$1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{4})(\d+?$)/, '$1');
};

const postalCode = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

const plate = (value: string) => {
  value = value
    .toUpperCase()
    .replace(/[^A-Za-z0-9]+/g, '')
    .replace(/([\d\w]{3})([\d\w])/, '$1-$2')
    .replace(/([\d\w]{4})([\d\w])/, '$1-$2')
    .slice(0, 8);
  return value.toUpperCase();
};

const upper = (value: string) => {
  return value.toUpperCase();
};

export const toMask = {
  cnpj,
  cpf,
  creditCard,
  currency,
  document,
  phone,
  postalCode,
  plate,
  upper,
};
