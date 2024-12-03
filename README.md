# Application de Gestion d'Événements et de Partenaires

## Prérequis

- Node.js >= 18.0.0
- npm >= 8.0.0

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Docker

### Développement
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose up
```

## Gestion des dépendances

Les versions des dépendances sont strictement fixées pour garantir la reproductibilité des builds. Pour mettre à jour les dépendances :

1. Vérifier les mises à jour disponibles :
```bash
npm run audit
```

2. Mettre à jour une dépendance :
```bash
npm install package@version
```

3. Tester l'application après chaque mise à jour

## Logs

Les logs sont stockés dans le dossier `logs/` :
- `error.log` : Erreurs uniquement
- `combined.log` : Tous les logs

## Environnement

Créer un fichier `.env` basé sur `.env.example` pour configurer les variables d'environnement.