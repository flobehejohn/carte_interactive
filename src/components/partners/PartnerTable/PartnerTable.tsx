import { useState, useMemo } from 'react';
import { 
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Paper
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { getCategoryIcon } from '@/utils/categoryIcons';
import type { Partner } from '@/types';

interface PartnerTableProps {
  partners: Partner[];
}

export function PartnerTable({ partners }: PartnerTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    partners.forEach(partner => {
      if (partner.categoryPath.length > 0) {
        uniqueCategories.add(partner.categoryPath[0]);
      }
    });
    return Array.from(uniqueCategories);
  }, [partners]);

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Nom', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {params.row.photo && (
            <img 
              src={params.row.photo} 
              alt={params.row.name}
              style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%',
                objectFit: 'cover'
              }} 
            />
          )}
          {params.value}
        </Box>
      )
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200 
    },
    { 
      field: 'company', 
      headerName: 'Entreprise', 
      width: 200 
    },
    {
      field: 'categoryPath',
      headerName: 'Catégorie',
      width: 300,
      renderCell: (params) => {
        const mainCategory = params.value[0];
        const { icon: Icon, color } = getCategoryIcon(mainCategory);
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Icon size={16} color={color} />
            <Typography>
              {params.value.join(' > ')}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'phone',
      headerName: 'Téléphone',
      width: 150
    },
    {
      field: 'website',
      headerName: 'Site web',
      width: 200,
      renderCell: (params) => params.value ? (
        <a 
          href={params.value} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#1976d2', textDecoration: 'none' }}
        >
          {params.value}
        </a>
      ) : null
    }
  ];

  const filteredPartners = useMemo(() => {
    return partners.filter(partner => {
      const matchesSearch = Object.values(partner).some(value => 
        value && 
        typeof value === 'string' && 
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory = filterCategory === 'all' || 
        (partner.categoryPath[0] === filterCategory);

      return matchesSearch && matchesCategory;
    });
  }, [partners, searchTerm, filterCategory]);

  const rows = filteredPartners.map((partner, index) => ({
    id: partner.id || index,
    ...partner
  }));

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
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Catégorie</InputLabel>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            label="Catégorie"
          >
            <MenuItem value="all">Toutes les catégories</MenuItem>
            {categories.map((category) => {
              const { icon: Icon, color } = getCategoryIcon(category);
              return (
                <MenuItem 
                  key={category} 
                  value={category}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}
                >
                  <Icon size={16} color={color} />
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        sx={{
          bgcolor: 'white',
          '& .MuiDataGrid-cell': {
            borderColor: 'grey.200'
          }
        }}
      />
    </Paper>
  );
}