#!/bin/bash

# Chemin du projet
PROJECT_PATH="D:/projet_pro/ophm/carte_interactive_dsu_/dev/save_app_demo/bolt/gte_bolt_03_12_2024_0_7_0_2/project"
cd "$PROJECT_PATH" || exit

# Étape 1 : Installer les dépendances manquantes
npm install || yarn install

# Étape 2 : Vérification des fichiers modifiés
modified_files=$(git diff --name-only)
if [ -z "$modified_files" ]; then
  echo "Aucune modification détectée."
  exit 0
fi

# Étape 3 : Génération du journal d'historique
history_file="history_log.md"
echo -e "## Modification détectée $(date +"%Y-%m-%d %H:%M:%S")\n" >> "$history_file"
for file in $modified_files; do
  echo "- $file" >> "$history_file"
done
echo -e "\n" >> "$history_file"

# Étape 4 : Commit et push
git add .
commit_message="Sauvegarde automatique : $(date +"%Y-%m-%d %H:%M:%S")"
git commit -m "$commit_message"
git tag "auto-$(date +"%Y%m%d-%H%M%S")"
git push origin main --tags

echo "Sauvegarde et historique mis à jour avec succès."
