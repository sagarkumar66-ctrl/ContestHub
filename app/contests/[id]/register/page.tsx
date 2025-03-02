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

export default function ContestRegistrationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [registrationId, setRegistrationId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/contests/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contestId: params.id, registrationId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during registration")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Contest Registration</CardTitle>
          <CardDescription>Enter your Registration ID to register for this contest</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert>
              <AlertDescription>You have successfully registered for this contest!</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="registrationId">Registration ID</Label>
                <Input
                  id="registrationId"
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  required
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
          {success ? (
            <Button onClick={() => router.push(`/contests/${params.id}`)} className="w-full">
              View Contest Details
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Register for Contest"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

