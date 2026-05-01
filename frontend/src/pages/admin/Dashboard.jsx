import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiPhone, FiBook, FiHeadphones, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
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
    { 
      icon: FiPhone, 
      label: 'Total Contacts', 
      value: stats?.totalContacts || 0, 
      change: '+12%',
      color: 'from-blue-600 to-blue-700' 
    },
    { 
      icon: FiHeadphones, 
      label: 'Podcasts', 
      value: stats?.totalPodcasts || 0, 
      change: '+5%',
      color: 'from-purple-600 to-purple-700' 
    },
    { 
      icon: FiBook, 
      label: 'Books', 
      value: stats?.totalBooks || 0, 
      change: '+8%',
      color: 'from-green-600 to-green-700' 
    },
    { 
      icon: FiUsers, 
      label: 'Users', 
      value: stats?.totalUsers || 0, 
      change: '+15%',
      color: 'from-orange-600 to-orange-700' 
    },
  ]

  const statusData = stats?.contactsByStatus 
    ? Object.entries(stats.contactsByStatus).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value
      }))
    : []

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']

  const trendData = stats?.contactTrends || []

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-dark-400">Overview of your legal practice</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="text-xl text-white" />
                </div>
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <FiTrendingUp className="text-sm" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-dark-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Trends Chart */}
          <div className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Trends (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="_id" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution Chart */}
          <div className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4">
              {statusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-dark-400">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Link
            to="/admin/contacts"
            className="bg-dark-800/30 border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all group"
          >
            <FiPhone className="text-3xl text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Manage Contacts</h3>
            <p className="text-dark-400 text-sm">View and respond to client inquiries</p>
          </Link>
          <Link
            to="/admin/podcasts"
            className="bg-dark-800/30 border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all group"
          >
            <FiHeadphones className="text-3xl text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Manage Podcasts</h3>
            <p className="text-dark-400 text-sm">Add and edit podcast episodes</p>
          </Link>
          <Link
            to="/admin/books"
            className="bg-dark-800/30 border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all group"
          >
            <FiBook className="text-3xl text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Manage Books</h3>
            <p className="text-dark-400 text-sm">Update your book collection</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard