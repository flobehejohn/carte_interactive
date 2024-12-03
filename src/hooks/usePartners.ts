import { useState, useEffect } from 'react';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { useLogger } from './useLogger';
import type { Partner } from '@/types';

export function usePartners() {
  const { logAction, logError } = useLogger('usePartners');
  const [partners, setPartners] = useState<Partner[]>(() => 
    storage.getItem(STORAGE_KEYS.PARTNERS, [])
  );
  const [searchTerm, setSearchTerm] = useState('');

  // Sauvegarde automatique des partenaires
  useEffect(() => {
    try {
      storage.setItem(STORAGE_KEYS.PARTNERS, partners);
      logAction('save_partners', { count: partners.length });
    } catch (error) {
      logError(error as Error);
    }
  }, [partners]);

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    try {
      const newPartner = {
        ...partner,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };
      setPartners(prev => [...prev, newPartner]);
      logAction('add_partner', { partnerId: newPartner.id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const updatePartner = (id: string, partner: Partial<Partner>) => {
    try {
      setPartners(prev =>
        prev.map(p => p.id === id ? { ...p, ...partner } : p)
      );
      logAction('update_partner', { partnerId: id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const deletePartner = (id: string) => {
    try {
      setPartners(prev => prev.filter(p => p.id !== id));
      logAction('delete_partner', { partnerId: id });
    } catch (error) {
      logError(error as Error);
      throw error;
    }
  };

  const getPartnerById = (id: string) => {
    return partners.find(p => p.id === id);
  };

  const filteredPartners = partners.filter(partner =>
    Object.values(partner).some(value =>
      value && typeof value === 'string' &&
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return {
    partners: filteredPartners,
    allPartners: partners,
    searchTerm,
    setSearchTerm,
    addPartner,
    updatePartner,
    deletePartner,
    getPartnerById
  };
}