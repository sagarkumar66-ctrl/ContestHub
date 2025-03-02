"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { CodingPlayground } from "@/components/coding-playground"

// Mock data for a single question
const mockQuestion = {
  id: 1,
  title: "Two Sum",
  difficulty: "Easy",
  category: "Arrays",
  description:
    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
  inputFormat:
    "The first line contains an integer n, the size of the nums array. The second line contains n space-separated integers representing the nums array. The third line contains the target integer.",
  outputFormat: "Return a list of two integers representing the indices of the two numbers that add up to the target.",
  examples: [
    {
      input: "4\n2 7 11 15\n9",
      output: "[0, 1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
  ],
  hints: ["Try using a hash table to store the numbers you've seen so far."],
  tags: ["Array", "Hash Table"],
}

export default function QuestionDetailPage() {
  const params = useParams()
  const [question, setQuestion] = useState(mockQuestion)

  useEffect(() => {
    // In a real app, you would fetch the question details from an API here
    // For now, we'll just use the mock data
    console.log("Fetching question with ID:", params.id)
  }, [params.id])

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
          <h2 className="text-3xl font-bold tracking-tight">{question.title}</h2>
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
        </div>
        <Tabs defaultValue="description" className="space-y-4">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="solution">Solution</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Problem Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{question.description}</p>
                <h4 className="font-semibold mt-4">Input Format:</h4>
                <p>{question.inputFormat}</p>
                <h4 className="font-semibold mt-4">Output Format:</h4>
                <p>{question.outputFormat}</p>
                <h4 className="font-semibold mt-4">Example:</h4>
                {question.examples.map((example, index) => (
                  <div key={index} className="mt-2">
                    <p>
                      <strong>Input:</strong> {example.input}
                    </p>
                    <p>
                      <strong>Output:</strong> {example.output}
                    </p>
                    <p>
                      <strong>Explanation:</strong> {example.explanation}
                    </p>
                  </div>
                ))}
                <h4 className="font-semibold mt-4">Hints:</h4>
                <ul className="list-disc pl-5">
                  {question.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  {question.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <CodingPlayground />
          </TabsContent>
          <TabsContent value="solution">{/* Add solution content here */}</TabsContent>
          <TabsContent value="submissions">{/* Add submissions content here */}</TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

