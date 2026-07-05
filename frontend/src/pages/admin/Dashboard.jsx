// pages/admin/Dashboard.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiPhone, FiBook, FiHeadphones, FiArrowRight, FiTrendingUp } from 'react-icons/fi'
import { dashboardAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, isAdmin } = useAuth()

  useEffect(() => {
    // Verify admin access
    if (!isAdmin) {
      window.location.href = '/'
      return
    }

    const fetchStats = async () => {
      try {
        const [statsRes, analyticsRes] = await Promise.allSettled([
          dashboardAPI.getStats(),
          dashboardAPI.getAnalytics()
        ])
        
        if (statsRes.status === 'fulfilled') {
          const data = statsRes.value.data
          setStats(data.data || data.stats || data)
        } else {
          // Fallback demo data
          setStats({
            totalContacts: 24,
            totalPodcasts: 12,
            totalBooks: 8,
            totalUsers: 5,
            contactsByStatus: {
              new: 8,
              'in-review': 6,
              contacted: 7,
              closed: 3
            },
            contactTrends: [
              { _id: 'Mon', count: 4 },
              { _id: 'Tue', count: 3 },
              { _id: 'Wed', count: 6 },
              { _id: 'Thu', count: 2 },
              { _id: 'Fri', count: 5 },
              { _id: 'Sat', count: 1 },
              { _id: 'Sun', count: 3 }
            ]
          })
        }
        
        if (analyticsRes.status === 'fulfilled') {
          console.log('Analytics loaded')
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error)
        toast.error('Could not load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [isAdmin])

  if (loading) return <LoadingSpinner />

  const statCards = [
    { 
      icon: FiPhone, 
      label: 'Total Contacts', 
      value: stats?.totalContacts || 0, 
      href: '/admin/contacts',
      color: 'border-l-[#C4956A]'
    },
    { 
      icon: FiHeadphones, 
      label: 'Podcasts', 
      value: stats?.totalPodcasts || 0, 
      href: '/admin/podcasts',
      color: 'border-l-[#8B7355]'
    },
    { 
      icon: FiBook, 
      label: 'Books', 
      value: stats?.totalBooks || 0, 
      href: '/admin/books',
      color: 'border-l-[#6B5A4E]'
    },
    { 
      icon: FiUsers, 
      label: 'Users', 
      value: stats?.totalUsers || 0, 
      href: '/admin/users',
      color: 'border-l-[#4A3728]'
    },
  ]

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-[#C4956A]" />
            <span className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
              Admin Panel
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-2" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Dashboard
              </h1>
              <p className="text-gray-500 font-light">
                Welcome back, {user?.name || 'Admin'}
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#1a1a1a] text-sm tracking-wider uppercase hover:text-[#C4956A] transition-colors"
            >
              View Site
              <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.href}
              className={`group bg-[#F8F6F3] border-l-4 ${stat.color} p-8 hover:bg-white hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <stat.icon className="text-2xl text-[#1a1a1a] group-hover:text-[#C4956A] transition-colors" />
                <FiTrendingUp className="text-green-600 text-sm" />
              </div>
              <h3 className="text-4xl lg:text-5xl text-[#1a1a1a] mb-2 font-light" 
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}
              </h3>
              <p className="text-gray-500 text-sm tracking-wider uppercase">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl lg:text-3xl text-[#1a1a1a] mb-8" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Manage Contacts', href: '/admin/contacts', desc: 'View and respond to client inquiries' },
              { label: 'Manage Podcasts', href: '/admin/podcasts', desc: 'Add and edit podcast episodes' },
              { label: 'Manage Books', href: '/admin/books', desc: 'Update your book collection' },
            ].map((action, index) => (
              <Link
                key={index}
                to={action.href}
                className="group border border-gray-200 p-8 hover:border-[#C4956A]/30 hover:bg-[#F8F6F3] transition-all duration-300"
              >
                <h3 className="text-xl text-[#1a1a1a] mb-2 group-hover:text-[#C4956A] transition-colors" 
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {action.label}
                </h3>
                <p className="text-gray-500 text-sm mb-4 font-light">{action.desc}</p>
                <span className="inline-flex items-center gap-2 text-[#1a1a1a] text-sm tracking-wider uppercase group-hover:gap-3 transition-all">
                  Access
                  <FiArrowRight className="text-sm" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard