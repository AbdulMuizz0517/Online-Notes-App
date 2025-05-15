// // // // // "use client"

// // // // // import { useState, useEffect } from "react"
// // // // // import { useRouter } from "next/navigation"
// // // // // import { Plus, Search, FolderPlus, LogOut, X } from "lucide-react"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Input } from "@/components/ui/input"
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// // // // // import { ThemeToggle } from "@/components/theme-toggle"
// // // // // import { Textarea } from "@/components/ui/textarea"
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
// // // // // import { logout } from "@/lib/auth"
// // // // // import { fetchNotes, fetchCategories } from "@/lib/api"
// // // // // import type { Note, Category } from "@/lib/types"

// // // // // // NoteCard Component
// // // // // const NoteCard = ({
// // // // //   note,
// // // // //   categories,
// // // // //   onUpdate,
// // // // //   onDelete,
// // // // //   layout = "grid",
// // // // // }: {
// // // // //   note: Note
// // // // //   categories: Category[]
// // // // //   onUpdate: (note: Note) => void
// // // // //   onDelete: (noteId: string) => void
// // // // //   layout?: "grid" | "list"
// // // // // }) => {
// // // // //   const [isEditing, setIsEditing] = useState(false)
// // // // //   const [title, setTitle] = useState(note.title)
// // // // //   const [content, setContent] = useState(note.content)
// // // // //   const [categoryId, setCategoryId] = useState(note.categoryId)

// // // // //   const handleSave = async () => {
// // // // //     const updatedNote = { ...note, title, content, categoryId, updatedAt: new Date().toISOString() }
// // // // //     onUpdate(updatedNote)
// // // // //     setIsEditing(false)
// // // // //   }

// // // // //   const handleDelete = async () => {
// // // // //     onDelete(note.id)
// // // // //   }

// // // // //   return (
// // // // //     <Card className={layout === "list" ? "flex flex-col" : ""}>
// // // // //       {isEditing ? (
// // // // //         <CardContent className="p-4">
// // // // //           <Input
// // // // //             value={title}
// // // // //             onChange={(e) => setTitle(e.target.value)}
// // // // //             className="mb-2"
// // // // //             placeholder="Note title"
// // // // //           />
// // // // //           <Textarea
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //             className="mb-2"
// // // // //             placeholder="Note content"
// // // // //           />
// // // // //           <Select value={categoryId} onValueChange={setCategoryId}>
// // // // //             <SelectTrigger className="mb-2">
// // // // //               <SelectValue placeholder="Select category" />
// // // // //             </SelectTrigger>
// // // // //             <SelectContent>
// // // // //               {categories.map((category) => (
// // // // //                 <SelectItem key={category.id} value={category.id}>
// // // // //                   {category.name}
// // // // //                 </SelectItem>
// // // // //               ))}
// // // // //             </SelectContent>
// // // // //           </Select>
// // // // //           <div className="flex gap-2">
// // // // //             <Button onClick={handleSave}>Save</Button>
// // // // //             <Button variant="outline" onClick={() => setIsEditing(false)}>
// // // // //               Cancel
// // // // //             </Button>
// // // // //           </div>
// // // // //         </CardContent>
// // // // //       ) : (
// // // // //         <>
// // // // //           <CardHeader>
// // // // //             <CardTitle>{note.title}</CardTitle>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
// // // // //             <p className="text-xs text-muted-foreground">
// // // // //               Category: {categories.find((c) => c.id === note.categoryId)?.name || "None"}
// // // // //             </p>
// // // // //             <div className="flex gap-2 mt-4">
// // // // //               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
// // // // //                 Edit
// // // // //               </Button>
// // // // //               <Button variant="destructive" size="sm" onClick={handleDelete}>
// // // // //                 Delete
// // // // //               </Button>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </>
// // // // //       )}
// // // // //     </Card>
// // // // //   )
// // // // // }

// // // // // // CreateNoteDialog Component
// // // // // const CreateNoteDialog = ({
// // // // //   open,
// // // // //   onOpenChange,
// // // // //   categories,
// // // // //   onNoteCreated,
// // // // // }: {
// // // // //   open: boolean
// // // // //   onOpenChange: (open: boolean) => void
// // // // //   categories: Category[]
// // // // //   onNoteCreated: (note: Note) => void
// // // // // }) => {
// // // // //   const [title, setTitle] = useState("")
// // // // //   const [content, setContent] = useState("")
// // // // //   const [categoryId, setCategoryId] = useState<string | undefined>(undefined)

// // // // //   const handleSubmit = async () => {
// // // // //     const newNote: Note = {
// // // // //       id: Date.now().toString(),
// // // // //       title,
// // // // //       content,
// // // // //       categoryId: categoryId || "1",
// // // // //       createdAt: new Date().toISOString(),
// // // // //       updatedAt: new Date().toISOString(),
// // // // //     }
// // // // //     onNoteCreated(newNote)
// // // // //     setTitle("")
// // // // //     setContent("")
// // // // //     setCategoryId(undefined)
// // // // //     onOpenChange(false)
// // // // //   }

// // // // //   return (
// // // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // // //       <DialogContent>
// // // // //         <DialogHeader>
// // // // //           <DialogTitle>Create New Note</DialogTitle>
// // // // //         </DialogHeader>
// // // // //         <div className="space-y-4">
// // // // //           <Input
// // // // //             placeholder="Note title"
// // // // //             value={title}
// // // // //             onChange={(e) => setTitle(e.target.value)}
// // // // //           />
// // // // //           <Textarea
// // // // //             placeholder="Note content"
// // // // //             value={content}
// // // // //             onChange={(e) => setContent(e.target.value)}
// // // // //           />
// // // // //           <Select value={categoryId} onValueChange={setCategoryId}>
// // // // //             <SelectTrigger>
// // // // //               <SelectValue placeholder="Select category" />
// // // // //             </SelectTrigger>
// // // // //             <SelectContent>
// // // // //               {categories.map((category) => (
// // // // //                 <SelectItem key={category.id} value={category.id}>
// // // // //                   {category.name}
// // // // //                 </SelectItem>
// // // // //               ))}
// // // // //             </SelectContent>
// // // // //           </Select>
// // // // //         </div>
// // // // //         <DialogFooter>
// // // // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button onClick={handleSubmit}>Create</Button>
// // // // //         </DialogFooter>
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   )
// // // // // }

// // // // // // CreateCategoryDialog Component
// // // // // const CreateCategoryDialog = ({
// // // // //   open,
// // // // //   onOpenChange,
// // // // //   onCategoryCreated,
// // // // // }: {
// // // // //   open: boolean
// // // // //   onOpenChange: (open: boolean) => void
// // // // //   onCategoryCreated: (category: Category) => void
// // // // // }) => {
// // // // //   const [name, setName] = useState("")

// // // // //   const handleSubmit = async () => {
// // // // //     const newCategory: Category = {
// // // // //       id: Date.now().toString(),
// // // // //       name,
// // // // //       userId: "1",
// // // // //     }
// // // // //     onCategoryCreated(newCategory)
// // // // //     setName("")
// // // // //     onOpenChange(false)
// // // // //   }

// // // // //   return (
// // // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // // //       <DialogContent>
// // // // //         <DialogHeader>
// // // // //           <DialogTitle>Create New Category</DialogTitle>
// // // // //         </DialogHeader>
// // // // //         <Input
// // // // //           placeholder="Category name"
// // // // //           value={name}
// // // // //           onChange={(e) => setName(e.target.value)}
// // // // //         />
// // // // //         <DialogFooter>
// // // // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // // // //             Cancel
// // // // //           </Button>
// // // // //           <Button onClick={handleSubmit}>Create</Button>
// // // // //         </DialogFooter>
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   )
// // // // // }

// // // // // // Main DashboardPage Component
// // // // // export default function DashboardPage() {
// // // // //   const router = useRouter()
// // // // //   const [notes, setNotes] = useState<Note[]>([])
// // // // //   const [categories, setCategories] = useState<Category[]>([])
// // // // //   const [searchQuery, setSearchQuery] = useState("")
// // // // //   const [activeCategory, setActiveCategory] = useState<string | null>(null)
// // // // //   const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
// // // // //   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
// // // // //   const [isLoading, setIsLoading] = useState(true)

// // // // //   useEffect(() => {
// // // // //     const token = localStorage.getItem("token")
// // // // //     if (!token) {
// // // // //       router.push("/login")
// // // // //       return
// // // // //     }

// // // // //     const loadData = async () => {
// // // // //       try {
// // // // //         const [notesData, categoriesData] = await Promise.all([fetchNotes(), fetchCategories()])
// // // // //         setNotes(notesData)
// // // // //         setCategories(categoriesData)
// // // // //       } catch (error) {
// // // // //         console.error("Failed to load data:", error)
// // // // //       } finally {
// // // // //         setIsLoading(false)
// // // // //       }
// // // // //     }

// // // // //     loadData()
// // // // //   }, [router])

// // // // //   const handleLogout = async () => {
// // // // //     await logout()
// // // // //     router.push("/login")
// // // // //   }

// // // // //   const filteredNotes = notes.filter((note) => {
// // // // //     const matchesSearch =
// // // // //       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //       note.content.toLowerCase().includes(searchQuery.toLowerCase())
// // // // //     const matchesCategory = activeCategory ? note.categoryId === activeCategory : true
// // // // //     return matchesSearch && matchesCategory
// // // // //   })

// // // // //   const handleNoteCreated = (newNote: Note) => {
// // // // //     setNotes((prev) => [newNote, ...prev])
// // // // //   }

