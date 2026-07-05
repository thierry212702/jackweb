// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react'
import API from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete API.defaults.headers.common['Authorization']
    }
  }, [token])

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Use API instance instead of axios directly
          const { data } = await API.get('/auth/profile')
          setUser(data.user || data.data?.user || data)
        } catch (error) {
          console.log('Session expired')
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [token])

  const login = async (email, password) => {
    // Use API instance - it will use the baseURL from api.js
    const { data } = await API.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user || data.data?.user || data)
    toast.success('Login successful!')
    return data
  }

  const register = async (userData) => {
    // Use API instance - it will use the baseURL from api.js
    const { data } = await API.post('/auth/register', userData)
    localStorage.setItem('token', data.token)
    setToken(data.token)
    setUser(data.user || data.data?.user || data)
    toast.success('Registration successful!')
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete API.defaults.headers.common['Authorization']
    toast.success('Logged out successfully')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}