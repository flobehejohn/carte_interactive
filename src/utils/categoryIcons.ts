import { 
  Users, Building2, Briefcase, UserCircle2,
  Landmark, HandshakeIcon, UsersRound, HeartHandshake,
  type LucideIcon
} from 'lucide-react';

export interface CategoryIcon {
  icon: LucideIcon;
  color: string;
  label: string;
}

export const categoryIcons: Record<string, CategoryIcon> = {
  // Acteurs Internes
  "Acteurs Internes à Est Ensemble Habitat": {
    icon: Building2,
    color: '#2196f3',
    label: 'Structure interne'
  },
  "Administration Générale": {
    icon: Briefcase,
    color: '#1976d2',
    label: 'Administration'
  },
  "Direction Générale": {
    icon: Users,
    color: '#1565c0',
    label: 'Direction'
  },
  "Directeur Général": {
    icon: UserCircle2,
    color: '#0d47a1',
    label: 'Direction individuelle'
  },

  // Acteurs Externes
  "Acteurs Externes": {
    icon: Landmark,
    color: '#4caf50',
    label: 'Partenaires externes'
  },
  "Institutions Gouvernementales": {
    icon: HandshakeIcon,
    color: '#388e3c',
    label: 'Institutions'
  },
  "Associations": {
    icon: UsersRound,
    color: '#2e7d32',
    label: 'Associations'
  },
  "Associations de Quartier": {
    icon: HeartHandshake,
    color: '#1b5e20',
    label: 'Associations locales'
  }
};

export function getCategoryIcon(category: string): CategoryIcon {
  return (
    categoryIcons[category] || {
      icon: Users,
      color: '#9e9e9e',
      label: 'Autre'
    }
  );
}