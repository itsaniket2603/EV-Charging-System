 <template>
  <div class="dashboard-container">
    <h2>Charging Stations Dashboard</h2>
     <button @click="$router.push({ name: 'MapView' })">View Map</button> Add here -->

    <div class="filters">
      <label for="statusFilter">Filter by Status:</label>
      <select id="statusFilter" v-model="filterStatus" @change="filterChargers">
        <option value="">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Status</th>
          <th>Power Output (kW)</th>
          <th>Connector Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="charger in filteredChargers" :key="charger._id">
          <td>{{ charger.name }}</td>
          <td>{{ charger.location.latitude }}, {{ charger.location.longitude }}</td>
          <td>{{ charger.status }}</td>
          <td>{{ charger.powerOutput }}</td>
          <td>{{ charger.connectorType }}</td>
          <td>
            <button @click="editCharger(charger)">Edit</button>
            <button @click="deleteCharger(charger._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="goToAddCharger">Add New Charger</button>
  </div>
</template>

<script>
// Make sure your axios instance is properly exported from services/api.js
import axios from '../services/api'  

export default {
  data() {
    return {
      chargers: [],
      filteredChargers: [],
      filterStatus: '',
    }
  },
  methods: {
    async fetchChargers() {
      try {
        const res = await axios.get('/stations')
        this.chargers = res.data
        this.filteredChargers = this.chargers
      } catch (err) {
        alert('Error fetching chargers')
        console.error(err)
      }
    },
    filterChargers() {
      if (!this.filterStatus) {
        this.filteredChargers = this.chargers
      } else {
        this.filteredChargers = this.chargers.filter(
          c => c.status.toLowerCase() === this.filterStatus.toLowerCase()
        )
      }
    },
    editCharger(charger) {
      this.$router.push({ name: 'EditCharger', params: { id: charger._id } })
    },
    async deleteCharger(id) {
      if (confirm('Are you sure you want to delete this charger?')) {
        try {
          await axios.delete(`/stations/${id}`)
          alert('Deleted successfully')
          this.fetchChargers()
        } catch (err) {
          alert('Delete failed')
          console.error(err)
        }
      }
    },
    goToAddCharger() {
      this.$router.push({ name: 'AddCharger' })
    }
  },
  mounted() {
    this.fetchChargers()
  }
}
</script>

<style scoped>
.dashboard-container {
  max-width: 900px;
  margin: 40px auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
th {
  background-color: #1976d2;
  color: white;
}
button {
  margin: 0 5px;
  padding: 6px 12px;
  cursor: pointer;
}
.filters {
  margin-bottom: 15px;
}
</style> 