// // // // //   const handleCategoryCreated = (newCategory: Category) => {
// // // // //     setCategories((prev) => [...prev, newCategory])
// // // // //   }

// // // // //   const handleNoteUpdated = (updatedNote: Note) => {
// // // // //     setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
// // // // //   }

// // // // //   const handleNoteDeleted = (noteId: string) => {
// // // // //     setNotes((prev) => prev.filter((note) => note.id !== noteId))
// // // // //   }

// // // // //   const mockNotes: Note[] = [
// // // // //     {
// // // // //       id: "1",
// // // // //       title: "Welcome to NotesKeeper",
// // // // //       content: "This is your first note. You can edit or delete it, or create new notes!",
// // // // //       categoryId: "1",
// // // // //       createdAt: new Date().toISOString(),
// // // // //       updatedAt: new Date().toISOString(),
// // // // //     },
// // // // //     {
// // // // //       id: "2",
// // // // //       title: "How to use categories",
// // // // //       content: "Organize your notes by creating categories and assigning notes to them.",
// // // // //       categoryId: "2",
// // // // //       createdAt: new Date().toISOString(),
// // // // //       updatedAt: new Date().toISOString(),
// // // // //     },
// // // // //     {
// // // // //       id: "3",
// // // // //       title: "Search functionality",
// // // // //       content: "Use the search bar to quickly find notes by title or content.",
// // // // //       categoryId: "1",
// // // // //       createdAt: new Date().toISOString(),
// // // // //       updatedAt: new Date().toISOString(),
// // // // //     },
// // // // //   ]

// // // // //   const mockCategories: Category[] = [
// // // // //     { id: "1", name: "Personal", userId: "1" },
// // // // //     { id: "2", name: "Work", userId: "1" },
// // // // //     { id: "3", name: "Ideas", userId: "1" },
// // // // //   ]

// // // // //   const displayNotes = isLoading ? mockNotes : filteredNotes
// // // // //   const displayCategories = isLoading ? mockCategories : categories

// // // // //   return (
// // // // //     <div className="min-h-screen flex flex-col">
// // // // //       <header className="border-b">
// // // // //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// // // // //           <h1 className="text-2xl font-bold">NotesKeeper</h1>
// // // // //           <div className="flex items-center gap-4">
// // // // //             <div className="relative w-64">
// // // // //               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // // // //               <Input
// // // // //                 placeholder="Search notes..."
// // // // //                 className="pl-8"
// // // // //                 value={searchQuery}
// // // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // // //               />
// // // // //             </div>
// // // // //             <ThemeToggle />
// // // // //             <Button variant="outline" size="icon" onClick={handleLogout}>
// // // // //               <LogOut className="h-4 w-4" />
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="flex-1 container mx-auto px-4 py-6">
// // // // //         <div className="flex gap-6">
// // // // //           <aside className="w-64 shrink-0">
// // // // //             <div className="flex justify-between items-center mb-4">
// // // // //               <h2 className="text-lg font-semibold">Categories</h2>
// // // // //               <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
// // // // //                 <FolderPlus className="h-4 w-4" />
// // // // //               </Button>
// // // // //             </div>

// // // // //             <div className="space-y-1">
// // // // //               <Button
// // // // //                 variant={activeCategory === null ? "secondary" : "ghost"}
// // // // //                 className="w-full justify-start"
// // // // //                 onClick={() => setActiveCategory(null)}
// // // // //               >
// // // // //                 All Notes
// // // // //               </Button>

// // // // //               {displayCategories.map((category) => (
// // // // //                 <Button
// // // // //                   key={category.id}
// // // // //                   variant={activeCategory === category.id ? "secondary" : "ghost"}
// // // // //                   className="w-full justify-start"
// // // // //                   onClick={() => setActiveCategory(category.id)}
// // // // //                 >
// // // // //                   {category.name}
// // // // //                 </Button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </aside>

// // // // //           <div className="flex-1">
// // // // //             <div className="flex justify-between items-center mb-6">
// // // // //               <h2 className="text-2xl font-bold">
// // // // //                 {activeCategory ? displayCategories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
// // // // //               </h2>
// // // // //               <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // // //                 <Plus className="h-4 w-4 mr-2" />
// // // // //                 New Note
// // // // //               </Button>
// // // // //             </div>

// // // // //             <Tabs defaultValue="grid">
// // // // //               <div className="flex justify-end mb-4">
// // // // //                 <TabsList>
// // // // //                   <TabsTrigger value="grid">Grid</TabsTrigger>
// // // // //                   <TabsTrigger value="list">List</TabsTrigger>
// // // // //                 </TabsList>
// // // // //               </div>

// // // // //               <TabsContent value="grid" className="mt-0">
// // // // //                 {displayNotes.length === 0 ? (
// // // // //                   <Card>
// // // // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // // // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // // // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // // //                         <Plus className="h-4 w-4 mr-2" />
// // // // //                         Create your first note
// // // // //                       </Button>
// // // // //                     </CardContent>
// // // // //                   </Card>
// // // // //                 ) : (
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // // //                     {displayNotes.map((note) => (
// // // // //                       <NoteCard
// // // // //                         key={note.id}
// // // // //                         note={note}
// // // // //                         categories={displayCategories}
// // // // //                         onUpdate={handleNoteUpdated}
// // // // //                         onDelete={handleNoteDeleted}
// // // // //                       />
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </TabsContent>

// // // // //               <TabsContent value="list" className="mt-0">
// // // // //                 {displayNotes.length === 0 ? (
// // // // //                   <Card>
// // // // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // // // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // // // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // // //                         <Plus className="h-4 w-4 mr-2" />
// // // // //                         Create your first note
// // // // //                       </Button>
// // // // //                     </CardContent>
// // // // //                   </Card>
// // // // //                 ) : (
// // // // //                   <div className="space-y-2">
// // // // //                     {displayNotes.map((note) => (
// // // // //                       <NoteCard
// // // // //                         key={note.id}
// // // // //                         note={note}
// // // // //                         categories={displayCategories}
// // // // //                         onUpdate={handleNoteUpdated}
// // // // //                         onDelete={handleNoteDeleted}
// // // // //                         layout="list"
// // // // //                       />
// // // // //                     ))}
// // // // //                   </div>
// // // // //                 )}
// // // // //               </TabsContent>
// // // // //             </Tabs>
// // // // //           </div>
// // // // //         </div>
// // // // //       </main>

// // // // //       <CreateNoteDialog
// // // // //         open={isCreateNoteOpen}
// // // // //         onOpenChange={setIsCreateNoteOpen}
// // // // //         categories={displayCategories}
// // // // //         onNoteCreated={handleNoteCreated}
// // // // //       />

// // // // //       <CreateCategoryDialog
// // // // //         open={isCreateCategoryOpen}
// // // // //         onOpenChange={setIsCreateCategoryOpen}
// // // // //         onCategoryCreated={handleCategoryCreated}
// // // // //       />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { useRouter } from "next/navigation"
// // // // import { Plus, Search, FolderPlus } from "lucide-react"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// // // // import { ThemeToggle } from "@/components/theme-toggle"
// // // // import { Textarea } from "@/components/ui/textarea"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// // // // // NoteCard Component
// // // // const NoteCard = ({
// // // //   note,
// // // //   categories,
// // // //   onUpdate,
// // // //   onDelete,
// // // //   layout = "grid",
// // // // }) => {
// // // //   const [isEditing, setIsEditing] = useState(false)
// // // //   const [title, setTitle] = useState(note.title)
// // // //   const [content, setContent] = useState(note.content)
// // // //   const [categoryId, setCategoryId] = useState(note.category_id)

// // // //   const handleSave = async () => {
// // // //     try {
// // // //       const response = await fetch(`/notes/${note.id}`, {
// // // //         method: 'PUT',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ title, content, category_id: categoryId })
// // // //       });
// // // //       const updatedNote = await response.json();
// // // //       if (!response.ok) throw new Error(updatedNote.message || 'Failed to update note');
// // // //       onUpdate(updatedNote);
// // // //       setIsEditing(false);
// // // //     } catch (error) {
// // // //       console.error('Error updating note:', error);
// // // //       alert('Failed to update note: ' + error.message);
// // // //     }
// // // //   }

// // // //   const handleDelete = async () => {
// // // //     try {
// // // //       const response = await fetch(`/notes/${note.id}`, {
// // // //         method: 'DELETE'
// // // //       });
// // // //       const data = await response.json();
// // // //       if (!response.ok) throw new Error(data.message || 'Failed to delete note');
// // // //       onDelete(note.id);
// // // //     } catch (error) {
// // // //       console.error('Error deleting note:', error);
// // // //       alert('Failed to delete note: ' + error.message);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Card className={layout === "list" ? "flex flex-col" : ""}>
// // // //       {isEditing ? (
// // // //         <CardContent className="p-4">
// // // //           <Input
// // // //             value={title}
// // // //             onChange={(e) => setTitle(e.target.value)}
// // // //             className="mb-2"
// // // //             placeholder="Note title"
// // // //           />
// // // //           <Textarea
// // // //             value={content}
// // // //             onChange={(e) => setContent(e.target.value)}
// // // //             className="mb-2"
// // // //             placeholder="Note content"
// // // //           />
// // // //           <Select value={categoryId} onValueChange={setCategoryId}>
// // // //             <SelectTrigger className="mb-2">
// // // //               <SelectValue placeholder="Select category" />
// // // //             </SelectTrigger>
// // // //             <SelectContent>
// // // //               {categories.map((category) => (
// // // //                 <SelectItem key={category.id} value={category.id.toString()}>
// // // //                   {category.name}
// // // //                 </SelectItem>
// // // //               ))}
// // // //             </SelectContent>
// // // //           </Select>
// // // //           <div className="flex gap-2">
// // // //             <Button onClick={handleSave}>Save</Button>
// // // //             <Button variant="outline" onClick={() => setIsEditing(false)}>
// // // //               Cancel
// // // //             </Button>
// // // //           </div>
// // // //         </CardContent>
// // // //       ) : (
// // // //         <>
// // // //           <CardHeader>
// // // //             <CardTitle>{note.title}</CardTitle>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
// // // //             <p className="text-xs text-muted-foreground">
// // // //               Category: {categories.find((c) => c.id === Number(note.category_id))?.name || "None"}
// // // //             </p>
// // // //             <div className="flex gap-2 mt-4">
// // // //               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
// // // //                 Edit
// // // //               </Button>
// // // //               <Button variant="destructive" size="sm" onClick={handleDelete}>
// // // //                 Delete
// // // //               </Button>
// // // //             </div>
// // // //           </CardContent>
// // // //         </>
// // // //       )}
// // // //     </Card>
// // // //   )
// // // // }

