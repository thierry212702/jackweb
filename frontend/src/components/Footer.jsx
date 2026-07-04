// components/Footer.jsx
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-soft-black text-cream">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20">
          {/* Brand */}
          <div className="animate-fade-up">
            <h3 className="font-display text-2xl text-white mb-6">
              Sarah Michelle
            </h3>
            <p className="text-taupe leading-relaxed mb-8 text-sm">
              Providing distinguished legal counsel with integrity, 
              precision, and unwavering dedication to our clients' success.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Podcasts', 'Books', 'Resources', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-taupe hover:text-gold transition-colors text-sm tracking-wider"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-8">Expertise</h4>
            <ul className="space-y-4">
              {['Civil Litigation', 'Criminal Defense', 'Family Law', 'Corporate Law', 'Employment Law'].map((item) => (
                <li key={item} className="text-taupe text-sm tracking-wider">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-white text-sm tracking-[0.2em] uppercase mb-8">Connect</h4>
            <ul className="space-y-4 text-sm text-taupe">
              <li>123 Legal Street</li>
              <li>New York, NY 10001</li>
              <li className="pt-4">
                <a href="tel:+15551234567" className="hover:text-gold transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:info@sarahmichelle.com" className="hover:text-gold transition-colors">
                  info@sarahmichelle.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-taupe text-xs tracking-wider">
              &copy; 2024 Sarah Michelle Legal Services. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-taupe hover:text-gold text-xs tracking-wider transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-taupe hover:text-gold text-xs tracking-wider transition-colors">
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