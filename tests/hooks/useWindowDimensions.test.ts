import { renderHook, act } from '@testing-library/react';
import { useWindowDimensions } from '../../src/hooks/useWindowDimensions';

// Mock window dimensions
const mockWindowDimensions = {
  innerWidth: 1024,
  innerHeight: 768,
};

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: mockWindowDimensions.innerWidth,
});

Object.defineProperty(window, 'innerHeight', {
  writable: true,
  configurable: true,
  value: mockWindowDimensions.innerHeight,
});

describe('useWindowDimensions', () => {
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  describe('initial state', () => {
    it('should return current window dimensions on mount', () => {
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current).toEqual({
        width: 1024,
        height: 768,
      });
    });

    it('should set up resize event listener on mount', () => {
      renderHook(() => useWindowDimensions());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );
    });
  });

  describe('resize handling', () => {
    it('should update dimensions when window is resized', () => {
      const { result } = renderHook(() => useWindowDimensions());

      expect(result.current).toEqual({
        width: 1024,
        height: 768,
      });

      // Simulate window resize
      act(() => {
        window.innerWidth = 1200;
        window.innerHeight = 800;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 1200,
        height: 800,
      });
    });

    it('should handle multiple resize events', () => {
      const { result } = renderHook(() => useWindowDimensions());

      // First resize
      act(() => {
        window.innerWidth = 800;
        window.innerHeight = 600;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 800,
        height: 600,
      });

      // Second resize
      act(() => {
        window.innerWidth = 1440;
        window.innerHeight = 900;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 1440,
        height: 900,
      });
    });

    it('should handle mobile-like dimensions', () => {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        window.innerWidth = 375;
        window.innerHeight = 667;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 375,
        height: 667,
      });
    });

    it('should handle very small dimensions', () => {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        window.innerWidth = 100;
        window.innerHeight = 100;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 100,
        height: 100,
      });
    });

    it('should handle very large dimensions', () => {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        window.innerWidth = 3840;
        window.innerHeight = 2160;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 3840,
        height: 2160,
      });
    });
  });

  describe('cleanup', () => {
    it('should remove event listener on unmount', () => {
      const { unmount } = renderHook(() => useWindowDimensions());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        expect.any(Function),
      );
    });

    it('should remove the same function that was added', () => {
      const { unmount } = renderHook(() => useWindowDimensions());

      const addedFunction = addEventListenerSpy.mock.calls[0][1];

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'resize',
        addedFunction,
      );
    });
  });

  describe('edge cases', () => {
    it('should handle zero dimensions', () => {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        window.innerWidth = 0;
        window.innerHeight = 0;
        window.dispatchEvent(new Event('resize'));
      });

      expect(result.current).toEqual({
        width: 0,
        height: 0,
      });
    });

    it('should handle rapid resize events', () => {
      const { result } = renderHook(() => useWindowDimensions());

      act(() => {
        // Simulate rapid resize events
        for (let i = 0; i < 10; i++) {
          window.innerWidth = 1000 + i * 10;
          window.innerHeight = 700 + i * 5;
          window.dispatchEvent(new Event('resize'));
        }
      });

      expect(result.current).toEqual({
        width: 1090,
        height: 745,
      });
    });
  });
});
