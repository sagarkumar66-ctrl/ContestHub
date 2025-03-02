"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { Loader2 } from "lucide-react"

export default function UploadQuestionsPage() {
  const router = useRouter()
  const [questionType, setQuestionType] = useState("coding")
  const [questionText, setQuestionText] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [testCases, setTestCases] = useState("")
  const [mcqOptions, setMcqOptions] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ])
  const [loading, setLoading] = useState(false)

  const handleMcqOptionChange = (id: number, text: string) => {
    setMcqOptions((options) => options.map((option) => (option.id === id ? { ...option, text } : option)))
  }

  const handleCorrectAnswerChange = (id: number) => {
    setMcqOptions((options) =>
      options.map((option) => (option.id === id ? { ...option, isCorrect: true } : { ...option, isCorrect: false })),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (
      !questionText ||
      (questionType === "coding" && !testCases) ||
      (questionType === "mcq" && !mcqOptions.some((o) => o.isCorrect))
    ) {
      alert("Please fill all required fields")
      setLoading(false)
      return
    }

    // In a real app, you would send this data to your backend
    const questionData = {
      type: questionType,
      text: questionText,
      difficulty,
      testCases: questionType === "coding" ? testCases : undefined,
      options: questionType === "mcq" ? mcqOptions : undefined,
    }

    console.log("Submitting question:", questionData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    // Reset form or redirect
    router.push("/admin/questions")
  }

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
          <h2 className="text-3xl font-bold tracking-tight">Upload Question</h2>
        </div>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Question Details</CardTitle>
              <CardDescription>Enter the details for the new question</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="questionType">Question Type</Label>
                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger id="questionType">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="mcq">MCQ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="questionText">Question Text</Label>
                <Textarea
                  id="questionText"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter the question text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {questionType === "coding" && (
                <div className="space-y-2">
                  <Label htmlFor="testCases">Test Cases</Label>
                  <Textarea
                    id="testCases"
                    value={testCases}
                    onChange={(e) => setTestCases(e.target.value)}
                    placeholder="Enter test cases (input and expected output)"
                    required
                  />
                </div>
              )}
              {questionType === "mcq" && (
                <div className="space-y-4">
                  <Label>MCQ Options</Label>
                  <RadioGroup>
                    {mcqOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.id.toString()}
                          id={`option-${option.id}`}
                          checked={option.isCorrect}
                          onClick={() => handleCorrectAnswerChange(option.id)}
                        />
                        <Input
                          placeholder={`Option ${option.id}`}
                          value={option.text}
                          onChange={(e) => handleMcqOptionChange(option.id, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Question"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}

