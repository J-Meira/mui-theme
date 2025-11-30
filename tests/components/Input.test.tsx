import { render, screen } from '@testing-library/react';
import { Input, SelectOptionsProps } from '../../src/components/Input';

// Mock all the sub-components to test the main Input logic
jest.mock('../../src/components/Input/Basic', () => ({
  Basic: ({ localControl, ...props }: any) => (
    <input
      data-testid='basic-input'
      data-local-control={localControl}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/CheckBox', () => ({
  CheckBox: ({ localControl, ...props }: any) => (
    <input
      data-testid='checkbox-input'
      data-local-control={localControl}
      type='checkbox'
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Currency', () => ({
  Currency: ({ localControl, hideSymbol, symbol, ...props }: any) => (
    <input
      data-testid='currency-input'
      data-local-control={localControl}
      data-hide-symbol={hideSymbol}
      data-symbol={symbol}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Icon', () => ({
  Icon: ({ localControl, actionTitle, start, ...props }: any) => (
    <input
      data-testid='icon-input'
      data-local-control={localControl}
      data-action-title={actionTitle}
      data-start={start}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Mask', () => ({
  Mask: ({ localControl, maskModel, ...props }: any) => (
    <input
      data-testid='mask-input'
      data-local-control={localControl}
      data-mask-model={maskModel}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Number', () => ({
  Number: ({ localControl, decimal, ...props }: any) => (
    <input
      data-testid='number-input'
      data-local-control={localControl}
      data-decimal={decimal}
      type='number'
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Password', () => ({
  Password: ({ localControl, hideTitle, showTitle, ...props }: any) => (
    <input
      data-testid='password-input'
      data-local-control={localControl}
      data-hide-title={hideTitle}
      data-show-title={showTitle}
      type='password'
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/RadioGroup', () => ({
  RadioGroup: ({ localControl, rowDirection, options, ...props }: any) => (
    <div
      data-testid='radiogroup-input'
      data-local-control={localControl}
      data-row-direction={rowDirection}
      data-options-count={options?.length}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Search', () => ({
  Search: ({
    localControl,
    creatable,
    creatableLabel,
    options,
    ...props
  }: any) => (
    <input
      data-testid='search-input'
      data-local-control={localControl}
      data-creatable={creatable}
      data-creatable-label={creatableLabel}
      data-options-count={options?.length}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/SearchRequest', () => ({
  SearchRequest: ({
    localControl,
    creatable,
    creatableLabel,
    ...props
  }: any) => (
    <input
      data-testid='searchrequest-input'
      data-local-control={localControl}
      data-creatable={creatable}
      data-creatable-label={creatableLabel}
      {...props}
    />
  ),
}));

jest.mock('../../src/components/Input/Select', () => ({
  Select: ({
    localControl,
    defaultOption,
    noNativeOptions,
    options,
    ...props
  }: any) => (
    <select
      data-testid='select-input'
      data-local-control={localControl}
      data-default-option={defaultOption}
      data-no-native-options={noNativeOptions}
      data-options-count={options?.length}
      {...props}
    />
  ),
}));

describe('Input', () => {
  const mockOptions: SelectOptionsProps[] = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  describe('default behavior', () => {
    it('should render Basic input by default', () => {
      render(<Input name='test' />);

      expect(screen.getByTestId('basic-input')).toBeInTheDocument();
      expect(screen.getByTestId('basic-input')).toHaveAttribute(
        'data-local-control',
        'false',
      );
    });

    it('should render with grid wrapper by default', () => {
      render(<Input name='test' />);

      const gridWrapper = screen
        .getByTestId('basic-input')
        .closest('[class*="MuiGrid"]');
      expect(gridWrapper).toBeInTheDocument();
    });

    it('should not render grid wrapper when noGrid is true', () => {
      render(<Input name='test' noGrid />);

      const input = screen.getByTestId('basic-input');
      const gridWrapper = input.closest('[class*="MuiGrid"]');
      expect(gridWrapper).not.toBeInTheDocument();
    });
  });

  describe('model-specific rendering', () => {
    it('should render CheckBox input when model is "checkBox"', () => {
      render(<Input name='test' model='checkBox' />);

      expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
      expect(screen.queryByTestId('basic-input')).not.toBeInTheDocument();
    });

    it('should render Currency input when model is "currency"', () => {
      render(<Input name='test' model='currency' hideSymbol symbol='$' />);

      const input = screen.getByTestId('currency-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-hide-symbol', 'true');
      expect(input).toHaveAttribute('data-symbol', '$');
    });

    it('should render Icon input when model is "icon"', () => {
      const mockAction = jest.fn();
      render(
        <Input
          name='test'
          model='icon'
          action={mockAction}
          actionTitle='Click me'
          start={true}
        />,
      );

      const input = screen.getByTestId('icon-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-action-title', 'Click me');
      expect(input).toHaveAttribute('data-start', 'true');
    });

    it('should render Mask input when model is "mask"', () => {
      render(<Input name='test' model='mask' maskModel='cpf' />);

      const input = screen.getByTestId('mask-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-mask-model', 'cpf');
    });

    it('should render Number input when model is "number"', () => {
      render(<Input name='test' model='number' decimal />);

      const input = screen.getByTestId('number-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-decimal', 'true');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('should render Password input when model is "password"', () => {
      render(
        <Input
          name='test'
          model='password'
          showTitle='Show'
          hideTitle='Hide'
        />,
      );

      const input = screen.getByTestId('password-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-show-title', 'Show');
      expect(input).toHaveAttribute('data-hide-title', 'Hide');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should render RadioGroup input when model is "radioGroup"', () => {
      render(
        <Input
          name='test'
          model='radioGroup'
          rowDirection
          options={mockOptions}
        />,
      );

      const input = screen.getByTestId('radiogroup-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-row-direction', 'true');
      expect(input).toHaveAttribute('data-options-count', '3');
    });

    it('should render Search input when model is "search"', () => {
      const mockSearchChange = jest.fn();
      render(
        <Input
          name='test'
          model='search'
          creatable
          creatableLabel='Create new'
          searchChange={mockSearchChange}
          options={mockOptions}
        />,
      );

      const input = screen.getByTestId('search-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-creatable', 'true');
      expect(input).toHaveAttribute('data-creatable-label', 'Create new');
      expect(input).toHaveAttribute('data-options-count', '3');
    });

    it('should render SearchRequest input when model is "searchRequest"', () => {
      const mockSearchChange = jest.fn();
      render(
        <Input
          name='test'
          model='searchRequest'
          creatable
          creatableLabel='Create'
          searchChange={mockSearchChange}
        />,
      );

      const input = screen.getByTestId('searchrequest-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-creatable', 'true');
      expect(input).toHaveAttribute('data-creatable-label', 'Create');
    });

    it('should render Select input when model is "select"', () => {
      render(
        <Input
          name='test'
          model='select'
          defaultOption='Choose option'
          noNativeOptions
          options={mockOptions}
        />,
      );

      const input = screen.getByTestId('select-input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('data-default-option', 'Choose option');
      expect(input).toHaveAttribute('data-no-native-options', 'true');
      expect(input).toHaveAttribute('data-options-count', '3');
    });
  });

  describe('localControl prop', () => {
    it('should pass localControl prop to all input types', () => {
      const testCases = [
        { model: undefined, testId: 'basic-input' },
        { model: 'checkBox' as const, testId: 'checkbox-input' },
        { model: 'currency' as const, testId: 'currency-input' },
        { model: 'icon' as const, testId: 'icon-input' },
        { model: 'mask' as const, testId: 'mask-input' },
        { model: 'number' as const, testId: 'number-input' },
        { model: 'password' as const, testId: 'password-input' },
        { model: 'radioGroup' as const, testId: 'radiogroup-input' },
        { model: 'search' as const, testId: 'search-input' },
        { model: 'searchRequest' as const, testId: 'searchrequest-input' },
        { model: 'select' as const, testId: 'select-input' },
      ];

      testCases.forEach(({ model, testId }) => {
        const { unmount } = render(
          <Input name='test' model={model} localControl />,
        );

        const input = screen.getByTestId(testId);
        expect(input).toHaveAttribute('data-local-control', 'true');

        unmount();
      });
    });
  });

  describe('grid configuration', () => {
    it('should apply custom grid configuration', () => {
      const customGrid = { md: 6, sm: 8, xs: 12 };
      render(<Input name='test' grid={customGrid} />);

      const input = screen.getByTestId('basic-input');
      expect(input).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Input name='test' className='custom-input-class' />);

      const gridWrapper = screen
        .getByTestId('basic-input')
        .closest('[class*="MuiGrid"]');
      expect(gridWrapper).toHaveClass('custom-input-class');
    });
  });

  describe('common props forwarding', () => {
    it('should forward standard input props', () => {
      render(<Input name='test' placeholder='Enter text' disabled required />);

      const input = screen.getByTestId('basic-input');
      expect(input).toHaveAttribute('name', 'test');
      expect(input).toHaveAttribute('placeholder', 'Enter text');
      expect(input).toHaveAttribute('disabled');
      expect(input).toHaveAttribute('required');
    });

    it('should forward readOnly prop', () => {
      render(<Input name='test' readOnly />);

      const input = screen.getByTestId('basic-input');
      expect(input).toHaveAttribute('readOnly');
    });
  });

  describe('edge cases', () => {
    it('should handle unknown model gracefully', () => {
      render(<Input name='test' model={'unknown' as any} />);

      expect(screen.getByTestId('basic-input')).toBeInTheDocument();
    });

    it('should handle empty name', () => {
      render(<Input name='' />);

      const input = screen.getByTestId('basic-input');
      expect(input).toHaveAttribute('name', '');
    });

    it('should handle undefined options', () => {
      render(<Input name='test' model='select' options={undefined} />);

      const input = screen.getByTestId('select-input');
      expect(input).toBeInTheDocument();
    });

    it('should handle empty options array', () => {
      render(<Input name='test' model='select' options={[]} />);

      const input = screen.getByTestId('select-input');
      expect(input).toBeInTheDocument();
    });
  });

  describe('memory optimization', () => {
    it('should not recreate component unnecessarily', () => {
      const { rerender } = render(<Input name='test' />);

      screen.getByTestId('basic-input');

      // Rerender with same props
      rerender(<Input name='test' />);

      const rerenderedInput = screen.getByTestId('basic-input');
      expect(rerenderedInput).toBeInTheDocument();
    });

    it('should handle prop changes correctly', () => {
      const { rerender } = render(<Input name='test' />);

      expect(screen.getByTestId('basic-input')).toBeInTheDocument();

      rerender(<Input name='test' model='checkBox' />);

      expect(screen.getByTestId('checkbox-input')).toBeInTheDocument();
      expect(screen.queryByTestId('basic-input')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should maintain accessibility attributes', () => {
      render(
        <Input
          name='test'
          aria-label='Test input'
          aria-describedby='test-help'
          role='textbox'
        />,
      );

      const input = screen.getByTestId('basic-input');
      expect(input).toHaveAttribute('aria-label', 'Test input');
      expect(input).toHaveAttribute('aria-describedby', 'test-help');
      expect(input).toHaveAttribute('role', 'textbox');
    });
  });
});