// // // // // CreateNoteDialog Component
// // // // const CreateNoteDialog = ({
// // // //   open,
// // // //   onOpenChange,
// // // //   categories,
// // // //   onNoteCreated,
// // // // }) => {
// // // //   const [title, setTitle] = useState("")
// // // //   const [content, setContent] = useState("")
// // // //   const [categoryId, setCategoryId] = useState(undefined)

// // // //   const handleSubmit = async () => {
// // // //     try {
// // // //       const response = await fetch('/notes', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ title, content, category_id: categoryId })
// // // //       });
// // // //       const newNote = await response.json();
// // // //       if (!response.ok) throw new Error(newNote.message || 'Failed to create note');
// // // //       onNoteCreated(newNote);
// // // //       setTitle("");
// // // //       setContent("");
// // // //       setCategoryId(undefined);
// // // //       onOpenChange(false);
// // // //     } catch (error) {
// // // //       console.error('Error creating note:', error);
// // // //       alert('Failed to create note: ' + error.message);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // //       <DialogContent>
// // // //         <DialogHeader>
// // // //           <DialogTitle>Create New Note</DialogTitle>
// // // //         </DialogHeader>
// // // //         <div className="space-y-4">
// // // //           <Input
// // // //             placeholder="Note title"
// // // //             value={title}
// // // //             onChange={(e) => setTitle(e.target.value)}
// // // //           />
// // // //           <Textarea
// // // //             placeholder="Note content"
// // // //             value={content}
// // // //             onChange={(e) => setContent(e.target.value)}
// // // //           />
// // // //           <Select value={categoryId} onValueChange={setCategoryId}>
// // // //             <SelectTrigger>
// // // //               <SelectValue placeholder="Select category" />
// // // //             </SelectTrigger>
// // // //             <SelectContent>
// // // //               {categories.map((category) => (
// // // //                 <SelectItem key={category.id} value={category.id.toString()}>
// // // //                   {category.name}
// // // //                 </SelectItem>
// // // //               ))}
// // // //             </SelectContent>
// // // //           </Select>
// // // //         </div>
// // // //         <DialogFooter>
// // // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // // //             Cancel
// // // //           </Button>
// // // //           <Button onClick={handleSubmit}>Create</Button>
// // // //         </DialogFooter>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   )
// // // // }

// // // // // CreateCategoryDialog Component
// // // // const CreateCategoryDialog = ({
// // // //   open,
// // // //   onOpenChange,
// // // //   onCategoryCreated,
// // // // }) => {
// // // //   const [name, setName] = useState("")

// // // //   const handleSubmit = async () => {
// // // //     try {
// // // //       const response = await fetch('/categories', {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         body: JSON.stringify({ name })
// // // //       });
// // // //       const newCategory = await response.json();
// // // //       if (!response.ok) throw new Error(newCategory.message || 'Failed to create category');
// // // //       onCategoryCreated(newCategory);
// // // //       setName("");
// // // //       onOpenChange(false);
// // // //     } catch (error) {
// // // //       console.error('Error creating category:', error);
// // // //       alert('Failed to create category: ' + error.message);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // // //       <DialogContent>
// // // //         <DialogHeader>
// // // //           <DialogTitle>Create New Category</DialogTitle>
// // // //         </DialogHeader>
// // // //         <Input
// // // //           placeholder="Category name"
// // // //           value={name}
// // // //           onChange={(e) => setName(e.target.value)}
// // // //         />
// // // //         <DialogFooter>
// // // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // // //             Cancel
// // // //           </Button>
// // // //           <Button onClick={handleSubmit}>Create</Button>
// // // //         </DialogFooter>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   )
// // // // }

// // // // // Main DashboardPage Component
// // // // export default function DashboardPage() {
// // // //   const router = useRouter()
// // // //   const [notes, setNotes] = useState([])
// // // //   const [categories, setCategories] = useState([])
// // // //   const [searchQuery, setSearchQuery] = useState("")
// // // //   const [activeCategory, setActiveCategory] = useState(null)
// // // //   const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
// // // //   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false)
// // // //   const [isLoading, setIsLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     const loadData = async () => {
// // // //       try {
// // // //         const [notesResponse, categoriesResponse] = await Promise.all([
// // // //           fetch('/notes'),
// // // //           fetch('/categories')
// // // //         ]);

// // // //         const notesData = await notesResponse.json();
// // // //         const categoriesData = await categoriesResponse.json();

// // // //         if (!notesResponse.ok) throw new Error(notesData.message || 'Failed to fetch notes');
// // // //         if (!categoriesResponse.ok) throw new Error(categoriesData.message || 'Failed to fetch categories');

// // // //         setNotes(notesData);
// // // //         setCategories(categoriesData);
// // // //       } catch (error) {
// // // //         console.error("Failed to load data:", error);
// // // //         alert('Failed to load data: ' + error.message);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     }

// // // //     loadData();
// // // //   }, [router])

// // // //   const filteredNotes = notes.filter((note) => {
// // // //     const matchesSearch =
// // // //       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //       note.content.toLowerCase().includes(searchQuery.toLowerCase())
// // // //     const matchesCategory = activeCategory ? note.category_id === Number(activeCategory) : true
// // // //     return matchesSearch && matchesCategory
// // // //   })

// // // //   const handleNoteCreated = (newNote) => {
// // // //     setNotes((prev) => [newNote, ...prev])
// // // //   }

// // // //   const handleCategoryCreated = (newCategory) => {
// // // //     setCategories((prev) => [...prev, newCategory])
// // // //   }

// // // //   const handleNoteUpdated = (updatedNote) => {
// // // //     setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
// // // //   }

// // // //   const handleNoteDeleted = (noteId) => {
// // // //     setNotes((prev) => prev.filter((note) => note.id !== noteId))
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen flex flex-col">
// // // //       <header className="border-b">
// // // //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// // // //           <h1 className="text-2xl font-bold">NotesKeeper</h1>
// // // //           <div className="flex items-center gap-4">
// // // //             <div className="relative w-64">
// // // //               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // // //               <Input
// // // //                 placeholder="Search notes..."
// // // //                 className="pl-8"
// // // //                 value={searchQuery}
// // // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // // //               />
// // // //             </div>
// // // //             <ThemeToggle />
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <main className="flex-1 container mx-auto px-4 py-6">
// // // //         <div className="flex gap-6">
// // // //           <aside className="w-64 shrink-0">
// // // //             <div className="flex justify-between items-center mb-4">
// // // //               <h2 className="text-lg font-semibold">Categories</h2>
// // // //               <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
// // // //                 <FolderPlus className="h-4 w-4" />
// // // //               </Button>
// // // //             </div>

// // // //             <div className="space-y-1">
// // // //               <Button
// // // //                 variant={activeCategory === null ? "secondary" : "ghost"}
// // // //                 className="w-full justify-start"
// // // //                 onClick={() => setActiveCategory(null)}
// // // //               >
// // // //                 All Notes
// // // //               </Button>

// // // //               {categories.map((category) => (
// // // //                 <Button
// // // //                   key={category.id}
// // // //                   variant={activeCategory === category.id.toString() ? "secondary" : "ghost"}
// // // //                   className="w-full justify-start"
// // // //                   onClick={() => setActiveCategory(category.id.toString())}
// // // //                 >
// // // //                   {category.name}
// // // //                 </Button>
// // // //               ))}
// // // //             </div>
// // // //           </aside>

// // // //           <div className="flex-1">
// // // //             <div className="flex justify-between items-center mb-6">
// // // //               <h2 className="text-2xl font-bold">
// // // //                 {activeCategory ? categories.find((c) => c.id === Number(activeCategory))?.name + " Notes" : "All Notes"}
// // // //               </h2>
// // // //               <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // //                 <Plus className="h-4 w-4 mr-2" />
// // // //                 New Note
// // // //               </Button>
// // // //             </div>

// // // //             <Tabs defaultValue="grid">
// // // //               <div className="flex justify-end mb-4">
// // // //                 <TabsList>
// // // //                   <TabsTrigger value="grid">Grid</TabsTrigger>
// // // //                   <TabsTrigger value="list">List</TabsTrigger>
// // // //                 </TabsList>
// // // //               </div>

// // // //               <TabsContent value="grid" className="mt-0">
// // // //                 {filteredNotes.length === 0 ? (
// // // //                   <Card>
// // // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // //                         <Plus className="h-4 w-4 mr-2" />
// // // //                         Create your first note
// // // //                       </Button>
// // // //                     </CardContent>
// // // //                   </Card>
// // // //                 ) : (
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // // //                     {filteredNotes.map((note) => (
// // // //                       <NoteCard
// // // //                         key={note.id}
// // // //                         note={note}
// // // //                         categories={categories}
// // // //                         onUpdate={handleNoteUpdated}
// // // //                         onDelete={handleNoteDeleted}
// // // //                       />
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </TabsContent>

