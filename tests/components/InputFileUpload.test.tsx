import { render, screen, fireEvent } from '@testing-library/react';
import { FileUpload } from '../../src/components/Input/FileUpload';

describe('FileUpload', () => {
  const createFile = (name: string, size: number, type: string) => {
    const file = new File(['content'], name, { type });
    Object.defineProperty(file, 'size', { value: size });
    return file;
  };

  it('should render with label', () => {
    render(<FileUpload name='fileUpload' label='Upload File' />);
    expect(screen.getByLabelText('Upload File')).toBeInTheDocument();
  });

  it('should display placeholder', () => {
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        placeholder='Select a file'
      />,
    );
    expect(screen.getByPlaceholderText('Select a file')).toBeInTheDocument();
  });

  it('should handle file selection', () => {
    const handleChange = jest.fn();
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        onChange={handleChange}
      />,
    );

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });
    expect(handleChange).toHaveBeenCalledWith(file);
  });

  it('should display file name after selection', () => {
    render(<FileUpload name='fileUpload' label='Upload File' />);

    const file = createFile('document.pdf', 2048, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    const textInput = screen.getByLabelText('Upload File') as HTMLInputElement;
    expect(textInput.value).toBe('document.pdf');
  });

  it('should display file size after selection', () => {
    render(<FileUpload name='fileUpload' label='Upload File' />);

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    expect(screen.getByText('1 KB')).toBeInTheDocument();
  });

  it('should hide file size when hideSizeText is true', () => {
    render(<FileUpload name='fileUpload' label='Upload File' hideSizeText />);

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    expect(screen.queryByText('1 KB')).not.toBeInTheDocument();
  });

  it('should handle file deletion', () => {
    const handleChange = jest.fn();
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        onChange={handleChange}
      />,
    );

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    const deleteButton = screen.getByTitle('Delete file');
    fireEvent.click(deleteButton);

    expect(handleChange).toHaveBeenCalledWith(null);
  });

  it('should display custom delete label', () => {
    render(
      <FileUpload name='fileUpload' label='Upload File' deleteLabel='Remove' />,
    );

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    expect(screen.getByTitle('Remove')).toBeInTheDocument();
  });

  it('should handle readOnly prop', () => {
    render(<FileUpload name='fileUpload' label='Upload File' readOnly />);

    const textInput = screen.getByLabelText('Upload File');

    fireEvent.click(textInput);

    const hiddenInput = document.querySelector('input[type="file"]');
    expect(hiddenInput).toBeInTheDocument();
  });

  it('should not allow delete in readOnly mode', () => {
    render(<FileUpload name='fileUpload' label='Upload File' readOnly />);

    const file = createFile('test.pdf', 1024, 'application/pdf');
    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: [file] } });

    const deleteButton = screen.getByTitle('Delete file');
    expect(deleteButton).toBeInTheDocument();
  });

  it('should handle helper text', () => {
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        helperText='Please select a PDF file'
      />,
    );
    expect(screen.getByText('Please select a PDF file')).toBeInTheDocument();
  });

  it('should handle accept prop', () => {
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        accept='application/pdf'
      />,
    );

    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    expect(hiddenInput.accept).toBe('application/pdf');
  });

  it('should render without grid when noGrid is true', () => {
    const { container } = render(
      <FileUpload name='fileUpload' label='Upload File' noGrid />,
    );
    expect(container.querySelector('.MuiGrid-root')).not.toBeInTheDocument();
  });

  it('should handle value prop', () => {
    const file = createFile('initial.pdf', 2048, 'application/pdf');
    render(<FileUpload name='fileUpload' label='Upload File' value={file} />);

    const textInput = screen.getByLabelText('Upload File') as HTMLInputElement;
    expect(textInput.value).toBe('initial.pdf');
  });

  it('should open file selector when clicking text field', () => {
    const clickSpy = jest.fn();
    render(<FileUpload name='fileUpload' label='Upload File' />);

    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    hiddenInput.click = clickSpy;

    const textInput = screen.getByLabelText('Upload File');
    fireEvent.click(textInput);
  });

  it('should handle className prop', () => {
    const { container } = render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        className='custom-class'
      />,
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should display upload icon', () => {
    render(<FileUpload name='fileUpload' label='Upload File' />);
    const textInput = screen.getByLabelText('Upload File');
    const container = textInput.closest('.MuiTextField-root');
    expect(container?.querySelector('svg')).toBeInTheDocument();
  });

  it('should handle null file change', () => {
    const handleChange = jest.fn();
    render(
      <FileUpload
        name='fileUpload'
        label='Upload File'
        onChange={handleChange}
      />,
    );

    const hiddenInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    fireEvent.change(hiddenInput, { target: { files: null } });
    expect(handleChange).toHaveBeenCalledWith(null);
  });
});
