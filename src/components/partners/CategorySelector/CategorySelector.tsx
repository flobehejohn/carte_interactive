import { Box } from '@mui/material';
import { CategorySelect } from './CategorySelect';
import { CategoryPath } from './CategoryPath';
import { useCategories } from './useCategories';

interface CategorySelectorProps {
  selectedPath: string[];
  onChange: (path: string[]) => void;
  disabled?: boolean;
}

export function CategorySelector({ 
  selectedPath, 
  onChange,
  disabled 
}: CategorySelectorProps) {
  const {
    categoryLevels,
    labels,
    handleCategoryChange,
    handleAddCategory,
    handleDeleteCategory
  } = useCategories(selectedPath, onChange);

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {categoryLevels.map((options, index) => (
          <CategorySelect
            key={index}
            label={labels[index]}
            value={selectedPath[index] || ''}
            options={options}
            onChange={(value) => handleCategoryChange(value, index)}
            onAddCategory={(category) => handleAddCategory(category, index)}
            onDeleteCategory={(category) => handleDeleteCategory(category, index)}
            disabled={disabled}
          />
        ))}
      </Box>

      <CategoryPath path={selectedPath} />
    </Box>
  );
}