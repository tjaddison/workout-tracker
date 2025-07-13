// Workout data structure based on CLAUDE.md
const workoutSchedule = {
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
    },
    weekend: {
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
    }
};

// App State
class WorkoutTracker {
    constructor() {
        this.currentView = 'workouts';
        this.selectedWorkout = null;
        this.workoutInProgress = false;
        this.currentExerciseIndex = 0;
        this.currentPhaseIndex = 0;
        this.currentSession = null;
        this.gymSession = null;
        this.gymTimer = null;
        
        this.loadData();
        this.bindEvents();
        this.updateViews();
        this.restoreGymSession();
    }

    loadData() {
        this.workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];
        this.userSettings = JSON.parse(localStorage.getItem('userSettings')) || {
            defaultWeight: 45,
            weightUnit: 'lbs'
        };
        this.gymSession = JSON.parse(localStorage.getItem('gymSession')) || null;
        this.exerciseWeights = JSON.parse(localStorage.getItem('exerciseWeights')) || {};
    }

    saveData() {
        localStorage.setItem('workoutHistory', JSON.stringify(this.workoutHistory));
        localStorage.setItem('userSettings', JSON.stringify(this.userSettings));
        localStorage.setItem('gymSession', JSON.stringify(this.gymSession));
        localStorage.setItem('exerciseWeights', JSON.stringify(this.exerciseWeights));
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Menu functionality
        document.getElementById('menuBtn').addEventListener('click', () => {
            this.openMenu();
        });

        document.getElementById('menuClose').addEventListener('click', () => {
            this.closeMenu();
        });

        document.getElementById('menuOverlay').addEventListener('click', () => {
            this.closeMenu();
        });

        // Menu actions
        document.querySelectorAll('.menu-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleMenuAction(e.target.dataset.action);
            });
        });

        // Workout selection
        document.getElementById('workoutSelect').addEventListener('change', (e) => {
            this.selectWorkout(e.target.value);
        });

        // Start workout button
        document.getElementById('startWorkoutBtn').addEventListener('click', () => {
            this.startWorkout();
        });

        // Exercise modal controls
        document.getElementById('closeModalBtn').addEventListener('click', () => {
            this.closeExerciseModal();
        });

        document.getElementById('nextExerciseBtn').addEventListener('click', () => {
            this.nextExercise();
        });

        document.getElementById('prevExerciseBtn').addEventListener('click', () => {
            this.previousExercise();
        });

        // Gym session controls
        document.getElementById('checkinBtn').addEventListener('click', () => {
            this.checkInToGym();
        });

        document.getElementById('checkoutBtn').addEventListener('click', () => {
            this.checkOutOfGym();
        });
    }

    checkInToGym() {
        this.gymSession = {
            checkInTime: new Date().toISOString(),
            checkOutTime: null
        };
        
        document.getElementById('checkinBtn').disabled = true;
        document.getElementById('checkoutBtn').disabled = false;
        
        this.startGymTimer();
        this.saveData();
    }

    checkOutOfGym() {
        if (!this.gymSession) return;
        
        this.gymSession.checkOutTime = new Date().toISOString();
        const duration = this.calculateGymDuration();
        
        document.getElementById('checkinBtn').disabled = false;
        document.getElementById('checkoutBtn').disabled = true;
        document.getElementById('sessionTimer').textContent = '';
        
        if (this.gymTimer) {
            clearInterval(this.gymTimer);
            this.gymTimer = null;
        }
        
        alert(`Gym session complete! Total time: ${duration}`);
        this.gymSession = null;
        this.saveData();
    }

    startGymTimer() {
        this.updateGymTimer();
        this.gymTimer = setInterval(() => {
            this.updateGymTimer();
        }, 1000);
    }

    updateGymTimer() {
        if (!this.gymSession || !this.gymSession.checkInTime) return;
        
        const now = new Date();
        const checkIn = new Date(this.gymSession.checkInTime);
        const diff = now - checkIn;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('sessionTimer').textContent = timeString;
    }

    calculateGymDuration() {
        if (!this.gymSession || !this.gymSession.checkInTime || !this.gymSession.checkOutTime) return '0:00';
        
        const checkIn = new Date(this.gymSession.checkInTime);
        const checkOut = new Date(this.gymSession.checkOutTime);
        const diff = checkOut - checkIn;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return hours > 0 ? `${hours}:${minutes.toString().padStart(2, '0')}` : `${minutes} min`;
    }

    restoreGymSession() {
        if (this.gymSession && this.gymSession.checkInTime && !this.gymSession.checkOutTime) {
            document.getElementById('checkinBtn').disabled = true;
            document.getElementById('checkoutBtn').disabled = false;
            this.startGymTimer();
        }
    }

    openMenu() {
        document.getElementById('sideMenu').classList.add('active');
    }

    closeMenu() {
        document.getElementById('sideMenu').classList.remove('active');
    }

    handleMenuAction(action) {
        this.closeMenu();
        
        switch (action) {
            case 'settings':
                alert('Settings coming soon!');
                break;
            case 'export':
                this.exportData();
                break;
            case 'import':
                this.importData();
                break;
            case 'reset':
                if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                    this.resetData();
                }
                break;
        }
    }

    exportData() {
        const data = {
            workoutHistory: this.workoutHistory,
            userSettings: this.userSettings,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `workout-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.workoutHistory && data.userSettings) {
                            this.workoutHistory = data.workoutHistory;
                            this.userSettings = data.userSettings;
                            this.saveData();
                            alert('Data imported successfully!');
                            this.updateViews();
                        } else {
                            alert('Invalid file format');
                        }
                    } catch (error) {
                        alert('Error reading file');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    resetData() {
        this.workoutHistory = [];
        this.userSettings = { defaultWeight: 45, weightUnit: 'lbs' };
        this.saveData();
        this.updateViews();
        alert('All data has been reset');
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

    selectWorkout(workoutKey) {
        if (!workoutKey) {
            document.getElementById('workoutContent').innerHTML = '<p class="select-prompt">Select a workout to begin</p>';
            document.getElementById('workoutActions').style.display = 'none';
            return;
        }

        this.selectedWorkout = workoutSchedule[workoutKey];
        this.renderSelectedWorkout();
        document.getElementById('workoutActions').style.display = 'block';
    }

    renderSelectedWorkout() {
        const container = document.getElementById('workoutContent');
        container.innerHTML = '';

        this.selectedWorkout.phases.forEach((phase, phaseIndex) => {
            const phaseCard = document.createElement('div');
            phaseCard.className = 'phase-card';
            phaseCard.innerHTML = `
                <div class="phase-header">
                    <h3 class="phase-title">${phase.name}</h3>
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
            container.appendChild(phaseCard);
        });
    }

    startWorkout() {
        if (!this.selectedWorkout) return;

        this.workoutInProgress = true;
        this.currentPhaseIndex = 0;
        this.currentExerciseIndex = 0;
        
        // Initialize workout session
        this.currentSession = {
            date: new Date().toISOString(),
            name: this.selectedWorkout.name,
            exercises: [],
            totalExercises: this.selectedWorkout.phases.reduce((sum, phase) => sum + phase.exercises.length, 0),
            completedExercises: 0
        };

        this.showExercise();
    }

    showExercise() {
        const modal = document.getElementById('exerciseModal');
        const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
        const exercise = phase.exercises[this.currentExerciseIndex];

        document.getElementById('exerciseName').textContent = exercise.name;
        
        // Build exercise info
        let exerciseInfo = '';
        if (exercise.sets && exercise.reps) {
            exerciseInfo = `
                <p><strong>Target:</strong> ${exercise.sets} sets × ${exercise.reps} reps</p>
                ${exercise.rest ? `<p><strong>Rest:</strong> ${exercise.rest} seconds between sets</p>` : ''}
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
        
        // Create sets tracking for strength exercises
        this.renderSetsTracking(exercise);
        
        // Update progress
        const totalExercises = this.currentSession.totalExercises;
        const currentExerciseNumber = this.getCurrentExerciseNumber();
        const progressPercent = (currentExerciseNumber / totalExercises) * 100;
        
        document.getElementById('workoutProgress').style.width = `${progressPercent}%`;
        document.getElementById('progressText').textContent = `${currentExerciseNumber} of ${totalExercises}`;

        modal.classList.add('active');
    }

    renderSetsTracking(exercise) {
        const container = document.getElementById('setsTracking');
        
        if (!exercise.sets || exercise.type === 'cardio' || exercise.type === 'recovery') {
            container.innerHTML = '';
            return;
        }

        const exerciseKey = `${this.currentPhaseIndex}-${this.currentExerciseIndex}`;
        const savedSets = this.currentSession.exercises.find(e => e.key === exerciseKey)?.sets || [];

        container.innerHTML = '';
        
        for (let i = 0; i < exercise.sets; i++) {
            const defaultWeight = exercise.weight || this.exerciseWeights[exercise.name] || this.userSettings.defaultWeight;
            const savedSet = savedSets[i] || { weight: defaultWeight, completed: false, actualReps: 0 };
            
            const setDiv = document.createElement('div');
            setDiv.className = `set-item ${savedSet.completed ? 'completed' : ''}`;
            setDiv.innerHTML = `
                <span class="set-number">Set ${i + 1}</span>
                <input type="number" 
                       class="weight-input" 
                       value="${savedSet.weight}" 
                       placeholder="Weight"
                       data-set="${i}">
                <span class="weight-unit">${this.userSettings.weightUnit}</span>
                <input type="number" 
                       class="reps-input" 
                       value="${savedSet.actualReps || ''}" 
                       placeholder="${exercise.reps}"
                       data-set="${i}">
                <span class="reps-label">reps</span>
                <button class="set-complete-btn ${savedSet.completed ? 'completed' : ''}" 
                        data-set="${i}">
                    ${savedSet.completed ? '✓' : 'Complete'}
                </button>
            `;
            container.appendChild(setDiv);
        }

        // Bind events for weight inputs, reps inputs, and complete buttons
        container.querySelectorAll('.weight-input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateSetWeight(exerciseKey, parseInt(e.target.dataset.set), parseFloat(e.target.value));
            });
        });

        container.querySelectorAll('.reps-input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.updateSetReps(exerciseKey, parseInt(e.target.dataset.set), parseInt(e.target.value));
            });
        });

        container.querySelectorAll('.set-complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.toggleSetComplete(exerciseKey, parseInt(e.target.dataset.set));
            });
        });
    }

    updateSetWeight(exerciseKey, setIndex, weight) {
        let exerciseData = this.currentSession.exercises.find(e => e.key === exerciseKey);
        
        if (!exerciseData) {
            const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
            const exercise = phase.exercises[this.currentExerciseIndex];
            exerciseData = {
                key: exerciseKey,
                name: exercise.name,
                sets: []
            };
            this.currentSession.exercises.push(exerciseData);
        }

        if (!exerciseData.sets[setIndex]) {
            exerciseData.sets[setIndex] = { weight: weight, completed: false, actualReps: 0 };
        } else {
            exerciseData.sets[setIndex].weight = weight;
        }
        
        // Save exercise weight for future use
        const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
        const exercise = phase.exercises[this.currentExerciseIndex];
        this.exerciseWeights[exercise.name] = weight;
        this.saveData();
    }

    updateSetReps(exerciseKey, setIndex, reps) {
        let exerciseData = this.currentSession.exercises.find(e => e.key === exerciseKey);
        
        if (!exerciseData) {
            const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
            const exercise = phase.exercises[this.currentExerciseIndex];
            exerciseData = {
                key: exerciseKey,
                name: exercise.name,
                sets: []
            };
            this.currentSession.exercises.push(exerciseData);
        }

        if (!exerciseData.sets[setIndex]) {
            const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
            const exercise = phase.exercises[this.currentExerciseIndex];
            const defaultWeight = exercise.weight || this.exerciseWeights[exercise.name] || this.userSettings.defaultWeight;
            exerciseData.sets[setIndex] = { weight: defaultWeight, completed: false, actualReps: reps };
        } else {
            exerciseData.sets[setIndex].actualReps = reps;
        }
    }

    toggleSetComplete(exerciseKey, setIndex) {
        let exerciseData = this.currentSession.exercises.find(e => e.key === exerciseKey);
        
        if (!exerciseData) {
            const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
            const exercise = phase.exercises[this.currentExerciseIndex];
            exerciseData = {
                key: exerciseKey,
                name: exercise.name,
                sets: []
            };
            this.currentSession.exercises.push(exerciseData);
        }

        if (!exerciseData.sets[setIndex]) {
            const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
            const exercise = phase.exercises[this.currentExerciseIndex];
            const defaultWeight = exercise.weight || this.exerciseWeights[exercise.name] || this.userSettings.defaultWeight;
            exerciseData.sets[setIndex] = { weight: defaultWeight, completed: false, actualReps: 0 };
        }

        exerciseData.sets[setIndex].completed = !exerciseData.sets[setIndex].completed;
        
        // Re-render the sets tracking to update UI
        const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
        const exercise = phase.exercises[this.currentExerciseIndex];
        this.renderSetsTracking(exercise);
    }

    getCurrentExerciseNumber() {
        let count = 0;
        for (let i = 0; i < this.currentPhaseIndex; i++) {
            count += this.selectedWorkout.phases[i].exercises.length;
        }
        return count + this.currentExerciseIndex + 1;
    }

    nextExercise() {
        this.completeCurrentExercise();
        
        const phase = this.selectedWorkout.phases[this.currentPhaseIndex];
        
        if (this.currentExerciseIndex < phase.exercises.length - 1) {
            this.currentExerciseIndex++;
        } else if (this.currentPhaseIndex < this.selectedWorkout.phases.length - 1) {
            this.currentPhaseIndex++;
            this.currentExerciseIndex = 0;
        } else {
            // Workout complete
            this.completeWorkout();
            return;
        }

        this.showExercise();
    }

    previousExercise() {
        if (this.currentExerciseIndex > 0) {
            this.currentExerciseIndex--;
        } else if (this.currentPhaseIndex > 0) {
            this.currentPhaseIndex--;
            this.currentExerciseIndex = this.selectedWorkout.phases[this.currentPhaseIndex].exercises.length - 1;
        }
        
        this.showExercise();
    }

    completeCurrentExercise() {
        this.currentSession.completedExercises++;
    }

    completeWorkout() {
        // Save to history
        this.workoutHistory.push(this.currentSession);
        this.saveData();
        
        // Close modal
        this.closeExerciseModal();
        
        // Show completion message
        alert(`Great job! You completed your ${this.currentSession.name} workout!`);
        
        // Refresh views
        this.updateViews();
        
        // Reset workout state
        this.workoutInProgress = false;
        this.currentSession = null;
        document.getElementById('workoutSelect').value = '';
        this.selectWorkout('');
    }

    closeExerciseModal() {
        document.getElementById('exerciseModal').classList.remove('active');
    }

    renderSchedule() {
        const scheduleGrid = document.getElementById('scheduleGrid');
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
        
        scheduleGrid.innerHTML = days.map(day => {
            let workout;
            if (day === 'saturday' || day === 'sunday') {
                workout = workoutSchedule['weekend'];
            } else {
                workout = workoutSchedule[day];
            }
            
            const isToday = day === today;
            const isCompleted = this.isWorkoutCompletedToday(day);
            
            return `
                <div class="schedule-day ${isToday ? 'today' : ''} ${isCompleted ? 'completed' : ''}">
                    <h3 class="day-name">${day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                    <p class="day-workout">${workout ? workout.name : 'Rest Day'}</p>
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
                    <span>Completed: ${workout.completedExercises}/${workout.totalExercises} exercises</span>
                </div>
            </div>
        `).join('');
    }

    renderProgress() {
        const totalWorkouts = this.workoutHistory.length;
        const weekWorkouts = this.getWeekWorkouts();
        const streak = this.calculateStreak();

        document.getElementById('totalWorkouts').textContent = totalWorkouts;
        document.getElementById('weekWorkouts').textContent = weekWorkouts;
        document.getElementById('workoutStreak').textContent = `${streak} days`;
        document.getElementById('totalTime').textContent = `${totalWorkouts} workouts`;
    }

    isWorkoutCompletedToday(day) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.workoutHistory.some(workout => {
            const workoutDate = new Date(workout.date);
            workoutDate.setHours(0, 0, 0, 0);
            return workoutDate.getTime() === today.getTime();
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