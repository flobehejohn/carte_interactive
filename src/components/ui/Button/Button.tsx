import { Button as MuiButton } from '@mui/material';
import { type ReactNode } from 'react';
import { type LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  icon?: LucideIcon;
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error';
  fullWidth?: boolean;
}

export function Button({
  variant = 'contained',
  size = 'medium',
  icon: Icon,
  children,
  onClick,
  type = 'button',
  disabled = false,
  color = 'primary',
  fullWidth = false,
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled}
      color={color}
      fullWidth={fullWidth}
      startIcon={Icon && <Icon size={size === 'large' ? 24 : size === 'small' ? 16 : 20} />}
    >
      {children}
    </MuiButton>
  );
}