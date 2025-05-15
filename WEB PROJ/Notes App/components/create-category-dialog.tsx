"use client"

import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createCategory } from "@/lib/api"
import type { Category } from "@/lib/types"

const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }).max(50, { message: "Category name is too long" }),
})

type CategoryFormValues = z.infer<typeof categorySchema>

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCategoryCreated: (category: Category) => void
}

export function CreateCategoryDialog({ open, onOpenChange, onCategoryCreated }: CreateCategoryDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: CategoryFormValues) {
    setIsSubmitting(true)
    try {
      const newCategory = await createCategory(data)
      onCategoryCreated(newCategory)
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to create category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
