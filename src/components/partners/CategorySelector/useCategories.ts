import { useState, useCallback, useEffect } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { getCategoryLevels } from '@/utils/categoryUtils';

const CATEGORY_LABELS = [
  "Catégorie principale",
  "Sous-catégorie",
  "Service",
  "Poste"
];

const STORAGE_KEY = 'custom_categories';

export function useCategories(
  selectedPath: string[],
  onChange: (path: string[]) => void
) {
  const { logAction } = useLogger('CategorySelector');
  const [customCategories, setCustomCategories] = useState<Record<number, string[]>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Erreur lors de la lecture des catégories personnalisées:', error);
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customCategories));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des catégories personnalisées:', error);
    }
  }, [customCategories]);

  const getCombinedCategories = useCallback((level: number, defaultOptions: string[]) => {
    const custom = customCategories[level] || [];
    return [...new Set([...defaultOptions, ...custom])];
  }, [customCategories]);

  const categoryLevels = getCategoryLevels(selectedPath).map((options, level) => 
    getCombinedCategories(level, options)
  );

  const handleCategoryChange = (value: string, level: number) => {
    const newPath = [...selectedPath.slice(0, level), value];
    logAction('change_category', { level, value });
    onChange(newPath);
  };

  const handleAddCategory = (category: string, level: number) => {
    setCustomCategories(prev => {
      const existingCategories = prev[level] || [];
      if (existingCategories.includes(category)) {
        logAction('add_category_duplicate', { level, category });
        return prev;
      }
      
      logAction('add_custom_category', { level, category });
      return {
        ...prev,
        [level]: [...existingCategories, category]
      };
    });
  };

  const handleDeleteCategory = (category: string, level: number) => {
    // Ne supprime que les catégories personnalisées
    if (customCategories[level]?.includes(category)) {
      setCustomCategories(prev => ({
        ...prev,
        [level]: prev[level]?.filter(cat => cat !== category) || []
      }));
      
      // Si la catégorie supprimée était sélectionnée, met à jour le chemin
      if (selectedPath[level] === category) {
        const newPath = selectedPath.slice(0, level);
        onChange(newPath);
      }
      
      logAction('delete_custom_category', { level, category });
    }
  };

  return {
    categoryLevels,
    labels: CATEGORY_LABELS,
    handleCategoryChange,
    handleAddCategory,
    handleDeleteCategory
  };
}