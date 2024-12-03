import { DialogTitle, Typography, IconButton } from '@mui/material';
import { X } from 'lucide-react';

interface DialogHeaderProps {
  title: string;
  onClose: () => void;
  disabled?: boolean;
}

export function DialogHeader({ title, onClose, disabled }: DialogHeaderProps) {
  return (
    <DialogTitle 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}
    >
      <Typography variant="h6" component="span">
        {title}
      </Typography>
      <IconButton onClick={onClose} size="small" disabled={disabled}>
        <X size={20} />
      </IconButton>
    </DialogTitle>
  );
}