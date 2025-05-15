import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserIdFromToken } from "@/lib/auth-utils"

// Define validation schema for creating notes
const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }),
  content: z.string().min(1, { message: "Content is required" }),
  categoryId: z.string().min(1, { message: "Category is required" }),
})

export async function GET(request: NextRequest) {
  try {
    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get("categoryId")
    const searchQuery = searchParams.get("search")

    // Build query
    const query: any = {
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }

    // Add category filter if provided
    if (categoryId) {
      query.where.categoryId = categoryId
    }

    // Add search filter if provided
    if (searchQuery) {
      query.where.OR = [
        {
          title: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      ]
    }

    // Fetch notes
    const notes = await db.note.findMany(query)

    return NextResponse.json(notes)
  } catch (error) {
    console.error("Error fetching notes:", error)
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
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
    const result = createNoteSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    const { title, content, categoryId } = result.data

    // Verify category belongs to user
    const category = await db.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    })

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    // Create note
    const note = await db.note.create({
      data: {
        title,
        content,
        categoryId,
        userId,
      },
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    console.error("Error creating note:", error)
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 })
  }
}
