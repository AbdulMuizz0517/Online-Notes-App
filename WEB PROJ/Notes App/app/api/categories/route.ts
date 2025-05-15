import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserIdFromToken } from "@/lib/auth-utils"

// Define validation schema for creating categories
const createCategorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }).max(50, { message: "Category name is too long" }),
})

export async function GET(request: NextRequest) {
  try {
    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch categories
    const categories = await db.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const result = createCategorySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { name } = result.data

    // Check if category with same name already exists for this user
    const existingCategory = await db.category.findFirst({
      where: {
        name,
        userId,
      },
    })

    if (existingCategory) {
      return NextResponse.json({ error: "Category with this name already exists" }, { status: 409 })
    }

    // Create category
    const category = await db.category.create({
      data: {
        name,
        userId,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
