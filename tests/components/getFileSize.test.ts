import { getFileSize } from '../../src/components/Input/getFileSize';

describe('getFileSize', () => {
  it('should return size in bytes for values less than 1024', () => {
    expect(getFileSize(0)).toBe('0 B');
    expect(getFileSize(100)).toBe('100 B');
    expect(getFileSize(1023)).toBe('1023 B');
  });

  it('should return size in KB for values between 1024 and 1048575', () => {
    expect(getFileSize(1024)).toBe('1 KB');
    expect(getFileSize(2048)).toBe('2 KB');
    expect(getFileSize(10240)).toBe('10 KB');
    expect(getFileSize(1048575)).toBe('1024 KB');
  });

  it('should round up KB values using Math.ceil', () => {
    expect(getFileSize(1025)).toBe('2 KB');
    expect(getFileSize(1536)).toBe('2 KB');
    expect(getFileSize(2560)).toBe('3 KB');
  });

  it('should return size in MB for values between 1048576 and 1073741823', () => {
    expect(getFileSize(1048576)).toBe('1.00 MB');
    expect(getFileSize(5242880)).toBe('5.00 MB');
    expect(getFileSize(10485760)).toBe('10.00 MB');
  });

  it('should format MB with 2 decimal places', () => {
    expect(getFileSize(1572864)).toBe('1.50 MB');
    expect(getFileSize(2621440)).toBe('2.50 MB');
  });

  it('should return size in GB for values 1073741824 and above', () => {
    expect(getFileSize(1073741824)).toBe('1.00 GB');
    expect(getFileSize(2147483648)).toBe('2.00 GB');
    expect(getFileSize(5368709120)).toBe('5.00 GB');
  });

  it('should format GB with 2 decimal places', () => {
    expect(getFileSize(1610612736)).toBe('1.50 GB');
    expect(getFileSize(2684354560)).toBe('2.50 GB');
  });

  it('should handle edge cases', () => {
    expect(getFileSize(1)).toBe('1 B');
    expect(getFileSize(1024)).toBe('1 KB');
    expect(getFileSize(1048576)).toBe('1.00 MB');
    expect(getFileSize(1073741824)).toBe('1.00 GB');
  });
});
