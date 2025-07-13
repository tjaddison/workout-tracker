import { WorkoutSchedule } from '../types'

export const workoutSchedule: Record<string, WorkoutSchedule> = {
  monday: {
    name: "Full Body Circuit + Cardio",
    phases: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Light Movement", duration: 3, type: "cardio" }
        ]
      },
      {
        name: "Barbell Complex",
        exercises: [
          { name: "Military Press", reps: 6, complex: true, sets: 1, weight: 65 },
          { name: "Front Squats", reps: 7, complex: true, sets: 1, weight: 65 },
          { name: "Bent Over Rows", reps: 8, complex: true, sets: 1, weight: 65 },
          { name: "Romanian Deadlifts", reps: 9, complex: true, sets: 1, weight: 65 },
          { name: "Back Squats", reps: 10, complex: true, sets: 1, weight: 65 }
        ],
        rounds: "5-10",
        weight: "65-75 lbs"
      },
      {
        name: "Cardio Finish",
        exercises: [
          { name: "Moderate Cardio", duration: 8, type: "cardio" },
          { name: "Cool-down", duration: 2, type: "cardio" }
        ]
      },
      {
        name: "Sauna",
        exercises: [
          { name: "Sauna Session", duration: 10, type: "recovery" }
        ]
      }
    ]
  },
  tuesday: {
    name: "Rest Day",
    phases: [
      {
        name: "Rest",
        exercises: [
          { name: "Light walking, stretching, or complete rest", type: "rest" }
        ]
      }
    ]
  },
  wednesday: {
    name: "Rest Day",
    phases: [
      {
        name: "Rest",
        exercises: [
          { name: "Light walking, stretching, or complete rest", type: "rest" }
        ]
      }
    ]
  },
  thursday: {
    name: "Upper Body + Cardio (FIRST DAILY ROUTINE)",
    phases: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Easy Movement", duration: 3, type: "cardio" }
        ]
      },
      {
        name: "Upper Body Strength",
        exercises: [
          { name: "Incline Chest Press", sets: 3, reps: "15-20", rest: 45, weight: 45 },
          { name: "Wide-Grip Pulldown", sets: 3, reps: "15-20", rest: 45, weight: 80 },
          { name: "Lateral Raises", sets: 3, reps: "15-20", rest: 45, weight: 15 },
          { name: "Cable Chest Fly", sets: 3, reps: "15-20", rest: 45, weight: 30 },
          { name: "Hammer Curls", sets: 2, reps: "15-20", rest: 45, weight: 25 },
          { name: "Cable Tricep Extension", sets: 2, reps: "15-20", rest: 45, weight: 40 }
        ]
      },
      {
        name: "Cardio Finish",
        exercises: [
          { name: "Moderate Cardio", duration: 10, type: "cardio" },
          { name: "Cool-down", duration: 2, type: "cardio" }
        ]
      },
      {
        name: "Sauna",
        exercises: [
          { name: "Sauna Session", duration: 10, type: "recovery" }
        ]
      }
    ]
  },
  friday: {
    name: "Lower Body + Cardio",
    phases: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Walking/Cycling", duration: 3, type: "cardio" }
        ]
      },
      {
        name: "Lower Body Strength",
        exercises: [
          { name: "Leg Press Machine", sets: 3, reps: "15-20", rest: 45, weight: 135 },
          { name: "Leg Curl Machine", sets: 3, reps: "15-20", rest: 45, weight: 60 },
          { name: "Leg Extension Machine", sets: 3, reps: "15-20", rest: 45, weight: 80 },
          { name: "Calf Raises", sets: 3, reps: "20-25", rest: 45, weight: 100 },
          { name: "Hip Abduction Machine", sets: 2, reps: "15-20", rest: 45, weight: 50 },
          { name: "Body Weight Squats", sets: 2, reps: "10-15", rest: 45, weight: 0 }
        ]
      },
      {
        name: "Cardio Finish",
        exercises: [
          { name: "Moderate Cardio", duration: 10, type: "cardio" },
          { name: "Cool-down", duration: 2, type: "cardio" }
        ]
      },
      {
        name: "Sauna",
        exercises: [
          { name: "Sauna Session", duration: 10, type: "recovery" }
        ]
      }
    ]
  },
  weekend: {
    name: "Upper Body + Cardio",
    phases: [
      {
        name: "Warm-up",
        exercises: [
          { name: "Treadmill/Bike", duration: 3, type: "cardio" }
        ]
      },
      {
        name: "Upper Body Strength",
        exercises: [
          { name: "Chest Press Machine", sets: 3, reps: "15-20", rest: 45, weight: 50 },
          { name: "Lat Pulldown", sets: 3, reps: "15-20", rest: 45, weight: 90 },
          { name: "Shoulder Press Machine", sets: 3, reps: "15-20", rest: 45, weight: 40 },
          { name: "Seated Cable Row", sets: 3, reps: "15-20", rest: 45, weight: 70 },
          { name: "Tricep Pushdowns", sets: 2, reps: "15-20", rest: 45, weight: 35 },
          { name: "Bicep Curls", sets: 2, reps: "15-20", rest: 45, weight: 20 }
        ]
      },
      {
        name: "Cardio Finish",
        exercises: [
          { name: "Moderate Cardio", duration: 10, type: "cardio" },
          { name: "Cool-down Walk", duration: 2, type: "cardio" }
        ]
      },
      {
        name: "Sauna",
        exercises: [
          { name: "Sauna Session", duration: 10, type: "recovery" }
        ]
      }
    ]
  }
}

export function getWorkoutForDay(day: string): WorkoutSchedule | null {
  const dayKey = day.toLowerCase()
  
  if (dayKey === 'saturday' || dayKey === 'sunday') {
    return workoutSchedule.weekend
  }
  
  return workoutSchedule[dayKey] || null
}

export function getTodaysWorkout(): WorkoutSchedule | null {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  return getWorkoutForDay(today)
}