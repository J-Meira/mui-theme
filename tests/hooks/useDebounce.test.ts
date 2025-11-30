import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../src/hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('default behavior', () => {
    it('should execute function immediately on first call when noFirstTimeDelay is true', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(500, true));

      act(() => {
        result.current.debounce(mockFunc);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should debounce subsequent calls', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(500, true));

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        result.current.debounce(mockFunc);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockFunc).toHaveBeenCalledTimes(2);
    });

    it('should cancel previous timeout when called multiple times', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(500, true));

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        result.current.debounce(mockFunc);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(250);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(250);
      });

      expect(mockFunc).toHaveBeenCalledTimes(2);
    });
  });

  describe('with noFirstTimeDelay false', () => {
    it('should debounce even the first call', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(500, false));

      act(() => {
        result.current.debounce(mockFunc);
      });

      expect(mockFunc).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on subsequent calls', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(500, false));

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        jest.advanceTimersByTime(250);
      });

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        jest.advanceTimersByTime(250);
      });

      expect(mockFunc).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(250);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });

  describe('custom delay', () => {
    it('should use custom delay value', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(1000, false));

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockFunc).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });

    it('should handle zero delay', () => {
      const mockFunc = jest.fn();
      const { result } = renderHook(() => useDebounce(0, false));

      act(() => {
        result.current.debounce(mockFunc);
      });

      act(() => {
        jest.advanceTimersByTime(0);
      });

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple different functions', () => {
      const mockFunc1 = jest.fn();
      const mockFunc2 = jest.fn();
      const { result } = renderHook(() => useDebounce(500, true));

      act(() => {
        result.current.debounce(mockFunc1);
      });

      act(() => {
        result.current.debounce(mockFunc2);
      });

      expect(mockFunc1).toHaveBeenCalledTimes(1);
      expect(mockFunc2).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(mockFunc1).toHaveBeenCalledTimes(1);
      expect(mockFunc2).toHaveBeenCalledTimes(1);
    });

    it('should work with functions that throw errors', () => {
      const mockFunc = jest.fn(() => {
        throw new Error('Test error');
      });
      const { result } = renderHook(() => useDebounce(500, true));

      expect(() => {
        act(() => {
          result.current.debounce(mockFunc);
        });
      }).toThrow('Test error');

      expect(mockFunc).toHaveBeenCalledTimes(1);
    });
  });
});
