<script setup>
import { onMounted } from 'vue'
import { initAuth, state } from './store'

onMounted(() => {
  initAuth()
})
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-white font-sans selection:bg-fuchsia-500/30">
    <!-- Navbar simple si estamos autenticados -->
    <nav v-if="state.isAuth && $route.name !== 'login'"
      class="fixed top-0 left-0 right-0 z-40 bg-slate-950/50 backdrop-blur-md border-b border-white/5">
      <div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <RouterLink to="/"
          class="text-lg font-black bg-linear-to-r from-yellow-300 to-pink-500 bg-clip-text text-transparent">
          MyTracker
        </RouterLink>
        <div class="flex items-center gap-6">
          <RouterLink to="/"
            class="text-xs font-bold uppercase tracking-widest hover:text-fuchsia-400 transition-colors"
            :class="{ 'text-fuchsia-400': $route.name === 'tracker' }">
            Tareas
          </RouterLink>
          <RouterLink to="/profile"
            class="text-xs font-bold uppercase tracking-widest hover:text-fuchsia-400 transition-colors"
            :class="{ 'text-fuchsia-400': $route.name === 'profile' }">
            Perfil
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Contenido Principal -->
    <main :class="{ 'pt-14': state.isAuth && $route.name !== 'login' }">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #020617;
}

::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
</style>