// // // //               <TabsContent value="list" className="mt-0">
// // // //                 {filteredNotes.length === 0 ? (
// // // //                   <Card>
// // // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // // //                         <Plus className="h-4 w-4 mr-2" />
// // // //                         Create your first note
// // // //                       </Button>
// // // //                     </CardContent>
// // // //                   </Card>
// // // //                 ) : (
// // // //                   <div className="space-y-2">
// // // //                     {filteredNotes.map((note) => (
// // // //                       <NoteCard
// // // //                         key={note.id}
// // // //                         note={note}
// // // //                         categories={categories}
// // // //                         onUpdate={handleNoteUpdated}
// // // //                         onDelete={handleNoteDeleted}
// // // //                         layout="list"
// // // //                       />
// // // //                     ))}
// // // //                   </div>
// // // //                 )}
// // // //               </TabsContent>
// // // //             </Tabs>
// // // //           </div>
// // // //         </div>
// // // //       </main>

// // // //       <CreateNoteDialog
// // // //         open={isCreateNoteOpen}
// // // //         onOpenChange={setIsCreateNoteOpen}
// // // //         categories={categories}
// // // //         onNoteCreated={handleNoteCreated}
// // // //       />

// // // //       <CreateCategoryDialog
// // // //         open={isCreateCategoryOpen}
// // // //         onOpenChange={setIsCreateCategoryOpen}
// // // //         onCategoryCreated={handleCategoryCreated}
// // // //       />
// // // //     </div>
// // // //   )
// // // // }

// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { useRouter } from "next/navigation"
// // // import { Plus, Search, FolderPlus } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// // // import { ThemeToggle } from "@/components/theme-toggle"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// // // // Define TypeScript interfaces
// // // interface Note {
// // //   id: string;
// // //   title: string;
// // //   content: string;
// // //   category_id: string;
// // //   created_at?: string;
// // //   updated_at?: string;
// // // }

// // // interface Category {
// // //   id: string;
// // //   name: string;
// // // }

// // // // NoteCard Component
// // // const NoteCard = ({
// // //   note,
// // //   categories,
// // //   onUpdate,
// // //   onDelete,
// // //   layout = "grid",
// // // }: {
// // //   note: Note;
// // //   categories: Category[];
// // //   onUpdate: (note: Note) => void;
// // //   onDelete: (noteId: string) => void;
// // //   layout?: "grid" | "list";
// // // }) => {
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [title, setTitle] = useState(note.title);
// // //   const [content, setContent] = useState(note.content);
// // //   const [categoryId, setCategoryId] = useState(note.category_id);

// // //   const handleSave = async () => {
// // //     try {
// // //       const response = await fetch(`/notes/${note.id}`, {
// // //         method: 'PUT',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ title, content, category_id: categoryId })
// // //       });
// // //       const updatedNote: Note = await response.json();
// // //       if (!response.ok) throw new Error(updatedNote.message || 'Failed to update note');
// // //       onUpdate(updatedNote);
// // //       setIsEditing(false);
// // //     } catch (error) {
// // //       console.error('Error updating note:', error);
// // //       alert('Failed to update note: ' + (error as Error).message);
// // //     }
// // //   };

// // //   const handleDelete = async () => {
// // //     try {
// // //       const response = await fetch(`/notes/${note.id}`, {
// // //         method: 'DELETE'
// // //       });
// // //       const data: { message?: string } = await response.json();
// // //       if (!response.ok) throw new Error(data.message || 'Failed to delete note');
// // //       onDelete(note.id);
// // //     } catch (error) {
// // //       console.error('Error deleting note:', error);
// // //       alert('Failed to delete note: ' + (error as Error).message);
// // //     }
// // //   };

// // //   return (
// // //     <Card className={layout === "list" ? "flex flex-col" : ""}>
// // //       {isEditing ? (
// // //         <CardContent className="p-4">
// // //           <Input
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className="mb-2"
// // //             placeholder="Note title"
// // //           />
// // //           <Textarea
// // //             value={content}
// // //             onChange={(e) => setContent(e.target.value)}
// // //             className="mb-2"
// // //             placeholder="Note content"
// // //           />
// // //           <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
// // //             <SelectTrigger className="mb-2">
// // //               <SelectValue placeholder="Select category" />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {categories.map((category) => (
// // //                 <SelectItem key={category.id} value={category.id}>
// // //                   {category.name}
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>
// // //           <div className="flex gap-2">
// // //             <Button onClick={handleSave}>Save</Button>
// // //             <Button variant="outline" onClick={() => setIsEditing(false)}>
// // //               Cancel
// // //             </Button>
// // //           </div>
// // //         </CardContent>
// // //       ) : (
// // //         <>
// // //           <CardHeader>
// // //             <CardTitle>{note.title}</CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
// // //             <p className="text-xs text-muted-foreground">
// // //               Category: {categories.find((c) => c.id === note.category_id)?.name || "None"}
// // //             </p>
// // //             <div className="flex gap-2 mt-4">
// // //               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
// // //                 Edit
// // //               </Button>
// // //               <Button variant="destructive" size="sm" onClick={handleDelete}>
// // //                 Delete
// // //               </Button>
// // //             </div>
// // //           </CardContent>
// // //         </>
// // //       )}
// // //     </Card>
// // //   );
// // // };

// // // // CreateNoteDialog Component
// // // const CreateNoteDialog = ({
// // //   open,
// // //   onOpenChange,
// // //   categories,
// // //   onNoteCreated,
// // // }: {
// // //   open: boolean;
// // //   onOpenChange: (open: boolean) => void;
// // //   categories: Category[];
// // //   onNoteCreated: (note: Note) => void;
// // // }) => {
// // //   const [title, setTitle] = useState("");
// // //   const [content, setContent] = useState("");
// // //   const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

// // //   const handleSubmit = async () => {
// // //     try {
// // //       const response = await fetch('/notes', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ title, content, category_id: categoryId })
// // //       });
// // //       const newNote: Note = await response.json();
// // //       if (!response.ok) throw new Error(newNote.message || 'Failed to create note');
// // //       onNoteCreated(newNote);
// // //       setTitle("");
// // //       setContent("");
// // //       setCategoryId(undefined);
// // //       onOpenChange(false);
// // //     } catch (error) {
// // //       console.error('Error creating note:', error);
// // //       alert('Failed to create note: ' + (error as Error).message);
// // //     }
// // //   };

// // //   return (
// // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // //       <DialogContent>
// // //         <DialogHeader>
// // //           <DialogTitle>Create New Note</DialogTitle>
// // //         </DialogHeader>
// // //         <div className="space-y-4">
// // //           <Input
// // //             placeholder="Note title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //           />
// // //           <Textarea
// // //             placeholder="Note content"
// // //             value={content}
// // //             onChange={(e) => setContent(e.target.value)}
// // //           />
// // //           <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
// // //             <SelectTrigger>
// // //               <SelectValue placeholder="Select category" />
// // //             </SelectTrigger>
// // //             <SelectContent>
// // //               {categories.map((category) => (
// // //                 <SelectItem key={category.id} value={category.id}>
// // //                   {category.name}
// // //                 </SelectItem>
// // //               ))}
// // //             </SelectContent>
// // //           </Select>
// // //         </div>
// // //         <DialogFooter>
// // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmit}>Create</Button>
// // //         </DialogFooter>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // };

// // // // CreateCategoryDialog Component
// // // const CreateCategoryDialog = ({
// // //   open,
// // //   onOpenChange,
// // //   onCategoryCreated,
// // // }: {
// // //   open: boolean;
// // //   onOpenChange: (open: boolean) => void;
// // //   onCategoryCreated: (category: Category) => void;
// // // }) => {
// // //   const [name, setName] = useState("");

// // //   const handleSubmit = async () => {
// // //     try {
// // //       const response = await fetch('/categories', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ name })
// // //       });
// // //       const newCategory: Category = await response.json();
// // //       if (!response.ok) throw new Error(newCategory.message || 'Failed to create category');
// // //       onCategoryCreated(newCategory);
// // //       setName("");
// // //       onOpenChange(false);
// // //     } catch (error) {
// // //       console.error('Error creating category:', error);
// // //       alert('Failed to create category: ' + (error as Error).message);
// // //     }
// // //   };

// // //   return (
// // //     <Dialog open={open} onOpenChange={onOpenChange}>
// // //       <DialogContent>
// // //         <DialogHeader>
// // //           <DialogTitle>Create New Category</DialogTitle>
// // //         </DialogHeader>
// // //         <Input
// // //           placeholder="Category name"
// // //           value={name}
// // //           onChange={(e) => setName(e.target.value)}
// // //         />
// // //         <DialogFooter>
// // //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmit}>Create</Button>
// // //         </DialogFooter>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // };

// // // // Main DashboardPage Component
// // // export default function DashboardPage() {
// // //   const router = useRouter();
// // //   const [notes, setNotes] = useState<Note[]>([]);
// // //   const [categories, setCategories] = useState<Category[]>([]);
// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [activeCategory, setActiveCategory] = useState<string | null>(null);
// // //   const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
// // //   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       try {
// // //         const [notesResponse, categoriesResponse] = await Promise.all([
// // //           fetch('/notes'),
// // //           fetch('/categories')
// // //         ]);

// // //         const notesData: Note[] = await notesResponse.json();
// // //         const categoriesData: Category[] = await categoriesResponse.json();

