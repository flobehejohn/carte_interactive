import { 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import type { PartnerHistoryFilters as Filters } from './types';

interface PartnerHistoryFiltersProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string) => void;
}

export function PartnerHistoryFilters({ filters, onFilterChange }: PartnerHistoryFiltersProps) {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Période</InputLabel>
        <Select
          value={filters.period}
          label="Période"
          onChange={(e) => onFilterChange('period', e.target.value)}
        >
          <MenuItem value="all">Toutes les périodes</MenuItem>
          <MenuItem value="today">Aujourd'hui</MenuItem>
          <MenuItem value="week">Cette semaine</MenuItem>
          <MenuItem value="month">Ce mois</MenuItem>
          <MenuItem value="year">Cette année</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Statut</InputLabel>
        <Select
          value={filters.status}
          label="Statut"
          onChange={(e) => onFilterChange('status', e.target.value)}
        >
          <MenuItem value="all">Tous les statuts</MenuItem>
          <MenuItem value="active">Actif</MenuItem>
          <MenuItem value="inactive">Inactif</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}