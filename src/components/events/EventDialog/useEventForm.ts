import { useState } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { validateEventForm } from './validation';
import type { Event, TimeSlot, EventPartner } from '@/types';
import type { FormErrors } from './validation';

interface UseEventFormProps {
  onSave: (event: Omit<Event, 'id'>) => Promise<void>;
  onClose: () => void;
  initialData?: Event;
}

export function useEventForm({ onSave, onClose, initialData }: UseEventFormProps) {
  const { logAction, logError } = useLogger('EventForm');
  const [formData, setFormData] = useState<Partial<Event>>(() => ({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    importance: '',
    partners: [],
    address: '',
    ...initialData,
  }));

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (field: keyof Event, value: any) => {
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

  const handleAddPartner = (partnerId: string, timeSlots: TimeSlot) => {
    logAction('add_partner', { partnerId });
    
    // Si aucune plage horaire n'est définie, utilise les horaires de l'événement
    const defaultTimeSlots: TimeSlot = {
      setup: formData.startTime || '',
      intervention: formData.startTime || '',
      teardown: formData.endTime || ''
    };

    setFormData(prev => ({
      ...prev,
      partners: [...(prev.partners || []), { 
        partnerId, 
        timeSlots: timeSlots.setup ? timeSlots : defaultTimeSlots
      }]
    }));
  };

  const handleRemovePartner = (partnerId: string) => {
    logAction('remove_partner', { partnerId });
    setFormData(prev => ({
      ...prev,
      partners: (prev.partners || []).filter(p => p.partnerId !== partnerId)
    }));
  };

  const handleUpdateTimeSlots = (partnerId: string, timeSlots: TimeSlot) => {
    logAction('update_time_slots', { partnerId });
    setFormData(prev => ({
      ...prev,
      partners: (prev.partners || []).map(p => 
        p.partnerId === partnerId ? { ...p, timeSlots } : p
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      logAction('submit_form', { 
        isEdit: !!initialData,
        formData: JSON.stringify(formData)
      });

      const validationErrors = validateEventForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        logAction('validation_failed', { errors: validationErrors });
        return;
      }

      const eventData = {
        ...formData,
        startDate: new Date(`${formData.startDate}T${formData.startTime}`),
        endDate: new Date(`${formData.endDate}T${formData.endTime}`)
      };

      await onSave(eventData as Omit<Event, 'id'>);
      logAction('save_success');
      onClose();
    } catch (error) {
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
    handleFieldChange,
    handleSubmit,
    handleAddPartner,
    handleRemovePartner,
    handleUpdateTimeSlots
  };
}