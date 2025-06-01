<template>
  <div class="form-container">
    <h2>{{ isEdit ? 'Edit' : 'Add' }} Charger</h2>
    <form @submit.prevent="submitForm">
      <label>Name:</label>
      <input v-model="charger.name" required />

      <label>Latitude:</label>
      <input v-model.number="charger.location.latitude" required type="number" />

      <label>Longitude:</label>
      <input v-model.number="charger.location.longitude" required type="number" />

      <label>Status:</label>
      <select v-model="charger.status" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <label>Power Output (kW):</label>
      <input v-model.number="charger.powerOutput" required type="number" />

      <label>Connector Type:</label>
      <input v-model="charger.connectorType" required />

      <button type="submit">{{ isEdit ? 'Update' : 'Add' }}</button>
    </form>
  </div>
</template>

<script>
import axios from '../services/api'

export default {
  data() {
    return {
      charger: {
        name: '',
        location: {
          latitude: 0,
          longitude: 0,
        },
        status: 'Active',
        powerOutput: 0,
        connectorType: ''
      },
      isEdit: false
    }
  },
  async mounted() {
    const id = this.$route.params.id
    if (id) {
      this.isEdit = true
      try {
        const res = await axios.get(`/stations/${id}`)
        this.charger = res.data
      } catch (err) {
        alert('Failed to load charger data.')
        console.error(err)
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEdit) {
          await axios.put(`/stations/${this.$route.params.id}`, this.charger)
          alert('Charger updated successfully.')
        } else {
          await axios.post('/stations', this.charger)
          alert('Charger added successfully.')
        }
        this.$router.push('/dashboard')
      } catch (err) {
        alert('Operation failed.')
        console.error(err)
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: auto;
}
form {
  display: flex;
  flex-direction: column;
}
input, select {
  margin-bottom: 10px;
  padding: 8px;
}
button {
  padding: 10px;
}
</style>
