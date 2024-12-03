import type { Event } from '@/types';

export interface FormErrors {
  title?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  importance?: string;
  partners?: string;
  global?: string;
}

export function validateEventForm(data: Partial<Event>): FormErrors {
  const errors: FormErrors = {};
  
  if (!data.title?.trim()) {
    errors.title = 'Le titre est requis';
  }
  
  if (!data.startDate) {
    errors.startDate = 'La date de début est requise';
  }

  if (!data.startTime) {
    errors.startTime = 'L\'heure de début est requise';
  }

  if (!data.endDate) {
    errors.endDate = 'La date de fin est requise';
  }

  if (!data.endTime) {
    errors.endTime = 'L\'heure de fin est requise';
  }

  if (data.startDate && data.endDate && data.startTime && data.endTime) {
    const start = new Date(`${data.startDate}T${data.startTime}`);
    const end = new Date(`${data.endDate}T${data.endTime}`);
    
    if (end <= start) {
      errors.endDate = 'La date et l\'heure de fin doivent être postérieures à la date et l\'heure de début';
    }
  }

  if (!data.importance) {
    errors.importance = 'Le niveau d\'importance est requis';
  }

  if (!data.partners?.length) {
    errors.partners = 'Au moins un partenaire est requis';
  }

  return errors;
}