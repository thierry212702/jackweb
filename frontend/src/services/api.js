import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data),
}

// Podcast APIs
export const podcastAPI = {
  getAll: () => API.get('/podcast'),
  getById: (id) => API.get(`/podcast/${id}`),
  create: (data) => API.post('/admin/podcasts', data),
  update: (id, data) => API.put(`/admin/podcasts/${id}`, data),
  delete: (id) => API.delete(`/admin/podcasts/${id}`),
}

// Book APIs
export const bookAPI = {
  getAll: () => API.get('/books'),
  getById: (id) => API.get(`/books/${id}`),
  create: (data) => API.post('/admin/books', data),
  update: (id, data) => API.put(`/admin/books/${id}`, data),
  delete: (id) => API.delete(`/admin/books/${id}`),
}

// Contact APIs
export const contactAPI = {
  submit: (data) => API.post('/contact', data),
  getAll: (params) => API.get('/admin/contacts', { params }),
  update: (id, data) => API.put(`/admin/contacts/${id}`, data),
  addNote: (id, data) => API.post(`/admin/contacts/${id}/notes`, data),
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => API.get('/dashboard/stats'),
  getAnalytics: () => API.get('/dashboard/contact-analytics'),
}

// Admin APIs
export const adminAPI = {
  getUsers: () => API.get('/admin/users'),
  updateUser: (id, data) => API.put(`/admin/users/${id}`, data),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
}

export default API