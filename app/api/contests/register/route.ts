import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { contestId, registrationId } = await req.json()

    const { db } = await connectToDatabase()

    // Check if user exists
    const user = await db.collection("users").findOne({ registrationId })
    if (!user) {
      return NextResponse.json({ message: "Invalid registration ID" }, { status: 400 })
    }

    // Check if contest exists
    const contest = await db.collection("contests").findOne({ id: contestId })
    if (!contest) {
      return NextResponse.json({ message: "Contest not found" }, { status: 404 })
    }

    // Check if user is already registered
    const existingRegistration = await db.collection("contestRegistrations").findOne({
      userId: user.id,
      contestId,
    })
    if (existingRegistration) {
      return NextResponse.json({ message: "Already registered for this contest" }, { status: 400 })
    }

    // Register user for contest
    await db.collection("contestRegistrations").insertOne({
      userId: user.id,
      contestId,
      registeredAt: new Date(),
    })

    return NextResponse.json({ message: "Successfully registered for the contest" }, { status: 200 })
  } catch (error) {
    console.error("Contest registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

