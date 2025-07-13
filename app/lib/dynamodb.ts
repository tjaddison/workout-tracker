import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const dynamodb = DynamoDBDocumentClient.from(client)

export const TABLES = {
  USERS: 'workout-tracker-users',
  WORKOUTS: 'workout-tracker-workouts',
  SESSIONS: 'workout-tracker-sessions',
  SETTINGS: 'workout-tracker-settings',
}

// User operations
export async function createUser(user: any) {
  const command = new PutCommand({
    TableName: TABLES.USERS,
    Item: {
      userId: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
  
  return await dynamodb.send(command)
}

export async function getUser(userId: string) {
  const command = new GetCommand({
    TableName: TABLES.USERS,
    Key: { userId },
  })
  
  const result = await dynamodb.send(command)
  return result.Item
}

// Workout operations
export async function createWorkout(userId: string, workout: any) {
  const workoutId = `${userId}-${Date.now()}`
  
  const command = new PutCommand({
    TableName: TABLES.WORKOUTS,
    Item: {
      workoutId,
      userId,
      ...workout,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  })
  
  return await dynamodb.send(command)
}

export async function getUserWorkouts(userId: string) {
  const command = new QueryCommand({
    TableName: TABLES.WORKOUTS,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    ScanIndexForward: false, // Most recent first
  })
  
  const result = await dynamodb.send(command)
  return result.Items || []
}

export async function updateWorkout(workoutId: string, updates: any) {
  const command = new UpdateCommand({
    TableName: TABLES.WORKOUTS,
    Key: { workoutId },
    UpdateExpression: 'SET #updatedAt = :updatedAt, #data = :data',
    ExpressionAttributeNames: {
      '#updatedAt': 'updatedAt',
      '#data': 'data',
    },
    ExpressionAttributeValues: {
      ':updatedAt': new Date().toISOString(),
      ':data': updates,
    },
  })
  
  return await dynamodb.send(command)
}

export async function deleteWorkout(workoutId: string) {
  const command = new DeleteCommand({
    TableName: TABLES.WORKOUTS,
    Key: { workoutId },
  })
  
  return await dynamodb.send(command)
}

// Gym session operations
export async function createGymSession(userId: string, session: any) {
  const sessionId = `${userId}-${Date.now()}`
  
  const command = new PutCommand({
    TableName: TABLES.SESSIONS,
    Item: {
      sessionId,
      userId,
      ...session,
      createdAt: new Date().toISOString(),
    },
  })
  
  return await dynamodb.send(command)
}

export async function updateGymSession(sessionId: string, updates: any) {
  const command = new UpdateCommand({
    TableName: TABLES.SESSIONS,
    Key: { sessionId },
    UpdateExpression: 'SET #updatedAt = :updatedAt, #checkOutTime = :checkOutTime, #duration = :duration',
    ExpressionAttributeNames: {
      '#updatedAt': 'updatedAt',
      '#checkOutTime': 'checkOutTime',
      '#duration': 'duration',
    },
    ExpressionAttributeValues: {
      ':updatedAt': new Date().toISOString(),
      ':checkOutTime': updates.checkOutTime,
      ':duration': updates.duration,
    },
  })
  
  return await dynamodb.send(command)
}

export async function getUserSessions(userId: string, limit = 30) {
  const command = new QueryCommand({
    TableName: TABLES.SESSIONS,
    IndexName: 'UserIdIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    ScanIndexForward: false,
    Limit: limit,
  })
  
  const result = await dynamodb.send(command)
  return result.Items || []
}

// Settings operations
export async function getUserSettings(userId: string) {
  const command = new GetCommand({
    TableName: TABLES.SETTINGS,
    Key: { userId },
  })
  
  const result = await dynamodb.send(command)
  return result.Item
}

export async function updateUserSettings(userId: string, settings: any) {
  const command = new PutCommand({
    TableName: TABLES.SETTINGS,
    Item: {
      userId,
      ...settings,
      updatedAt: new Date().toISOString(),
    },
  })
  
  return await dynamodb.send(command)
}