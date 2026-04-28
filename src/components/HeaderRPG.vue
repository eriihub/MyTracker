<script setup>
import { computed } from 'vue'
import { state } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()

// Recibimos los datos del jugador desde App.vue
const props = defineProps({
    level: {
        type: Number,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    maxXp: {
        type: Number,
        required: true
    }
})

// Calculamos el porcentaje de la barra (de 0 a 100)
const xpPercentage = computed(() => {
    return Math.min(100, Math.max(0, (props.xp / props.maxXp) * 100))
})

</script>

<template>
    <div class="bg-indigo-950 p-6 rounded-xl border border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.5)] mb-8">

        <div class="flex items-center justify-between mb-4">

            <div class="flex items-center gap-4">
                <div @click="router.push('/profile')"
                    class="relative flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-pink-600 to-fuchsia-700 border-2 border-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.5)] cursor-pointer hover:scale-105 transition-transform">
                    <span class="text-white font-black text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        {{ level }}
                    </span>
                </div>
                <div>
                    <h2 class="text-xl font-bold text-white tracking-wide uppercase">{{ state.user?.name || 'Aventurero'
                    }}</h2>
                    <p class="text-slate-400 text-sm">Completa tus hábitos y sube de nivel</p>
                </div>
            </div>

            <div class="text-right">
                <span
                    class="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-pink-600 drop-shadow-sm">
                    {{ xp }}
                </span>
                <span class="text-slate-400 font-bold text-lg"> / {{ maxXp }} XP</span>
            </div>
        </div>

        <div class="h-5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[2px] shadow-inner">

            <div class="header-rpg-bar h-full bg-linear-to-r from-yellow-500 to-fuchsia-600 rounded-full transition-all duration-1000 ease-out relative shadow-[0_0_10px_rgba(217,70,239,0.8)]"
                :style="{ width: `${xpPercentage}%` }">
                <div
                    class="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-r from-transparent to-white opacity-40 rounded-full">
                </div>
            </div>

        </div>

    </div>
</template>