<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '../store'

const router = useRouter()
const isLogin = ref(true)
const email = ref('')
const password = ref('')
const error = ref('')

const handleSubmit = () => {
    error.value = ''
    if (isLogin.value) {
        const res = login(email.value, password.value)
        if (res.success) router.push('/')
        else error.value = res.message
    } else {
        const res = register(email.value, password.value)
        if (res.success) {
            login(email.value, password.value)
            router.push('/')
        } else error.value = res.message
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
        <!-- Decoración de fondo -->
        <div class="absolute top-0 -left-20 w-96 h-96 bg-fuchsia-600/10 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-0 -right-20 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full"></div>

        <div
            class="w-full max-w-md bg-indigo-950/40 border border-slate-800 p-8 rounded-2xl backdrop-blur-xl shadow-2xl relative z-10 transition-all duration-500">
            <h1
                class="text-3xl font-black text-center mb-2 bg-linear-to-r from-yellow-300 via-pink-500 to-fuchsia-600 bg-clip-text text-transparent">
                MyTracker
            </h1>
            <p class="text-slate-400 text-center text-sm mb-8">
                {{ isLogin ? 'Inicia sesión para continuar' : 'Registrate para comenzar' }}
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-5">
                <div class="space-y-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Correo
                        Electrónico</label>
                    <input v-model="email" type="email" required placeholder="tu@dragon.com"
                        class="w-full bg-slate-900/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-fuchsia-500 outline-none transition-all shadow-inner">
                </div>

                <div class="space-y-2">
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest">Contraseña</label>
                    <input v-model="password" type="password" required placeholder="••••••••"
                        class="w-full bg-slate-900/50 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-fuchsia-500 outline-none transition-all shadow-inner">
                </div>

                <div v-if="error"
                    class="text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center animate-pulse">
                    {{ error }}
                </div>

                <button type="submit"
                    class="w-full py-4 rounded-xl font-black text-white bg-linear-to-r from-pink-600 to-fuchsia-700 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all">
                    {{ isLogin ? 'ENTRAR' : 'REGISTRARSE' }}
                </button>
            </form>

            <div class="mt-8 text-center">
                <button @click="isLogin = !isLogin"
                    class="text-sm font-bold text-slate-400 hover:text-fuchsia-400 transition-colors">
                    {{ isLogin ? '¿No tienes cuenta? Crea una' : '¿Ya tienes cuenta? Inicia sesión' }}
                </button>
            </div>
        </div>
    </div>
</template>
