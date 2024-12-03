import React from 'react';
import { Select } from './ui';
import { getCategoryLevels } from '../utils/categoryUtils';

interface CategorySelectorProps {
  selectedPath: string[];
  onChange: (path: string[]) => void;
}

export function CategorySelector({ selectedPath, onChange }: CategorySelectorProps) {
  const levels = getCategoryLevels(selectedPath);
  const labels = [
    "Catégorie principale",
    "Sous-catégorie",
    "Service",
    "Poste"
  ];

  const handleLevelChange = (value: string, level: number) => {
    const newPath = [...selectedPath.slice(0, level), value];
    onChange(newPath);
  };

  return (
    <div className="space-y-4">
      {levels.map((options, index) => (
        <Select
          key={index}
          label={labels[index]}
          value={selectedPath[index] || ''}
          onChange={(e) => handleLevelChange(e.target.value, index)}
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      ))}
    </div>
  );
}