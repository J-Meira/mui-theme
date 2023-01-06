import Button, { ButtonProps } from '@mui/material/Button';

const Basic = ({ children, ...params }: ButtonProps) => (
  <Button {...params}>
    {children}
  </Button>
);

export default Basic;