// // //         if (!notesResponse.ok) throw new Error(notesData[0]?.message || 'Failed to fetch notes');
// // //         if (!categoriesResponse.ok) throw new Error(categoriesData[0]?.message || 'Failed to fetch categories');

// // //         setNotes(notesData);
// // //         setCategories(categoriesData);
// // //       } catch (error) {
// // //         console.error("Failed to load data:", error);
// // //         alert('Failed to load data: ' + (error as Error).message);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     loadData();
// // //   }, [router]);

// // //   const filteredNotes = notes.filter((note) => {
// // //     const matchesSearch =
// // //       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // //       note.content.toLowerCase().includes(searchQuery.toLowerCase());
// // //     const matchesCategory = activeCategory ? note.category_id === activeCategory : true;
// // //     return matchesSearch && matchesCategory;
// // //   });

// // //   const handleNoteCreated = (newNote: Note) => {
// // //     setNotes((prev) => [newNote, ...prev]);
// // //   };

// // //   const handleCategoryCreated = (newCategory: Category) => {
// // //     setCategories((prev) => [...prev, newCategory]);
// // //   };

// // //   const handleNoteUpdated = (updatedNote: Note) => {
// // //     setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
// // //   };

// // //   const handleNoteDeleted = (noteId: string) => {
// // //     setNotes((prev) => prev.filter((note) => note.id !== noteId));
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex flex-col">
// // //       <header className="border-b">
// // //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// // //           <h1 className="text-2xl font-bold">NotesKeeper</h1>
// // //           <div className="flex items-center gap-4">
// // //             <div className="relative w-64">
// // //               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// // //               <Input
// // //                 placeholder="Search notes..."
// // //                 className="pl-8"
// // //                 value={searchQuery}
// // //                 onChange={(e) => setSearchQuery(e.target.value)}
// // //               />
// // //             </div>
// // //             <ThemeToggle />
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <main className="flex-1 container mx-auto px-4 py-6">
// // //         <div className="flex gap-6">
// // //           <aside className="w-64 shrink-0">
// // //             <div className="flex justify-between items-center mb-4">
// // //               <h2 className="text-lg font-semibold">Categories</h2>
// // //               <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
// // //                 <FolderPlus className="h-4 w-4" />
// // //               </Button>
// // //             </div>

// // //             <div className="space-y-1">
// // //               <Button
// // //                 variant={activeCategory === null ? "secondary" : "ghost"}
// // //                 className="w-full justify-start"
// // //                 onClick={() => setActiveCategory(null)}
// // //               >
// // //                 All Notes
// // //               </Button>

// // //               {categories.map((category) => (
// // //                 <Button
// // //                   key={category.id}
// // //                   variant={activeCategory === category.id ? "secondary" : "ghost"}
// // //                   className="w-full justify-start"
// // //                   onClick={() => setActiveCategory(category.id)}
// // //                 >
// // //                   {category.name}
// // //                 </Button>
// // //               ))}
// // //             </div>
// // //           </aside>

// // //           <div className="flex-1">
// // //             <div className="flex justify-between items-center mb-6">
// // //               <h2 className="text-2xl font-bold">
// // //                 {activeCategory ? categories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
// // //               </h2>
// // //               <Button onClick={() => setIsCreateNoteOpen(true)}>
// // //                 <Plus className="h-4 w-4 mr-2" />
// // //                 New Note
// // //               </Button>
// // //             </div>

// // //             <Tabs defaultValue="grid">
// // //               <div className="flex justify-end mb-4">
// // //                 <TabsList>
// // //                   <TabsTrigger value="grid">Grid</TabsTrigger>
// // //                   <TabsTrigger value="list">List</TabsTrigger>
// // //                 </TabsList>
// // //               </div>

// // //               <TabsContent value="grid" className="mt-0">
// // //                 {filteredNotes.length === 0 ? (
// // //                   <Card>
// // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // //                         <Plus className="h-4 w-4 mr-2" />
// // //                         Create your first note
// // //                       </Button>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ) : (
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// // //                     {filteredNotes.map((note) => (
// // //                       <NoteCard
// // //                         key={note.id}
// // //                         note={note}
// // //                         categories={categories}
// // //                         onUpdate={handleNoteUpdated}
// // //                         onDelete={handleNoteDeleted}
// // //                       />
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </TabsContent>

// // //               <TabsContent value="list" className="mt-0">
// // //                 {filteredNotes.length === 0 ? (
// // //                   <Card>
// // //                     <CardContent className="flex flex-col items-center justify-center py-12">
// // //                       <p className="text-muted-foreground mb-4">No notes found</p>
// // //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// // //                         <Plus className="h-4 w-4 mr-2" />
// // //                         Create your first note
// // //                       </Button>
// // //                     </CardContent>
// // //                   </Card>
// // //                 ) : (
// // //                   <div className="space-y-2">
// // //                     {filteredNotes.map((note) => (
// // //                       <NoteCard
// // //                         key={note.id}
// // //                         note={note}
// // //                         categories={categories}
// // //                         onUpdate={handleNoteUpdated}
// // //                         onDelete={handleNoteDeleted}
// // //                         layout="list"
// // //                       />
// // //                     ))}
// // //                   </div>
// // //                 )}
// // //               </TabsContent>
// // //             </Tabs>
// // //           </div>
// // //         </div>
// // //       </main>

// // //       <CreateNoteDialog
// // //         open={isCreateNoteOpen}
// // //         onOpenChange={setIsCreateNoteOpen}
// // //         categories={categories}
// // //         onNoteCreated={handleNoteCreated}
// // //       />

// // //       <CreateCategoryDialog
// // //         open={isCreateCategoryOpen}
// // //         onOpenChange={setIsCreateCategoryOpen}
// // //         onCategoryCreated={handleCategoryCreated}
// // //       />
// // //     </div>
// // //   );
// // // }



// // "use client"

// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Plus, Search, FolderPlus, LogOut } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// // import { ThemeToggle } from "@/components/theme-toggle"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// // // Define TypeScript interfaces
// // interface Note {
// //   id: string;
// //   title: string;
// //   content: string;
// //   category_id: string | null;
// //   user_id: string;
// //   created_at?: string;
// //   updated_at?: string;
// // }

// // interface Category {
// //   id: string;
// //   name: string;
// //   user_id: string;
// // }

// // // NoteCard Component
// // const NoteCard = ({
// //   note,
// //   categories,
// //   onUpdate,
// //   onDelete,
// //   layout = "grid",
// // }: {
// //   note: Note;
// //   categories: Category[];
// //   onUpdate: (note: Note) => void;
// //   onDelete: (noteId: string) => void;
// //   layout?: "grid" | "list";
// // }) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [title, setTitle] = useState(note.title);
// //   const [content, setContent] = useState(note.content);
// //   const [categoryId, setCategoryId] = useState(note.category_id);

// //   const handleSave = async () => {
// //     try {
// //       const userId = localStorage.getItem('userId');
// //       if (!userId) throw new Error('User ID not found. Please log in.');

// //       const response = await fetch(`/notes/${note.id}`, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ title, content, category_id: categoryId, userId })
// //       });
// //       const updatedNote: Note = await response.json();
// //       if (!response.ok) throw new Error(updatedNote.message || 'Failed to update note');
// //       onUpdate(updatedNote);
// //       setIsEditing(false);
// //     } catch (error) {
// //       console.error('Error updating note:', error);
// //       alert('Failed to update note: ' + (error as Error).message);
// //     }
// //   };

// //   const handleDelete = async () => {
// //     try {
// //       const userId = localStorage.getItem('userId');
// //       if (!userId) throw new Error('User ID not found. Please log in.');

// //       const response = await fetch(`/notes/${note.id}`, {
// //         method: 'DELETE',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ userId })
// //       });
// //       const data: { message?: string } = await response.json();
// //       if (!response.ok) throw new Error(data.message || 'Failed to delete note');
// //       onDelete(note.id);
// //     } catch (error) {
// //       console.error('Error deleting note:', error);
// //       alert('Failed to delete note: ' + (error as Error).message);
// //     }
// //   };

// //   return (
// //     <Card className={layout === "list" ? "flex flex-col" : ""}>
// //       {isEditing ? (
// //         <CardContent className="p-4">
// //           <Input
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="mb-2"
// //             placeholder="Note title"
// //           />
// //           <Textarea
// //             value={content}
// //             onChange={(e) => setContent(e.target.value)}
// //             className="mb-2"
// //             placeholder="Note content"
// //           />
// //           <Select value={categoryId || undefined} onValueChange={(value) => setCategoryId(value)}>
// //             <SelectTrigger className="mb-2">
// //               <SelectValue placeholder="Select category" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {categories.map((category) => (
// //                 <SelectItem key={category.id} value={category.id}>
// //                   {category.name}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //           <div className="flex gap-2">
// //             <Button onClick={handleSave}>Save</Button>
// //             <Button variant="outline" onClick={() => setIsEditing(false)}>
// //               Cancel
// //             </Button>
// //           </div>
// //         </CardContent>
// //       ) : (
// //         <>
// //           <CardHeader>
// //             <CardTitle>{note.title}</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
// //             <p className="text-xs text-muted-foreground">
// //               Category: {categories.find((c) => c.id === note.category_id)?.name || "None"}
// //             </p>
// //             <div className="flex gap-2 mt-4">
// //               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
// //                 Edit
// //               </Button>
// //               <Button variant="destructive" size="sm" onClick={handleDelete}>
// //                 Delete
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </>
// //       )}
// //     </Card>
// //   );
// // };

