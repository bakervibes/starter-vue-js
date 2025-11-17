import { z } from 'zod'

/**
 * Schéma Zod pour un utilisateur
 * Définit la structure et les règles de validation
 */
export const userSchema = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username too long'),
  phone: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
})

/**
 * Schéma pour créer un utilisateur (sans l'ID)
 */
export const createUserSchema = userSchema.omit({ id: true })

/**
 * Schéma pour mettre à jour un utilisateur (tous les champs optionnels sauf ID)
 */
export const updateUserSchema = createUserSchema.partial()

/**
 * Type TypeScript inféré depuis le schéma Zod
 */
export type User = z.infer<typeof userSchema>

/**
 * Type pour créer un utilisateur
 */
export type CreateUserDto = z.infer<typeof createUserSchema>

/**
 * Type pour mettre à jour un utilisateur
 */
export type UpdateUserDto = z.infer<typeof updateUserSchema>

/**
 * Fonction helper pour valider un utilisateur
 * @throws {z.ZodError} Si la validation échoue
 */
export function validateUser(data: unknown): User {
  return userSchema.parse(data)
}

/**
 * Fonction helper pour valider un CreateUserDto
 * @throws {z.ZodError} Si la validation échoue
 */
export function validateCreateUser(data: unknown): CreateUserDto {
  return createUserSchema.parse(data)
}

/**
 * Fonction helper pour valider un UpdateUserDto
 * @throws {z.ZodError} Si la validation échoue
 */
export function validateUpdateUser(data: unknown): UpdateUserDto {
  return updateUserSchema.parse(data)
}

/**
 * Fonction helper pour valider de manière "safe" (sans throw)
 * Retourne { success: true, data } ou { success: false, error }
 */
export function safeValidateUser(data: unknown) {
  return userSchema.safeParse(data)
}

export function safeValidateCreateUser(data: unknown) {
  return createUserSchema.safeParse(data)
}

export function safeValidateUpdateUser(data: unknown) {
  return updateUserSchema.safeParse(data)
}
