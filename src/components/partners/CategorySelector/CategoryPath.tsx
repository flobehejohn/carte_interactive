import { Box, Paper, Typography, Chip, Tooltip } from '@mui/material';
import { ChevronRight } from 'lucide-react';
import { getCategoryIcon } from '@/utils/categoryIcons';

interface CategoryPathProps {
  path: string[];
}

export function CategoryPath({ path }: CategoryPathProps) {
  if (!path.length) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        p: 2,
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mb: 1, fontWeight: 500 }}
      >
        Arborescence complète
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        flexWrap: 'wrap',
        gap: 1
      }}>
        {path.map((category, index) => {
          const { icon: Icon, color, label } = getCategoryIcon(category);
          
          return (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title={label}>
                <Chip
                  icon={<Icon size={16} style={{ color }} />}
                  label={category}
                  size="small"
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 1,
                    '& .MuiChip-label': {
                      px: 1.5,
                      py: 0.75,
                      fontSize: '0.875rem'
                    }
                  }}
                />
              </Tooltip>
              {index < path.length - 1 && (
                <ChevronRight 
                  size={16} 
                  style={{ 
                    marginLeft: 4,
                    marginRight: 4,
                    color: '#9e9e9e'
                  }} 
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}