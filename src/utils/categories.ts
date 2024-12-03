export interface Category {
  isUserAdded: boolean;
  subCategories: Record<string, Category>;
}

export const getDefaultCategories = () => ({
  subCategories: {
    "Acteurs Internes à Est Ensemble Habitat": {
      isUserAdded: false,
      subCategories: {
        "Administration Générale": {
          isUserAdded: false,
          subCategories: {
            "Direction Générale": {
              isUserAdded: false,
              subCategories: {
                "Directeur Général": { isUserAdded: false, subCategories: {} },
                "Secrétariat de Direction": { isUserAdded: false, subCategories: {} }
              }
            },
            "Ressources Humaines": {
              isUserAdded: false,
              subCategories: {
                "Gestion du personnel": { isUserAdded: false, subCategories: {} },
                "Formation et développement": { isUserAdded: false, subCategories: {} }
              }
            },
            "Service Financier": {
              isUserAdded: false,
              subCategories: {
                "Comptabilité": { isUserAdded: false, subCategories: {} },
                "Budget et contrôle de gestion": { isUserAdded: false, subCategories: {} }
              }
            }
          }
        },
        "Services Techniques": {
          isUserAdded: false,
          subCategories: {
            "Maintenance et Entretien": {
              isUserAdded: false,
              subCategories: {
                "Équipes de maintenance": { isUserAdded: false, subCategories: {} },
                "Gestion des infrastructures": { isUserAdded: false, subCategories: {} }
              }
            }
          }
        }
      }
    },
    "Acteurs Externes": {
      isUserAdded: false,
      subCategories: {
        "Institutions Gouvernementales": {
          isUserAdded: false,
          subCategories: {
            "Mairies": { isUserAdded: false, subCategories: {} },
            "Services Sociaux": { isUserAdded: false, subCategories: {} }
          }
        },
        "Associations": {
          isUserAdded: false,
          subCategories: {
            "Associations de Quartier": { isUserAdded: false, subCategories: {} },
            "Associations de Locataires": { isUserAdded: false, subCategories: {} }
          }
        }
      }
    }
  }
});