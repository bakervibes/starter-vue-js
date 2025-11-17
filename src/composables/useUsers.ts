import type { CreateUserDto, UpdateUserDto, User } from '@/types/user'
import { api } from '@/utils/api'
import type { UseMutationOptions } from '@tanstack/vue-query'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

/**
 * Clés de requête pour les utilisateurs
 */
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (filters: string) => [...userKeys.lists(), { filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}

/**
 * Hook pour récupérer la liste des utilisateurs
 */
export function useUsers() {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: () => api<User[]>('https://jsonplaceholder.typicode.com/users', 'GET'),
  })
}

/**
 * Hook pour récupérer un utilisateur par son ID
 */
export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api<User>(`https://jsonplaceholder.typicode.com/users/${id}`, 'GET'),
    enabled: id > 0, // Ne lance la requête que si l'ID est valide
  })
}

/**
 * Hook pour créer un utilisateur
 */
export function useCreateUser(options?: UseMutationOptions<User, Error, CreateUserDto>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserDto) =>
      api<User>('https://jsonplaceholder.typicode.com/users', 'POST', data),
    onSuccess: (data) => {
      // Invalider le cache de la liste des utilisateurs
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      // Ajouter l'utilisateur au cache
      queryClient.setQueryData(userKeys.detail(data.id), data)
    },
    ...options,
  })
}

/**
 * Hook pour mettre à jour un utilisateur
 */
export function useUpdateUser(
  options?: UseMutationOptions<User, Error, { id: number; data: UpdateUserDto }>,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUserDto }) =>
      api<User>(`https://jsonplaceholder.typicode.com/users/${id}`, 'PUT', data),
    onSuccess: (data, variables) => {
      // Invalider le cache de la liste
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      // Mettre à jour le cache de l'utilisateur
      queryClient.setQueryData(userKeys.detail(variables.id), data)
    },
    ...options,
  })
}

/**
 * Hook pour supprimer un utilisateur
 */
export function useDeleteUser(options?: UseMutationOptions<void, Error, number>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      api<void>(`https://jsonplaceholder.typicode.com/users/${id}`, 'DELETE'),
    onSuccess: (_, id) => {
      // Invalider le cache
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.removeQueries({ queryKey: userKeys.detail(id) })
    },
    ...options,
  })
}
