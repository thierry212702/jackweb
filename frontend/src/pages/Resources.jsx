// pages/Resources.jsx (Enhanced)
import { useState } from 'react'
import { FiDownload, FiArrowRight, FiMail } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Resources = () => {
  const [email, setEmail] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const resources = [
    {
      id: 1,
      title: "Case Preparation Workbook",
      description: "A comprehensive guide to help you organize your thoughts and documents before meeting with your lawyer.",
      type: "Workbook",
      category: "preparation",
      pages: "24 pages"
    },
    {
      id: 2,
      title: "Understanding Your Rights",
      description: "Clear explanations of fundamental legal rights every citizen should know.",
      type: "Guide",
      category: "education",
      pages: "18 pages"
    },
    {
      id: 3,
      title: "Family Law Mediation Checklist",
      description: "Essential items to consider when preparing for family law mediation.",
      type: "Checklist",
      category: "family",
      pages: "12 pages"
    },
    {
      id: 4,
      title: "Business Contract Essentials",
      description: "Key elements every business owner should look for in contracts.",
      type: "Guide",
      category: "business",
      pages: "30 pages"
    },
    {
      id: 5,
      title: "Court Appearance Preparation",
      description: "What to expect and how to prepare for your day in court.",
      type: "Guide",
      category: "preparation",
      pages: "15 pages"
    },
    {
      id: 6,
      title: "Estate Planning Starter Kit",
      description: "Begin organizing your estate with this introductory workbook.",
      type: "Workbook",
      category: "estate",
      pages: "28 pages"
    },
  ]

  const categories = [
    { value: 'all', label: 'All Resources' },
    { value: 'preparation', label: 'Case Preparation' },
    { value: 'education', label: 'Legal Education' },
    { value: 'family', label: 'Family Law' },
    { value: 'business', label: 'Business' },
    { value: 'estate', label: 'Estate Planning' },
  ]

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeCategory)

  const handleDownload = (resource) => {
    toast.success(`"${resource.title}" download will begin shortly. Check your email.`)
  }

  return (
    <div>
      {/* Header */}
      <section className="bg-cream py-32">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Resources</p>
          <h1 className="font-display text-5xl lg:text-7xl text-charcoal font-light mb-6">
            Free Legal Resources
          </h1>
          <p className="text-taupe text-lg max-w-2xl mx-auto font-light leading-relaxed">
            We believe in empowering our clients with knowledge. Browse our collection 
            of free guides, checklists, and workbooks.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-warm-white border-b border-border-light">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-6 py-3 text-sm tracking-wider uppercase transition-all duration-500 ${
                  activeCategory === cat.value
                    ? 'bg-gold text-white'
                    : 'border border-border-light text-taupe hover:border-gold hover:text-gold'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className="group bg-white p-10 border border-border-light hover:border-gold/30 hover:shadow-elegant transition-all duration-500 flex flex-col animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gold text-xs tracking-[0.2em] uppercase">
                    {resource.type}
                  </span>
                  <span className="text-taupe text-xs">
                    {resource.pages}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {resource.title}
                </h3>
                
                <p className="text-taupe text-sm leading-relaxed mb-8 flex-grow font-light">
                  {resource.description}
                </p>
                
                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full inline-flex items-center justify-center gap-3 py-4 border border-gold text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-all duration-500"
                >
                  <FiDownload className="text-sm" />
                  Download Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            <FiMail className="text-gold text-4xl mx-auto mb-6" />
            <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
              Get resources delivered
            </h2>
            <p className="text-taupe mb-8 font-light">
              Join our mailing list to receive new resources, legal insights, and updates directly to your inbox.
            </p>
            
            <form className="flex gap-4 max-w-md mx-auto" onSubmit={(e) => {
              e.preventDefault()
              toast.success('Thank you for subscribing!')
              setEmail('')
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-transparent border border-white/20 text-white placeholder-taupe focus:border-gold outline-none transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Personal Help CTA */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <h2 className="font-display text-3xl text-charcoal mb-4">
            Need something more specific?
          </h2>
          <p className="text-taupe max-w-lg mx-auto mb-8 font-light">
            Every situation is unique. Schedule a consultation for personalized guidance tailored to your needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gold text-white tracking-wider uppercase text-sm hover:bg-gold-dark transition-all duration-500"
          >
            Speak With Us
            <FiArrowRight />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Resources