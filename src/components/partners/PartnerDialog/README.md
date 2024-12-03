# Composant PartnerDialog

Ce composant gère l'ajout et la modification des partenaires avec une interface utilisateur intuitive et robuste.

## Caractéristiques

- ✅ Formulaire complet avec validation
- ✅ Gestion des catégories dynamiques
- ✅ Upload de photos (avatar + galerie)
- ✅ Persistance des données
- ✅ Feedback utilisateur
- ✅ Logs et monitoring

## Utilisation

```tsx
import { PartnerDialog } from '@/components/partners';

function PartnersPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSave = async (partner) => {
    try {
      await savePartner(partner);
      setIsOpen(false);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <PartnerDialog
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={handleSave}
    />
  );
}
```

## Validation

Le formulaire valide automatiquement :
- Champs requis (nom, email)
- Format email
- URLs valides
- Sélection de catégorie

## Catégories

Les catégories peuvent être :
1. Prédéfinies (non supprimables)
2. Personnalisées (ajoutées par l'utilisateur)

Les catégories personnalisées sont :
- Persistées dans le localStorage
- Supprimables
- Validées pour éviter les doublons

## Photos

- Avatar : Une seule photo principale
- Galerie : Collection de photos additionnelles
- Recadrage : Interface intuitive de recadrage

## Logs

Actions tracées :
- Modifications de champs
- Ajout/suppression de catégories
- Soumission du formulaire
- Erreurs

## Tests

Pour exécuter les tests :
```bash
npm run test
```

## Maintenance

1. Vérifier régulièrement les logs d'erreur
2. Nettoyer périodiquement le localStorage
3. Mettre à jour les dépendances
4. Maintenir la documentation à jour