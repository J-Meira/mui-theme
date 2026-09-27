import { render, screen, fireEvent } from '@testing-library/react';
import { Mask } from '../../src/components/Input/Mask';

describe('Input Mask local mode value handling', () => {
  it('should mask typed input without a value prop', () => {
    render(<Mask name='phone' localControl label='Phone' maskModel='phone' />);
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '47999998888' } });
    expect(input).toHaveValue('(47) 99999-8888');
  });

  it('should follow a changed value prop', () => {
    const { rerender } = render(
      <Mask name='cpf' localControl label='CPF' maskModel='cpf' value='123' />,
    );
    expect(screen.getByLabelText('CPF')).toHaveValue('123');

    rerender(
      <Mask
        name='cpf'
        localControl
        label='CPF'
        maskModel='cpf'
        value='12345678901'
      />,
    );
    expect(screen.getByLabelText('CPF')).toHaveValue('123.456.789-01');
  });
});
