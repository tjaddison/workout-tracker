// Workout data structure based on CLAUDE.md
const workoutSchedule = {
    monday: {
        name: "Upper Body + Cardio",
        duration: "30-35 mins",
        phases: [
            {
                name: "Warm-up",
                duration: 3,
                exercises: [
                    { name: "Treadmill/Bike", duration: 3, type: "cardio" }
                ]
            },
            {
                name: "Upper Body Strength",
                duration: 18,
                exercises: [
                    { name: "Chest Press Machine", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Lat Pulldown", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Shoulder Press Machine", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Seated Cable Row", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Tricep Pushdowns", sets: 2, reps: "15-20", rest: 45 },
                    { name: "Bicep Curls", sets: 2, reps: "15-20", rest: 45 }
                ]
            },
            {
                name: "Cardio Finish",
                duration: 12,
                exercises: [
                    { name: "Moderate Cardio", duration: 10, type: "cardio" },
                    { name: "Cool-down Walk", duration: 2, type: "cardio" }
                ]
            },
            {
                name: "Sauna",
                duration: 10,
                exercises: [
                    { name: "Sauna Session", duration: 10, type: "recovery" }
                ]
            }
        ]
    },
    tuesday: {
        name: "Lower Body + Cardio",
        duration: "30-35 mins",
        phases: [
            {
                name: "Warm-up",
                duration: 3,
                exercises: [
                    { name: "Walking/Cycling", duration: 3, type: "cardio" }
                ]
            },
            {
                name: "Lower Body Strength",
                duration: 18,
                exercises: [
                    { name: "Leg Press Machine", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Leg Curl Machine", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Leg Extension Machine", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Calf Raises", sets: 3, reps: "20-25", rest: 45 },
                    { name: "Hip Abduction Machine", sets: 2, reps: "15-20", rest: 45 },
                    { name: "Body Weight Squats", sets: 2, reps: "10-15", rest: 45 }
                ]
            },
            {
                name: "Cardio Finish",
                duration: 12,
                exercises: [
                    { name: "Moderate Cardio", duration: 10, type: "cardio" },
                    { name: "Cool-down", duration: 2, type: "cardio" }
                ]
            },
            {
                name: "Sauna",
                duration: 10,
                exercises: [
                    { name: "Sauna Session", duration: 10, type: "recovery" }
                ]
            }
        ]
    },
    wednesday: {
        name: "Cardio Focus",
        duration: "30-35 mins",
        phases: [
            {
                name: "Extended Cardio",
                duration: 30,
                exercises: [
                    { name: "Warm-up", duration: 5, type: "cardio" },
                    { name: "Cardio Intervals", duration: 20, type: "cardio", description: "2 min moderate, 1 min high intensity" },
                    { name: "Cool-down", duration: 5, type: "cardio" }
                ]
            },
            {
                name: "Sauna",
                duration: 10,
                exercises: [
                    { name: "Sauna Session", duration: 10, type: "recovery" }
                ]
            }
        ]
    },
    thursday: {
        name: "Full Body Circuit + Cardio",
        duration: "30-35 mins",
        phases: [
            {
                name: "Warm-up",
                duration: 3,
                exercises: [
                    { name: "Light Movement", duration: 3, type: "cardio" }
                ]
            },
            {
                name: "Barbell Complex",
                duration: 20,
                exercises: [
                    { name: "Military Press", reps: 6, complex: true },
                    { name: "Front Squats", reps: 7, complex: true },
                    { name: "Bent Over Rows", reps: 8, complex: true },
                    { name: "Romanian Deadlifts", reps: 9, complex: true },
                    { name: "Back Squats", reps: 10, complex: true }
                ],
                rounds: "5-10",
                weight: "65-75 lbs"
            },
            {
                name: "Cardio Finish",
                duration: 10,
                exercises: [
                    { name: "Moderate Cardio", duration: 8, type: "cardio" },
                    { name: "Cool-down", duration: 2, type: "cardio" }
                ]
            },
            {
                name: "Sauna",
                duration: 10,
                exercises: [
                    { name: "Sauna Session", duration: 10, type: "recovery" }
                ]
            }
        ]
    },
    friday: {
        name: "Upper Body + Cardio",
        duration: "30-35 mins",
        phases: [
            {
                name: "Warm-up",
                duration: 3,
                exercises: [
                    { name: "Easy Movement", duration: 3, type: "cardio" }
                ]
            },
            {
                name: "Upper Body Strength",
                duration: 18,
                exercises: [
                    { name: "Incline Chest Press", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Wide-Grip Pulldown", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Lateral Raises", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Cable Chest Fly", sets: 3, reps: "15-20", rest: 45 },
                    { name: "Hammer Curls", sets: 2, reps: "15-20", rest: 45 },
                    { name: "Overhead Tricep Extension", sets: 2, reps: "15-20", rest: 45 }
                ]
            },
            {
                name: "Cardio Finish",
                duration: 12,
                exercises: [
                    { name: "Moderate Cardio", duration: 10, type: "cardio" },
                    { name: "Cool-down", duration: 2, type: "cardio" }
                ]
            },
            {
                name: "Sauna",
                duration: 10,
                exercises: [
                    { name: "Sauna Session", duration: 10, type: "recovery" }
                ]
            }
        ]
    }
};

// App State
class WorkoutTracker {
    constructor() {
        this.currentView = 'today';
        this.currentWorkout = null;
        this.workoutInProgress = false;
        this.currentExerciseIndex = 0;
        this.currentPhaseIndex = 0;
        this.timer = null;
        this.timerSeconds = 0;
        this.restTimer = null;
        this.workoutStartTime = null;
        
        this.initializeApp();
        this.loadData();
        this.bindEvents();
        this.updateViews();
    }

    initializeApp() {
        // Set today's date
        const today = new Date();
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('workoutDate').textContent = today.toLocaleDateString('en-US', dateOptions);
        
        // Get today's workout
        const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        this.currentWorkout = workoutSchedule[dayName] || null;
        
        if (this.currentWorkout) {
            document.getElementById('workoutTitle').textContent = this.currentWorkout.name;
            this.renderTodayWorkout();
        } else {
            document.getElementById('workoutTitle').textContent = 'Rest Day';
            document.getElementById('workoutPhases').innerHTML = '<p class="rest-day-message">Take a rest day or do some light walking!</p>';
            document.getElementById('startWorkoutBtn').style.display = 'none';
        }
    }

    loadData() {
        // Load workout history from localStorage
        this.workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        this.userSettings = JSON.parse(localStorage.getItem('userSettings')) || {
            startWeight: 65,
            currentWeight: 65,
            weeklyIncrement: 10
        };
    }

    saveData() {
        localStorage.setItem('workoutHistory', JSON.stringify(this.workoutHistory));
        localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Start workout button
        document.getElementById('startWorkoutBtn').addEventListener('click', () => {
            this.startWorkout();
        });

        // Modal controls
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeWorkoutModal();
        });

        document.getElementById('timerToggleBtn').addEventListener('click', () => {
            this.toggleTimer();
        });

        document.getElementById('nextExerciseBtn').addEventListener('click', () => {
            this.nextExercise();
        });

        document.getElementById('prevExerciseBtn').addEventListener('click', () => {
            this.previousExercise();
        });

        document.getElementById('skipRestBtn').addEventListener('click', () => {
            this.skipRest();
        });

        // Menu button (for future menu implementation)
        document.getElementById('menuBtn').addEventListener('click', () => {
            // Future menu implementation
        });
    }

    switchView(viewName) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(`${viewName}View`).classList.add('active');

        this.currentView = viewName;
        this.updateViews();
    }

    updateViews() {
        switch (this.currentView) {
            case 'schedule':
                this.renderSchedule();
                break;
            case 'history':
                this.renderHistory();
                break;
            case 'progress':
                this.renderProgress();
                break;
        }
    }

    renderTodayWorkout() {
        const phasesContainer = document.getElementById('workoutPhases');
        phasesContainer.innerHTML = '';

        this.currentWorkout.phases.forEach((phase, phaseIndex) => {
            const phaseCard = document.createElement('div');
            phaseCard.className = 'phase-card';
            phaseCard.innerHTML = `
                <div class="phase-header">
                    <h3 class="phase-title">${phase.name}</h3>
                    <span class="phase-duration">${phase.duration} mins</span>
                </div>
                <div class="exercise-list">
                    ${phase.exercises.map((exercise, exerciseIndex) => `
                        <div class="exercise-item" data-phase="${phaseIndex}" data-exercise="${exerciseIndex}">
                            <span class="exercise-name">${exercise.name}</span>
                            <span class="exercise-details">
                                ${exercise.sets ? `${exercise.sets} × ${exercise.reps}` : ''}
                                ${exercise.duration ? `${exercise.duration} min` : ''}
                                ${exercise.reps && !exercise.sets ? `${exercise.reps} reps` : ''}
                            </span>
                        </div>
                    `).join('')}
                    ${phase.rounds ? `<p class="phase-note">Complete ${phase.rounds} rounds • Starting weight: ${phase.weight}</p>` : ''}
                </div>
            `;
            phasesContainer.appendChild(phaseCard);
        });
    }

    renderSchedule() {
        const scheduleGrid = document.getElementById('scheduleGrid');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        scheduleGrid.innerHTML = days.map(day => {
            const workout = workoutSchedule[day];
            const isToday = day === today;
            const isCompleted = this.isWorkoutCompletedToday(day);
            
            return `
                <div class="schedule-day ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}">
                    <h3 class="day-name">${day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                    <p class="day-workout">${workout ? workout.name : 'Rest Day'}</p>
                    ${workout ? `<p class="day-duration">${workout.duration}</p>` : ''}
                </div>
            `;
        }).join('');
    }

    renderHistory() {
        const historyList = document.getElementById('historyList');
        const sortedHistory = [...this.workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (sortedHistory.length === 0) {
            historyList.innerHTML = '<p class="empty-message">No workouts completed yet. Start your first workout!</p>';
            return;
        }

        historyList.innerHTML = sortedHistory.slice(0, 30).map(workout => `
            <div class="history-item">
                <div class="history-date">${new Date(workout.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                })}</div>
                <div class="history-details">${workout.name}</div>
                <div class="history-stats">
                    <span>Duration: ${workout.duration} mins</span>
                    <span>Completed: ${workout.completedExercises}/${workout.totalExercises}</span>
                </div>
            </div>
        `).join('');
    }

    renderProgress() {
        const totalWorkouts = this.workoutHistory.length;
        const weekWorkouts = this.getWeekWorkouts();
        const streak = this.calculateStreak();
        const totalTime = this.workoutHistory.reduce((sum, workout) => sum + workout.duration, 0);

        document.getElementById('totalWorkouts').textContent = totalWorkouts;
        document.getElementById('weekWorkouts').textContent = weekWorkouts;
        document.getElementById('workoutStreak').textContent = `${streak} days`;
        document.getElementById('totalTime').textContent = `${Math.round(totalTime / 60)} hrs`;
    }

    startWorkout() {
        if (!this.currentWorkout) return;

        this.workoutInProgress = true;
        this.currentPhaseIndex = 0;
        this.currentExerciseIndex = 0;
        this.workoutStartTime = new Date();
        
        // Initialize workout session
        this.currentSession = {
            date: new Date().toISOString(),
            name: this.currentWorkout.name,
            day: new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase(),
            exercises: [],
            totalExercises: this.currentWorkout.phases.reduce((sum, phase) => sum + phase.exercises.length, 0),
            completedExercises: 0,
            duration: 0
        };

        this.showExercise();
    }

    showExercise() {
        const modal = document.getElementById('workoutModal');
        const phase = this.currentWorkout.phases[this.currentPhaseIndex];
        const exercise = phase.exercises[this.currentExerciseIndex];

        document.getElementById('exerciseName').textContent = exercise.name;
        
        // Build exercise info
        let exerciseInfo = '';
        if (exercise.sets && exercise.reps) {
            exerciseInfo = `
                <p><strong>Sets:</strong> ${exercise.sets}</p>
                <p><strong>Reps:</strong> ${exercise.reps}</p>
                <p><strong>Rest:</strong> ${exercise.rest} seconds</p>
            `;
        } else if (exercise.duration) {
            exerciseInfo = `<p><strong>Duration:</strong> ${exercise.duration} minutes</p>`;
        } else if (exercise.reps) {
            exerciseInfo = `<p><strong>Reps:</strong> ${exercise.reps}</p>`;
        }
        
        if (exercise.description) {
            exerciseInfo += `<p><strong>Note:</strong> ${exercise.description}</p>`;
        }

        document.getElementById('exerciseInfo').innerHTML = exerciseInfo;
        
        // Update progress
        const totalExercises = this.currentSession.totalExercises;
        const currentExerciseNumber = this.getCurrentExerciseNumber();
        const progressPercent = (currentExerciseNumber / totalExercises) * 100;
        
        document.getElementById('workoutProgress').style.width = `${progressPercent}%`;
        document.getElementById('progressText').textContent = `${currentExerciseNumber} of ${totalExercises}`;

        // Reset timer
        this.resetTimer();
        
        modal.classList.add('active');
    }

    getCurrentExerciseNumber() {
        let count = 0;
        for (let i = 0; i < this.currentPhaseIndex; i++) {
            count += this.currentWorkout.phases[i].exercises.length;
        }
        return count + this.currentExerciseIndex + 1;
    }

    toggleTimer() {
        const btn = document.getElementById('timerToggleBtn');
        
        if (this.timer) {
            this.pauseTimer();
            btn.textContent = 'Resume';
        } else {
            this.startTimer();
            btn.textContent = 'Pause';
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.timerSeconds++;
            this.updateTimerDisplay();
        }, 1000);
    }

    pauseTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = 0;
        this.updateTimerDisplay();
        document.getElementById('timerToggleBtn').textContent = 'Start';
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timerSeconds / 60);
        const seconds = this.timerSeconds % 60;
        document.getElementById('timerDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    nextExercise() {
        this.completeCurrentExercise();
        
        const phase = this.currentWorkout.phases[this.currentPhaseIndex];
        
        if (this.currentExerciseIndex < phase.exercises.length - 1) {
            this.currentExerciseIndex++;
        } else if (this.currentPhaseIndex < this.currentWorkout.phases.length - 1) {
            this.currentPhaseIndex++;
            this.currentExerciseIndex = 0;
        } else {
            // Workout complete
            this.completeWorkout();
            return;
        }

        // Show rest timer if needed
        const exercise = phase.exercises[this.currentExerciseIndex - 1];
        if (exercise && exercise.rest) {
            this.showRestTimer(exercise.rest);
        } else {
            this.showExercise();
        }
    }

    previousExercise() {
        if (this.currentExerciseIndex > 0) {
            this.currentExerciseIndex--;
        } else if (this.currentPhaseIndex > 0) {
            this.currentPhaseIndex--;
            this.currentExerciseIndex = this.currentWorkout.phases[this.currentPhaseIndex].exercises.length - 1;
        }
        
        this.showExercise();
    }

    showRestTimer(seconds) {
        const modal = document.getElementById('timerModal');
        let remainingSeconds = seconds;
        
        const updateRestDisplay = () => {
            const mins = Math.floor(remainingSeconds / 60);
            const secs = remainingSeconds % 60;
            document.getElementById('restTimerDisplay').textContent = 
                `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };
        
        updateRestDisplay();
        modal.classList.add('active');
        
        this.restTimer = setInterval(() => {
            remainingSeconds--;
            updateRestDisplay();
            
            if (remainingSeconds <= 0) {
                this.skipRest();
            }
        }, 1000);
    }

    skipRest() {
        if (this.restTimer) {
            clearInterval(this.restTimer);
            this.restTimer = null;
        }
        
        document.getElementById('timerModal').classList.remove('active');
        this.showExercise();
    }

    completeCurrentExercise() {
        this.currentSession.completedExercises++;
        
        // Mark exercise as completed in UI
        const exerciseElements = document.querySelectorAll('.exercise-item');
        const currentIndex = this.getCurrentExerciseNumber() - 1;
        if (exerciseElements[currentIndex]) {
            exerciseElements[currentIndex].classList.add('completed');
        }
    }

    completeWorkout() {
        this.pauseTimer();
        
        // Calculate total duration
        const endTime = new Date();
        this.currentSession.duration = Math.round((endTime - this.workoutStartTime) / 60000); // in minutes
        
        // Save to history
        this.workoutHistory.push(this.currentSession);
        this.saveData();
        
        // Close modal
        this.closeWorkoutModal();
        
        // Show completion message
        alert(`Great job! You completed ${this.currentSession.completedExercises} exercises in ${this.currentSession.duration} minutes!`);
        
        // Refresh views
        this.updateViews();
        this.renderTodayWorkout();
        
        // Update button
        document.getElementById('startWorkoutBtn').textContent = 'Workout Completed!';
        document.getElementById('startWorkoutBtn').disabled = true;
    }

    closeWorkoutModal() {
        document.getElementById('workoutModal').classList.remove('active');
        this.pauseTimer();
    }

    isWorkoutCompletedToday(day) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.workoutHistory.some(workout => {
            const workoutDate = new Date(workout.date);
            workoutDate.setHours(0, 0, 0, 0);
            return workoutDate.getTime() === today.getTime() && workout.day === day;
        });
    }

    getWeekWorkouts() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return this.workoutHistory.filter(workout => 
            new Date(workout.date) > oneWeekAgo
        ).length;
    }

    calculateStreak() {
        if (this.workoutHistory.length === 0) return 0;
        
        const sortedHistory = [...this.workoutHistory].sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        let streak = 0;
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        
        for (const workout of sortedHistory) {
            const workoutDate = new Date(workout.date);
            workoutDate.setHours(0, 0, 0, 0);
            
            const dayDiff = Math.floor((currentDate - workoutDate) / (1000 * 60 * 60 * 24));
            
            if (dayDiff <= 1) {
                streak++;
                currentDate = workoutDate;
            } else {
                break;
            }
        }
        
        return streak;
    }
}

// Register Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.workoutTracker = new WorkoutTracker();
});