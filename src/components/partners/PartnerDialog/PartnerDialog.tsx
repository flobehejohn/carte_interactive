import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
  Alert
} from '@mui/material';
import { X, ImageIcon } from 'lucide-react';
import { CategorySelector } from '../CategorySelector';
import { PhotoUploader } from '../PhotoUploader';
import { PhotoGallery } from '../PhotoGallery';
import { getCategoryPath } from '@/utils/categoryUtils';
import { usePartnerForm } from './usePartnerForm';
import type { Partner } from '@/types';

interface PartnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Omit<Partner, 'id'>) => Promise<void>;
  initialData?: Partner;
}

export function PartnerDialog({ isOpen, onClose, onSave, initialData }: PartnerDialogProps) {
  const {
    formData,
    errors,
    isSubmitting,
    showGallery,
    handleFieldChange,
    handleSubmit,
    setShowGallery
  } = usePartnerForm({ onSave, onClose, initialData });

  return (
    <>
      <Dialog 
        open={isOpen} 
        onClose={onClose} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: '90vh'
          }
        }}
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
            {initialData ? 'Modifier le partenaire' : 'Ajouter un partenaire'}
          </Typography>
          <IconButton onClick={onClose} size="small" disabled={isSubmitting}>
            <X size={20} />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ py: 3 }}>
            {errors.global && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errors.global}
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <PhotoUploader
                  onPhotoChange={(photo) => handleFieldChange('photo', photo)}
                  currentPhoto={formData.photo}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nom"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Prénom"
                  fullWidth
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Téléphone"
                  type="tel"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Site web"
                  type="url"
                  fullWidth
                  value={formData.website}
                  onChange={(e) => handleFieldChange('website', e.target.value)}
                  error={!!errors.website}
                  helperText={errors.website}
                  placeholder="https://..."
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Entreprise"
                  fullWidth
                  value={formData.company}
                  onChange={(e) => handleFieldChange('company', e.target.value)}
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <CategorySelector
                  selectedPath={formData.categoryPath || []}
                  onChange={(path) => handleFieldChange('categoryPath', path)}
                />
                {formData.categoryPath?.length > 0 && (
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ mt: 1 }}
                  >
                    Chemin complet : {getCategoryPath(formData.categoryPath)}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Commentaire"
                  multiline
                  rows={4}
                  fullWidth
                  value={formData.description || ''}
                  onChange={(e) => handleFieldChange('description', e.target.value)}
                  inputProps={{ maxLength: 500 }}
                  helperText={`${(formData.description?.length || 0)}/500 caractères`}
                  disabled={isSubmitting}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  startIcon={<ImageIcon />}
                  onClick={() => setShowGallery(true)}
                  disabled={isSubmitting}
                >
                  Galerie de photos ({formData.gallery?.length || 0})
                </Button>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
            <Button 
              onClick={onClose} 
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              disabled={isSubmitting || !formData.name || !formData.email || !formData.categoryPath?.length}
            >
              {isSubmitting ? 'Enregistrement...' : (initialData ? 'Enregistrer' : 'Ajouter')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <PhotoGallery
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
        photos={formData.gallery || []}
        onPhotosChange={(photos) => handleFieldChange('gallery', photos)}
        disabled={isSubmitting}
      />
    </>
  );
}