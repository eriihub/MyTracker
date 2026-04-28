import { reactive, watch } from 'vue'

// --- ESTADO GLOBAL ---
export const state = reactive({
  user: null, // { email, name, isFirstLogin }
  habits: [],
  userLevel: 1,
  currentXP: 20,
  maxXP: 100,
  isAuth: false
})

// --- PERSISTENCIA ---
const SAVE_KEY = 'questlog_v2_data'
const USERS_KEY = 'questlog_users'

export const loadState = (email) => {
  const allUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  const userData = allUsers[email]
  
  if (userData) {
    state.user = { email: userData.email, name: userData.name, isFirstLogin: userData.isFirstLogin }
    state.habits = userData.habits || []
    state.userLevel = userData.userLevel || 1
    state.currentXP = userData.currentXP || 0
    state.maxXP = userData.maxXP || 100
    state.isAuth = true
  }
}

export const saveState = () => {
  if (!state.user) return
  
  const allUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  allUsers[state.user.email] = {
    ...allUsers[state.user.email],
    name: state.user.name,
    isFirstLogin: state.user.isFirstLogin,
    habits: state.habits,
    userLevel: state.userLevel,
    currentXP: state.currentXP,
    maxXP: state.maxXP
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers))
}

// --- LÓGICA DE USUARIOS ---
export const register = (email, password) => {
  const allUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  if (allUsers[email]) return { success: false, message: 'El correo ya existe' }
  
  allUsers[email] = { 
    email, 
    password, 
    name: '', 
    isFirstLogin: true,
    habits: [],
    userLevel: 1,
    currentXP: 0,
    maxXP: 100
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(allUsers))
  return { success: true }
}

export const login = (email, password) => {
  const allUsers = JSON.parse(localStorage.getItem(USERS_KEY) || '{}')
  const user = allUsers[email]
  
  if (user && user.password === password) {
    loadState(email)
    localStorage.setItem('questlog_current_user', email)
    return { success: true }
  }
  return { success: false, message: 'Credenciales inválidas' }
}

export const logout = () => {
  state.user = null
  state.isAuth = false
  state.habits = []
  localStorage.removeItem('questlog_current_user')
}

export const initAuth = () => {
  const currentEmail = localStorage.getItem('questlog_current_user')
  if (currentEmail) {
    loadState(currentEmail)
  }
}

// --- LÓGICA DE JUEGO ---
export const checkDailyReset = () => {
  const today = new Date()
  const todayStr = today.toDateString()

  state.habits.forEach(habit => {
    habit.completed = habit.history.includes(todayStr)

    let checkDate = new Date(today)
    let foundPastScheduledDay = false;

    for (let daysBack = 1; daysBack <= 7; daysBack++) {
      checkDate.setDate(checkDate.getDate() - 1)
      if (habit.frequency.includes(checkDate.getDay())) {
        foundPastScheduledDay = true;
        break;
      }
    }

    if (foundPastScheduledDay) {
      const pastScheduledStr = checkDate.toDateString()
      if (!habit.history.includes(pastScheduledStr) && !habit.completed) {
        habit.streak = 0
      }
    }
  })
}

export const addXP = (amount) => {
  state.currentXP += amount
  if (state.currentXP >= state.maxXP) {
    const overflow = state.currentXP - state.maxXP
    state.userLevel += 1
    state.currentXP = 0
    state.maxXP = Math.floor(state.maxXP * 1.5)
    setTimeout(() => { state.currentXP = overflow }, 1000)
  }
}

// Auto-guardado ante cambios en el estado
watch(() => state, () => saveState(), { deep: true })
