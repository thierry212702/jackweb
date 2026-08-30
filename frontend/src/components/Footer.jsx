// components/Footer.jsx
import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Quick Links */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-white/60 text-sm hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/60 text-sm hover:text-white transition-colors">About us</Link></li>
              <li><Link to="/what-we-do" className="text-white/60 text-sm hover:text-white transition-colors">What we do</Link></li>
              <li><Link to="/contact" className="text-white/60 text-sm hover:text-white transition-colors">Contact us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li><Link to="/businesses" className="text-white/60 text-sm hover:text-white transition-colors">For Business</Link></li>
              <li><Link to="/individuals" className="text-white/60 text-sm hover:text-white transition-colors">For Individuals</Link></li>
              <li><Link to="/podcasts" className="text-white/60 text-sm hover:text-white transition-colors">Podcasts</Link></li>
              <li><Link to="/books" className="text-white/60 text-sm hover:text-white transition-colors">Books</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
              Our Locations
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <FiMapPin className="text-[#C4956A] mt-1 flex-shrink-0" />
                Rubavu - Gisenyi
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-[#C4956A] mt-1 flex-shrink-0" />
                Kigali
              </li>
              <li className="flex items-start gap-2">
                <FiMapPin className="text-[#C4956A] mt-1 flex-shrink-0" />
                Musanze
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white/80 text-sm font-medium mb-6 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <a 
                  href="tel:0798822311" 
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <FiPhone className="text-[#C4956A] flex-shrink-0" />
                  0798822311
                </a>
              </li>
              <li>
                <a 
                  href="mailto:niyonsabajaquesgentil2004@gmail.com" 
                  className="flex items-start gap-2 hover:text-white transition-colors break-all"
                >
                  <FiMail className="text-[#C4956A] mt-1 flex-shrink-0" />
                  jaquesgentil2004@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Centered Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} JACK GENTIL Legal Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer