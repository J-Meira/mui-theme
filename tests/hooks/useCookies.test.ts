import { useCookies } from '../../src/hooks/useCookies';

// Mock document.cookie
Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
});

describe('useCookies', () => {
  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie = '';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('set', () => {
    it('should set a cookie with default expiration', () => {
      useCookies.set('testKey', 'testValue');

      expect(document.cookie).toContain('testKey=testValue');
    });

    it('should set a cookie with custom expiration', () => {
      const customExpires = new Date('2024-12-31T23:59:59Z');
      useCookies.set('testKey', 'testValue', customExpires);

      expect(document.cookie).toContain('testKey=testValue');
    });

    it('should handle special characters in value', () => {
      const specialValue = 'test value with spaces';
      useCookies.set('testKey', specialValue);

      expect(document.cookie).toContain('testKey=test value with spaces');
    });
  });

  describe('get', () => {
    it('should return cookie value when cookie exists', () => {
      document.cookie = 'testKey=testValue;path=/';

      const result = useCookies.get('testKey');

      expect(result).toBe('testValue');
    });

    it('should return empty string when cookie does not exist', () => {
      const result = useCookies.get('nonExistentKey');

      expect(result).toBe('');
    });

    it('should handle cookies with special characters', () => {
      const specialValue = 'test value with spaces';
      document.cookie = `testKey=${specialValue};path=/`;

      const result = useCookies.get('testKey');

      expect(result).toBe(specialValue);
    });

    it('should return correct value when multiple cookies exist', () => {
      document.cookie = 'key1=value1;path=/';
      document.cookie = 'key2=value2;path=/';
      document.cookie = 'testKey=testValue;path=/';

      const result = useCookies.get('testKey');

      expect(result).toBe('testValue');
    });
  });

  describe('remove', () => {
    it('should remove an existing cookie', () => {
      // Set a cookie first
      document.cookie = 'testKey=testValue;path=/';
      expect(useCookies.get('testKey')).toBe('testValue');

      // Remove the cookie
      useCookies.remove('testKey');

      // In JSDOM, removed cookies show as empty string or quoted empty string
      const result = useCookies.get('testKey');
      expect(result === '' || result === '""').toBe(true);
    });

    it('should handle removing non-existent cookie gracefully', () => {
      expect(() => {
        useCookies.remove('nonExistentKey');
      }).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle empty key', () => {
      useCookies.set('', 'value');
      const result = useCookies.get('');
      expect(result).toBe('value');
    });

    it('should handle empty value', () => {
      useCookies.set('testKey', '');
      const result = useCookies.get('testKey');
      expect(result).toBe('');
    });
  });
});

describe('useCookies cookie string format', () => {
  beforeEach(() => {
    document.cookie = '';
  });

  it('should write the expiry in UTC string format', () => {
    useCookies.set('k', 'v', new Date(Date.UTC(2030, 0, 1)));
    expect(document.cookie).toBe(
      'k=v;expires=Tue, 01 Jan 2030 00:00:00 GMT;path=/',
    );
  });

  it('should default the expiry to two years ahead in UTC string format', () => {
    const year = new Date().getFullYear() + 2;
    useCookies.set('k', 'v');
    expect(document.cookie).toMatch(
      new RegExp(
        '^k=v;expires=[A-Z][a-z]{2}, [0-9]{2} [A-Z][a-z]{2} ' +
          year +
          ' [0-9]{2}:[0-9]{2}:[0-9]{2} GMT;path=/$',
      ),
    );
  });

  it('should remove by writing an empty value with an epoch expiry', () => {
    useCookies.remove('k');
    expect(document.cookie).toBe(
      'k=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/',
    );
  });
});
