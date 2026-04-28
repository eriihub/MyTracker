<script setup>
import { computed } from 'vue'

// Recibimos el objeto "habit" que está en App.vue
const props = defineProps({
    habit: { type: Object, required: true }
})

// Avisamos a App.vue cuando se hace clic en completar O en borrar
defineEmits(['complete', 'delete', 'edit'])

// Nombres de los días y lógica para saber si hoy toca
const daysMap = [
    { id: 1, letter: 'L' }, { id: 2, letter: 'M' }, { id: 3, letter: 'X' },
    { id: 4, letter: 'J' }, { id: 5, letter: 'V' }, { id: 6, letter: 'S' }, { id: 0, letter: 'D' }
]

const isScheduledToday = computed(() => {
    const todayNum = new Date().getDay()
    return props.habit.frequency.includes(todayNum)
})

</script>

<template>
    <div class="bg-indigo-950 p-4 rounded-xl border flex justify-between items-center transition-all duration-300"
        :class="isScheduledToday ? 'border-slate-700 hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.35)]' : 'border-slate-800 opacity-80'">

        <div class="flex flex-col">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                {{ habit.name }}
                <span v-if="!isScheduledToday"
                    class="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded-md border border-slate-700 uppercase tracking-wider">
                    Descanso
                </span>
            </h3>

            <div class="flex gap-1 mt-2 mb-1">
                <span v-for="day in daysMap" :key="day.id"
                    class="text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold transition-all duration-300"
                    :class="habit.frequency.includes(day.id)
                        ? 'bg-linear-to-tr from-pink-600 to-fuchsia-700 text-white border border-fuchsia-400/50 shadow-[0_0_8px_rgba(217,70,239,0.3)]'
                        : 'bg-slate-800 text-slate-600 border border-slate-700/30'">
                    {{ day.letter }}
                </span>
            </div>

            <div class="items-center gap-4 text-sm mt-1">
                <span class="text-slate-500">🔥</span>
                <span class="bg-linear-to-r from-yellow-300 to-pink-600 bg-clip-text text-transparent font-medium">
                    {{ habit.streak }} días
                </span>
            </div>

            <div class=" items-center gap-4 text-sm mt-1">
                <span class="text-slate-500">✨</span>
                <span class="bg-linear-to-r from-yellow-300 to-pink-600 bg-clip-text text-transparent font-medium">
                    {{ habit.xpReward }} XP
                </span>
            </div>

        </div>

        <div class="flex items-center gap-3">
            <button @click="$emit('edit', habit)" class="p-2 text-slate-500 hover:text-blue-400 transition-colors"
                title="Editar">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>

            <button @click="$emit('delete', habit.id)"
                class="p-2 text-slate-500 hover:text-red-400 transition-colors duration-200" title="Eliminar hábito">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            <button @click="$emit('complete', habit.id)" :disabled="habit.completed || !isScheduledToday"
                class="relative overflow-hidden px-4 py-2 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                :class="habit.completed || !isScheduledToday ? 'bg-purple-950/50 text-slate-400' : 'text-white active:scale-95'">

                <div v-if="!habit.completed && isScheduledToday"
                    class="absolute inset-0 bg-linear-to-r from-pink-600 to-fuchsia-600 transition-opacity duration-500">
                </div>

                <div v-if="!habit.completed && isScheduledToday"
                    class="absolute inset-0 bg-linear-to-r from-pink-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                </div>

                <span class="relative z-10 transition-all duration-500">
                    {{ habit.completed ? 'Completado' : (!isScheduledToday ? 'Hoy no toca' : 'Completar') }}
                </span>
            </button>
        </div>
    </div>
</template>