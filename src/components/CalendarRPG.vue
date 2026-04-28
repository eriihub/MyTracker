<script setup>
import { computed } from 'vue'

const props = defineProps({
    habits: { type: Array, required: true }
})

// Lógica de fechas para construir el calendario del mes actual
const today = new Date()
const currentMonth = today.getMonth()
const currentYear = today.getFullYear()
const monthName = today.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()

// Calculamos cuántos días tiene este mes
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

// Días en blanco para que el día 1 caiga en la columna correcta (Lunes a Domingo)
const firstDay = new Date(currentYear, currentMonth, 1).getDay()
const blankDays = firstDay === 0 ? 6 : firstDay - 1

// Creamos un array con todos los días del mes
const calendarDays = computed(() => {
    let days = []
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = new Date(currentYear, currentMonth, i).toDateString()

        // Contamos cuántas tareas se completaron este día
        let completions = 0
        props.habits.forEach(h => {
            if (h.history && h.history.includes(dateStr)) completions++
        })

        days.push({ number: i, dateStr, completions, isToday: dateStr === today.toDateString() })
    }
    return days
})
</script>

<template>
    <div class="bg-indigo-950 p-6 rounded-xl border border-slate-700 shadow-lg">
        <h2 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📅 Tu historial <span class="text-sm font-normal text-fuchsia-400">({{ monthName }})</span>
        </h2>

        <div class="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500 mb-2">
            <div>L</div>
            <div>M</div>
            <div>X</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div>D</div>
        </div>

        <div class="grid grid-cols-7 gap-2">
            <div v-for="n in blankDays" :key="'blank-' + n"></div>

            <div v-for="day in calendarDays" :key="day.number"
                class="aspect-square flex items-center justify-center rounded-lg border transition-all duration-300"
                :class="[
                    day.isToday ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-indigo-950' : '',
                    day.completions === 0 ? 'bg-slate-900 border-slate-800 text-slate-600' :
                        day.completions === 1 ? 'bg-fuchsia-900/40 border-fuchsia-800 text-fuchsia-200 shadow-[0_0_8px_rgba(217,70,239,0.2)]' :
                            'bg-linear-to-br from-fuchsia-600 to-purple-600 border-fuchsia-400 text-white font-bold shadow-[0_0_12px_rgba(217,70,239,0.6)]'
                ]" :title="`${day.completions} tareas completadas`">
                {{ day.number }}
            </div>
        </div>
    </div>
</template>