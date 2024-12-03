import { 
  Box, 
  Typography, 
  TextField, 
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Autocomplete
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import type { Partner, EventPartner, TimeSlot } from '@/types';

interface PartnerTimeSlotsProps {
  partners: Partner[];
  eventPartners: EventPartner[];
  onAddPartner: (partnerId: string, timeSlots: TimeSlot) => void;
  onRemovePartner: (partnerId: string) => void;
  onUpdateTimeSlots: (partnerId: string, timeSlots: TimeSlot) => void;
  disabled?: boolean;
}

export function PartnerTimeSlots({
  partners,
  eventPartners = [],
  onAddPartner,
  onRemovePartner,
  onUpdateTimeSlots,
  disabled
}: PartnerTimeSlotsProps) {
  const availablePartners = partners.filter(
    p => !eventPartners?.some(ep => ep.partnerId === p.id)
  );

  const handleAddPartner = (partner: Partner | null) => {
    if (partner) {
      onAddPartner(partner.id, {
        setup: '',
        intervention: '',
        teardown: ''
      });
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom component="div">
        Plages horaires des partenaires
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Autocomplete
          options={availablePartners}
          getOptionLabel={(option: Partner) => 
            `${option.name}${option.company ? ` (${option.company})` : ''}`
          }
          onChange={(_, partner) => handleAddPartner(partner)}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ajouter un partenaire"
              size="small"
            />
          )}
        />
      </Box>

      {eventPartners?.length > 0 ? (
        <Paper variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Partenaire</TableCell>
                <TableCell>Mise en place</TableCell>
                <TableCell>Intervention</TableCell>
                <TableCell>Démontage</TableCell>
                <TableCell width={50} />
              </TableRow>
            </TableHead>
            <TableBody>
              {eventPartners.map((ep) => {
                const partner = partners.find(p => p.id === ep.partnerId);
                if (!partner) return null;

                return (
                  <TableRow key={ep.partnerId}>
                    <TableCell>
                      <Typography variant="body2" component="span">
                        {partner.name}
                        {partner.company && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary" 
                            component="span"
                            sx={{ display: 'block' }}
                          >
                            {partner.company}
                          </Typography>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={ep.timeSlots.setup}
                        onChange={(e) => onUpdateTimeSlots(ep.partnerId, {
                          ...ep.timeSlots,
                          setup: e.target.value
                        })}
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={ep.timeSlots.intervention}
                        onChange={(e) => onUpdateTimeSlots(ep.partnerId, {
                          ...ep.timeSlots,
                          intervention: e.target.value
                        })}
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="time"
                        size="small"
                        value={ep.timeSlots.teardown}
                        onChange={(e) => onUpdateTimeSlots(ep.partnerId, {
                          ...ep.timeSlots,
                          teardown: e.target.value
                        })}
                        disabled={disabled}
                        InputLabelProps={{ shrink: true }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => onRemovePartner(ep.partnerId)}
                        disabled={disabled}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <Box 
          sx={{ 
            p: 3, 
            textAlign: 'center',
            bgcolor: 'grey.50',
            borderRadius: 1
          }}
        >
          <Typography color="text.secondary" component="div">
            Aucun partenaire ajouté
          </Typography>
        </Box>
      )}
    </Box>
  );
}