// // // CreateNoteDialog Component
// // const CreateNoteDialog = ({
// //   open,
// //   onOpenChange,
// //   categories,
// //   onNoteCreated,
// // }: {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   categories: Category[];
// //   onNoteCreated: (note: Note) => void;
// // }) => {
// //   const [title, setTitle] = useState("");
// //   const [content, setContent] = useState("");
// //   const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

// //   const handleSubmit = async () => {
// //     try {
// //       const userId = localStorage.getItem('userId');
// //       if (!userId) throw new Error('User ID not found. Please log in.');

// //       const response = await fetch('/notes', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ title, content, category_id: categoryId, userId })
// //       });
// //       const newNote: Note = await response.json();
// //       if (!response.ok) throw new Error(newNote.message || 'Failed to create note');
// //       onNoteCreated(newNote);
// //       setTitle("");
// //       setContent("");
// //       setCategoryId(undefined);
// //       onOpenChange(false);
// //     } catch (error) {
// //       console.error('Error creating note:', error);
// //       alert('Failed to create note: ' + (error as Error).message);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Create New Note</DialogTitle>
// //         </DialogHeader>
// //         <div className="space-y-4">
// //           <Input
// //             placeholder="Note title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //           />
// //           <Textarea
// //             placeholder="Note content"
// //             value={content}
// //             onChange={(e) => setContent(e.target.value)}
// //           />
// //           <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
// //             <SelectTrigger>
// //               <SelectValue placeholder="Select category" />
// //             </SelectTrigger>
// //             <SelectContent>
// //               {categories.map((category) => (
// //                 <SelectItem key={category.id} value={category.id}>
// //                   {category.name}
// //                 </SelectItem>
// //               ))}
// //             </SelectContent>
// //           </Select>
// //         </div>
// //         <DialogFooter>
// //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit}>Create</Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // // CreateCategoryDialog Component
// // const CreateCategoryDialog = ({
// //   open,
// //   onOpenChange,
// //   onCategoryCreated,
// // }: {
// //   open: boolean;
// //   onOpenChange: (open: boolean) => void;
// //   onCategoryCreated: (category: Category) => void;
// // }) => {
// //   const [name, setName] = useState("");

// //   const handleSubmit = async () => {
// //     try {
// //       const userId = localStorage.getItem('userId');
// //       if (!userId) throw new Error('User ID not found. Please log in.');

// //       const response = await fetch('/categories', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ name, userId })
// //       });
// //       const newCategory: Category = await response.json();
// //       if (!response.ok) throw new Error(newCategory.message || 'Failed to create category');
// //       onCategoryCreated(newCategory);
// //       setName("");
// //       onOpenChange(false);
// //     } catch (error) {
// //       console.error('Error creating category:', error);
// //       alert('Failed to create category: ' + (error as Error).message);
// //     }
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={onOpenChange}>
// //       <DialogContent>
// //         <DialogHeader>
// //           <DialogTitle>Create New Category</DialogTitle>
// //         </DialogHeader>
// //         <Input
// //           placeholder="Category name"
// //           value={name}
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //         <DialogFooter>
// //           <Button variant="outline" onClick={() => onOpenChange(false)}>
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit}>Create</Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // // Main DashboardPage Component
// // export default function DashboardPage() {
// //   const router = useRouter();
// //   const [notes, setNotes] = useState<Note[]>([]);
// //   const [categories, setCategories] = useState<Category[]>([]);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [activeCategory, setActiveCategory] = useState<string | null>(null);
// //   const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
// //   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const handleLogout = () => {
// //     localStorage.removeItem('userId');
// //     router.push('/login');
// //   };

// //   useEffect(() => {
// //     const userId = localStorage.getItem('userId');
// //     if (!userId) {
// //       router.push('/login');
// //       return;
// //     }

// //     const loadData = async () => {
// //       try {
// //         const [notesResponse, categoriesResponse] = await Promise.all([
// //           fetch(`/notes?userId=${userId}`),
// //           fetch(`/categories?userId=${userId}`)
// //         ]);

// //         const notesData: Note[] = await notesResponse.json();
// //         const categoriesData: Category[] = await categoriesResponse.json();

// //         if (!notesResponse.ok) throw new Error(notesData[0]?.message || 'Failed to fetch notes');
// //         if (!categoriesResponse.ok) throw new Error(categoriesData[0]?.message || 'Failed to fetch categories');

// //         setNotes(notesData);
// //         setCategories(categoriesData);
// //       } catch (error) {
// //         console.error("Failed to load data:", error);
// //         alert('Failed to load data: ' + (error as Error).message);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     loadData();
// //   }, [router]);

// //   const filteredNotes = notes.filter((note) => {
// //     const matchesSearch =
// //       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       note.content.toLowerCase().includes(searchQuery.toLowerCase());
// //     const matchesCategory = activeCategory ? note.category_id === activeCategory : true;
// //     return matchesSearch && matchesCategory;
// //   });

// //   const handleNoteCreated = (newNote: Note) => {
// //     setNotes((prev) => [newNote, ...prev]);
// //   };

// //   const handleCategoryCreated = (newCategory: Category) => {
// //     setCategories((prev) => [...prev, newCategory]);
// //   };

// //   const handleNoteUpdated = (updatedNote: Note) => {
// //     setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
// //   };

// //   const handleNoteDeleted = (noteId: string) => {
// //     setNotes((prev) => prev.filter((note) => note.id !== noteId));
// //   };

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <header className="border-b">
// //         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
// //           <h1 className="text-2xl font-bold">NotesKeeper</h1>
// //           <div className="flex items-center gap-4">
// //             <div className="relative w-64">
// //               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
// //               <Input
// //                 placeholder="Search notes..."
// //                 className="pl-8"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </div>
// //             <ThemeToggle />
// //             <Button variant="outline" size="icon" onClick={handleLogout}>
// //               <LogOut className="h-4 w-4" />
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       <main className="flex-1 container mx-auto px-4 py-6">
// //         <div className="flex gap-6">
// //           <aside className="w-64 shrink-0">
// //             <div className="flex justify-between items-center mb-4">
// //               <h2 className="text-lg font-semibold">Categories</h2>
// //               <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
// //                 <FolderPlus className="h-4 w-4" />
// //               </Button>
// //             </div>

// //             <div className="space-y-1">
// //               <Button
// //                 variant={activeCategory === null ? "secondary" : "ghost"}
// //                 className="w-full justify-start"
// //                 onClick={() => setActiveCategory(null)}
// //               >
// //                 All Notes
// //               </Button>

// //               {categories.map((category) => (
// //                 <Button
// //                   key={category.id}
// //                   variant={activeCategory === category.id ? "secondary" : "ghost"}
// //                   className="w-full justify-start"
// //                   onClick={() => setActiveCategory(category.id)}
// //                 >
// //                   {category.name}
// //                 </Button>
// //               ))}
// //             </div>
// //           </aside>

// //           <div className="flex-1">
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-bold">
// //                 {activeCategory ? categories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
// //               </h2>
// //               <Button onClick={() => setIsCreateNoteOpen(true)}>
// //                 <Plus className="h-4 w-4 mr-2" />
// //                 New Note
// //               </Button>
// //             </div>

// //             <Tabs defaultValue="grid">
// //               <div className="flex justify-end mb-4">
// //                 <TabsList>
// //                   <TabsTrigger value="grid">Grid</TabsTrigger>
// //                   <TabsTrigger value="list">List</TabsTrigger>
// //                 </TabsList>
// //               </div>

