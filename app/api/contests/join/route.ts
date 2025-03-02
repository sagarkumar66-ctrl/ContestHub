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

    // Check if contest exists and is live
    const contest = await db.collection("contests").findOne({ id: contestId })
    if (!contest) {
      return NextResponse.json({ message: "Contest not found" }, { status: 404 })
    }

    const now = new Date()
    if (now < contest.startTime) {
      return NextResponse.json({ message: "Contest has not started yet" }, { status: 400 })
    }
    if (now > contest.endTime) {
      return NextResponse.json({ message: "Contest has already ended" }, { status: 400 })
    }

    // Check if user is registered for the contest
    const registration = await db.collection("contestRegistrations").findOne({
      userId: user.id,
      contestId,
    })
    if (!registration) {
      return NextResponse.json({ message: "You are not registered for this contest" }, { status: 400 })
    }

    // Mark user as joined
    await db
      .collection("contestRegistrations")
      .updateOne({ userId: user.id, contestId }, { $set: { joined: true, joinedAt: now } })

    return NextResponse.json({ message: "Successfully joined the contest" }, { status: 200 })
  } catch (error) {
    console.error("Contest join error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

