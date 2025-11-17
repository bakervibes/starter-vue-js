# 🚀 Starter Vue.js

A modern, production-ready Vue 3 starter template with TypeScript, TanStack Query, Zod validation, and Tailwind CSS.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org/)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## ✨ What's Inside

- ⚡️ **Vue 3** with `<script setup>` syntax
- 🔷 **TypeScript** for type safety
- 🎨 **Tailwind CSS v4** for styling
- 🔄 **TanStack Query** for data fetching & caching
- ✅ **Zod** for schema validation
- 🛣️ **Vue Router** with lazy-loaded routes
- 📦 **Vite** for fast development & optimized builds
- 🧹 **ESLint + Prettier** with auto-fix on commit
- 🪝 **Husky** for Git hooks
- 🎯 Complete **CRUD example** included

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Recommended Setup](#recommended-ide-setup)
- [Project Commands](#project-setup)
- [Features](#features)
  - [Vue Router](#-vue-router)
  - [TanStack Query](#-tanstack-query-vue-query)
  - [Zod Validation](#-zod-schema-validation)
  - [Type-Safe API](#-type-safe-api-utility)
- [API Usage Guide](#-api-usage-guide)
  - [Basic API Function](#fonction-api-de-base)
  - [HTTP Helpers](#helpers-http)
  - [Error Handling](#gestion-des-erreurs)
  - [Vue Query](#vue-query-tanstack-query)
  - [Zod Validation](#validation-avec-zod)
  - [Composables](#composables)
  - [Practical Examples](#exemples-pratiques)
  - [Best Practices](#best-practices)
- [Environment Variables](#environment-variables)
- [Code Quality & Git Hooks](#code-quality--git-hooks)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Format with [Prettier](https://prettier.io/)

```sh
pnpm format
```

## Features

### 🚀 Vue Router

The project uses Vue Router for client-side navigation with:

- **Lazy-loaded routes** for optimal performance
- **Layouts** (Header, Main, Footer) for consistent UI
- **404 handling** for unknown routes
- **Auto document title** updates based on route meta

```typescript
// Routes are automatically code-split
{
  path: '/',
  name: 'home',
  component: () => import('@/views/HomePage.vue')
}
```

### 🔄 TanStack Query (Vue Query)

Powerful data fetching and caching library configured with:

- **Smart caching** (5 min stale time, 10 min cache)
- **Auto retry** on errors
- **Refetch on window focus** (disabled in dev)
- **Optimistic updates** support

See [API Usage Guide](#-api-usage-guide) below for detailed usage.

### ✅ Zod Schema Validation

Type-safe schema validation with Zod for runtime type checking and data validation:

- **Schema-first approach** - Define schemas once, infer TypeScript types automatically
- **Validation helpers** - Built-in validation functions for forms and API responses
- **Type safety** - Full TypeScript support with autocompletion
- **Error handling** - Clear validation error messages

```typescript
import { userSchema, createUserSchema, validateCreateUser } from '@/types/user'
import type { User, CreateUserDto } from '@/types/user'

// Define schema with validation rules
export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  username: z.string().min(3).max(50),
  phone: z.string().optional(),
  website: z.string().url().optional(),
})

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>

// Validate data
const user = validateCreateUser(formData) // throws ZodError if invalid

// Safe validation (no throw)
const result = safeValidateCreateUser(formData)
if (result.success) {
  console.log(result.data) // typed as CreateUserDto
} else {
  console.error(result.error.issues) // validation errors
}
```

**Key Benefits:**

- **Runtime validation** catches errors before sending to API
- **Automatic type inference** reduces code duplication
- **Schema composition** with `.omit()`, `.partial()`, `.extend()`
- **Form validation** with detailed error messages
- **API response validation** ensures data integrity

### 🌐 Type-Safe API Utility

A fully typed API utility function for making HTTP requests:

```typescript
import { api } from '@/utils/api'

// Type-safe with generics
const users = await api<User[]>('/users', 'GET')
const newUser = await api<User>('/users', 'POST', { name: 'John' })

// Or use helpers
import { get, post, put, del } from '@/utils/api'
const users = await get<User[]>('/users')
```

**Features:**

- Type-safe responses with TypeScript generics
- Automatic timeout handling
- Custom `ApiError` class for error handling
- Support for all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Optional data and config parameters

## Code Quality & Git Hooks

This project uses ESLint, Prettier, Husky, and lint-staged to ensure code quality and consistency.

### Automatic Checks

#### Pre-commit Hook

Before each commit, the following checks run automatically on staged files:

- **ESLint**: Fixes and validates code (with `--max-warnings 0`)
- **Prettier**: Formats code automatically
- ❌ Commits will be **blocked** if there are any linting errors

#### Pre-push Hook

Before each push, the following checks run:

- **ESLint**: Full codebase validation
- **TypeScript**: Type checking

#### Build Process

The `pnpm build` command runs:

1. Type checking with `vue-tsc`
2. Linting with `eslint --max-warnings 0`
3. Build with Vite

❌ Builds will **fail** if there are any linting errors or warnings.

### Manual Commands

```sh
# Run ESLint with auto-fix
pnpm lint

# Run ESLint without fixing (used in CI/build)
pnpm lint:check

# Format all files with Prettier
pnpm format
```

### VSCode Integration

The project includes VSCode settings (`.vscode/settings.json`) that:

- Format files on save with Prettier
- Auto-fix ESLint issues on save
- Validate Vue, TypeScript, and JavaScript files

### Configuration Files

- **ESLint**: `eslint.config.ts` - Vue 3 + TypeScript rules
- **Prettier**: `.prettierrc.json` - Code formatting rules
- **Husky**: `.husky/` - Git hooks configuration
- **lint-staged**: `package.json` - Pre-commit file processing

## 🎯 Example Usage

Check `src/views/HomePage.vue` for a complete CRUD example with:

- Form validation using Zod
- Create, Read, Update, Delete operations
- Search functionality
- Error handling
- Loading states

## Environment Variables

This project uses **Zod** for type-safe environment variable validation.

### Setup

1. Copy `.env.example` to `.env`:

```sh
cp .env.example .env
```

2. Update the variables in `.env` with your configuration

### Available Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client:

| Variable                | Type      | Description              | Example                                   |
| ----------------------- | --------- | ------------------------ | ----------------------------------------- |
| `VITE_APP_NAME`         | `string`  | Application name         | `Vexa Front`                              |
| `VITE_APP_VERSION`      | `string`  | Application version      | `0.0.0`                                   |
| `VITE_API_URL`          | `string`  | API base URL             | `http://localhost:3000/api`               |
| `VITE_API_TIMEOUT`      | `number`  | API request timeout (ms) | `30000`                                   |
| `VITE_ENABLE_DEV_TOOLS` | `boolean` | Enable Vue DevTools      | `true`                                    |
| `VITE_ENABLE_ANALYTICS` | `boolean` | Enable analytics         | `false`                                   |
| `VITE_ENV`              | `enum`    | Environment              | `development`, `staging`, or `production` |

### Type-Safe Usage

Import validated environment variables from `src/env.ts`:

```typescript
import { env, isDevelopment, isProduction } from '@/env'

// All variables are typed and validated
const apiUrl = env.VITE_API_URL // string (URL validated)
const timeout = env.VITE_API_TIMEOUT // number (converted from string)
const devTools = env.VITE_ENABLE_DEV_TOOLS // boolean

// Helper functions
if (isDevelopment) {
  console.log('Running in development mode')
}
```

### Validation

The application **validates all environment variables on startup** using Zod:

- Type checking (string, number, boolean, enum)
- URL format validation for API URLs
- Positive number validation for timeout
- Enum validation for environment

If validation fails, the application will display a detailed error message indicating which variables are invalid.

### Files

- `.env` - Your local environment variables (git-ignored)
- `.env.example` - Template with all required variables
- `src/env.ts` - Zod schema and validation logic
- `env.d.ts` - TypeScript declarations for `import.meta.env`

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

Please ensure your code follows the project's code style and passes all linting checks.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Credits

Built with:

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [TanStack Query](https://tanstack.com/query) - Powerful asynchronous state management
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

---

**Made with ❤️ by [Baker Vibes](https://github.com/bakervibes)**

---

# 📚 API Usage Guide

This guide explains how to use the type-safe API utility function, Vue Query, and Zod in your application.

## Fonction API de Base

La fonction `api()` est la fonction principale pour effectuer des requêtes HTTP.

### Signature

```typescript
api<TResponse>(url: string, method: HttpMethod, data?: unknown, config?: ApiRequestConfig): Promise<TResponse>
```

### Paramètres

- **url** : URL de l'endpoint (relative ou absolue)
- **method** : Méthode HTTP (`'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'`)
- **data** (optionnel) : Données à envoyer (ignoré pour GET)
- **config** (optionnel) : Configuration additionnelle

### Exemples

```typescript
import { api } from '@/utils/api'
import type { User } from '@/types/user'

// GET request
const users = await api<User[]>('/users', 'GET')

// POST request avec data
const newUser = await api<User>('/users', 'POST', {
  name: 'John Doe',
  email: 'john@example.com',
})

// PUT request avec config personnalisée
const updatedUser = await api<User>(
  '/users/1',
  'PUT',
  { name: 'Jane Doe' },
  {
    timeout: 5000,
    headers: { 'X-Custom-Header': 'value' },
  },
)

// DELETE request
await api<void>('/users/1', 'DELETE')
```

## Helpers HTTP

Pour plus de concision, utilisez les helpers HTTP :

```typescript
import { get, post, put, patch, del } from '@/utils/api'

// GET
const users = await get<User[]>('/users')

// POST
const newUser = await post<User>('/users', { name: 'John' })

// PUT
const updated = await put<User>('/users/1', { name: 'Jane' })

// PATCH
const patched = await patch<User>('/users/1', { email: 'new@email.com' })

// DELETE
await del('/users/1')
```

## Gestion des Erreurs

L'API utilise une classe `ApiError` personnalisée pour les erreurs HTTP :

```typescript
import { api, ApiError } from '@/utils/api'

try {
  const user = await api<User>('/users/999', 'GET')
} catch (error) {
  if (error instanceof ApiError) {
    console.error('Status:', error.status)
    console.error('Message:', error.message)
    console.error('Data:', error.data)

    // Gérer des codes d'erreur spécifiques
    switch (error.status) {
      case 404:
        console.log('User not found')
        break
      case 401:
        console.log('Unauthorized')
        break
      case 408:
        console.log('Request timeout')
        break
    }
  }
}
```

## Vue Query (TanStack Query)

Vue Query gère automatiquement le cache, les rechargements, et la synchronisation des données.

### Configuration

La configuration se trouve dans `src/plugins/vue-query.ts` :

```typescript
{
  staleTime: 5 minutes,      // Durée avant péremption des données
  gcTime: 10 minutes,         // Durée de conservation en cache
  retry: 2,                   // Nombre de tentatives en cas d'erreur
  refetchOnWindowFocus: true  // Recharger au focus de la fenêtre
}
```

### Utilisation Directe

```typescript
import { useQuery, useMutation } from '@tanstack/vue-query'
import { api } from '@/utils/api'

// Query (lecture)
const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: () => api<User[]>('/users', 'GET'),
})

// Mutation (écriture)
const { mutate, isPending } = useMutation({
  mutationFn: (newUser: CreateUserDto) => api<User>('/users', 'POST', newUser),
  onSuccess: (data) => {
    console.log('User created:', data)
  },
})

// Utiliser la mutation
mutate({ name: 'John', email: 'john@example.com' })
```

## Validation avec Zod

Zod permet de valider les données à l'exécution avec une sécurité de type complète.

### Créer un Schéma

Définissez vos schémas dans `src/types/` :

```typescript
import { z } from 'zod'

// Schéma de base
export const userSchema = z.object({
  id: z.number().int().positive('ID must be positive'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  phone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
})

// Schémas dérivés
export const createUserSchema = userSchema.omit({ id: true })
export const updateUserSchema = createUserSchema.partial()

// Types inférés
export type User = z.infer<typeof userSchema>
export type CreateUserDto = z.infer<typeof createUserSchema>
export type UpdateUserDto = z.infer<typeof updateUserSchema>
```

### Helpers de Validation

```typescript
// Validation avec exception
export function validateUser(data: unknown): User {
  return userSchema.parse(data) // Throws ZodError si invalide
}

// Validation safe (sans exception)
export function safeValidateUser(data: unknown) {
  return userSchema.safeParse(data) // Returns { success: boolean, data?, error? }
}
```

### Utilisation dans les Composants

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { createUserSchema, type CreateUserDto } from '@/types/user'
import { z } from 'zod'

const formData = ref<CreateUserDto>({
  name: '',
  email: '',
  username: '',
})

const formErrors = ref<Record<string, string>>({})

function validateForm(): boolean {
  formErrors.value = {}

  try {
    createUserSchema.parse(formData.value)
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Convertir les erreurs Zod en objet d'erreurs
      error.issues.forEach((issue: z.ZodIssue) => {
        const field = issue.path[0] as string
        formErrors.value[field] = issue.message
      })
    }
    return false
  }
}

function handleSubmit() {
  if (!validateForm()) {
    return // Formulaire invalide
  }
  // Formulaire valide, envoyer les données
  createUser(formData.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="formData.name" />
      <p v-if="formErrors.name" class="error">{{ formErrors.name }}</p>
    </div>
    <button type="submit">Submit</button>
  </form>
</template>
```

### Validation des Réponses API

Validez les réponses API pour garantir l'intégrité des données :

```typescript
import { api } from '@/utils/api'
import { userSchema, type User } from '@/types/user'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api<unknown[]>('/users', 'GET')

      // Valider chaque utilisateur
      return response.map((user) => {
        const result = userSchema.safeParse(user)
        if (!result.success) {
          console.error('Invalid user data:', result.error)
          throw new Error('Invalid user data from API')
        }
        return result.data
      })
    },
  })
}
```

### Schémas Avancés

```typescript
// Composition de schémas
export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
})

export const userWithAddressSchema = userSchema.extend({
  address: addressSchema,
})

// Transformations
export const dateSchema = z
  .string()
  .transform((str) => new Date(str))
  .pipe(z.date())

// Unions et enums
export const roleSchema = z.enum(['admin', 'user', 'guest'])
export const userOrAdminSchema = z.union([userSchema, adminSchema])

// Raffinements personnalisés
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((pwd) => /[A-Z]/.test(pwd), 'Password must contain uppercase')
  .refine((pwd) => /[0-9]/.test(pwd), 'Password must contain number')
```

## Composables

Les composables encapsulent la logique Vue Query pour une meilleure réutilisabilité.

### Créer un Composable

Exemple : `src/composables/useUsers.ts`

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { api } from '@/utils/api'
import type { User, CreateUserDto } from '@/types/user'

// Clés de requête
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}

// Récupérer tous les utilisateurs
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => api<User[]>('/users', 'GET'),
  })
}

// Récupérer un utilisateur
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api<User>(`/users/${id}`, 'GET'),
    enabled: id > 0, // Ne lance la requête que si ID valide
  })
}

// Créer un utilisateur
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserDto) => api<User>('/users', 'POST', data),
    onSuccess: () => {
      // Invalider le cache pour recharger la liste
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

// Mettre à jour un utilisateur
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      api<User>(`/users/${id}`, 'PUT', data),
    onSuccess: (data, variables) => {
      // Mettre à jour le cache
      queryClient.setQueryData(userKeys.detail(variables.id), data)
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

// Supprimer un utilisateur
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => api<void>(`/users/${id}`, 'DELETE'),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.removeQueries({ queryKey: userKeys.detail(id) })
    },
  })
}
```

### Utiliser un Composable

```vue
<script setup lang="ts">
import { useUsers, useCreateUser, useDeleteUser } from '@/composables/useUsers'

// Récupérer les utilisateurs
const { data: users, isLoading, refetch } = useUsers()

// Mutation de création
const { mutate: createUser, isPending: isCreating } = useCreateUser()

// Mutation de suppression
const { mutate: deleteUser } = useDeleteUser()

// Créer un utilisateur
function handleCreate() {
  createUser({
    name: 'John Doe',
    email: 'john@example.com',
  })
}

// Supprimer un utilisateur
function handleDelete(id: number) {
  deleteUser(id)
}
</script>

<template>
  <div>
    <button @click="handleCreate" :disabled="isCreating">Create User</button>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="users">
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
        <button @click="handleDelete(user.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
```

## Exemples Pratiques

### 1. Liste avec Recherche

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUsers } from '@/composables/useUsers'

const search = ref('')
const { data: users, isLoading } = useUsers()

const filteredUsers = computed(() => {
  if (!users.value) return []
  return users.value.filter((u) => u.name.toLowerCase().includes(search.value.toLowerCase()))
})
</script>

<template>
  <input v-model="search" placeholder="Search users..." />
  <div v-for="user in filteredUsers" :key="user.id">
    {{ user.name }}
  </div>
</template>
```

### 2. Formulaire avec Mutation

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useCreateUser } from '@/composables/useUsers'

const name = ref('')
const email = ref('')

const { mutate, isPending, isSuccess, isError, error } = useCreateUser()

function handleSubmit() {
  mutate(
    { name: name.value, email: email.value },
    {
      onSuccess: () => {
        // Reset form
        name.value = ''
        email.value = ''
      },
    },
  )
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="name" placeholder="Name" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <button type="submit" :disabled="isPending">
      {{ isPending ? 'Creating...' : 'Create User' }}
    </button>

    <p v-if="isSuccess" class="success">User created!</p>
    <p v-if="isError" class="error">Error: {{ error.message }}</p>
  </form>
</template>
```

### 3. Détails avec Paramètre de Route

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUser } from '@/composables/useUsers'

const route = useRoute()
const userId = computed(() => Number(route.params.id))

const { data: user, isLoading, isError } = useUser(userId.value)
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError">User not found</div>
  <div v-else-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>
```

### 4. Mutation avec Optimistic Update

```typescript
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      api<User>(`/users/${id}`, 'PUT', data),

    // Avant la requête
    onMutate: async ({ id, data }) => {
      // Annuler les requêtes en cours
      await queryClient.cancelQueries({ queryKey: userKeys.detail(id) })

      // Sauvegarder les données actuelles
      const previous = queryClient.getQueryData(userKeys.detail(id))

      // Optimistically update
      queryClient.setQueryData(userKeys.detail(id), (old: User) => ({
        ...old,
        ...data,
      }))

      return { previous }
    },

    // En cas d'erreur, restaurer les données
    onError: (err, variables, context) => {
      queryClient.setQueryData(userKeys.detail(variables.id), context?.previous)
    },

    // Toujours refetch après
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.detail(variables.id),
      })
    },
  })
}
```

## Best Practices

### 1. Typage Strict

Toujours spécifier le type de retour :

```typescript
// ✅ Bon
const users = await api<User[]>('/users', 'GET')

// ❌ Mauvais
const users = await api('/users', 'GET') // Type 'unknown'
```

### 2. Query Keys Organisées

Utilisez une structure cohérente pour les query keys :

```typescript
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}
```

### 3. Gestion des Erreurs

Toujours gérer les erreurs dans l'UI :

```vue
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="isError" class="error">
    {{ error.message }}
  </div>
  <div v-else-if="data">
    <!-- Success state -->
  </div>
</template>
```

### 4. Composables Réutilisables

Créez des composables pour chaque ressource API :

```
src/composables/
  ├── useUsers.ts
  ├── useProducts.ts
  ├── useOrders.ts
  └── useAuth.ts
```

### 5. Configuration par Requête

Personnalisez la configuration selon les besoins :

```typescript
useQuery({
  queryKey: ['heavy-data'],
  queryFn: fetchHeavyData,
  staleTime: 1000 * 60 * 30, // 30 minutes pour données lourdes
  gcTime: 1000 * 60 * 60, // 1 heure en cache
})
```

## Ressources

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/vue/overview)
- [Zod Documentation](https://zod.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
