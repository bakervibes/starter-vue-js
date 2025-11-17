# Guide de Développement - Vexa Front

## 🚀 Quick Start

```bash
# Installation des dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env

# Démarrer le serveur de développement
pnpm dev

# Build de production
pnpm build
```

## 📁 Structure du Projet

```
vexa-front/
├── .husky/                    # Hooks Git (pre-commit, pre-push)
├── .vscode/                   # Configuration VSCode
│   ├── extensions.json       # Extensions recommandées
│   └── settings.json         # Paramètres de formatage automatique
├── dist/                      # Build de production (généré)
├── public/                    # Assets statiques
├── src/
│   ├── assets/               # Assets (CSS, images)
│   ├── utils/                # Utilitaires
│   │   └── api.ts           # Configuration API avec env
│   ├── App.vue              # Composant racine
│   ├── env.ts               # Variables d'environnement validées avec Zod
│   └── main.ts              # Point d'entrée de l'application
├── .env                      # Variables d'environnement (ignoré par git)
├── .env.example             # Template des variables d'environnement
├── env.d.ts                 # Déclarations TypeScript pour les env vars
├── eslint.config.ts         # Configuration ESLint
├── .prettierrc.json         # Configuration Prettier
├── package.json             # Dépendances et scripts
├── postcss.config.js        # Configuration PostCSS (Tailwind)
├── tsconfig.json            # Configuration TypeScript
└── vite.config.ts           # Configuration Vite
```

## 🔧 Outils de Développement

### ESLint

- Configuration Vue 3 + TypeScript
- Règles strictes avec `--max-warnings 0`
- Auto-fix sur les fichiers stagés

### Prettier

- Formatage automatique du code
- Intégré avec ESLint via `skip-formatting`
- Formatage sur sauvegarde dans VSCode

### Husky + lint-staged

- **Pre-commit** :
  1. ESLint fix + Prettier format sur fichiers stagés
  2. Build complet (type-check + lint + build)
  3. Bloque le commit si erreurs
- **Pre-push** :
  1. Vérification ESLint complète
  2. Type-checking TypeScript
  3. Bloque le push si erreurs

### Zod

- Validation des variables d'environnement au démarrage
- Type-safety complet pour les env vars
- Messages d'erreur clairs en cas de configuration invalide

## 🌍 Variables d'Environnement

Toutes les variables doivent être préfixées par `VITE_` :

```typescript
import { env, isDevelopment } from '@/env'

// Variables typées et validées
const apiUrl = env.VITE_API_URL // string (URL)
const timeout = env.VITE_API_TIMEOUT // number (converti)
const devMode = isDevelopment // boolean helper
```

Voir le fichier `.env.example` pour la liste complète des variables.

## 📝 Scripts Disponibles

| Script            | Description                                     |
| ----------------- | ----------------------------------------------- |
| `pnpm dev`        | Démarre le serveur de développement             |
| `pnpm build`      | Build de production (type-check + lint + build) |
| `pnpm preview`    | Prévisualise le build de production             |
| `pnpm lint`       | Lance ESLint avec auto-fix                      |
| `pnpm lint:check` | Vérifie ESLint sans auto-fix (CI)               |
| `pnpm format`     | Formate tous les fichiers avec Prettier         |
| `pnpm type-check` | Vérifie les types TypeScript                    |

## 🎯 Workflow de Développement

### 1. Créer une nouvelle fonctionnalité

```bash
# Créer une nouvelle branche
git checkout -b feature/ma-fonctionnalite

# Faire vos modifications
# Les fichiers sont automatiquement formatés sur sauvegarde dans VSCode

# Commit (pre-commit hook s'exécute automatiquement)
git add .
git commit -m "feat: ma nouvelle fonctionnalité"
# ✓ lint-staged formate et vérifie les fichiers
# ✓ build complet pour garantir qu'il n'y a pas d'erreurs

# Push (pre-push hook s'exécute automatiquement)
git push origin feature/ma-fonctionnalite
# ✓ lint-check vérifie tout le code
# ✓ type-check vérifie tous les types
```

### 2. Utiliser les Variables d'Environnement

```typescript
// ✅ Bon - Import depuis env.ts (typé et validé)
import { env } from '@/env'
const apiUrl = env.VITE_API_URL

// ❌ Mauvais - Accès direct à import.meta.env (non validé)
const apiUrl = import.meta.env.VITE_API_URL
```

### 3. Faire des Requêtes API

```typescript
import { apiRequest } from '@/utils/api'

// Les configurations (URL, timeout) sont automatiquement appliquées
const data = await apiRequest<MyType>('/endpoint')
```

## 🛡️ Protections de Qualité

### Build

Le build **échouera** si :

- ❌ Erreurs ou warnings ESLint
- ❌ Erreurs TypeScript
- ❌ Erreurs de compilation Vite

### Commit

Le commit sera **bloqué** si :

- ❌ Erreurs ESLint sur les fichiers stagés
- ❌ Erreurs de formatage Prettier
- ❌ Le build complet échoue

### Push

Le push sera **bloqué** si :

- ❌ Erreurs ou warnings ESLint dans tout le projet
- ❌ Erreurs TypeScript

## 🎨 Configuration VSCode

Les extensions recommandées :

- **Vue - Official** (Volar)
- **ESLint**
- **Prettier**
- **Tailwind CSS IntelliSense**

Paramètres automatiques :

- ✅ Formatage sur sauvegarde
- ✅ Auto-fix ESLint sur sauvegarde
- ✅ Support TypeScript pour .vue

## 📚 Ressources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)

## 🐛 Debugging

### Le build échoue avec des erreurs d'environnement

Vérifiez que votre fichier `.env` contient toutes les variables requises :

```bash
cp .env.example .env
# Puis éditez .env avec vos valeurs
```

### Le pre-commit est trop lent

Le pre-commit lance un build complet. Pour un commit rapide en développement :

```bash
# ⚠️ Utilisez avec précaution
git commit --no-verify -m "wip: work in progress"
```

### ESLint trouve trop d'erreurs

```bash
# Auto-fix toutes les erreurs possibles
pnpm lint

# Si des erreurs persistent, corrigez-les manuellement
```

## 🔄 Mise à Jour des Dépendances

```bash
# Vérifier les mises à jour disponibles
pnpm outdated

# Mettre à jour toutes les dépendances
pnpm update

# Ou mettre à jour une dépendance spécifique
pnpm update vue
```
