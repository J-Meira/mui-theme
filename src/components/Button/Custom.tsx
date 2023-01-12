import { styled } from '@mui/material/styles';
import {
  Button,
  ButtonProps,
} from '@mui/material';

const Skeleton = styled(Button)<CustomProps>(({ colors }) => ({
  color: colors.text,
  backgroundColor: colors.background,
  '&:hover': {
    backgroundColor: colors.backgroundHover,
  },
}));

export interface CustomColorsProps {
  text: string,
  background: string,
  backgroundHover: string,
}

interface CustomProps extends ButtonProps {
  colors: CustomColorsProps,
};

const defaultProps: CustomProps = {
  colors: {
    text: '#000',
    background: '#9c9fa8',
    backgroundHover: '#6e7179',
  }
}

export const Custom = ({
  children,
  colors,
  ...params
}: CustomProps) => (
  <Skeleton
    colors={colors}
    {...params}
  >
    {children}
  </Skeleton>
)

Custom.defaultProps = defaultProps;
