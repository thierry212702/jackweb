// components/Navbar.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [businessOpen, setBusinessOpen] = useState(false)
  const [individualOpen, setIndividualOpen] = useState(false)
  const [mobileBusinessOpen, setMobileBusinessOpen] = useState(false)
  const [mobileIndividualOpen, setMobileIndividualOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const businessServices = [
    { label: 'Real Estate', path: '/businesses' },
    { label: 'Landlord & Tenant', path: '/businesses' },
    { label: 'Restructuring & Finance', path: '/businesses' },
    { label: 'Business Sales', path: '/businesses' },
    { label: 'Start-ups & Contracts', path: '/businesses' },
  ]

  const individualServices = [
    { label: 'Residential Conveyancing', path: '/individuals' },
    { label: 'Wills, Trusts & Estate', path: '/individuals' },
    { label: 'Mental Capacity', path: '/individuals' },
    { label: 'Administration of Estates', path: '/individuals' },
    { label: 'Matrimonial', path: '/individuals' },
    { label: 'Dispute Resolution', path: '/individuals' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/60 backdrop-blur-sm py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl text-white font-medium" 
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              JACK GENTIL
            </h1>
            <span className="hidden sm:block text-xs text-white/70 tracking-[0.2em] uppercase">
              Legal Services
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {/* For Business Dropdown - Fixed hover handling */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setBusinessOpen(true)
                setIndividualOpen(false)
              }}
              onMouseLeave={() => setBusinessOpen(false)}
            >
              <Link
                to="/businesses"
                className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors duration-300"
              >
                For business
                <FiChevronDown className={`text-xs transition-transform duration-300 ${businessOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown - Visible on hover of parent div */}
              <div 
                className={`absolute top-full left-0 mt-0 w-64 bg-white shadow-2xl transition-all duration-300 ${
                  businessOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="py-2">
                  {businessServices.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      onClick={() => setBusinessOpen(false)}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 transition-colors"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* For Individuals Dropdown - Fixed hover handling */}
            <div 
              className="relative"
              onMouseEnter={() => {
                setIndividualOpen(true)
                setBusinessOpen(false)
              }}
              onMouseLeave={() => setIndividualOpen(false)}
            >
              <Link
                to="/individuals"
                className="flex items-center gap-1 text-sm text-white/80 hover:text-white transition-colors duration-300"
              >
                For individuals
                <FiChevronDown className={`text-xs transition-transform duration-300 ${individualOpen ? 'rotate-180' : ''}`} />
              </Link>
              
              {/* Dropdown - Visible on hover of parent div */}
              <div 
                className={`absolute top-full left-0 mt-0 w-64 bg-white shadow-2xl transition-all duration-300 ${
                  individualOpen 
                    ? 'opacity-100 visible translate-y-0' 
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <div className="py-2">
                  {individualServices.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      onClick={() => setIndividualOpen(false)}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:text-[#8B7355] hover:bg-gray-50 transition-colors"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors duration-300">
              About us
            </Link>
            <Link to="/what-we-do" className="text-sm text-white/80 hover:text-white transition-colors duration-300">
              What we do
            </Link>
            <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors duration-300">
              Contact us
            </Link>
          </div>

          {/* Right Side - Auth */}
          <div className="hidden lg:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link to="/admin" className="text-sm text-white/80 hover:text-white transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Client Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl text-white"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-6 pt-6 border-t border-white/20 bg-black/80 backdrop-blur-lg rounded-lg p-6">
            <div className="flex flex-col gap-3">
              {/* Mobile Business Dropdown */}
              <div>
                <button
                  onClick={() => setMobileBusinessOpen(!mobileBusinessOpen)}
                  className="flex items-center justify-between w-full text-sm text-white/80 py-2 hover:text-white transition-colors"
                >
                  For business
                  <FiChevronDown className={`text-xs transition-transform ${mobileBusinessOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileBusinessOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {businessServices.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-white/60 hover:text-white py-1 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Individual Dropdown */}
              <div>
                <button
                  onClick={() => setMobileIndividualOpen(!mobileIndividualOpen)}
                  className="flex items-center justify-between w-full text-sm text-white/80 py-2 hover:text-white transition-colors"
                >
                  For individuals
                  <FiChevronDown className={`text-xs transition-transform ${mobileIndividualOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileIndividualOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {individualServices.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-sm text-white/60 hover:text-white py-1 transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/about" onClick={() => setIsOpen(false)} className="text-sm text-white/80 py-2 hover:text-white transition-colors">About us</Link>
              <Link to="/what-we-do" onClick={() => setIsOpen(false)} className="text-sm text-white/80 py-2 hover:text-white transition-colors">What we do</Link>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="text-sm text-white/80 py-2 hover:text-white transition-colors">Contact us</Link>
              
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full py-3 bg-white text-black text-sm uppercase tracking-wider hover:bg-gray-200 transition-all"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-white text-black text-sm uppercase tracking-wider hover:bg-gray-200 transition-all"
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