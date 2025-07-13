# FitTracker Pro - Premium Workout Tracker

A modern, mobile-first workout tracking application built with Next.js 14, featuring Google authentication, AWS DynamoDB backend, and award-winning UI/UX design.

## 🚀 Features

- **Google OAuth Authentication** - Secure login with Google accounts
- **Real-time Workout Tracking** - Track sets, reps, weights, and gym sessions
- **Cloud Sync** - All data stored securely in AWS DynamoDB
- **Mobile-First Design** - Optimized for mobile devices with PWA support
- **Smart Analytics** - Progress tracking and workout insights
- **Gym Session Timer** - Built-in timer for tracking gym sessions

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Backend**: AWS DynamoDB
- **Deployment**: Vercel
- **Animations**: Framer Motion
- **UI Components**: Custom components with Lucide icons

## 📱 Workout Schedule

- **Monday**: Full Body Circuit + Cardio
- **Tuesday**: Rest Day
- **Wednesday**: Rest Day
- **Thursday**: Upper Body + Cardio (First Daily Routine)
- **Friday**: Lower Body + Cardio
- **Weekend**: Upper Body + Cardio

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
```

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/workout-tracker.git
cd workout-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see above)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📊 Database Schema

The app uses AWS DynamoDB with the following tables:
- `workout-tracker-users` - User profiles
- `workout-tracker-workouts` - Workout sessions
- `workout-tracker-sessions` - Gym sessions
- `workout-tracker-settings` - User preferences

## 🔒 Security

- All data is encrypted in transit and at rest
- Authentication is handled securely via NextAuth.js
- User data is isolated per account
- AWS IAM policies restrict database access

## 🌟 Features Coming Soon

- Workout analytics and charts
- Social features and sharing
- Custom workout creation
- Nutrition tracking integration
- Wearable device sync

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.