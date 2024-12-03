import { useState } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { validatePartnerForm } from './validation';
import type { Partner } from '@/types';
import type { FormErrors } from './validation';

interface UsePartnerFormProps {
  onSave: (partner: Omit<Partner, 'id'>) => Promise<void>;
  onClose: () => void;
  initialData?: Partner;
}

export function usePartnerForm({ onSave, onClose, initialData }: UsePartnerFormProps) {
  const { logAction, logError } = useLogger('PartnerForm');
  const [formData, setFormData] = useState<Partial<Partner>>(() => ({
    name: '',
    firstName: '',
    email: '',
    phone: '',
    company: '',
    categoryPath: [],
    photo: '',
    website: '',
    gallery: [],
    ...initialData,
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleFieldChange = (field: keyof Partner, value: any) => {
    logAction('field_change', { field, value: typeof value === 'string' ? value.length : value });
    
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      logAction('submit_form', { 
        isEdit: !!initialData,
        formData: JSON.stringify(formData)
      });

      const validationErrors = validatePartnerForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        logAction('validation_failed', { errors: validationErrors });
        return;
      }

      console.log('Données du partenaire avant sauvegarde:', formData);
      await onSave(formData as Omit<Partner, 'id'>);
      
      logAction('save_success', { 
        isEdit: !!initialData,
        hasPhoto: !!formData.photo,
        gallerySize: formData.gallery?.length
      });
      
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      logError(error as Error);
      setErrors(prev => ({
        ...prev,
        global: 'Une erreur est survenue lors de l\'enregistrement'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    showGallery,
    handleFieldChange,
    handleSubmit,
    setShowGallery
  };
}