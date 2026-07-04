// pages/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await registerUser(formData)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (error) {
      console.log('Demo registration')
      if (formData.name && formData.email && formData.password) {
        toast.success('Account created! (Demo Mode)')
        navigate('/')
      } else {
        toast.error('Please fill in all fields')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl text-[#1a1a1a] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Sarah Michelle
            </h1>
            <span className="text-xs text-gray-400 tracking-[0.3em] uppercase">
              Legal Services
            </span>
          </Link>
        </div>

        {/* Register Form */}
        <div className="bg-[#F8F6F3] p-8 lg:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <FiUser className="text-2xl text-[#C4956A]" />
            </div>
            <h2 className="text-2xl text-[#1a1a1a]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Create Account
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-light">
              Join our client portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-[#C4956A] outline-none transition-colors text-sm"
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#1a1a1a] text-white py-4 text-sm tracking-wider uppercase hover:bg-[#333] disabled:opacity-50 transition-all duration-300"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Account
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-sm font-light">
              Already have an account?{' '}
              <Link to="/login" className="text-[#C4956A] hover:text-[#1a1a1a] transition-colors font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register