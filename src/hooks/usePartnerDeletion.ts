import { useState } from 'react';
import { useLogger } from './useLogger';
import { usePartners } from './usePartners';
import type { Partner } from '@/types';

export function usePartnerDeletion() {
  const { deletePartner } = usePartners();
  const { logAction, logError } = useLogger('PartnerDeletion');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);

  const handleConfirmDelete = async () => {
    if (!deletingPartner) {
      logError(new Error('No partner selected for deletion'));
      return;
    }

    try {
      setIsDeleting(true);
      logAction('delete_partner_start', { partnerId: deletingPartner.id });
      
      await deletePartner(deletingPartner.id);
      
      logAction('delete_partner_success', { partnerId: deletingPartner.id });
      setDeletingPartner(null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      logError(error);
      setError('Impossible de supprimer le partenaire. Veuillez réessayer.');
    } finally {
      setIsDeleting(false);
    }
  };

  const clearError = () => {
    setError(null);
    logAction('clear_delete_error');
  };

  return {
    isDeleting,
    error,
    deletingPartner,
    setDeletingPartner,
    handleConfirmDelete,
    clearError,
  };
}