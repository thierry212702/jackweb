// pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { dashboardAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await dashboardAPI.getStats()
        setStats(data.data)
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) return <LoadingSpinner />

  const statCards = [
    { label: 'Enquiries', value: stats?.totalContacts || 0, href: '/admin/contacts' },
    { label: 'Podcasts', value: stats?.totalPodcasts || 0, href: '/admin/podcasts' },
    { label: 'Books', value: stats?.totalBooks || 0, href: '/admin/books' },
    { label: 'Users', value: stats?.totalUsers || 0, href: '/admin/users' },
  ]

  return (
    <div className="bg-warm-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Admin</p>
          <h1 className="font-display text-4xl lg:text-5xl text-charcoal">
            Dashboard
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.href}
              className="group bg-white p-8 border border-border-light hover:border-gold/30 hover:shadow-elegant transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-taupe text-sm tracking-wider uppercase mb-4">{stat.label}</p>
              <p className="font-display text-5xl text-charcoal group-hover:text-gold transition-colors mb-4">
                {stat.value}
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-sm tracking-wider uppercase">
                Manage
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: 'Contact Enquiries', href: '/admin/contacts', desc: 'View and manage client messages' },
            { label: 'Podcast Episodes', href: '/admin/podcasts', desc: 'Add and edit podcast content' },
            { label: 'Book Collection', href: '/admin/books', desc: 'Manage your published works' },
          ].map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="group border border-border-light p-8 hover:border-gold/30 transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <h3 className="font-display text-xl text-charcoal mb-2 group-hover:text-gold transition-colors">
                {link.label}
              </h3>
              <p className="text-taupe text-sm mb-4">{link.desc}</p>
              <span className="text-gold text-sm tracking-wider uppercase inline-flex items-center gap-2">
                View
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard