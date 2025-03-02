import { NextResponse } from "next/server"
import { rateLimit } from "@/lib/rateLimit"
import { signupSchema } from "@/lib/validation"

// ... (previous code)

export async function POST(req: Request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await rateLimit(req)
    if (rateLimitResult) return rateLimitResult

    const body = await req.json()

    // Validate input
    const result = signupSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 })
    }

    const { fullName, email, password } = result.data

    // ... (rest of the signup logic)
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

