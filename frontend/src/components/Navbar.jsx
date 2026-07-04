// components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiChevronDown, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [whatWeDoOpen, setWhatWeDoOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setWhatWeDoOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { path: '/', label: 'Home' },
    { 
      label: 'What We Do',
      isDropdown: true,
      items: [
        { path: '/businesses', label: 'For Businesses', description: 'Legal solutions for companies' },
        { path: '/individuals', label: 'For Individuals', description: 'Personal legal services' },
      ]
    },
    { path: '/podcasts', label: 'Podcasts' },
    { path: '/books', label: 'Books' },
    { path: '/resources', label: 'Resources' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-md shadow-elegant py-3' 
        : 'bg-white py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-chocolate rounded-lg flex items-center justify-center">
              <span className="text-white font-display text-xl font-bold">SM</span>
            </div>
            <div>
              <h1 className="font-display text-xl lg:text-2xl font-semibold text-chocolate group-hover:text-chocolate-dark transition-colors">
                Sarah Michelle
              </h1>
              <span className="text-xs text-taupe tracking-[0.25em] uppercase block leading-none">
                Legal Services
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <div key={index} className="relative" ref={link.isDropdown ? dropdownRef : null}>
                {link.isDropdown ? (
                  <>
                    <button
                      onClick={() => setWhatWeDoOpen(!whatWeDoOpen)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                        whatWeDoOpen || location.pathname === '/businesses' || location.pathname === '/individuals'
                          ? 'text-chocolate'
                          : 'text-taupe hover:text-chocolate'
                      }`}
                    >
                      {link.label}
                      <FiChevronDown className={`text-xs transition-transform duration-300 ${whatWeDoOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {whatWeDoOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-border-light rounded-lg shadow-xl py-2 animate-fade-in">
                        {link.items.map((item, i) => (
                          <Link
                            key={i}
                            to={item.path}
                            onClick={() => setWhatWeDoOpen(false)}
                            className="block px-5 py-3 hover:bg-cream transition-colors group/item"
                          >
                            <p className="text-sm font-medium text-chocolate group-hover/item:text-chocolate-dark">
                              {item.label}
                            </p>
                            <p className="text-xs text-taupe mt-0.5">
                              {item.description}
                            </p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      location.pathname === link.path
                        ? 'text-chocolate'
                        : 'text-taupe hover:text-chocolate'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-2 px-4 py-2 text-sm text-chocolate hover:text-chocolate-dark transition-colors"
            >
              <FiPhone className="text-sm" />
              <span>(555) 123-4567</span>
            </a>
            
            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 text-sm text-taupe hover:text-chocolate transition-colors font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-taupe hover:text-red-600 transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-chocolate text-white text-sm font-medium rounded-lg hover:bg-chocolate-dark transition-all"
              >
                <FiUser className="text-sm" />
                Client Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-chocolate hover:text-chocolate-dark transition-colors"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-border-light animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  {link.isDropdown ? (
                    <>
                      <p className="px-4 py-3 text-sm font-medium text-chocolate">
                        {link.label}
                      </p>
                      {link.items.map((item, i) => (
                        <Link
                          key={i}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block px-8 py-2.5 text-sm text-taupe hover:text-chocolate hover:bg-cream transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 text-sm font-medium transition-colors ${
                        location.pathname === link.path
                          ? 'text-chocolate bg-cream rounded-lg'
                          : 'text-taupe hover:text-chocolate'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t border-border-light">
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 text-sm text-taupe hover:text-chocolate transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="w-full mt-2 py-3 bg-chocolate text-white text-sm font-medium rounded-lg hover:bg-chocolate-dark transition-all"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-chocolate text-white text-sm font-medium rounded-lg hover:bg-chocolate-dark transition-all"
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