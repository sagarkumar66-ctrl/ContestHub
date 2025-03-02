"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [registrationId, setRegistrationId] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setRegistrationId(data.registrationId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during signup")
    } finally {
      setLoading(false)
    }
  }

  const copyRegistrationId = () => {
    navigator.clipboard.writeText(registrationId)
    alert("Registration ID copied to clipboard!")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account to participate in coding contests</CardDescription>
        </CardHeader>
        <CardContent>
          {registrationId ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  Your account has been created successfully! Your Registration ID is:
                </AlertDescription>
              </Alert>
              <div className="flex items-center justify-between bg-muted p-2 rounded">
                <span className="font-mono">{registrationId}</span>
                <Button onClick={copyRegistrationId} variant="outline" size="sm">
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Please save this ID. You'll need it to register for contests.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          )}
        </CardContent>
        <CardFooter>
          {registrationId ? (
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Go to Dashboard
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

