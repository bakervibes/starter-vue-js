import { env } from '@/env'

/**
 * Configuration de l'API basée sur les variables d'environnement
 */
export const apiConfig = {
  baseURL: env.VITE_API_URL,
  timeout: env.VITE_API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
} as const

/**
 * Helper pour construire une URL complète de l'API
 */
export function buildApiUrl(endpoint: string): string {
  const url = new URL(endpoint, env.VITE_API_URL)
  return url.toString()
}

/**
 * Exemple de fonction fetch avec la configuration de l'API
 */
export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout)

  try {
    const response = await fetch(buildApiUrl(endpoint), {
      ...options,
      headers: {
        ...apiConfig.headers,
        ...options?.headers,
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } finally {
    clearTimeout(timeoutId)
  }
}
