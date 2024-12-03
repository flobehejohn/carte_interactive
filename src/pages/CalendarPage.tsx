import { Box } from '@mui/material';
import { Calendar } from '@/components/events/Calendar';
import { useEvents } from '@/hooks/useEvents';
import { useLogger } from '@/hooks/useLogger';
import type { Event } from '@/types';

export function CalendarPage() {
  const { events, addEvent } = useEvents();
  const { logAction } = useLogger('CalendarPage');

  const handleAddEvent = async (eventData: Omit<Event, 'id'>) => {
    logAction('add_event', { event: eventData });
    addEvent(eventData);
  };

  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)', // Hauteur totale moins la hauteur de l'en-tête
      margin: -3, // Annule le padding du container principal
      overflow: 'hidden'
    }}>
      <Calendar 
        events={events}
        onAddEvent={handleAddEvent}
      />
    </Box>
  );
}