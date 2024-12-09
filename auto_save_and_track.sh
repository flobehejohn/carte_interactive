#!/bin/bash

# Variables
REPO_PATH="D:/projet_pro/ophm/carte_interactive_dsu_/dev/save_app_demo/bolt/gte_bolt_03_12_2024_0_7_0_2/project"
HISTORY_FILE="$REPO_PATH/history_log.md"
CURRENT_DATE=$(date +"%Y-%m-%d %H:%M:%S")
BRANCH_NAME="main"

# Se déplacer dans le répertoire du projet
cd "$REPO_PATH" || { echo "Erreur : Répertoire introuvable."; exit 1; }

# Vérifier les changements
changed_files=$(git status --porcelain | awk '{print $2}')

if [ -z "$changed_files" ]; then
  echo "[$CURRENT_DATE] Aucun changement détecté."
  exit 0
fi

# Ajouter les fichiers au staging
git add .

# Mettre à jour le fichier d'historique
echo "## [$CURRENT_DATE] - Modifications détectées" >> "$HISTORY_FILE"
echo "- **Fichiers modifiés :**" >> "$HISTORY_FILE"

for file in $changed_files; do
  echo "  - $file" >> "$HISTORY_FILE"
done

echo "---" >> "$HISTORY_FILE"

# Ajouter le fichier d'historique au commit
git add "$HISTORY_FILE"

# Commit des changements avec horodatage
commit_message="Sauvegarde automatique : $CURRENT_DATE"
git commit -m "$commit_message"

# Créer une balise horodatée pour ce commit
tag_name="backup-$(date +"%Y%m%d-%H%M%S")"
git tag "$tag_name"

# Pousser les changements vers GitHub
git push origin "$BRANCH_NAME" --tags

echo "[$CURRENT_DATE] Changements sauvegardés et poussés avec succès."
