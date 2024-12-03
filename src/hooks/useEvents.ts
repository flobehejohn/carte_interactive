import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { useLogger } from './useLogger';
import { usePartners } from './usePartners';
import type { Event } from '@/types';

export function useEvents() {
  const { logAction, logError } = useLogger('useEvents');
  const { getPartnerById } = usePartners();
  const [events, setEvents] = useState<Event[]>(() => 
    storage.getItem(STORAGE_KEYS.EVENTS, [])
  );

  // Sauvegarde automatique des événements
  useEffect(() => {
    try {
      storage.setItem(STORAGE_KEYS.EVENTS, events);
      logAction('save_events', { count: events.length });
    } catch (error) {
      logError(error as Error);
    }
  }, [events]);

  const addEvent = (event: Omit<Event, 'id'>) => {
    try {
      const newEvent = {
        ...event,
        id: crypto.randomUUID(),
        partner: event.partnerId ? getPartnerById(event.partnerId) : undefined
      };
      setEvents(prev => [...prev, newEvent]);
      logAction('add_event', { eventId: newEvent.id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const updateEvent = (id: string, event: Partial<Event>) => {
    try {
      setEvents(prev =>
        prev.map(e => {
          if (e.id === id) {
            const updated = { ...e, ...event };
            if (event.partnerId) {
              updated.partner = getPartnerById(event.partnerId);
            }
            return updated;
          }
          return e;
        })
      );
      logAction('update_event', { eventId: id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const deleteEvent = (id: string) => {
    try {
      setEvents(prev => prev.filter(e => e.id !== id));
      logAction('delete_event', { eventId: id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  };
}