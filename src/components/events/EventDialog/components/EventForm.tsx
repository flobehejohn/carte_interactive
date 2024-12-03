import { 
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';
import { PartnerTimeSlots } from '../../PartnerTimeSlots';
import type { Event, TimeSlot } from '@/types';
import type { FormErrors } from '../validation';

interface EventFormProps {
  formData: Partial<Event>;
  errors: FormErrors;
  isSubmitting: boolean;
  partners: any[];
  onFieldChange: (field: keyof Event, value: any) => void;
  onAddPartner: (partnerId: string, timeSlots: TimeSlot) => void;
  onRemovePartner: (partnerId: string) => void;
  onUpdateTimeSlots: (partnerId: string, timeSlots: TimeSlot) => void;
}

export function EventForm({
  formData,
  errors,
  isSubmitting,
  partners,
  onFieldChange,
  onAddPartner,
  onRemovePartner,
  onUpdateTimeSlots
}: EventFormProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <TextField
          label="Titre"
          fullWidth
          value={formData.title}
          onChange={(e) => onFieldChange('title', e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          required
          disabled={isSubmitting}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Adresse"
          fullWidth
          value={formData.address}
          onChange={(e) => onFieldChange('address', e.target.value)}
          disabled={isSubmitting}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Date de début"
          type="date"
          fullWidth
          value={formData.startDate}
          onChange={(e) => onFieldChange('startDate', e.target.value)}
          error={!!errors.startDate}
          helperText={errors.startDate}
          required
          disabled={isSubmitting}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Heure de début"
          type="time"
          fullWidth
          value={formData.startTime}
          onChange={(e) => onFieldChange('startTime', e.target.value)}
          error={!!errors.startTime}
          helperText={errors.startTime}
          required
          disabled={isSubmitting}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Date de fin"
          type="date"
          fullWidth
          value={formData.endDate}
          onChange={(e) => onFieldChange('endDate', e.target.value)}
          error={!!errors.endDate}
          helperText={errors.endDate}
          required
          disabled={isSubmitting}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Heure de fin"
          type="time"
          fullWidth
          value={formData.endTime}
          onChange={(e) => onFieldChange('endTime', e.target.value)}
          error={!!errors.endTime}
          helperText={errors.endTime}
          required
          disabled={isSubmitting}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={!!errors.importance}>
          <InputLabel>Importance</InputLabel>
          <Select
            value={formData.importance}
            onChange={(e) => onFieldChange('importance', e.target.value)}
            label="Importance"
            required
            disabled={isSubmitting}
          >
            <MenuItem value="low">Basse</MenuItem>
            <MenuItem value="medium">Moyenne</MenuItem>
            <MenuItem value="high">Haute</MenuItem>
          </Select>
          {errors.importance && (
            <Typography variant="caption" color="error" component="span">
              {errors.importance}
            </Typography>
          )}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={formData.description}
          onChange={(e) => onFieldChange('description', e.target.value)}
          disabled={isSubmitting}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ my: 2 }} />
        <PartnerTimeSlots
          partners={partners}
          eventPartners={formData.partners || []}
          onAddPartner={onAddPartner}
          onRemovePartner={onRemovePartner}
          onUpdateTimeSlots={onUpdateTimeSlots}
          disabled={isSubmitting}
        />
        {errors.partners && (
          <Typography variant="caption" color="error" component="span" sx={{ display: 'block', mt: 1 }}>
            {errors.partners}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}