# 🏋️ Workout Tracker - Production Ready Fitness App

A comprehensive, production-ready fitness tracking application built with Next.js 14, featuring real-time workout tracking, progress monitoring, Google OAuth authentication, and full AWS DynamoDB integration.

## ✨ Features

- **🔐 Google OAuth Authentication** - Secure login with NextAuth.js
- **🏋️‍♂️ Real-time Workout Tracking** - Track exercises, sets, reps, and weights
- **📊 Progress Monitoring** - Weight loss tracking and goal management
- **📅 Schedule Management** - Complete 5-Day YMCA Weight Loss Program
- **⏱️ Gym Session Tracking** - Check-in/check-out functionality with timer
- **📈 Analytics Dashboard** - Real-time progress charts and statistics
- **⚙️ User Settings** - Customizable preferences and notifications
- **📱 Responsive Design** - Mobile-first approach with Tailwind CSS
- **☁️ Cloud Storage** - All data stored securely in AWS DynamoDB
- **🔄 Real-time Sync** - Data synchronization across devices

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: AWS DynamoDB with custom hooks
- **State Management**: React Hooks + Custom Hooks
- **Icons**: Lucide React
- **Build Tools**: ESLint, TypeScript Compiler
- **Deployment**: Vercel Ready

## 🏋️‍♂️ Complete Workout Program

**5-Day YMCA Weight Loss Program** - Professionally designed for 49-year-old male, 270 lbs, targeting 40 lb weight loss:

- **Monday**: Full Body Circuit + Cardio (35 mins) - Barbell complex training
- **Tuesday**: Rest Day
- **Wednesday**: Rest Day  
- **Thursday**: Upper Body Strength + Cardio (35 mins) - FIRST DAILY ROUTINE
- **Friday**: Lower Body Strength + Cardio (35 mins)
- **Saturday**: Upper Body Strength + Cardio (35 mins)
- **Sunday**: Upper Body Strength + Cardio (35 mins)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- AWS Account (for DynamoDB)
- Google OAuth credentials

### 1. Clone and Install

```bash
git clone <repository-url>
cd workout-tracker
npm install
```

### 2. Environment Setup

Create `.env.local` with your credentials:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AWS Configuration
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
```

### 3. Create Database Tables

```bash
npm run create-tables
```

This automatically creates all required DynamoDB tables with proper indexes.

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

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