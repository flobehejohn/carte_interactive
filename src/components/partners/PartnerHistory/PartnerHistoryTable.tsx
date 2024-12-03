import { Box, Typography } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Partner } from '@/types';

interface PartnerHistoryTableProps {
  partners: Partner[];
}

export function PartnerHistoryTable({ partners }: PartnerHistoryTableProps) {
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
          <Typography>{params.value}</Typography>
        </Box>
      )
    },
    {
      field: 'createdAt',
      headerName: 'Créé',
      width: 200,
      valueGetter: (params) => new Date(),
      renderCell: (params) => (
        <Typography variant="body2">
          {formatDistanceToNow(params.value, { 
            addSuffix: true,
            locale: fr 
          })}
        </Typography>
      )
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 250 
    },
    { 
      field: 'phone', 
      headerName: 'Téléphone', 
      width: 150 
    },
    {
      field: 'description',
      headerName: 'Commentaires',
      width: 300,
      renderCell: (params) => (
        <Typography 
          variant="body2" 
          sx={{ 
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {params.value || '-'}
        </Typography>
      )
    }
  ];

  const rows = partners.map((partner, index) => ({
    id: partner.id || index,
    ...partner
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 10 },
        },
        sorting: {
          sortModel: [{ field: 'createdAt', sort: 'desc' }],
        },
      }}
      pageSizeOptions={[5, 10, 25]}
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
  );
}