// //               <TabsContent value="grid" className="mt-0">
// //                 {filteredNotes.length === 0 ? (
// //                   <Card>
// //                     <CardContent className="flex flex-col items-center justify-center py-12">
// //                       <p className="text-muted-foreground mb-4">No notes found</p>
// //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// //                         <Plus className="h-4 w-4 mr-2" />
// //                         Create your first note
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 ) : (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {filteredNotes.map((note) => (
// //                       <NoteCard
// //                         key={note.id}
// //                         note={note}
// //                         categories={categories}
// //                         onUpdate={handleNoteUpdated}
// //                         onDelete={handleNoteDeleted}
// //                       />
// //                     ))}
// //                   </div>
// //                 )}
// //               </TabsContent>

// //               <TabsContent value="list" className="mt-0">
// //                 {filteredNotes.length === 0 ? (
// //                   <Card>
// //                     <CardContent className="flex flex-col items-center justify-center py-12">
// //                       <p className="text-muted-foreground mb-4">No notes found</p>
// //                       <Button onClick={() => setIsCreateNoteOpen(true)}>
// //                         <Plus className="h-4 w-4 mr-2" />
// //                         Create your first note
// //                       </Button>
// //                     </CardContent>
// //                   </Card>
// //                 ) : (
// //                   <div className="space-y-2">
// //                     {filteredNotes.map((note) => (
// //                       <NoteCard
// //                         key={note.id}
// //                         note={note}
// //                         categories={categories}
// //                         onUpdate={handleNoteUpdated}
// //                         onDelete={handleNoteDeleted}
// //                         layout="list"
// //                       />
// //                     ))}
// //                   </div>
// //                 )}
// //               </TabsContent>
// //             </Tabs>
// //           </div>
// //         </div>
// //       </main>

// //       <CreateNoteDialog
// //         open={isCreateNoteOpen}
// //         onOpenChange={setIsCreateNoteOpen}
// //         categories={categories}
// //         onNoteCreated={handleNoteCreated}
// //       />

// //       <CreateCategoryDialog
// //         open={isCreateCategoryOpen}
// //         onOpenChange={setIsCreateCategoryOpen}
// //         onCategoryCreated={handleCategoryCreated}
// //       />
// //     </div>
// //   );
// // }

// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Plus, Search, FolderPlus, LogOut } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import { ThemeToggle } from "@/components/theme-toggle"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// // Define TypeScript interfaces
// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   category_id: string | null;
//   user_id: string;
//   created_at?: string;
//   updated_at?: string;
// }

// interface Category {
//   id: string;
//   name: string;
//   user_id: string;
// }

// // NoteCard Component
// const NoteCard = ({
//   note,
//   categories,
//   onUpdate,
//   onDelete,
//   layout = "grid",
// }: {
//   note: Note;
//   categories: Category[];
//   onUpdate: (note: Note) => void;
//   onDelete: (noteId: string) => void;
//   layout?: "grid" | "list";
// }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [title, setTitle] = useState(note.title);
//   const [content, setContent] = useState(note.content);
//   const [categoryId, setCategoryId] = useState(note.category_id);

//   const handleSave = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const userId = user.id;
//       if (!userId) throw new Error('User ID not found. Please log in.');

//       const response = await fetch(`/notes/${note.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, content, category_id: categoryId, user_id: userId })
//       });
//       const updatedNote: Note = await response.json();
//       if (!response.ok) throw new Error(updatedNote.message || 'Failed to update note');
//       onUpdate(updatedNote);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating note:', error);
//       alert('Failed to update note: ' + (error as Error).message);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const userId = user.id;
//       if (!userId) throw new Error('User ID not found. Please log in.');

//       const response = await fetch(`/notes/${note.id}`, {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ user_id: userId })
//       });
//       const data: { message?: string } = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to delete note');
//       onDelete(note.id);
//     } catch (error) {
//       console.error('Error deleting note:', error);
//       alert('Failed to delete note: ' + (error as Error).message);
//     }
//   };

//   return (
//     <Card className={layout === "list" ? "flex flex-col" : ""}>
//       {isEditing ? (
//         <CardContent className="p-4">
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mb-2"
//             placeholder="Note title"
//           />
//           <Textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="mb-2"
//             placeholder="Note content"
//           />
//           <Select value={categoryId || undefined} onValueChange={(value) => setCategoryId(value)}>
//             <SelectTrigger className="mb-2">
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <div className="flex gap-2">
//             <Button onClick={handleSave}>Save</Button>
//             <Button variant="outline" onClick={() => setIsEditing(false)}>
//               Cancel
//             </Button>
//           </div>
//         </CardContent>
//       ) : (
//         <>
//           <CardHeader>
//             <CardTitle>{note.title}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
//             <p className="text-xs text-muted-foreground">
//               Category: {categories.find((c) => c.id === note.category_id)?.name || "None"}
//             </p>
//             <div className="flex gap-2 mt-4">
//               <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
//                 Edit
//               </Button>
//               <Button variant="destructive" size="sm" onClick={handleDelete}>
//                 Delete
//               </Button>
//             </div>
//           </CardContent>
//         </>
//       )}
//     </Card>
//   );
// };

// // CreateNoteDialog Component
// const CreateNoteDialog = ({
//   open,
//   onOpenChange,
//   categories,
//   onNoteCreated,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   categories: Category[];
//   onNoteCreated: (note: Note) => void;
// }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

//   const handleSubmit = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const userId = user.id;
//       if (!userId) throw new Error('User ID not found. Please log in.');

//       const response = await fetch('/notes', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title, content, category_id: categoryId, user_id: userId })
//       });
//       const newNote: Note = await response.json();
//       if (!response.ok) throw new Error(newNote.message || 'Failed to create note');
//       onNoteCreated(newNote);
//       setTitle("");
//       setContent("");
//       setCategoryId(undefined);
//       onOpenChange(false);
//     } catch (error) {
//       console.error('Error creating note:', error);
//       alert('Failed to create note: ' + (error as Error).message);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create New Note</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           <Input
//             placeholder="Note title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <Textarea
//             placeholder="Note content"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//           <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
//             <SelectTrigger>
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categories.map((category) => (
//                 <SelectItem key={category.id} value={category.id}>
//                   {category.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Create</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // CreateCategoryDialog Component
// const CreateCategoryDialog = ({
//   open,
//   onOpenChange,
//   onCategoryCreated,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onCategoryCreated: (category: Category) => void;
// }) => {
//   const [name, setName] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const user = JSON.parse(localStorage.getItem('user') || '{}');
//       const userId = user.id;
//       if (!userId) throw new Error('User ID not found. Please log in.');

//       const response = await fetch('/categories', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, user_id: userId })
//       });
//       const newCategory: Category = await response.json();
//       if (!response.ok) throw new Error(newCategory.message || 'Failed to create category');
//       onCategoryCreated(newCategory);
//       setName("");
//       onOpenChange(false);
//     } catch (error) {
//       console.error('Error creating category:', error);
//       alert('Failed to create category: ' + (error as Error).message);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create New Category</DialogTitle>
//         </DialogHeader>
//         <Input
//           placeholder="Category name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Create</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // Main DashboardPage Component
// export default function DashboardPage() {
//   const router = useRouter();
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
//   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user') || '{}');
//     const userId = user.id;
//     if (!userId) {
//       router.push('/login');
//       return;
//     }

//     const loadData = async () => {
//       try {
//         const [notesResponse, categoriesResponse] = await Promise.all([
//           fetch(`/notes?user_id=${userId}`),
//           fetch(`/categories?user_id=${userId}`)
//         ]);

//         const notesData: Note[] = await notesResponse.json();
//         const categoriesData: Category[] = await categoriesResponse.json();

//         if (!notesResponse.ok) throw new Error(notesData[0]?.message || 'Failed to fetch notes');
//         if (!categoriesResponse.ok) throw new Error(categoriesData[0]?.message || 'Failed to fetch categories');

//         setNotes(notesData);
//         setCategories(categoriesData);
//       } catch (error) {
//         console.error("Failed to load data:", error);
//         alert('Failed to load data: ' + (error as Error).message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadData();
//   }, [router]);

//   const filteredNotes = notes.filter((note) => {
//     const matchesSearch =
//       note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       note.content.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory ? note.category_id === activeCategory : true;
//     return matchesSearch && matchesCategory;
//   });

//   const handleNoteCreated = (newNote: Note) => {
//     setNotes((prev) => [newNote, ...prev]);
//   };

//   const handleCategoryCreated = (newCategory: Category) => {
//     setCategories((prev) => [...prev, newCategory]);
//   };

//   const handleNoteUpdated = (updatedNote: Note) => {
//     setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
//   };

//   const handleNoteDeleted = (noteId: string) => {
//     setNotes((prev) => prev.filter((note) => note.id !== noteId));
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="border-b">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">NotesKeeper</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative w-64">
//               <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search notes..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <ThemeToggle />
//             <Button variant="outline" size="icon" onClick={handleLogout}>
//               <LogOut className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1 container mx-auto px-4 py-6">
//         <div className="flex gap-6">
//           <aside className="w-64 shrink-0">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-semibold">Categories</h2>
//               <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
//                 <FolderPlus className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="space-y-1">
//               <Button
//                 variant={activeCategory === null ? "secondary" : "ghost"}
//                 className="w-full justify-start"
//                 onClick={() => setActiveCategory(null)}
//               >
//                 All Notes
//               </Button>

//               {categories.map((category) => (
//                 <Button
//                   key={category.id}
//                   variant={activeCategory === category.id ? "secondary" : "ghost"}
//                   className="w-full justify-start"
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   {category.name}
//                 </Button>
//               ))}
//             </div>
//           </aside>

//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-bold">
//                 {activeCategory ? categories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
//               </h2>
//               <Button onClick={() => setIsCreateNoteOpen(true)}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 New Note
//               </Button>
//             </div>

//             <Tabs defaultValue="grid">
//               <div className="flex justify-end mb-4">
//                 <TabsList>
//                   <TabsTrigger value="grid">Grid</TabsTrigger>
//                   <TabsTrigger value="list">List</TabsTrigger>
//                 </TabsList>
//               </div>

//               <TabsContent value="grid" className="mt-0">
//                 {filteredNotes.length === 0 ? (
//                   <Card>
//                     <CardContent className="flex flex-col items-center justify-center py-12">
//                       <p className="text-muted-foreground mb-4">No notes found</p>
//                       <Button onClick={() => setIsCreateNoteOpen(true)}>
//                         <Plus className="h-4 w-4 mr-2" />
//                         Create your first note
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {filteredNotes.map((note) => (
//                       <NoteCard
//                         key={note.id}
//                         note={note}
//                         categories={categories}
//                         onUpdate={handleNoteUpdated}
//                         onDelete={handleNoteDeleted}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </TabsContent>

//               <TabsContent value="list" className="mt-0">
//                 {filteredNotes.length === 0 ? (
//                   <Card>
//                     <CardContent className="flex flex-col items-center justify-center py-12">
//                       <p className="text-muted-foreground mb-4">No notes found</p>
//                       <Button onClick={() => setIsCreateNoteOpen(true)}>
//                         <Plus className="h-4 w-4 mr-2" />
//                         Create your first note
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   <div className="space-y-2">
//                     {filteredNotes.map((note) => (
//                       <NoteCard
//                         key={note.id}
//                         note={note}
//                         categories={categories}
//                         onUpdate={handleNoteUpdated}
//                         onDelete={handleNoteDeleted}
//                         layout="list"
//                       />
//                     ))}
//                   </div>
//                 )}
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </main>

//       <CreateNoteDialog
//         open={isCreateNoteOpen}
//         onOpenChange={setIsCreateNoteOpen}
//         categories={categories}
//         onNoteCreated={handleNoteCreated}
//       />

//       <CreateCategoryDialog
//         open={isCreateCategoryOpen}
//         onOpenChange={setIsCreateCategoryOpen}
//         onCategoryCreated={handleCategoryCreated}
//       />
//     </div>
//   );
// }
/* 
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, FolderPlus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Define TypeScript interfaces
interface Note {
  id: string;
  title: string;
  content: string;
  category_id: string | null;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  user_id: string;
}

// NoteCard Component
const NoteCard = ({
  note,
  categories,
  onUpdate,
  onDelete,
  layout = "grid",
}: {
  note: Note;
  categories: Category[];
  onUpdate: (note: Note) => void;
  onDelete: (noteId: string) => void;
  layout?: "grid" | "list";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [categoryId, setCategoryId] = useState(note.category_id);

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category_id: categoryId, user_id: userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update note: ${text || response.statusText}`);
      }
      const updatedNote: Note = await response.json();
      onUpdate(updatedNote);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note: ' + (error as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`/notes/${note.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete note: ${text || response.statusText}`);
      }
      const data: { message?: string } = await response.json();
      onDelete(note.id);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note: ' + (error as Error).message);
    }
  };

  return (
    <Card className={layout === "list" ? "flex flex-col" : ""}>
      {isEditing ? (
        <CardContent className="p-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
            placeholder="Note title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2"
            placeholder="Note content"
          />
          <Select value={categoryId || undefined} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger className="mb-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
            <p className="text-xs text-muted-foreground">
              Category: {categories.find((c) => c.id === note.category_id)?.name || "None"}
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

// CreateNoteDialog Component
const CreateNoteDialog = ({
  open,
  onOpenChange,
  categories,
  onNoteCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category_id: categoryId, user_id: userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create note: ${text || response.statusText}`);
      }
      const newNote: Note = await response.json();
      onNoteCreated(newNote);
      setTitle("");
      setContent("");
      setCategoryId(undefined);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// CreateCategoryDialog Component
const CreateCategoryDialog = ({
  open,
  onOpenChange,
  onCategoryCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: (category: Category) => void;
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, user_id: userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create category: ${text || response.statusText}`);
      }
      const newCategory: Category = await response.json();
      onCategoryCreated(newCategory);
      setName("");
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main DashboardPage Component
export default function DashboardPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    if (!userId) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        setError(null);
        const [notesResponse, categoriesResponse] = await Promise.all([
          fetch(`/notes?user_id=${userId}`),
          fetch(`/categories?user_id=${userId}`)
        ]);

        if (!notesResponse.ok || !categoriesResponse.ok) {
          const notesText = await notesResponse.text();
          const categoriesText = await categoriesResponse.text();
          throw new Error(`Failed to load data: Notes - ${notesText || notesResponse.statusText}, Categories - ${categoriesText || categoriesResponse.statusText}`);
        }

        const notesData: Note[] = await notesResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();

        setNotes(notesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError((error as Error).message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? note.category_id === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleNoteCreated = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleNoteUpdated = (updatedNote: Note) => {
    setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleNoteDeleted = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">NotesKeeper</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <Button
                variant={activeCategory === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveCategory(null)}
              >
                All Notes
              </Button>

              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory ? categories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
              </h2>
              <Button onClick={() => setIsCreateNoteOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>

            <Tabs defaultValue="grid">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-0">
                {isLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">Loading...</p>
                    </CardContent>
                  </Card>
                ) : filteredNotes.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No notes found</p>
                      <Button onClick={() => setIsCreateNoteOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create your first note
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        categories={categories}
                        onUpdate={handleNoteUpdated}
                        onDelete={handleNoteDeleted}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                {isLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">Loading...</p>
                    </CardContent>
                  </Card>
                ) : filteredNotes.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No notes found</p>
                      <Button onClick={() => setIsCreateNoteOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create your first note
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        categories={categories}
                        onUpdate={handleNoteUpdated}
                        onDelete={handleNoteDeleted}
                        layout="list"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <CreateNoteDialog
        open={isCreateNoteOpen}
        onOpenChange={setIsCreateNoteOpen}
        categories={categories}
        onNoteCreated={handleNoteCreated}
      />

      <CreateCategoryDialog
        open={isCreateCategoryOpen}
        onOpenChange={setIsCreateCategoryOpen}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  );
} */



  "use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, FolderPlus, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

// Define TypeScript interfaces
interface Note {
  id: string;
  title: string;
  content: string;
  category_id: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

interface Category {
  id: string;
  name: string;
  user_id: string;
  created_at?: string;
}

// API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4003';

// NoteCard Component
const NoteCard = ({
  note,
  categories,
  onUpdate,
  onDelete,
  layout = "grid",
}: {
  note: Note;
  categories: Category[];
  onUpdate: (note: Note) => void;
  onDelete: (noteId: string) => void;
  layout?: "grid" | "list";
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [categoryId, setCategoryId] = useState(note.category_id);

  const handleSave = async () => {
    if (!categoryId) {
      alert('Please select a category');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category_id: categoryId, userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to update note: ${text || response.statusText}`);
      }
      const updatedNote: Note = await response.json();
      onUpdate(updatedNote);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating note:', error);
      alert('Failed to update note: ' + (error as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete note: ${text || response.statusText}`);
      }
      const data: { message?: string } = await response.json();
      onDelete(note.id);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete note: ' + (error as Error).message);
    }
  };

  return (
    <Card className={layout === "list" ? "flex flex-col" : ""}>
      {isEditing ? (
        <CardContent className="p-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
            placeholder="Note title"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mb-2"
            placeholder="Note content"
          />
          <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger className="mb-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
            <p className="text-xs text-muted-foreground">
              Category: {categories.find((c) => c.id === note.category_id)?.name || "None"}
            </p>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

// CreateNoteDialog Component
const CreateNoteDialog = ({
  open,
  onOpenChange,
  categories,
  onNoteCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  onNoteCreated: (note: Note) => void;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const handleSubmit = async () => {
    if (!categoryId) {
      alert('Please select a category');
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category_id: categoryId, userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create note: ${text || response.statusText}`);
      }
      const newNote: Note = await response.json();
      onNoteCreated(newNote);
      setTitle("");
      setContent("");
      setCategoryId(undefined);
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating note:', error);
      alert('Failed to create note: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Select value={categoryId} onValueChange={(value) => setCategoryId(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// CreateCategoryDialog Component
const CreateCategoryDialog = ({
  open,
  onOpenChange,
  onCategoryCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryCreated: (category: Category) => void;
}) => {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      if (!userId) throw new Error('User ID not found. Please log in.');

      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userId })
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to create category: ${text || response.statusText}`);
      }
      const newCategory: Category = await response.json();
      onCategoryCreated(newCategory);
      setName("");
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Failed to create category: ' + (error as Error).message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Main DashboardPage Component
export default function DashboardPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    if (!userId) {
      router.push('/login');
      return;
    }

    const loadData = async () => {
      try {
        setError(null);
        const [notesResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/notes?userId=${userId}`),
          fetch(`${API_BASE_URL}/categories?userId=${userId}`)
        ]);

        if (!notesResponse.ok || !categoriesResponse.ok) {
          const notesText = await notesResponse.text();
          const categoriesText = await categoriesResponse.text();
          console.error('Notes response:', notesResponse.status, notesText);
          console.error('Categories response:', categoriesResponse.status, categoriesText);
          throw new Error(`Failed to load data: Notes - ${notesText || notesResponse.statusText}, Categories - ${categoriesText || categoriesResponse.statusText}`);
        }

        const notesData: Note[] = await notesResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();

        setNotes(notesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError((error as Error).message || 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [router]);

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? note.category_id === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleNoteCreated = (newNote: Note) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleCategoryCreated = (newCategory: Category) => {
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleNoteUpdated = (updatedNote: Note) => {
    setNotes((prev) => prev.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleNoteDeleted = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">NotesKeeper</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <div className="flex gap-6">
          <aside className="w-64 shrink-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Categories</h2>
              <Button variant="ghost" size="icon" onClick={() => setIsCreateCategoryOpen(true)}>
                <FolderPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-1">
              <Button
                variant={activeCategory === null ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveCategory(null)}
              >
                All Notes
              </Button>

              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeCategory ? categories.find((c) => c.id === activeCategory)?.name + " Notes" : "All Notes"}
              </h2>
              <Button onClick={() => setIsCreateNoteOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </div>

            <Tabs defaultValue="grid">
              <div className="flex justify-end mb-4">
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-0">
                {isLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">Loading...</p>
                    </CardContent>
                  </Card>
                ) : filteredNotes.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No notes found</p>
                      <Button onClick={() => setIsCreateNoteOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create your first note
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        categories={categories}
                        onUpdate={handleNoteUpdated}
                        onDelete={handleNoteDeleted}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                {isLoading ? (
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <p className="text-muted-foreground">Loading...</p>
                    </CardContent>
                  </Card>
                ) : filteredNotes.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <p className="text-muted-foreground mb-4">No notes found</p>
                      <Button onClick={() => setIsCreateNoteOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create your first note
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-2">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        categories={categories}
                        onUpdate={handleNoteUpdated}
                        onDelete={handleNoteDeleted}
                        layout="list"
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <CreateNoteDialog
        open={isCreateNoteOpen}
        onOpenChange={setIsCreateNoteOpen}
        categories={categories}
        onNoteCreated={handleNoteCreated}
      />

      <CreateCategoryDialog
        open={isCreateCategoryOpen}
        onOpenChange={setIsCreateCategoryOpen}
        onCategoryCreated={handleCategoryCreated}
      />
    </div>
  );
}