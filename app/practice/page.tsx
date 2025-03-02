"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for questions
const mockQuestions = [
  { id: 1, title: "Two Sum", difficulty: "Easy", category: "Arrays", solved: false },
  { id: 2, title: "Reverse Linked List", difficulty: "Medium", category: "Linked Lists", solved: true },
  { id: 3, title: "Binary Tree Maximum Path Sum", difficulty: "Hard", category: "Trees", solved: false },
  // Add more mock questions as needed
]

export default function PracticePage() {
  const [questions, setQuestions] = useState(mockQuestions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    // In a real app, you would fetch questions from an API here
    // For now, we'll just use the mock data
  }, [])

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "all" || question.difficulty.toLowerCase() === selectedDifficulty
    const matchesCategory = selectedCategory === "all" || question.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Practice</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setSelectedDifficulty("all")}>
              All
            </TabsTrigger>
            <TabsTrigger value="easy" onClick={() => setSelectedDifficulty("easy")}>
              Easy
            </TabsTrigger>
            <TabsTrigger value="medium" onClick={() => setSelectedDifficulty("medium")}>
              Medium
            </TabsTrigger>
            <TabsTrigger value="hard" onClick={() => setSelectedDifficulty("hard")}>
              Hard
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredQuestions.map((question) => (
                <Link href={`/practice/${question.id}`} key={question.id}>
                  <Card className="cursor-pointer hover:bg-accent">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{question.title}</CardTitle>
                      <Badge
                        variant={
                          question.difficulty === "Easy"
                            ? "secondary"
                            : question.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{question.category}</CardDescription>
                      {question.solved && (
                        <Badge variant="outline" className="mt-2">
                          Solved
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

