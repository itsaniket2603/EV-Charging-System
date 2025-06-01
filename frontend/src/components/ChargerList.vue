<template>
  <div>
    <div>
      <label>Status:</label>
      <select v-model="filters.status">
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <ul>
      <li v-for="charger in filteredChargers" :key="charger._id">
        {{ charger.name }} - {{ charger.status }}
        <button @click="deleteCharger(charger._id)">Delete</button>
      </li>
    </ul>

    <ChargerForm @added="getChargers" />
  </div>
</template>

<script>
import api from '../services/api'
import ChargerForm from './ChargerForm.vue'

export default {
  components: { ChargerForm },
  data() {
    return {
      chargers: [],
      filters: {
        status: '',
      },
    }
  },
  computed: {
    filteredChargers() {
      return this.chargers.filter(c =>
        this.filters.status ? c.status === this.filters.status : true
      )
    },
  },
  methods: {
    async getChargers() {
      const res = await api.get('/stations')
      this.chargers = res.data
    },
    async deleteCharger(id) {
      await api.delete(`/stations/${id}`)
      this.getChargers()
    },
  },
  mounted() {
    this.getChargers()
  },
}
</script>