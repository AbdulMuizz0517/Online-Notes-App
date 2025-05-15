// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter, useSearchParams } from "next/navigation"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { login } from "@/lib/auth"

// const loginSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   password: z.string().min(1, { message: "Password is required" }),
// })

// type LoginFormValues = z.infer<typeof loginSchema>

// export default function LoginPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     if (searchParams.get("registered") === "true") {
//       setSuccess("Account created successfully! Please log in.")
//     }
//   }, [searchParams])

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   async function onSubmit(data: LoginFormValues) {
//     setIsLoading(true)
//     setError(null)

//     try {
//       await login(data)
//       router.push("/dashboard")
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Invalid email or password")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
//           <CardDescription className="text-center">Sign in to access your notes</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && (
//             <Alert variant="destructive" className="mb-4">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           {success && (
//             <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
//               <AlertDescription>{success}</AlertDescription>
//             </Alert>
//           )}

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input type="email" placeholder="john@example.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input type="password" placeholder="••••••••" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <div className="flex justify-end">
//                 <Link href="/forgot-password" className="text-sm text-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Don't have an account?{" "}
//             <Link href="/signup" className="text-primary hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post("http://localhost:4003/users/login", {
        email: data.email,
        password: data.password,
      })

      if (response.status === 200) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user))
        router.push("/dashboard") // Redirect to dashboard or desired page
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to log in. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/40">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">Log in to access your notes</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}