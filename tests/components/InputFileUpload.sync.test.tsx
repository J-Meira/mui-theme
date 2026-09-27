import { render, screen } from '@testing-library/react';
import { FileUpload } from '../../src/components/Input/FileUpload';

describe('FileUpload value prop sync', () => {
  it('should follow a changed value prop and keep the last file when value becomes null', () => {
    const first = new File(['a'], 'first.pdf', { type: 'application/pdf' });
    const second = new File(['bb'], 'second.pdf', { type: 'application/pdf' });
    const { rerender } = render(
      <FileUpload name='fileUpload' label='Upload File' value={first} />,
    );
    expect(screen.getByLabelText('Upload File')).toHaveValue('first.pdf');

    rerender(
      <FileUpload name='fileUpload' label='Upload File' value={second} />,
    );
    expect(screen.getByLabelText('Upload File')).toHaveValue('second.pdf');

    rerender(<FileUpload name='fileUpload' label='Upload File' value={null} />);
    expect(screen.getByLabelText('Upload File')).toHaveValue('second.pdf');
  });
});
