import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { questionId, code, language } = await req.json()

  // In a real app, you would use Judge0 API or a similar service to run the code
  // For now, we'll just simulate code execution
  const output = `Mock output for question ${questionId}:\nYour ${language} code ran successfully!`

  return NextResponse.json({ output })
}

