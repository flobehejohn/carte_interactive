import { 
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Alert
} from '@mui/material';
import { DialogHeader } from './components/DialogHeader';
import { EventForm } from './components/EventForm';
import { useEventForm } from './useEventForm';
import { usePartners } from '@/hooks/usePartners';
import type { Event } from '@/types';

interface EventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<Event, 'id'>) => Promise<void>;
  initialData?: Event;
}

export function EventDialog({ isOpen, onClose, onSave, initialData }: EventDialogProps) {
  const { partners } = usePartners();
  const {
    formData,
    errors,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
    handleAddPartner,
    handleRemovePartner,
    handleUpdateTimeSlots
  } = useEventForm({ onSave, onClose, initialData });

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogHeader 
        title={initialData ? 'Modifier l\'événement' : 'Ajouter un événement'}
        onClose={onClose}
        disabled={isSubmitting}
      />

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 3 }}>
          {errors.global && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.global}
            </Alert>
          )}

          <EventForm
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            partners={partners}
            onFieldChange={handleFieldChange}
            onAddPartner={handleAddPartner}
            onRemovePartner={handleRemovePartner}
            onUpdateTimeSlots={handleUpdateTimeSlots}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button 
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enregistrement...' : (initialData ? 'Modifier' : 'Ajouter')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}