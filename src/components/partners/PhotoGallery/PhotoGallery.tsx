import { useState } from 'react';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  ImageList,
  ImageListItem,
  Button,
  Box,
  Typography
} from '@mui/material';
import { X, Upload, Trash2 } from 'lucide-react';
import { PhotoUploader } from '../PhotoUploader';

interface PhotoGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  disabled?: boolean;
}

export function PhotoGallery({ 
  isOpen, 
  onClose, 
  photos, 
  onPhotosChange,
  disabled 
}: PhotoGalleryProps) {
  const [showUploader, setShowUploader] = useState(false);

  const handleAddPhoto = (photo: string) => {
    onPhotosChange([...photos, photo]);
    setShowUploader(false);
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2
      }}>
        <Typography variant="h6" component="div">
          Galerie de photos
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {showUploader ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <PhotoUploader
              onPhotoChange={handleAddPhoto}
              currentPhoto={undefined}
            />
            <Button onClick={() => setShowUploader(false)}>
              Annuler
            </Button>
          </Box>
        ) : (
          <>
            <Button
              startIcon={<Upload />}
              onClick={() => setShowUploader(true)}
              disabled={disabled}
              sx={{ mb: 2 }}
            >
              Ajouter une photo
            </Button>

            <ImageList cols={3} gap={8}>
              {photos.map((photo, index) => (
                <ImageListItem key={index} sx={{ position: 'relative' }}>
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }}
                  />
                  {!disabled && (
                    <IconButton
                      onClick={() => handleDeletePhoto(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.7)'
                        }
                      }}
                      size="small"
                    >
                      <Trash2 size={16} color="white" />
                    </IconButton>
                  )}
                </ImageListItem>
              ))}
            </ImageList>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}