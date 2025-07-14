import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/app/lib/auth'
import { updateGymSession } from '@/app/lib/dynamodb'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updates = await request.json()
    const result = await updateGymSession(params.id, updates)
    
    return NextResponse.json({ success: true, session: result })
  } catch (error) {
    console.error('Error updating gym session:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}