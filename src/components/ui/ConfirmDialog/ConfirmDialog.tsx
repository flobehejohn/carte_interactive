import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Box
} from '@mui/material';
import { type ReactNode } from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'primary' | 'error';
  disabled?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  confirmColor = 'primary',
  disabled = false
}: ConfirmDialogProps) {
  return (
    <Dialog 
      open={isOpen} 
      onClose={disabled ? undefined : onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ minHeight: 80 }}>
          {message}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button 
          onClick={onClose}
          disabled={disabled}
        >
          {cancelLabel}
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color={confirmColor}
          disabled={disabled}
          autoFocus
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}