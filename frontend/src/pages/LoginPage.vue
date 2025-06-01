<template>
  <div class="login">
    <h2 >Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" >Login</button>
      <p style="color:red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        const res = await api.post('/auth/login', {
          email: this.email,
          password: this.password,
        })
        localStorage.setItem('token', res.data.token)
        
        this.$router.push('/dashboard')
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed'
      }
    },
  },
}
</script>
