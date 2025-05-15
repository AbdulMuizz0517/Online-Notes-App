import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">NotesKeeper</h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Your Notes, Anywhere, Anytime</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create, organize, and access your notes from anywhere. Stay productive with our secure and easy-to-use
              notes application.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                title="Secure Authentication"
                description="Your notes are protected with secure user authentication. Only you can access your personal notes."
                icon="Shield"
              />
              <FeatureCard
                title="Organize with Categories"
                description="Keep your notes organized by categorizing them. Find what you need quickly and efficiently."
                icon="FolderTree"
              />
              <FeatureCard
                title="Search Functionality"
                description="Easily search through your notes to find exactly what you're looking for with our powerful search feature."
                icon="Search"
              />
              <FeatureCard
                title="Dark Mode Support"
                description="Protect your eyes with our aesthetic dark mode. Switch between light and dark themes with a single click."
                icon="Moon"
              />
              <FeatureCard
                title="Responsive Design"
                description="Access your notes from any device with our responsive design that adapts to your screen size."
                icon="Laptop"
              />
              <FeatureCard
                title="CRUD Operations"
                description="Create, read, update, and delete notes with ease. Full control over your content at all times."
                icon="Edit3"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2025 NotesKeeper. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const icons: Record<string, React.ElementType> = {
    Shield: require("lucide-react").Shield,
    FolderTree: require("lucide-react").FolderTree,
    Search: require("lucide-react").Search,
    Moon: require("lucide-react").Moon,
    Laptop: require("lucide-react").Laptop,
    Edit3: require("lucide-react").Edit3,
  }

  const Icon = icons[icon]

  return (
    <div className="p-6 border rounded-lg bg-card">
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
