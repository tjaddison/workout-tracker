import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'
import { createGymSession, getUserSessions, updateGymSession } from '@/app/lib/dynamodb'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessions = await getUserSessions(session.user.id)
    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error fetching gym sessions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sessionData = await request.json()
    const result = await createGymSession(session.user.id, sessionData)
    
    return NextResponse.json({ success: true, session: result })
  } catch (error) {
    console.error('Error creating gym session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sessionId, ...updates } = await request.json()
    const result = await updateGymSession(sessionId, updates)
    
    return NextResponse.json({ success: true, session: result })
  } catch (error) {
    console.error('Error updating gym session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}