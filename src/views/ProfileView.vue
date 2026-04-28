<script setup>
import { ref } from 'vue'
import { state, saveState, logout } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()
const newName = ref(state.user?.name || '')
const isEditing = ref(false)

const saveNameChange = () => {
    if (newName.value.trim() === '') return
    state.user.name = newName.value
    saveState()
    isEditing.value = false
}

const handleLogout = () => {
    logout()
    router.push('/login')
}
</script>

<template>
    <div class="max-w-2xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div
            class="bg-indigo-950/40 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">

            <!-- Fondo decorativo -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-fuchsia-600/5 blur-[80px] rounded-full -mr-20 -mt-20"></div>

            <div class="flex flex-col items-center mb-10">
                <div
                    class="w-24 h-24 rounded-full bg-linear-to-tr from-pink-600 to-fuchsia-700 border-4 border-fuchsia-400 p-1 mb-4 shadow-[0_0_25px_rgba(217,70,239,0.5)]">
                    <div class="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                        <span class="text-4xl text-white font-bold leading-none">{{ state.userLevel }}</span>
                    </div>
                </div>
                <h2 class="text-3xl font-black text-white mb-1">{{ state.user?.name || 'Aventurero' }}</h2>
                <p class="text-fuchsia-400 font-bold tracking-widest text-xs uppercase">Nivel {{ state.userLevel }}
                    Personal</p>
            </div>

            <div class="space-y-8 relative z-10">
                <!-- Sección Nombre -->
                <div class="p-6 bg-slate-900/60 rounded-2xl border border-slate-700 shadow-inner">
                    <h3 class="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Tus datos
                    </h3>

                    <div v-if="!isEditing" class="flex items-end justify-between">
                        <div>
                            <p class="text-slate-400 text-xs mb-1">Nombre actual</p>
                            <p class="text-xl font-bold text-white">{{ state.user?.name }}</p>
                        </div>
                        <button @click="isEditing = true"
                            class="flex p-2 text-fuchsia-400 hover:bg-fuchsia-400/10 rounded-lg transition-all">
                            Editar&nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </button>
                    </div>

                    <div v-else class="flex gap-3">
                        <input v-model="newName" type="text"
                            class="flex-1 bg-slate-950 border border-fuchsia-500/50 text-white px-4 py-2 rounded-xl outline-none shadow-[0_0_10px_rgba(217,70,239,0.1)]">
                        <button @click="saveNameChange"
                            class="px-4 py-2 bg-fuchsia-600 text-white rounded-xl font-bold hover:brightness-110">Guardar</button>
                        <button @click="isEditing = false"
                            class="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold">X</button>
                    </div>
                </div>

                <!-- Estadísticas Rápidas -->
                <div class="grid grid-cols-2 gap-4">
                    <div class="p-6 bg-slate-900/60 rounded-2xl border border-slate-700 text-center">
                        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">Tareas</p>
                        <p class="text-2xl font-black text-white">{{ state.habits.length }}</p>
                    </div>
                    <div class="p-6 bg-slate-900/60 rounded-2xl border border-slate-700 text-center">
                        <p class="text-slate-500 text-[10px] font-black uppercase mb-1">XP Total</p>
                        <p class="text-2xl font-black text-white">{{ state.currentXP }}</p>
                    </div>
                </div>

                <div class="pt-4 space-y-4">
                    <button @click="router.push('/')"
                        class="w-full py-4 text-white font-bold bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all border border-slate-700">
                        VOLVER AL TABLERO
                    </button>

                    <button @click="handleLogout"
                        class="w-full py-4 text-red-400 font-bold hover:bg-red-400/10 rounded-2xl transition-all border border-red-400/20">
                        CERRAR SESIÓN
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
