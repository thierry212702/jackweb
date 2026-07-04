// components/Footer.jsx
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#4A3728] text-white mt-auto">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-5">
              <h3 className="text-2xl text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Sarah Michelle
              </h3>
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase">
                Legal Services
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
              Providing distinguished legal counsel with integrity, 
              precision, and unwavering dedication to our clients' success.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Podcasts', path: '/podcasts' },
                { label: 'Books', path: '/books' },
                { label: 'Resources', path: '/resources' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-white/40 text-sm hover:text-white transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'For Businesses', path: '/businesses' },
                { label: 'For Individuals', path: '/individuals' },
                { label: 'Civil Litigation', path: '/individuals' },
                { label: 'Family Law', path: '/individuals' },
                { label: 'Corporate Law', path: '/businesses' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-white/40 text-sm hover:text-white transition-colors duration-300 font-light"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white/70 text-xs tracking-[0.2em] uppercase mb-5 font-medium">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-white/40 text-sm font-light">
              <li>123 Legal Street</li>
              <li>New York, NY 10001</li>
              <li className="pt-1">
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-white transition-colors duration-300"
                >
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@sarahmichelle.com" 
                  className="hover:text-white transition-colors duration-300"
                >
                  info@sarahmichelle.com
                </a>
              </li>
              <li className="text-white/30 text-xs">
                Mon–Fri: 9:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/30 text-xs font-light">
              &copy; 2024 Sarah Michelle Legal Services. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors font-light">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer