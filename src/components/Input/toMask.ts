const document = (value: string) => {
  const valueTest = value.replace(/\D/g, '');
  if (!valueTest || valueTest.length <= 11) {
    return cpf(value);
  } else {
    return cnpj(value);
  }
};

const cpf = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return value;
};

const cnpj = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
  return value;
};

const postalCode = (value: string) => {
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
  return value;
};

const phone = (value: string) => {
  value = value.replace(/\D/g, '');
  if (value.length < 11) {
    value = value
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d+?$)/, '$1');
  } else {
    value = value
      .replace(/(\d{0})(\d)/, '$1($2')
      .replace(/(\d{2})(\d)/, '$1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(\d{4})(\d+?$)/, '$1');
  }
  return value;
};

const upper = (value: string) => {
  return value.toUpperCase();
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

const currency = (value: string) => {
  let valueReturn = '';
  if (value && value.length > 0) {
    value = value.replace(/\D/g, '').replace(/^(0+)(\d)/g, '$2');
    let int = '';
    switch (value.length) {
      case 1:
        valueReturn = `0,0${value}`;
        break;
      case 2:
        valueReturn = `0,${value}`;
        break;
      default:
        int = value.slice(0, -2);
        int = int.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        valueReturn = `${int},${value.slice(-2)}`;
        break;
    }
  }

  return valueReturn;
};

export const toMask = {
  document,
  cpf,
  cnpj,
  postalCode,
  phone,
  plate,
  currency,
  upper,
};
