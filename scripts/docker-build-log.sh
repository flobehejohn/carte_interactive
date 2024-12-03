#!/bin/bash

# Création du dossier logs s'il n'existe pas
mkdir -p logs

# Construction de l'image avec logs
docker build -t react-app . 2>&1 | tee logs/docker-build.log

# Vérification du statut de la construction
if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo "Build successful! Logs saved to logs/docker-build.log"
else
    echo "Build failed! Check logs/docker-build.log for details"
    exit 1
fi