// components/Footer.jsx
import { Link } from 'react-router-dom'
import { FiPhone } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <ul className="space-y-3">
                <li><Link to="/businesses" className="text-white/60 text-sm hover:text-white transition-colors">For business</Link></li>
                <li><Link to="/individuals" className="text-white/60 text-sm hover:text-white transition-colors">For individuals</Link></li>
                <li><Link to="/about" className="text-white/60 text-sm hover:text-white transition-colors">About us</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3">
                <li><Link to="/what-we-do" className="text-white/60 text-sm hover:text-white transition-colors">What we do</Link></li>
                <li><Link to="/news" className="text-white/60 text-sm hover:text-white transition-colors">News</Link></li>
                <li><Link to="/contact" className="text-white/60 text-sm hover:text-white transition-colors">Contact us</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white/80 text-sm font-medium mb-4">Registered Office</h4>
            <address className="text-white/50 text-sm not-italic leading-relaxed mb-4">
              Imperial Buildings,<br />
              72 High Street, Belfast BT1 2BE
            </address>
            <a 
              href="tel:+442890243126" 
              className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
            >
              <FiPhone className="text-sm" />
              +44 (0)28 9024 3126
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-white/30 text-xs leading-relaxed">
            Sarah Michelle Legal Services is the trading name of Sarah Michelle Ltd a limited 
            liability company registered in Northern Ireland under number NI701564 whose 
            registered office is stated above.
          </p>
          <p className="text-white/20 text-xs mt-4">
            &copy; {new Date().getFullYear()} Sarah Michelle Legal Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer