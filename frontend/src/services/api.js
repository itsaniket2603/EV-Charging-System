import axios from 'axios';

const API_URL = 'https://backend-charging-station-production.up.railway.app/api';  // Your backend URL

const instance = axios.create({
  baseURL: API_URL,
});


// Add JWT token automatically if saved in localStorage
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  
  if (token) {
    console.log("token" , token)

    config.headers.Authorization = `Bearer ${token}`;
  }
  else{
    console.log("token is not present");
  }
  return config;
});

export default instance;


