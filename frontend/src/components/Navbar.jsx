// components/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/podcasts', label: 'Podcasts' },
    { path: '/books', label: 'Books' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Enquire' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-warm-white/95 backdrop-blur-md shadow-elegant py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="font-display text-2xl lg:text-3xl font-medium tracking-wide text-charcoal group-hover:text-gold transition-colors duration-500">
              Sarah Michelle
            </h1>
            <span className="text-xs lg:text-sm text-taupe tracking-[0.3em] uppercase mt-1 block">
              Legal Services
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm tracking-wider uppercase transition-colors duration-500 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold transform origin-left" />
                )}
              </Link>
            ))}

            {/* Auth */}
            <div className="flex items-center gap-6 ml-8 pl-8 border-l border-border-light">
              {user ? (
                <div className="flex items-center gap-6">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-sm tracking-wider uppercase text-taupe hover:text-gold transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-sm tracking-wider uppercase text-taupe hover:text-rose transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-sm tracking-wider uppercase text-taupe hover:text-gold transition-colors flex items-center gap-2"
                >
                  <FiUser className="text-sm" />
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-charcoal hover:text-gold transition-colors"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-8 pb-8 border-t border-border-light animate-fade-in">
            <div className="flex flex-col gap-6 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg tracking-wider uppercase ${
                    location.pathname === link.path
                      ? 'text-gold'
                      : 'text-taupe hover:text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-border-light">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block text-lg tracking-wider uppercase text-taupe hover:text-gold mb-4"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-white transition-all tracking-wider uppercase text-sm"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 bg-gold text-white text-center tracking-wider uppercase text-sm hover:bg-gold-dark transition-all"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar