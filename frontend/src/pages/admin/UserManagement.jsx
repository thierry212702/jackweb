import { useState, useEffect } from 'react'
import { FiEdit2, FiTrash2, FiX, FiUsers, FiShield, FiUser } from 'react-icons/fi'
import { adminAPI } from '../../services/api'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    isActive: true
  })

  const fetchUsers = async () => {
    try {
      const { data } = await adminAPI.getUsers()
      setUsers(data.data)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await adminAPI.updateUser(editingUser._id, formData)
      toast.success('User updated successfully')
      setShowModal(false)
      fetchUsers()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await adminAPI.deleteUser(id)
      toast.success('User deleted successfully')
      fetchUsers()
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    })
    setShowModal(true)
  }

  const inputClass = "w-full px-4 py-3 bg-dark-900/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 outline-none transition-all"

  if (loading) return <LoadingSpinner />

  return (
    <div className="bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-dark-400">Manage user accounts and permissions</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-dark-800/50 border border-primary-600/20 rounded-xl text-primary-400 font-semibold">
              {users.length} Users
            </span>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-4 text-dark-400 font-medium text-sm">User</th>
                  <th className="text-left p-4 text-dark-400 font-medium text-sm">Email</th>
                  <th className="text-left p-4 text-dark-400 font-medium text-sm">Role</th>
                  <th className="text-left p-4 text-dark-400 font-medium text-sm">Status</th>
                  <th className="text-left p-4 text-dark-400 font-medium text-sm">Joined</th>
                  <th className="text-right p-4 text-dark-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <FiUsers className="text-6xl text-dark-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">No users found</h3>
                      <p className="text-dark-400">Users will appear here after registration</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-dark-700/50 hover:bg-dark-700/20 transition-colors animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                            <FiUser className="text-white" />
                          </div>
                          <span className="text-white font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-dark-300">{user.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {user.role === 'admin' && <FiShield className="text-sm" />}
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                          user.isActive
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-4 text-dark-400 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-primary-400 hover:bg-primary-600/20 transition-all"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 bg-dark-700/50 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-600/20 transition-all"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-800 border border-primary-600/20 rounded-2xl p-8 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Edit User</h3>
              <button onClick={() => setShowModal(false)} className="text-dark-400 hover:text-white">
                <FiX className="text-2xl" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={inputClass}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded-lg border-dark-600 text-primary-600 focus:ring-primary-500 bg-dark-900"
                />
                <label className="text-dark-300">Active Account</label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement