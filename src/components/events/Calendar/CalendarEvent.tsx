import { Box, Typography, Tooltip } from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '@/types';

interface CalendarEventProps {
  event: Event;
}

export function CalendarEvent({ event }: CalendarEventProps) {
  const importanceColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336'
  };

  return (
    <Tooltip
      title={
        <Box component="span">
          <Typography variant="subtitle2">{event.title}</Typography>
          <Typography variant="caption" component="div">
            {format(event.startDate, 'PPp', { locale: fr })}
          </Typography>
          {event.partners?.map((ep) => (
            <Typography key={ep.partnerId} variant="caption" component="div">
              {ep.partner?.name}
              {ep.partner?.company && ` (${ep.partner.company})`}
            </Typography>
          ))}
          {event.description && (
            <Typography variant="caption" component="div">
              {event.description}
            </Typography>
          )}
        </Box>
      }
    >
      <Box
        sx={{
          mt: 0.5,
          p: 0.5,
          borderRadius: 1,
          bgcolor: importanceColors[event.importance],
          color: 'white',
          fontSize: '0.75rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {event.title}
      </Box>
    </Tooltip>
  );
}