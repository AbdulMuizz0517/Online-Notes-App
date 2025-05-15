import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { getUserIdFromToken } from "@/lib/auth-utils"

// Define validation schema for updating notes
const updateNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }).optional(),
  content: z.string().min(1, { message: "Content is required" }).optional(),
  categoryId: z.string().min(1, { message: "Category is required" }).optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = params.id

    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch note
    const note = await db.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    })

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error("Error fetching note:", error)
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = params.id

    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await request.json()
    const result = updateNoteSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 })
    }

    // Check if note exists and belongs to user
    const existingNote = await db.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // If categoryId is provided, verify it belongs to user
    if (result.data.categoryId) {
      const category = await db.category.findFirst({
        where: {
          id: result.data.categoryId,
          userId,
        },
      })

      if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 })
      }
    }

    // Update note
    const updatedNote = await db.note.update({
      where: {
        id: noteId,
      },
      data: result.data,
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error("Error updating note:", error)
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const noteId = params.id

    // Get user ID from token
    const userId = getUserIdFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if note exists and belongs to user
    const existingNote = await db.note.findFirst({
      where: {
        id: noteId,
        userId,
      },
    })

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    // Delete note
    await db.note.delete({
      where: {
        id: noteId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting note:", error)
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
}
