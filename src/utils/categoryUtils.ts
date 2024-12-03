import { getDefaultCategories } from './categories';

export function getCategoryLevels(path: string[] = []): string[][] {
  const categories = getDefaultCategories();
  let current = categories.subCategories;
  const levels: string[][] = [];

  // Premier niveau
  levels.push(Object.keys(current));

  // Parcourir le chemin pour obtenir les sous-catégories
  for (const category of path) {
    if (current[category]?.subCategories) {
      current = current[category].subCategories;
      levels.push(Object.keys(current));
    } else {
      break;
    }
  }

  return levels;
}

export function getCategoryPath(path: string[]): string {
  return path.join(' > ');
}