import { Box, Typography, Paper } from '@mui/material';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Event } from '@/types';

interface WeekViewProps {
  currentDate: Date;
  events: Event[];
  onDateClick: (date: Date) => void;
  showHourly: boolean;
}

export function WeekView({ currentDate, events, onDateClick, showHourly }: WeekViewProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = Array.from({ length: 24 }, (_, i) => i);

  if (!showHourly) {
    return (
      <Box sx={{ display: 'flex', gap: 2 }}>
        {weekDays.map(day => {
          const dayEvents = events.filter(event => 
            isSameDay(day, event.startDate)
          );

          return (
            <Box
              key={day.toISOString()}
              sx={{
                flex: 1,
                minHeight: 200,
                p: 1,
                borderRadius: 1,
                bgcolor: 'background.paper'
              }}
            >
              <Typography
                variant="subtitle2"
                align="center"
                sx={{
                  mb: 1,
                  color: isSameDay(day, new Date()) ? 'primary.main' : 'text.primary'
                }}
              >
                {format(day, 'EEEE d', { locale: fr })}
              </Typography>
              {dayEvents.map((event, index) => (
                <Paper
                  key={event.id || index}
                  sx={{
                    p: 1,
                    mb: 1,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => onDateClick(event.startDate)}
                >
                  <Typography variant="body2">{event.title}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {format(event.startDate, 'HH:mm')}
                  </Typography>
                </Paper>
              ))}
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 60 }} /> {/* Espace pour les heures */}
        {weekDays.map(day => (
          <Box
            key={day.toISOString()}
            sx={{
              flex: 1,
              p: 1,
              textAlign: 'center',
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: isSameDay(day, new Date()) ? 'primary.main' : 'text.primary'
              }}
            >
              {format(day, 'EEEE d', { locale: fr })}
            </Typography>
          </Box>
        ))}
      </Box>

      {hours.map(hour => (
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
          {weekDays.map(day => {
            const hourEvents = events.filter(event => 
              isSameDay(day, event.startDate) &&
              new Date(event.startDate).getHours() === hour
            );

            return (
              <Box
                key={day.toISOString()}
                sx={{
                  flex: 1,
                  p: 1,
                  borderRight: 1,
                  borderColor: 'divider'
                }}
              >
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
            );
          })}
        </Box>
      ))}
    </Box>
  );
}