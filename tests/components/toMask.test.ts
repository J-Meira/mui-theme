import { toMask } from '../../src/components/Input/toMask';

describe('toMask', () => {
  describe('cpf', () => {
    it('should format CPF correctly', () => {
      expect(toMask.cpf('12345678901')).toBe('123.456.789-01');
      expect(toMask.cpf('11111111111')).toBe('111.111.111-11');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.cpf('123.456.789-01')).toBe('123.456.789-01');
      expect(toMask.cpf('123abc456def789')).toBe('123.456.789');
    });

    it('should handle partial input', () => {
      expect(toMask.cpf('123')).toBe('123');
      expect(toMask.cpf('12345')).toBe('123.45');
      expect(toMask.cpf('12345678')).toBe('123.456.78');
    });

    it('should limit to 11 digits', () => {
      expect(toMask.cpf('123456789012345')).toBe('123.456.789-01');
    });
  });

  describe('cnpj', () => {
    it('should format CNPJ correctly', () => {
      expect(toMask.cnpj('12345678000190')).toBe('12.345.678/0001-90');
      expect(toMask.cnpj('11111111000111')).toBe('11.111.111/0001-11');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.cnpj('12.345.678/0001-90')).toBe('12.345.678/0001-90');
    });

    it('should handle partial input', () => {
      expect(toMask.cnpj('12')).toBe('12');
      expect(toMask.cnpj('12345')).toBe('12.345');
      expect(toMask.cnpj('12345678')).toBe('12.345.678');
      expect(toMask.cnpj('123456780001')).toBe('12.345.678/0001');
    });

    it('should limit to 14 digits', () => {
      expect(toMask.cnpj('12345678000190999')).toBe('12.345.678/0001-90');
    });
  });

  describe('creditCard', () => {
    it('should format credit card correctly', () => {
      expect(toMask.creditCard('1234567890123456')).toBe('1234 5678 9012 3456');
      expect(toMask.creditCard('4111111111111111')).toBe('4111 1111 1111 1111');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.creditCard('1234-5678-9012-3456')).toBe(
        '1234 5678 9012 3456',
      );
    });

    it('should handle partial input', () => {
      expect(toMask.creditCard('1234')).toBe('1234');
      expect(toMask.creditCard('12345')).toBe('1234 5');
      expect(toMask.creditCard('123456789')).toBe('1234 5678 9');
    });

    it('should limit to 16 digits', () => {
      expect(toMask.creditCard('12345678901234567890')).toBe(
        '1234 5678 9012 3456',
      );
    });
  });

  describe('currency', () => {
    it('should format currency correctly', () => {
      expect(toMask.currency('1000')).toBe('10,00');
      expect(toMask.currency('100000')).toBe('1.000,00');
      expect(toMask.currency('123456789')).toBe('1.234.567,89');
    });

    it('should handle small values', () => {
      expect(toMask.currency('1')).toBe('0,01');
      expect(toMask.currency('10')).toBe('0,10');
      expect(toMask.currency('100')).toBe('1,00');
    });

    it('should remove leading zeros', () => {
      expect(toMask.currency('0001000')).toBe('10,00');
      expect(toMask.currency('0000100')).toBe('1,00');
    });

    it('should return empty string for empty input', () => {
      expect(toMask.currency('')).toBe('');
    });

    it('should respect maxSize parameter', () => {
      expect(toMask.currency('123456789', 6)).toBe('1.234,56');
      expect(toMask.currency('123456789', 4)).toBe('12,34');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.currency('1.000,00')).toBe('1.000,00');
      expect(toMask.currency('abc123def456')).toBe('1.234,56');
    });
  });

  describe('document', () => {
    it('should format as CPF when 11 digits or less', () => {
      expect(toMask.document('12345678901')).toBe('123.456.789-01');
      expect(toMask.document('123456789')).toBe('123.456.789');
    });

    it('should format as CNPJ when more than 11 digits', () => {
      expect(toMask.document('12345678000190')).toBe('12.345.678/0001-90');
      expect(toMask.document('123456780001')).toBe('12.345.678/0001');
    });

    it('should handle empty or invalid input', () => {
      expect(toMask.document('')).toBe('');
      expect(toMask.document('abc')).toBe('');
    });
  });

  describe('phone', () => {
    it('should format 10-digit phone number', () => {
      expect(toMask.phone('1234567890')).toBe('(12) 3456-7890');
      expect(toMask.phone('1198765432')).toBe('(11) 9876-5432');
    });

    it('should format 11-digit phone number', () => {
      expect(toMask.phone('11987654321')).toBe('(11) 98765-4321');
      expect(toMask.phone('21912345678')).toBe('(21) 91234-5678');
    });

    it('should handle partial input', () => {
      expect(toMask.phone('11')).toBe('(11');
      expect(toMask.phone('119')).toBe('(11) 9');
      expect(toMask.phone('11987')).toBe('(11) 987');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.phone('(11) 98765-4321')).toBe('(11) 98765-4321');
    });

    it('should limit to 11 digits', () => {
      expect(toMask.phone('119876543219999')).toBe('(11) 98765-4321');
    });
  });

  describe('postalCode', () => {
    it('should format postal code correctly', () => {
      expect(toMask.postalCode('12345678')).toBe('12345-678');
      expect(toMask.postalCode('01310100')).toBe('01310-100');
    });

    it('should handle partial input', () => {
      expect(toMask.postalCode('12345')).toBe('12345');
      expect(toMask.postalCode('123456')).toBe('12345-6');
    });

    it('should remove non-digit characters', () => {
      expect(toMask.postalCode('12345-678')).toBe('12345-678');
      expect(toMask.postalCode('12abc345def678')).toBe('12345-678');
    });

    it('should limit to 9 characters including dash', () => {
      expect(toMask.postalCode('123456789999')).toBe('12345-678');
    });
  });

  describe('plate', () => {
    it('should format license plate correctly', () => {
      expect(toMask.plate('ABC1234')).toBe('ABC-1234');
      expect(toMask.plate('XYZ9999')).toBe('XYZ-9999');
    });

    it('should convert to uppercase', () => {
      expect(toMask.plate('abc1234')).toBe('ABC-1234');
      expect(toMask.plate('xyz9999')).toBe('XYZ-9999');
    });

    it('should handle partial input', () => {
      expect(toMask.plate('ABC')).toBe('ABC');
      expect(toMask.plate('ABC1')).toBe('ABC-1');
      expect(toMask.plate('ABC12')).toBe('ABC-12');
    });

    it('should remove special characters except dash', () => {
      expect(toMask.plate('ABC-1234')).toBe('ABC-1234');
      expect(toMask.plate('ABC@1#2$3%4')).toBe('ABC-1234');
    });

    it('should limit to 8 characters including dash', () => {
      expect(toMask.plate('ABC12345678')).toBe('ABC-1234');
    });

    it('should handle mercosul format', () => {
      expect(toMask.plate('ABC1D23')).toBe('ABC-1D23');
    });
  });

  describe('upper', () => {
    it('should convert string to uppercase', () => {
      expect(toMask.upper('hello')).toBe('HELLO');
      expect(toMask.upper('world')).toBe('WORLD');
      expect(toMask.upper('Test123')).toBe('TEST123');
    });

    it('should handle already uppercase strings', () => {
      expect(toMask.upper('HELLO')).toBe('HELLO');
      expect(toMask.upper('WORLD')).toBe('WORLD');
    });

    it('should handle empty strings', () => {
      expect(toMask.upper('')).toBe('');
    });

    it('should handle mixed case', () => {
      expect(toMask.upper('HeLLo WoRLd')).toBe('HELLO WORLD');
    });
  });
});
