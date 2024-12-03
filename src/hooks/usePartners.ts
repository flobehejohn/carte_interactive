import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { useLogger } from './useLogger';
import type { Partner } from '@/types';

export function usePartners() {
  const { logAction, logError } = useLogger('usePartners');
  const [partners, setPartners] = useState<Partner[]>(() => 
    storage.getItem(STORAGE_KEYS.PARTNERS, [])
  );

  // Automatic storage synchronization
  useEffect(() => {
    try {
      storage.setItem(STORAGE_KEYS.PARTNERS, partners);
      logAction('save_partners', { count: partners.length });
    } catch (error) {
      logError(error as Error);
    }
  }, [partners]);

  const addPartner = async (partner: Omit<Partner, 'id'>) => {
    try {
      const newPartner = {
        ...partner,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      
      setPartners(prev => [...prev, newPartner]);
      logAction('add_partner_success', { partnerId: newPartner.id });
      
      return newPartner;
    } catch (error) {
      logError(error as Error);
      throw new Error('Failed to add partner');
    }
  };

  const updatePartner = async (id: string, data: Partial<Partner>) => {
    try {
      setPartners(prev => 
        prev.map(p => p.id === id ? { ...p, ...data } : p)
      );
      logAction('update_partner_success', { partnerId: id });
    } catch (error) {
      logError(error as Error);
      throw new Error('Failed to update partner');
    }
  };

  const deletePartner = async (id: string) => {
    try {
      setPartners(prev => prev.filter(p => p.id !== id));
      logAction('delete_partner_success', { partnerId: id });
    } catch (error) {
      logError(error as Error);
      throw new Error('Failed to delete partner');
    }
  };

  return {
    partners,
    addPartner,
    updatePartner,
    deletePartner,
  };
}