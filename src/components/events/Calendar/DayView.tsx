import { Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '@/types';

interface DayViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  showHourly: boolean;
}

export function DayView({ currentDate, events, onDateClick, showHourly }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (!showHourly) {
    return (
      <Box sx={{ minHeight: 200, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {format(currentDate, 'EEEE d MMMM yyyy', { locale: fr })}
        </Typography>
        {events.map((event, index) => (
          <Paper
            key={event.id || index}
            sx={{
              p: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => onDateClick(event.startDate)}
          >
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {format(event.startDate, 'HH:mm')} - {format(event.endDate, 'HH:mm')}
            </Typography>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {hours.map(hour => {
        const hourEvents = events.filter(event => 
          new Date(event.startDate).getHours() === hour
        );

        return (
          <Box
            key={hour}
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderColor: 'divider',
              minHeight: 60
            }}
          >
            <Box
              sx={{
                width: 60,
                p: 1,
                borderRight: 1,
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2">
                {format(new Date().setHours(hour), 'HH:mm')}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, p: 1 }}>
              {hourEvents.map((event, index) => (
                <Paper
                  key={event.id || index}
                  sx={{
                    p: 1,
                    mb: 1,
                    cursor: 'pointer',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': { bgcolor: 'primary.main' }
                  }}
                  onClick={() => onDateClick(event.startDate)}
                >
                  <Typography variant="body2">{event.title}</Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}