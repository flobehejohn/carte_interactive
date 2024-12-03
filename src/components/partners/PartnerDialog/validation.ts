import type { Partner } from '@/types';

export interface FormErrors {
  name?: string;
  email?: string;
  website?: string;
  global?: string;
}

export function validatePartnerForm(data: Partial<Partner>): FormErrors {
  const errors: FormErrors = {};
  
  if (!data.name?.trim()) {
    errors.name = 'Le nom est requis';
  }
  
  if (!data.email?.trim()) {
    errors.email = 'L\'email est requis';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email invalide';
  }
  
  if (data.website && !/^https?:\/\/.+\..+/.test(data.website)) {
    errors.website = 'URL invalide';
  }

  if (!data.categoryPath?.length) {
    errors.global = 'Veuillez sélectionner au moins une catégorie';
  }

  return errors;
}