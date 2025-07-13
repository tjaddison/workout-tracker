import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'
import { createWorkout, getUserWorkouts } from '@/app/lib/dynamodb'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const workouts = await getUserWorkouts(session.user.id)
    return NextResponse.json({ workouts })
  } catch (error) {
    console.error('Error fetching workouts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const workoutData = await request.json()
    const result = await createWorkout(session.user.id, workoutData)
    
    return NextResponse.json({ success: true, workout: result })
  } catch (error) {
    console.error('Error creating workout:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}