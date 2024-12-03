import { Box, Typography, Paper } from '@mui/material';
import { format, addMonths, startOfYear, endOfMonth, isSameMonth, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '@/types';

interface YearViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
}

export function YearView({ currentDate, events, onDateClick }: YearViewProps) {
  const yearStart = startOfYear(currentDate);
  const months = Array.from({ length: 12 }, (_, i) => addMonths(yearStart, i));

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
      {months.map(month => {
        const monthEvents = events.filter(event => 
          isWithinInterval(event.startDate, {
            start: month,
            end: endOfMonth(month)
          })
        );

        return (
          <Paper
            key={month.toISOString()}
            sx={{
              p: 2,
              cursor: 'pointer',
              bgcolor: isSameMonth(month, new Date()) ? 'primary.light' : 'background.paper',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => onDateClick(month)}
          >
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1,
                color: isSameMonth(month, new Date()) ? 'primary.contrastText' : 'text.primary'
              }}
            >
              {format(month, 'MMMM', { locale: fr })}
            </Typography>
            {monthEvents.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {monthEvents.length} événement{monthEvents.length > 1 ? 's' : ''}
              </Typography>
            )}
          </Paper>
        );
      })}
    </Box>
  );
}