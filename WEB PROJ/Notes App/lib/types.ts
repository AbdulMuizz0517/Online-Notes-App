export interface User {
  id: string
  name: string
  email: string
}

export interface Note {
  id: string
  title: string
  content: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  userId: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  name: string
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}
