"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { createContest } from "@/lib/contests"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CreateContestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    duration: "",
    type: "weekly-challenge",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [questions, setQuestions] = useState([
    { id: 1, difficulty: "Easy", marks: 10 },
    { id: 2, difficulty: "Medium", marks: 20 },
    { id: 3, difficulty: "Hard", marks: 30 },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMarksChange = (id: number, marks: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, marks } : q)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await createContest(formData)
      router.push("/admin/dashboard?created=true")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create contest")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav user={{ name: "Admin User", email: "admin@example.com" }} />
        </div>
      </header>
      <main className="flex-1 p-8 pt-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Create New Contest</h2>
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Contest Details</CardTitle>
                <CardDescription>Fill in the details for your new coding contest</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Contest Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Algorithm Challenge #1"
                    required
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the contest and its rules"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" name="date" type="date" required value={formData.date} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      name="startTime"
                      type="time"
                      required
                      value={formData.startTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="0.5"
                      step="0.5"
                      placeholder="2"
                      required
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Contest Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select contest type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly-challenge">Weekly Challenge</SelectItem>
                        <SelectItem value="algorithm-sprint">Algorithm Sprint</SelectItem>
                        <SelectItem value="code-masters-cup">Code Masters Cup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Question Marks</Label>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question No.</TableHead>
                        <TableHead>Difficulty Level</TableHead>
                        <TableHead>Marks</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell>Q{question.id}</TableCell>
                          <TableCell>{question.difficulty}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              value={question.marks}
                              onChange={(e) => handleMarksChange(question.id, Number.parseInt(e.target.value))}
                              className="w-20"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Contest"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}

