<script setup>
import { ref } from 'vue'
import { state, addXP, checkDailyReset } from '../store'
import HabitCard from '../components/HabitCard.vue'
import HeaderRPG from '../components/HeaderRPG.vue'
import CalendarRPG from '../components/CalendarRPG.vue'
import OnboardingModal from '../components/OnboardingModal.vue'

// Local state for the form
const newHabitName = ref('')
const newHabitDays = ref([])
const daysOptions = [
    { id: 1, label: 'L' }, { id: 2, label: 'M' }, { id: 3, label: 'X' },
    { id: 4, label: 'J' }, { id: 5, label: 'V' }, { id: 6, label: 'S' }, { id: 0, label: 'D' }
]

const toggleDay = (doc) => {
    if (newHabitDays.value.includes(doc)) {
        newHabitDays.value = newHabitDays.value.filter(d => d !== doc)
    } else {
        newHabitDays.value.push(doc)
    }
}

const addNewHabit = () => {
    if (newHabitName.value.trim() === '' || newHabitDays.value.length === 0) return
    const newId = state.habits.length > 0 ? Math.max(...state.habits.map(h => h.id)) + 1 : 1
    state.habits.push({
        id: newId, name: newHabitName.value, streak: 0, xpReward: 15,
        completed: false, frequency: [...newHabitDays.value], history: []
    })
    newHabitName.value = ''
    newHabitDays.value = []
}

const handleDeleteHabit = (id) => state.habits = state.habits.filter(h => h.id !== id)

const isEditModalOpen = ref(false)
const habitBeingEdited = ref(null)

const startEditing = (habit) => {
    habitBeingEdited.value = JSON.parse(JSON.stringify(habit))
    isEditModalOpen.value = true
}

const saveEdit = () => {
    const index = state.habits.findIndex(h => h.id === habitBeingEdited.value.id)
    if (index !== -1) {
        state.habits[index] = habitBeingEdited.value
        isEditModalOpen.value = false
        habitBeingEdited.value = null
        checkDailyReset()
    }
}

const toggleDayInEdit = (dayId) => {
    const h = habitBeingEdited.value
    if (h.frequency.includes(dayId)) {
        h.frequency = h.frequency.filter(d => d !== dayId)
    } else {
        h.frequency.push(dayId)
    }
}

const handleCompleteHabit = (id) => {
    const habit = state.habits.find(h => h.id === id)
    const todayStr = new Date().toDateString()

    if (habit && !habit.completed && habit.frequency.includes(new Date().getDay()) && !habit.history.includes(todayStr)) {
        habit.completed = true
        habit.streak += 1
        habit.history.push(todayStr)
        addXP(habit.xpReward)
    }
}

// Initial check
checkDailyReset()
</script>

<template>
    <div class="max-w-5xl mx-auto py-8 px-4">
        <HeaderRPG :level="state.userLevel" :xp="state.currentXP" :maxXp="state.maxXP" />

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <!-- Main Column: Habits -->
            <div class="lg:col-span-2 flex flex-col gap-6">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-white">Tareas</h2>
                    <span
                        class="text-xs font-bold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 tracking-wide uppercase">
                        {{ state.habits.length }} en total
                    </span>
                </div>

                <div v-if="state.habits.length === 0"
                    class="bg-indigo-950/40 border border-slate-800/50 rounded-xl p-12 text-center flex flex-col items-center justify-center">
                    <span class="text-5xl mb-4">📜</span>
                    <p class="text-slate-300 font-bold text-lg">No tienes tareas activas :(</p>
                    <p class="text-slate-500 text-sm">Añade una nueva tareas para comenzar</p>
                </div>

                <div v-else class="space-y-4">
                    <HabitCard v-for="habit in state.habits" :key="habit.id" :habit="habit"
                        @complete="handleCompleteHabit" @delete="handleDeleteHabit" @edit="startEditing" />
                </div>
            </div>

            <!-- Side Column: Controls -->
            <div class="flex flex-col gap-8">
                <div
                    class="bg-indigo-950 bg-opacity-40 p-6 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden">
                    <h3 class="text-lg font-bold text-white mb-5 flex items-center gap-2">➕ Nueva Tarea</h3>

                    <div class="flex flex-col gap-5 mb-6">
                        <div class="space-y-2">
                            <label class="block text-xs font-bold text-slate-400 uppercase">Nombre</label>
                            <input v-model="newHabitName" @keyup.enter="addNewHabit" type="text"
                                placeholder="Ej: Ir al Gym..."
                                class="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 rounded-lg focus:border-fuchsia-500 outline-none transition-colors">
                        </div>

                        <div class="space-y-3">
                            <label class="block text-xs font-bold text-slate-400 uppercase">Frecuencia</label>
                            <div class="flex flex-wrap gap-2">
                                <button v-for="day in daysOptions" :key="day.id" @click="toggleDay(day.id)"
                                    class="flex-1 min-w-[2.5rem] h-10 rounded-lg text-xs font-bold transition-all flex items-center justify-center transform active:scale-95"
                                    :class="newHabitDays.includes(day.id)
                                        ? 'bg-linear-to-tr from-pink-600 to-fuchsia-700 text-white border border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.4)]'
                                        : 'bg-slate-800 text-slate-500 border border-slate-700/30 hover:bg-slate-700'">
                                    {{ day.label }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button @click="addNewHabit"
                        class="w-full bg-linear-to-r from-pink-600 to-fuchsia-600 hover:brightness-110 text-white font-bold py-3.5 px-6 rounded-lg transition-all active:scale-95 shadow-[0_4px_15px_rgba(217,70,239,0.4)]">
                        Crear
                    </button>
                </div>

                <CalendarRPG :habits="state.habits" />
            </div>
        </div>

        <!-- Onboarding Modal -->
        <OnboardingModal v-if="state.user && state.user.isFirstLogin" />

        <!-- Edit Modal -->
        <div v-if="isEditModalOpen"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div
                class="bg-indigo-950 border border-slate-700 p-8 rounded-xl w-full max-w-md shadow-2xl relative overflow-hidden">
                <h2 class="text-2xl font-bold mb-6 text-white">Editar</h2>

                <div class="mb-5">
                    <label class="block text-xs font-bold text-slate-400 mb-2 uppercase">Nombre</label>
                    <input v-model="habitBeingEdited.name" type="text"
                        class="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3.5 rounded-lg focus:border-fuchsia-500 outline-none">
                </div>

                <div class="mb-8">
                    <label class="block text-xs font-bold text-slate-400 mb-3 uppercase">Días</label>
                    <div class="flex gap-2">
                        <button v-for="day in daysOptions" :key="day.id" @click="toggleDayInEdit(day.id)"
                            class="flex-1 h-11 rounded-lg text-xs font-bold transition-all flex items-center justify-center transform active:scale-95"
                            :class="habitBeingEdited.frequency.includes(day.id)
                                ? 'bg-linear-to-tr from-pink-600 to-fuchsia-700 text-white border border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.4)]'
                                : 'bg-slate-800 text-slate-500 border border-slate-700/30 hover:bg-slate-800'">
                            {{ day.label }}
                        </button>
                    </div>
                </div>

                <div class="flex gap-3">
                    <button @click="isEditModalOpen = false"
                        class="flex-1 py-3.5 rounded-lg font-bold bg-slate-800 text-slate-300">Cancelar</button>
                    <button @click="saveEdit"
                        class="flex-1 py-3.5 rounded-lg font-bold bg-linear-to-r from-pink-600 to-fuchsia-600 text-white shadow-[0_4px_15px_rgba(217,70,239,0.4)]">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>
