// components/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/businesses', label: 'For business' },
    { path: '/individuals', label: 'For individuals' },
    { path: '/about', label: 'About us' },
    { path: '/what-we-do', label: 'What we do' },
    { path: '/contact', label: 'Contact us' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white shadow-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className={`text-xl lg:text-2xl font-medium transition-colors duration-500 ${
              scrolled ? 'text-[#1a1a1a]' : 'text-white'
            }`} 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              JACK GENTIL
            </h1>
            <span className={`hidden sm:block text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
              scrolled ? 'text-gray-400' : 'text-white/70'
            }`}>
              Legal Services
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors duration-300 ${
                  scrolled
                    ? location.pathname === link.path
                      ? 'text-[#8B7355]'
                      : 'text-gray-700 hover:text-[#8B7355]'
                    : location.pathname === link.path
                      ? 'text-white font-medium'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+250798822311"
              className={`text-sm transition-colors duration-300 flex items-center gap-2 ${
                scrolled ? 'text-gray-700 hover:text-[#8B7355]' : 'text-white/80 hover:text-white'
              }`}
            >
              <FiPhone className="text-sm" />
              +25 (0)798 822 311
            </a>
            
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className={`text-sm transition-colors duration-300 ${
                    scrolled ? 'text-gray-700 hover:text-[#8B7355]' : 'text-white/80 hover:text-white'
                  }`}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className={`text-sm transition-colors duration-300 ${
                    scrolled ? 'text-gray-500 hover:text-red-600' : 'text-white/70 hover:text-white'
                  }`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`text-sm transition-colors duration-300 ${
                  scrolled ? 'text-gray-700 hover:text-[#8B7355]' : 'text-white/80 hover:text-white'
                }`}
              >
                Client Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden text-2xl transition-colors duration-300 ${
              scrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu - Always white background for readability */}
        {isOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-gray-200 bg-white shadow-xl rounded-lg p-6">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-700 py-2 hover:text-[#8B7355] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full py-3 bg-gray-900 text-white text-sm uppercase tracking-wider"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-gray-900 text-white text-sm uppercase tracking-wider"
                  >
                    Client Portal
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