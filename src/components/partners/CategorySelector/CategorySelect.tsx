import { useState } from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  TextField,
  Box,
  Divider,
  Typography,
  Snackbar,
  Alert,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';
import { useLogger } from '@/hooks/useLogger';
import { getCategoryIcon } from '@/utils/categoryIcons';

interface CategorySelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  disabled?: boolean;
}

export function CategorySelect({
  label,
  value,
  options,
  onChange,
  onAddCategory,
  onDeleteCategory,
  disabled
}: CategorySelectProps) {
  const { logAction } = useLogger('CategorySelect');
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
  };

  const handleAddCategory = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (newCategory.trim()) {
      if (options.includes(newCategory.trim())) {
        setSnackbar({
          open: true,
          message: 'Cette catégorie existe déjà',
          severity: 'error'
        });
        return;
      }

      onAddCategory(newCategory.trim());
      logAction('add_category', { category: newCategory });
      setNewCategory('');
      setIsAdding(false);
      setSnackbar({
        open: true,
        message: 'Catégorie ajoutée avec succès',
        severity: 'success'
      });
    }
  };

  const handleDeleteCategory = (category: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteCategory(category);
    logAction('delete_category', { category });
    setSnackbar({
      open: true,
      message: 'Catégorie supprimée',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <FormControl fullWidth size="small">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map((option) => {
            const { icon: Icon, color, label: iconLabel } = getCategoryIcon(option);
            
            return (
              <MenuItem 
                key={option} 
                value={option}
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={iconLabel}>
                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                      <Icon size={16} style={{ color }} />
                    </ListItemIcon>
                  </Tooltip>
                  <Typography>{option}</Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleDeleteCategory(option, e)}
                  sx={{ ml: 1 }}
                >
                  <Trash2 size={16} />
                </IconButton>
              </MenuItem>
            );
          })}
          
          <Divider sx={{ my: 1 }} />
          
          {isAdding ? (
            <MenuItem 
              sx={{ 
                display: 'flex',
                gap: 1,
                '&:hover': { backgroundColor: 'transparent' }
              }}
              disableRipple
            >
              <TextField
                size="small"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nouvelle catégorie"
                autoFocus
                onClick={(e) => e.stopPropagation()}
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
              >
                <Plus size={16} />
              </IconButton>
            </MenuItem>
          ) : (
            <MenuItem onClick={handleAddClick}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Plus size={16} />
                <Typography variant="body2">Ajouter une catégorie</Typography>
              </Box>
            </MenuItem>
          )}
        </Select>
      </FormControl>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}