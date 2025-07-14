import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'
import { getUser, getUserSettings, updateUserSettings, createUser } from '@/app/lib/dynamodb'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let user = await getUser(session.user.id)
    const settings = await getUserSettings(session.user.id)
    
    // If user not found in DB, create user record with session data
    if (!user) {
      await createUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      })
      
      // Fetch the created user
      user = await getUser(session.user.id)
    }
    
    const userData = user || {
      userId: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    return NextResponse.json({ 
      user: userData,
      settings: settings || {
        startWeight: 270,
        currentWeight: 270,
        targetWeight: 230,
        workoutTime: '9:00 AM',
        reminderNotifications: true,
        progressEmails: false,
        workoutDays: ['Monday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        program: '5-Day YMCA Weight Loss Program',
        goal: 'Lose 40 lbs',
        targetDate: '2025-12-31'
      }
    })
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()
    await updateUserSettings(session.user.id, updates)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating user profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}