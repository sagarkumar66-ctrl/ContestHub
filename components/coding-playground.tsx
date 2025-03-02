"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Send, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface CodingPlaygroundProps {
  questionId: string
  onQuestionSolved: () => void
}

export function CodingPlayground({ questionId, onQuestionSolved }: CodingPlaygroundProps) {
  const router = useRouter()
  const [language, setLanguage] = useState("python")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)
  const [solved, setSolved] = useState(false)

  const handleRunCode = async () => {
    setLoading(true)
    try {
      // In a real app, you would send the code to your backend for execution
      const response = await fetch("/api/run-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, code, language }),
      })
      const data = await response.json()
      setOutput(data.output)
    } catch (error) {
      console.error("Error running code:", error)
      setOutput("Error: Failed to run code")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitCode = async () => {
    setLoading(true)
    try {
      // In a real app, you would send the code to your backend for submission
      const response = await fetch("/api/submit-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, code, language }),
      })
      const data = await response.json()
      setOutput(data.output)
      if (data.solved) {
        setSolved(true)
        onQuestionSolved()
      }
    } catch (error) {
      console.error("Error submitting code:", error)
      setOutput("Error: Failed to submit code")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Playground</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="min-h-[300px] font-mono"
        />
        <div className="flex justify-between">
          <Button onClick={handleRunCode} disabled={loading}>
            <Play className="mr-2 h-4 w-4" /> Run Code
          </Button>
          <Button onClick={handleSubmitCode} disabled={loading || solved}>
            <Send className="mr-2 h-4 w-4" /> Submit
          </Button>
        </div>
        {output && (
          <div className="mt-4">
            <h4 className="font-semibold">Output:</h4>
            <pre className="bg-muted p-2 rounded-md">{output}</pre>
          </div>
        )}
      </CardContent>
      {solved && (
        <CardFooter>
          <Button onClick={() => router.push(`/practice/${Number.parseInt(questionId) + 1}`)} className="w-full">
            Next Question <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

