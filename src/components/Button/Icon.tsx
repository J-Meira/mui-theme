import {
  IconButton,
  IconButtonProps,
} from '@mui/material';

const defaultProps: IconButtonProps = {
  size: 'small',
}

export const Icon = ({
  children,
  ...params
}: IconButtonProps) => (
  <IconButton {...params}>
    {children}
  </IconButton>
);

Icon.defaultProps = defaultProps;
