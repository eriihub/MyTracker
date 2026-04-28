<script setup>
import { ref } from 'vue'
import { state, saveState } from '../store'

const playerName = ref('')

const saveName = () => {
    if (playerName.value.trim() === '') return
    state.user.name = playerName.value
    state.user.isFirstLogin = false
    saveState()
}
</script>

<template>
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl">
        <div
            class="relative w-full max-w-lg bg-indigo-950/40 border border-fuchsia-500/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(217,70,239,0.2)] overflow-hidden">

            <div class="relative z-10 text-center">
                <div
                    class="inline-block p-4 rounded-full bg-fuchsia-600/10 border border-fuchsia-500/20 mb-6 animate-bounce">
                    <span class="text-4xl text-fuchsia-500">✨</span>
                </div>

                <h2 class="text-3xl font-black text-white mb-4 tracking-tight">¡Bienvenido!</h2>
                <p class="text-slate-400 mb-8 max-w-sm mx-auto">
                    ¿Cómo quieres que te llamemos?
                </p>

                <div class="space-y-6">
                    <div class="space-y-2">
                        <label class="block text-xs font-black text-fuchsia-400 uppercase tracking-widest text-left">Tu
                            Nombre</label>
                        <input v-model="playerName" @keyup.enter="saveName" type="text" placeholder="Ej: Erika, Pepe..."
                            class="w-full bg-slate-900/80 border-2 border-slate-700 focus:border-fuchsia-500 text-white px-6 py-4 rounded-2xl outline-none transition-all text-xl font-bold shadow-inner">
                    </div>

                    <button @click="saveName"
                        class="w-full py-5 rounded-2xl font-black text-white bg-linear-to-r from-pink-600 to-fuchsia-700 hover:brightness-110 active:scale-95 shadow-[0_10px_30px_rgba(217,70,239,0.4)] transition-all text-lg tracking-widest">
                        COMENZAR
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
