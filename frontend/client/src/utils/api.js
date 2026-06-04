import axios from 'axios';

const api = axios.create({
  // 💡 VITE_API_URL கிடைக்கவில்லை என்றால், நேரடியாக போர்ட் 8000-ஐ எடுத்துக்கொள்ளும்!
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true, // பேக்கெண்ட் குக்கீஸை எடுத்துச் செல்ல இது மிகக் கட்டாயம்
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
