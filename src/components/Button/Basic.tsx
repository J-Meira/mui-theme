import Button, { ButtonProps } from '@mui/material/Button';

const Basic = ({ children, ...params }: ButtonProps) => (
  <Button
    fullWidth
    variant='contained'
    {...params}
  >
    {children}
  </Button>
);

export default Basic;
