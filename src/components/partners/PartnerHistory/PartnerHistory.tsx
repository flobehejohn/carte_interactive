import { useState } from 'react';
import { 
  Box,
  Paper,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search } from 'lucide-react';
import { PartnerHistoryTable } from './PartnerHistoryTable';
import { PartnerHistoryFilters } from './PartnerHistoryFilters';
import { usePartnerHistorySearch } from './usePartnerHistorySearch';
import type { Partner } from '@/types';

interface PartnerHistoryProps {
  partners: Partner[];
}

export function PartnerHistory({ partners }: PartnerHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { filteredPartners, filters, updateFilter } = usePartnerHistorySearch(partners, searchTerm);

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Typography variant="subtitle1" component="div" gutterBottom>
        Historique des partenaires
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Rechercher par nom, email, téléphone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
        <PartnerHistoryFilters filters={filters} onFilterChange={updateFilter} />
      </Box>

      <PartnerHistoryTable partners={filteredPartners} />
    </Paper>
  );
}