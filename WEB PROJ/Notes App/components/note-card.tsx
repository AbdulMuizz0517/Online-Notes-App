"use client"

import { useState } from "react"
import { format } from "date-fns"
import { MoreHorizontal, Trash, Edit, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { EditNoteDialog } from "@/components/edit-note-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteNote } from "@/lib/api"
import type { Note, Category } from "@/lib/types"

interface NoteCardProps {
  note: Note
  categories: Category[]
  onUpdate: (note: Note) => void
  onDelete: (id: string) => void
  layout?: "grid" | "list"
}

export function NoteCard({ note, categories, onUpdate, onDelete, layout = "grid" }: NoteCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const category = categories.find((c) => c.id === note.categoryId)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteNote(note.id)
      onDelete(note.id)
    } catch (error) {
      console.error("Failed to delete note:", error)
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  if (layout === "list") {
    return (
      <>
        <Card className="hover:bg-accent/50 transition-colors">
          <div className="flex items-center p-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{note.title}</h3>
                {category && (
                  <Badge variant="outline" className="ml-2">
                    {category.name}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{note.content}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {format(new Date(note.updatedAt), "MMM d, yyyy")}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </Card>

        <EditNoteDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          note={note}
          categories={categories}
          onNoteUpdated={onUpdate}
        />

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the note.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{note.title}</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {category && (
            <Badge variant="outline" className="mt-1 w-fit">
              {category.name}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-muted-foreground line-clamp-4">{note.content}</p>
        </CardContent>
        <CardFooter className="pt-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(note.updatedAt), "MMM d, yyyy")}
          </div>
        </CardFooter>
      </Card>

      <EditNoteDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        note={note}
        categories={categories}
        onNoteUpdated={onUpdate}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
