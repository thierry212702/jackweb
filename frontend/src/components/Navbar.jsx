import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HiMenu, HiX, HiChevronDown, HiUser, HiLogout } from 'react-icons/hi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [adminOpen, setAdminOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/podcasts', label: 'Podcasts' },
    { path: '/books', label: 'Books' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ]

  const adminLinks = [
    { path: '/admin', label: 'Dashboard' },
    { path: '/admin/contacts', label: 'Contacts' },
    { path: '/admin/podcasts', label: 'Podcasts' },
    { path: '/admin/books', label: 'Books' },
    { path: '/admin/users', label: 'Users' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark-950/95 backdrop-blur-xl shadow-lg shadow-primary-600/10 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent">
              jack_legal_sevices
            </span>
            <span className="text-xs text-primary-400 tracking-[0.2em] uppercase">
              Legal Services
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-400'
                    : 'text-dark-300 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-primary-400" />
                )}
              </Link>
            ))}

            {/* Admin Dropdown */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-dark-300 hover:text-white transition-colors"
                >
                  Admin <HiChevronDown className={`transition-transform ${adminOpen ? 'rotate-180' : ''}`} />
                </button>
                {adminOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-dark-800/95 backdrop-blur-xl border border-primary-600/20 rounded-xl shadow-2xl py-2 animate-fade-in-down">
                    {adminLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setAdminOpen(false)}
                        className="block px-4 py-2.5 text-sm text-dark-300 hover:text-white hover:bg-primary-600/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-sm text-primary-400">
                    <HiUser />
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-dark-800/50 border border-primary-600/30 rounded-lg text-sm text-dark-300 hover:text-white hover:border-primary-500 transition-all"
                  >
                    <HiLogout /> Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-primary-600/25 transition-all transform hover:-translate-y-0.5"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-white hover:text-primary-400 transition-colors"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-dark-900/95 backdrop-blur-xl border border-primary-600/20 rounded-2xl p-6 animate-fade-in-down">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg ${
                    location.pathname === link.path
                      ? 'text-primary-400 font-semibold'
                      : 'text-dark-300 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAdmin && (
                <>
                  <div className="border-t border-primary-600/20 pt-4 mt-2">
                    <span className="text-xs text-primary-400 uppercase tracking-wider font-semibold">
                      Admin Panel
                    </span>
                  </div>
                  {adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-dark-400 hover:text-white pl-4"
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
              
              <div className="border-t border-primary-600/20 pt-4 mt-2">
                {user ? (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg text-white font-semibold"
                  >
                    Login
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