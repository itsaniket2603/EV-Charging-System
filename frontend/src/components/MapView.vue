<template>
  <div id="map" style="height: 500px;"></div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from '../services/api' // Adjust path based on your structure

export default {
  data() {
    return {
      map: null,
      chargers: []
    }
  },
  async mounted() {
    this.initMap()
    await this.loadChargers()
    this.addMarkers()
  },
  methods: {
    initMap() {
      this.map = L.map('map').setView([20, 78], 5) // Center of India
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map)
    },
    async loadChargers() {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get('/stations', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.chargers = response.data
      } catch (error) {
        console.error('Failed to load chargers:', error)
        alert('Failed to load chargers')
      }
    },
    addMarkers() {
      this.chargers.forEach(charger => {
        const { location, name, status, powerOutput, connectorType } = charger
        if (location?.latitude && location?.longitude) {
          const marker = L.marker([location.latitude, location.longitude]).addTo(this.map)
          marker.bindPopup(`
            <b>${name}</b><br/>
            Status: ${status}<br/>
            Power Output: ${powerOutput} kW<br/>
            Connector: ${connectorType}
          `)
        }
      })
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 500px;
}
</style>
