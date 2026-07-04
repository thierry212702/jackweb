// pages/Login.jsx (Humanized Version)
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-0 py-4 bg-transparent border-b border-border-light text-charcoal placeholder-taupe focus:border-gold outline-none transition-all duration-500 font-light"

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-white py-12 px-4">
      <div className="max-w-md w-full animate-scale-in">
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8">
            <h1 className="font-display text-2xl text-charcoal">Sarah Michelle</h1>
            <span className="text-xs text-taupe tracking-[0.3em] uppercase">Legal Services</span>
          </Link>
          <h2 className="font-display text-3xl text-charcoal mb-2">
            Welcome back
          </h2>
          <p className="text-taupe font-light">
            Sign in to manage your account
          </p>
        </div>

        <div className="bg-white p-10 border border-border-light">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-3">
                Email Address
              </label>
              <input
                type="email"
                {...register('email', { required: 'Please enter your email' })}
                className={inputClass}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-rose text-xs mt-2">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-taupe mb-3">
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: 'Please enter your password' })}
                className={inputClass}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-rose text-xs mt-2">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-gold text-white tracking-[0.2em] uppercase text-sm hover:bg-gold-dark disabled:opacity-50 transition-all duration-500 flex items-center justify-center gap-3"
            >
              {loading ? 'Signing in...' : (
                <>
                  Sign In
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-border-light text-center">
            <p className="text-taupe text-sm font-light">
              New here?{' '}
              <Link to="/register" className="text-gold hover:text-gold-dark transition-colors">
                Create an account
              </Link>
            </p>
          </div>

          {/* Help note */}
          <div className="mt-6 p-4 bg-cream text-center">
            <p className="text-taupe text-xs font-light">
              Need assistance?{' '}
              <a href="tel:+15551234567" className="text-gold hover:text-gold-dark">
                Call us
              </a>
              {' '}or{' '}
              <a href="mailto:info@sarahmichelle.com" className="text-gold hover:text-gold-dark">
                email
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login