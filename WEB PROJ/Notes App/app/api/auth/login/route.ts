import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { compare } from "bcrypt"
import { db } from "@/lib/db"

// Define validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { email, password } = result.data

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(user.id)

    // Return user data and token
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 })
  }
}

// Helper function to generate JWT token
function generateToken(userId: string): string {
  // In a real implementation, you would use a JWT library
  // For this example, we'll just return a mock token
  return `mock-jwt-token-${userId}-${Date.now()}`
}
