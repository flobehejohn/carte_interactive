const STORAGE_KEYS = {
  PARTNERS: 'app_partners',
  EVENTS: 'app_events',
  CATEGORIES: 'app_categories'
} as const;

class LocalStorage {
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key}:`, error);
      return defaultValue;
    }
  }

  setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Erreur lors de l'écriture de ${key}:`, error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key}:`, error);
    }
  }
}

export const storage = new LocalStorage();
export { STORAGE_KEYS };