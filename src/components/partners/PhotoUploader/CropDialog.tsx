import { Dialog, DialogActions, DialogContent, Box, Button, Typography, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import type { CropDialogProps } from './types';

export function CropDialog({
  open,
  onClose,
  image,
  crop,
  zoom,
  onCropChange,
  onZoomChange,
  onCropComplete,
  onConfirm
}: CropDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent
        sx={{
          height: 400,
          padding: 0,
          position: 'relative',
          bgcolor: 'black'
        }}
      >
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        )}
      </DialogContent>
      <Box sx={{ px: 3, pt: 2, pb: 1 }}>
        <Typography>Zoom</Typography>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(_, value) => onZoomChange(value as number)}
        />
      </Box>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={onConfirm} variant="contained">
          Valider
        </Button>
      </DialogActions>
    </Dialog>
  );
}