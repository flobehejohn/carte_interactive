# Étape de build
FROM node:20-alpine AS builder

# Création d'un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./

# Installation des dépendances
RUN npm ci

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape de production
FROM node:20-alpine AS runner

# Création d'un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Installation des dépendances de production uniquement
COPY --from=builder /app/package*.json ./
RUN npm ci --production

# Copie des fichiers de build
COPY --from=builder /app/dist ./dist

# Configuration des permissions
RUN chown -R appuser:appgroup /app

# Utilisation de l'utilisateur non-root
USER appuser

# Exposition du port
EXPOSE 5173

# Commande de démarrage
CMD ["npm", "run", "preview"]