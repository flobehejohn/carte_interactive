import { Box, Typography } from '@mui/material';
import { Upload } from 'lucide-react';
import type { DropZoneProps } from './types';

export function DropZone({
  getRootProps,
  getInputProps,
  isDragActive,
  currentPhoto
}: DropZoneProps) {
  return (
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
  );
}