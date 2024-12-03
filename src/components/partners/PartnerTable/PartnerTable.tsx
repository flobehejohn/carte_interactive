import { useState } from 'react';
import { Box, Paper, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Edit2, Trash2 } from 'lucide-react';
import { usePartnerDeletion } from '@/hooks/usePartnerDeletion';
import { usePartners } from '@/hooks/usePartners';
import { DeletePartnerDialog } from './DeletePartnerDialog';
import { PartnerDialog } from '../PartnerDialog';
import { useLogger } from '@/hooks/useLogger';
import type { Partner } from '@/types';

export function PartnerTable() {
  const { partners, updatePartner } = usePartners();
  const { logAction } = useLogger('PartnerTable');
  const {
    isDeleting,
    error: deleteError,
    deletingPartner,
    setDeletingPartner,
    handleConfirmDelete,
    clearError,
  } = usePartnerDeletion();

  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const handleEdit = (partner: Partner) => {
    logAction('edit_partner_click', { partnerId: partner.id });
    setEditingPartner(partner);
  };

  const handleDelete = (partner: Partner) => {
    logAction('delete_partner_click', { partnerId: partner.id });
    setDeletingPartner(partner);
  };

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Nom', 
      width: 150,
      flex: 1 
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      width: 200,
      flex: 1 
    },
    { 
      field: 'company', 
      headerName: 'Entreprise', 
      width: 150,
      flex: 1 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Modifier">
            <IconButton 
              onClick={() => handleEdit(params.row)}
              size="small"
            >
              <Edit2 size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDelete(params.row)}
              disabled={isDeleting}
              size="small"
              color="error"
            >
              <Trash2 size={18} />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid 
        rows={partners} 
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
      
      {editingPartner && (
        <PartnerDialog
          isOpen={true}
          initialData={editingPartner}
          onClose={() => setEditingPartner(null)}
          onSave={async (data) => {
            await updatePartner(editingPartner.id, data);
            setEditingPartner(null);
          }}
        />
      )}

      <DeletePartnerDialog
        partner={deletingPartner}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => setDeletingPartner(null)}
        onConfirm={handleConfirmDelete}
      />

      <Snackbar 
        open={!!deleteError} 
        autoHideDuration={6000} 
        onClose={clearError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={clearError}>
          {deleteError}
        </Alert>
      </Snackbar>
    </Paper>
  );
}