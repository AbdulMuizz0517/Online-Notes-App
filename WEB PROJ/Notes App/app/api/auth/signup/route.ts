import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { hash } from "bcrypt"
import { db } from "@/lib/db"

// Define validation schema
const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const result = signupSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { name, email, password } = result.data

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    // Create default categories for the user
    await db.category.createMany({
      data: [
        { name: "Personal", userId: user.id },
        { name: "Work", userId: user.id },
        { name: "Ideas", userId: user.id },
      ],
    })

    // Generate JWT token
    const token = generateToken(user.id)

    return NextResponse.json({ user, token }, { status: 201 })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 })
  }
}

// Helper function to generate JWT token
function generateToken(userId: string): string {
  // In a real implementation, you would use a JWT library
  // For this example, we'll just return a mock token
  return `mock-jwt-token-${userId}-${Date.now()}`
}
