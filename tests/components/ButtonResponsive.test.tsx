import { render, screen, fireEvent } from '@testing-library/react';
import { MdSave as SaveIcon } from 'react-icons/md';
import { Responsive } from '../../src/components/Button/Responsive';

describe('Button Responsive', () => {
  it('should render responsive button with text and icon', () => {
    render(<Responsive icon={<SaveIcon />}>Save</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should render with default icon when no icon provided', () => {
    render(<Responsive>Edit</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('should apply responsive-btn class', () => {
    render(<Responsive>Click Me</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('responsive-btn');
  });

  it('should handle click events', () => {
    const mockClick = jest.fn();

    render(<Responsive onClick={mockClick}>Submit</Responsive>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Responsive disabled>Disabled</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should apply custom color', () => {
    render(<Responsive color='primary'>Primary Button</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-colorPrimary');
  });

  it('should apply custom size', () => {
    render(<Responsive size='large'>Large Button</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-sizeLarge');
  });

  it('should apply variant styles', () => {
    render(<Responsive variant='outlined'>Outlined Button</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  it('should render custom icon', () => {
    render(<Responsive icon={<SaveIcon />}>Save Changes</Responsive>);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('should hide text on small screens with sx prop', () => {
    render(<Responsive>Responsive Text</Responsive>);

    const textElement = screen.getByText('Responsive Text');
    expect(textElement).toBeInTheDocument();
  });
});
