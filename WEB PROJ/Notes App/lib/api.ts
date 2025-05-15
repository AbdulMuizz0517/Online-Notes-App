import type { Note, Category } from "./types"
import { getAuthToken } from "./auth"

// Base API URL - in a real app, this would be your backend API
const API_BASE_URL = "/api"

// Helper function to handle API requests
async function apiRequest<T>(endpoint: string, method = "GET", data?: any): Promise<T> {
  const token = getAuthToken()

  // This is a mock implementation
  // In a real app, you would make actual API calls
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      // Check authentication
      if (!token && endpoint !== "/auth/login" && endpoint !== "/auth/signup") {
        reject(new Error("Unauthorized"))
        return
      }

      // Mock responses based on endpoint and method
      if (endpoint.startsWith("/notes")) {
        if (method === "GET") {
          resolve(mockNotes as unknown as T)
        } else if (method === "POST") {
          const newNote: Note = {
            id: `note-${Date.now()}`,
            title: data.title,
            content: data.content,
            categoryId: data.categoryId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          mockNotes.unshift(newNote)
          resolve(newNote as unknown as T)
        } else if (method === "PUT" && endpoint.includes("/")) {
          const noteId = endpoint.split("/").pop()
          const noteIndex = mockNotes.findIndex((note) => note.id === noteId)

          if (noteIndex !== -1) {
            const updatedNote: Note = {
              ...mockNotes[noteIndex],
              ...data,
              updatedAt: new Date().toISOString(),
            }
            mockNotes[noteIndex] = updatedNote
            resolve(updatedNote as unknown as T)
          } else {
            reject(new Error("Note not found"))
          }
        } else if (method === "DELETE" && endpoint.includes("/")) {
          const noteId = endpoint.split("/").pop()
          const noteIndex = mockNotes.findIndex((note) => note.id === noteId)

          if (noteIndex !== -1) {
            mockNotes.splice(noteIndex, 1)
            resolve(true as unknown as T)
          } else {
            reject(new Error("Note not found"))
          }
        }
      } else if (endpoint.startsWith("/categories")) {
        if (method === "GET") {
          resolve(mockCategories as unknown as T)
        } else if (method === "POST") {
          const newCategory: Category = {
            id: `category-${Date.now()}`,
            name: data.name,
            userId: "1",
          }
          mockCategories.push(newCategory)
          resolve(newCategory as unknown as T)
        }
      } else {
        reject(new Error("Endpoint not implemented"))
      }
    }, 300)
  })
}

// Mock data
const mockNotes: Note[] = [
  {
    id: "1",
    title: "Welcome to NotesKeeper",
    content: "This is your first note. You can edit or delete it, or create new notes!",
    categoryId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "How to use categories",
    content: "Organize your notes by creating categories and assigning notes to them.",
    categoryId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Search functionality",
    content: "Use the search bar to quickly find notes by title or content.",
    categoryId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockCategories: Category[] = [
  { id: "1", name: "Personal", userId: "1" },
  { id: "2", name: "Work", userId: "1" },
  { id: "3", name: "Ideas", userId: "1" },
]

// Notes API
export async function fetchNotes(): Promise<Note[]> {
  return apiRequest<Note[]>(`${API_BASE_URL}/notes`)
}

export async function createNote(noteData: Omit<Note, "id" | "createdAt" | "updatedAt">): Promise<Note> {
  return apiRequest<Note>(`${API_BASE_URL}/notes`, "POST", noteData)
}

export async function updateNote(
  noteId: string,
  noteData: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>,
): Promise<Note> {
  return apiRequest<Note>(`${API_BASE_URL}/notes/${noteId}`, "PUT", noteData)
}

export async function deleteNote(noteId: string): Promise<boolean> {
  return apiRequest<boolean>(`${API_BASE_URL}/notes/${noteId}`, "DELETE")
}

// Categories API
export async function fetchCategories(): Promise<Category[]> {
  return apiRequest<Category[]>(`${API_BASE_URL}/categories`)
}

export async function createCategory(categoryData: Omit<Category, "id" | "userId">): Promise<Category> {
  return apiRequest<Category>(`${API_BASE_URL}/categories`, "POST", categoryData)
}
