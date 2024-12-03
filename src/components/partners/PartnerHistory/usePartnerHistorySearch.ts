import { useState, useMemo } from 'react';
import { isWithinInterval, startOfDay, startOfWeek, startOfMonth, startOfYear } from 'date-fns';
import type { Partner } from '@/types';
import type { PartnerHistoryFilters } from './types';

export function usePartnerHistorySearch(partners: Partner[], searchTerm: string) {
  const [filters, setFilters] = useState<PartnerHistoryFilters>({
    period: 'all',
    status: 'all'
  });

  const updateFilter = (key: keyof PartnerHistoryFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredPartners = useMemo(() => {
    return partners.filter(partner => {
      // Search term filtering
      const matchesSearch = !searchTerm || Object.values(partner).some(value => 
        value && 
        typeof value === 'string' && 
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Period filtering
      let matchesPeriod = true;
      const now = new Date();
      const createdAt = new Date(); // In real app, use partner.createdAt

      if (filters.period !== 'all') {
        const intervals = {
          today: { start: startOfDay(now), end: now },
          week: { start: startOfWeek(now), end: now },
          month: { start: startOfMonth(now), end: now },
          year: { start: startOfYear(now), end: now }
        };

        const interval = intervals[filters.period as keyof typeof intervals];
        if (interval) {
          matchesPeriod = isWithinInterval(createdAt, interval);
        }
      }

      // Status filtering
      const matchesStatus = filters.status === 'all' || true; // Implement status logic

      return matchesSearch && matchesPeriod && matchesStatus;
    });
  }, [partners, searchTerm, filters]);

  return {
    filteredPartners,
    filters,
    updateFilter
  };
}