import { IconButton, IconButtonProps } from '@mui/material'

const defaultProps: IconButtonProps = {
  size: 'small',
}

export const Icon = ({ children, ...rest }: IconButtonProps) => <IconButton {...rest}>{children}</IconButton>

Icon.defaultProps = defaultProps
