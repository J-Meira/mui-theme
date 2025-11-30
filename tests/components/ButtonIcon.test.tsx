import { render, screen, fireEvent } from '@testing-library/react';
import { MdDelete as DeleteIcon } from 'react-icons/md';
import { Icon } from '../../src/components/Button/Icon';

describe('Button Icon', () => {
  it('should render icon button with children', () => {
    render(
      <Icon>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should apply small size by default', () => {
    render(
      <Icon>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiIconButton-sizeSmall');
  });

  it('should apply custom size when provided', () => {
    render(
      <Icon size='large'>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiIconButton-sizeLarge');
  });

  it('should handle click events', () => {
    const mockClick = jest.fn();

    render(
      <Icon onClick={mockClick}>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <Icon disabled>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should apply custom color', () => {
    render(
      <Icon color='primary'>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiIconButton-colorPrimary');
  });

  it('should pass through additional props', () => {
    render(
      <Icon aria-label='Delete item'>
        <DeleteIcon />
      </Icon>,
    );

    const button = screen.getByRole('button', { name: 'Delete item' });
    expect(button).toBeInTheDocument();
  });
});
