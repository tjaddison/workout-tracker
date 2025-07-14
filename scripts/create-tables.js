const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { 
  CreateTableCommand, 
  ListTablesCommand,
  DescribeTableCommand,
  waitUntilTableExists 
} = require('@aws-sdk/client-dynamodb')

require('dotenv').config({ path: '.env.local' })

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const tables = [
  {
    TableName: 'workout-tracker-users',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'workout-tracker-workouts',
    KeySchema: [
      { AttributeName: 'workoutId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'workoutId', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'UserIdIndex',
        KeySchema: [
          { AttributeName: 'userId', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' }
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'workout-tracker-sessions',
    KeySchema: [
      { AttributeName: 'sessionId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'sessionId', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'UserIdIndex',
        KeySchema: [
          { AttributeName: 'userId', KeyType: 'HASH' }
        ],
        Projection: { ProjectionType: 'ALL' }
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  },
  {
    TableName: 'workout-tracker-settings',
    KeySchema: [
      { AttributeName: 'userId', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
]

async function tableExists(tableName) {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }))
    return true
  } catch (error) {
    if (error.name === 'ResourceNotFoundException') {
      return false
    }
    throw error
  }
}

async function createTable(tableConfig) {
  try {
    console.log(`Creating table: ${tableConfig.TableName}...`)
    await client.send(new CreateTableCommand(tableConfig))
    
    console.log(`Waiting for table ${tableConfig.TableName} to be active...`)
    await waitUntilTableExists(
      { client, maxWaitTime: 300 },
      { TableName: tableConfig.TableName }
    )
    
    console.log(`✅ Table ${tableConfig.TableName} created successfully`)
  } catch (error) {
    console.error(`❌ Error creating table ${tableConfig.TableName}:`, error.message)
    throw error
  }
}

async function createTables() {
  try {
    console.log('🚀 Starting DynamoDB table creation...\n')
    
    // Check existing tables
    const listCommand = new ListTablesCommand({})
    const existingTables = await client.send(listCommand)
    console.log('Existing tables:', existingTables.TableNames || [])
    
    for (const tableConfig of tables) {
      const exists = await tableExists(tableConfig.TableName)
      
      if (exists) {
        console.log(`⏭️  Table ${tableConfig.TableName} already exists, skipping...`)
      } else {
        await createTable(tableConfig)
      }
    }
    
    console.log('\n🎉 All tables are ready!')
    
  } catch (error) {
    console.error('❌ Failed to create tables:', error.message)
    process.exit(1)
  }
}

// Run the script
createTables()