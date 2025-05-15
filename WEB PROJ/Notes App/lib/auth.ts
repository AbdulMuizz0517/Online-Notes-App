import type { LoginCredentials, SignUpCredentials, AuthResponse } from "./types"

// In a real app, these would be API calls to your backend
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // This is a mock implementation
  // In a real app, you would make an API call to your backend
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any credentials with valid format
      if (!credentials.email || !credentials.password) {
        reject(new Error("Email and password are required"))
        return
      }

      // Store token in localStorage
      const token = `mock-jwt-token-${Date.now()}`
      localStorage.setItem("token", token)

      resolve({
        user: {
          id: "1",
          name: "Demo User",
          email: credentials.email,
        },
        token,
      })
    }, 500)
  })
}

export async function signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
  // This is a mock implementation
  // In a real app, you would make an API call to your backend
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(credentials.email)) {
        reject(new Error("Please enter a valid email address"))
        return
      }

      // Validate password length
      if (credentials.password.length < 8) {
        reject(new Error("Password must be at least 8 characters"))
        return
      }

      // Store token in localStorage
      const token = `mock-jwt-token-${Date.now()}`
      localStorage.setItem("token", token)

      resolve({
        user: {
          id: "1",
          name: credentials.name,
          email: credentials.email,
        },
        token,
      })
    }, 500)
  })
}

export async function logout(): Promise<void> {
  // This is a mock implementation
  // In a real app, you would make an API call to your backend
  return new Promise((resolve) => {
    // Simulate API call
    setTimeout(() => {
      // Remove token from localStorage
      localStorage.removeItem("token")
      resolve()
    }, 300)
  })
}

export function getAuthToken(): string | null {
  // In a browser environment
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  // In a server environment
  return null
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}
