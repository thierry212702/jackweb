import { Link } from 'react-router-dom'
import { FiLinkedin, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-primary-600/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="animate-fade-in-up">
            <h3 className="font-display text-2xl font-bold bg-gradient-to-r from-white to-primary-400 bg-clip-text text-transparent mb-4">
              Sarah Michelle
            </h3>
            <p className="text-dark-400 mb-6 leading-relaxed">
              Providing expert legal services with integrity and dedication. 
              Your trusted partner in navigating complex legal challenges.
            </p>
            <div className="flex gap-3">
              {[FiLinkedin, FiTwitter, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center text-dark-400 hover:text-primary-400 hover:bg-primary-600/10 transition-all transform hover:-translate-y-1"
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Podcasts', 'Books', 'Resources', 'Contact'].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-dark-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-white font-semibold mb-6">Practice Areas</h4>
            <ul className="space-y-3">
              {['Civil Litigation', 'Criminal Defense', 'Family Law', 'Corporate Law', 'Employment Law'].map((item, i) => (
                <li key={i} className="text-dark-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-white font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-dark-400">
                <FiMapPin className="text-primary-400 flex-shrink-0" />
                <span>123 Legal Street, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-dark-400">
                <FiPhone className="text-primary-400 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-dark-400">
                <FiMail className="text-primary-400 flex-shrink-0" />
                <span>info@sarahmichelle.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-600/10 mt-12 pt-8 text-center">
          <p className="text-dark-500 text-sm">
            &copy; 2024 Sarah Michelle Legal Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer