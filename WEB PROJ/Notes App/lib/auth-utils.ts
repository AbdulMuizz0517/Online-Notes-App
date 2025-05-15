import type { NextRequest } from "next/server"

// Extract user ID from JWT token
export function getUserIdFromToken(request: NextRequest): string | null {
  // Get authorization header
  const authHeader = request.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Try to get token from cookies
    const token = request.cookies.get("token")?.value

    if (!token) {
      return null
    }

    // In a real app, you would verify the token
    // For this example, we'll extract the user ID from the mock token
    const parts = token.split("-")
    if (parts.length >= 3) {
      return parts[2]
    }

    return null
  }

  const token = authHeader.substring(7)

  // In a real app, you would verify the token
  // For this example, we'll extract the user ID from the mock token
  const parts = token.split("-")
  if (parts.length >= 3) {
    return parts[2]
  }

  return null
}
