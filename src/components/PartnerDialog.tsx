import { useState } from 'react';
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
  Box
} from '@mui/material';
import { X } from 'lucide-react';
import { CategorySelector } from './CategorySelector';
import { PhotoUploader } from './PhotoUploader';
import { getCategoryPath } from '../utils/categoryUtils';
import type { Partner } from '../types';

interface PartnerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (partner: Omit<Partner, 'id'>) => void;
  initialData?: Partner;
}

interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
}

export function PartnerDialog({ isOpen, onClose, onSave, initialData }: PartnerDialogProps) {
  const [formData, setFormData] = useState<Partial<Partner> & { photo?: string; website?: string }>(() => ({
    name: '',
    email: '',
    phone: '',
    company: '',
    categoryPath: [],
    photo: '',
    website: '',
    ...initialData,
  }));

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = 'URL invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData as Omit<Partner, 'id'>);
      onClose();
    }
  };

  const handlePhotoChange = (photo: string) => {
    setFormData(prev => ({ ...prev, photo }));
  };

  return (
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
        <Typography variant="h6">
          {initialData ? 'Modifier le partenaire' : 'Ajouter un partenaire'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <PhotoUploader
                onPhotoChange={handlePhotoChange}
                currentPhoto={formData.photo}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Téléphone"
                type="tel"
                fullWidth
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Site web"
                type="url"
                fullWidth
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                error={!!errors.website}
                helperText={errors.website}
                placeholder="https://..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Entreprise"
                fullWidth
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <CategorySelector
                selectedPath={formData.categoryPath || []}
                onChange={(path) => setFormData({ ...formData, categoryPath: path })}
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
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                inputProps={{ maxLength: 500 }}
                helperText={`${(formData.description?.length || 0)}/500 caractères`}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={onClose}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!formData.name || !formData.email || !formData.categoryPath?.length}
          >
            {initialData ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}