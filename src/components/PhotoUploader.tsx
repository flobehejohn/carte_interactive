import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Box, Button, Dialog, DialogActions, DialogContent, Typography, IconButton, Slider } from '@mui/material';
import { Upload, X } from 'lucide-react';

interface PhotoUploaderProps {
  onPhotoChange: (photo: string) => void;
  currentPhoto?: string;
}

export function PhotoUploader({ onPhotoChange, currentPhoto }: PhotoUploaderProps) {
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setCropDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = async () => {
    if (!image || !croppedAreaPixels) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;

    await new Promise(resolve => {
      img.onload = resolve;
    });

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedImage = canvas.toDataURL('image/jpeg');
    onPhotoChange(croppedImage);
    setCropDialogOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            '& .upload-overlay': {
              opacity: 1
            }
          }
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {currentPhoto ? (
          <img
            src={currentPhoto}
            alt="Photo de profil"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Upload size={40} color="#9e9e9e" />
        )}
        <Box
          className="upload-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.2s',
            color: 'white'
          }}
        >
          <Typography variant="body2">
            {isDragActive ? 'Déposez la photo ici' : 'Cliquez ou déposez une photo'}
          </Typography>
        </Box>
      </Box>

      <Dialog
        open={cropDialogOpen}
        onClose={() => setCropDialogOpen(false)}
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
              onCropChange={setCrop}
              onZoomChange={setZoom}
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
            onChange={(e, value) => setZoom(value as number)}
          />
        </Box>
        <DialogActions>
          <Button onClick={() => setCropDialogOpen(false)}>Annuler</Button>
          <Button onClick={createCroppedImage} variant="contained">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}