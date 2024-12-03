import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Plus } from 'lucide-react';

export function GalleryPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Galerie
      </Typography>
      <Button
        variant="contained"
        startIcon={<Plus />}
        sx={{ mb: 3 }}
      >
        Ajouter un média
      </Button>
    </Box>
  );
}