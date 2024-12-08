#!/bin/bash

# Étape 1 : Vérification des fichiers modifiés
modified_files=$(git diff --name-only)

if [ -z "$modified_files" ]; then
  echo "Aucune modification détectée."
  exit 0
fi

# Étape 2 : Génération du nom de branche
branch_name="modif-$(date +'%Y%m%d-%H%M%S')-$(echo $modified_files | tr ' ' '-' | cut -c1-30)"
echo "Création de la branche : $branch_name"

git checkout -b $branch_name

# Étape 3 : Ajout et validation
git add .
commit_message="Modifications effectuées dans Bolt :
$(echo $modified_files | sed 's/ /\\n - /g')"
git commit -m "$commit_message"

# Étape 4 : Pousser vers GitHub
git push origin $branch_name
echo "Modifications poussées sur GitHub dans la branche $branch_name"
