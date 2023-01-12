import {
  Button,
  ButtonProps,
} from '@mui/material';

export const Basic = ({
  children,
  ...params
}: ButtonProps) => (
  <Button {...params}>
    {children}
  </Button>
);
