/// <reference types="vite/client" />

/**
 * Déclaration TypeScript pour les composants Vue
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

/**
 * Déclaration TypeScript pour les variables d'environnement Vite
 * Cela permet l'autocomplétion dans import.meta.env
 */
interface ImportMetaEnv {
  // Application
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string

  // API Configuration
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string

  // Feature Flags
  readonly VITE_ENABLE_DEV_TOOLS: string
  readonly VITE_ENABLE_ANALYTICS: string

  // Environment
  readonly VITE_ENV: 'development' | 'staging' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
