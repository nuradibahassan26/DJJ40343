export type Role = 'STUDENT' | 'LECTURER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  matricNo?: string
  role: Role
  createdAt: string
}

export interface AuthUser {
  id: string
  name: string
  email: string
  role: Role
  matricNo?: string
}
