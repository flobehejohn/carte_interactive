# Boîte de dialogue Partenaire

## Fonctionnalités

### Gestion des catégories
- Ajout dynamique de catégories personnalisées à chaque niveau
- Suppression des catégories personnalisées uniquement
- Persistance des catégories personnalisées dans le localStorage
- Validation pour éviter les doublons
- Feedback visuel pour chaque action (succès/erreur)

### Formulaire
- Validation des champs requis (nom, email)
- Validation du format email
- Validation des URLs (site web)
- Gestion des photos (avatar et galerie)
- Sauvegarde de l'état pendant l'édition
- Gestion des erreurs avec feedback visuel

### Logs et monitoring
- Traçage des actions utilisateur
- Capture des erreurs
- Mesures de performance
- Logs détaillés pour le debugging

## Utilisation

```typescript
import { PartnerDialog } from '@/components/partners';

function MyComponent() {
  const handleSave = async (partner) => {
    // Sauvegarder le partenaire
    await savePartner(partner);
  };

  return (
    <PartnerDialog
      isOpen={true}
      onClose={() => setIsOpen(false)}
      onSave={handleSave}
      initialData={existingPartner} // Optionnel, pour l'édition
    />
  );
}
```

## Structure des données

```typescript
interface Partner {
  id?: string;
  name: string;
  firstName?: string;
  email: string;
  phone?: string;
  company?: string;
  categoryPath: string[];
  photo?: string;
  website?: string;
  description?: string;
  gallery?: string[];
}
```

## Tests
- Tests unitaires pour la validation du formulaire
- Tests d'intégration pour l'ajout/suppression de catégories
- Tests de soumission du formulaire
- Tests des cas d'erreur

## Bonnes pratiques
1. Toujours valider les données avant la soumission
2. Gérer les états de chargement et les erreurs
3. Fournir un feedback visuel pour chaque action
4. Persister les données importantes localement
5. Logger les actions critiques pour le debugging