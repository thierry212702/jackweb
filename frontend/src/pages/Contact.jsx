import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiSend, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { contactAPI } from '../services/api'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await contactAPI.submit(data)
      toast.success('Your message has been sent successfully!')
      reset()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: FiMapPin, title: 'Address', info: '123 Legal Street, New York, NY 10001' },
    { icon: FiPhone, title: 'Phone', info: '(555) 123-4567' },
    { icon: FiMail, title: 'Email', info: 'info@sarahmichelle.com' },
    { icon: FiClock, title: 'Hours', info: 'Mon-Fri: 9:00 AM - 6:00 PM' },
  ]

  const inputClass = "w-full px-4 py-3 bg-dark-800/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
  const errorClass = "text-red-400 text-sm mt-1"

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Get In Touch
          </h1>
          <p className="text-dark-400 text-lg animate-fade-in-up">
            Schedule your free consultation today
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-slide-in-left">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Contact Information
              </h2>
              <p className="text-dark-400 mb-8 leading-relaxed">
                Reach out to us for expert legal guidance. We're here to help you navigate your legal challenges.
              </p>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-dark-800/30 rounded-xl border border-primary-600/10 hover:border-primary-600/30 transition-all">
                    <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-xl text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-dark-400">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-in-right">
              <div className="bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-white mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className={inputClass}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                      })}
                      className={inputClass}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      {...register('phone')}
                      className={inputClass}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Case Type</label>
                    <select {...register('caseType')} className={inputClass}>
                      <option value="">Select case type</option>
                      <option value="civil">Civil Litigation</option>
                      <option value="criminal">Criminal Defense</option>
                      <option value="family">Family Law</option>
                      <option value="corporate">Corporate Law</option>
                      <option value="employment">Employment Law</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Urgency Level</label>
                    <select {...register('urgency')} defaultValue="medium" className={inputClass}>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Message *</label>
                    <textarea
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                      })}
                      className={`${inputClass} resize-none`}
                      rows="5"
                      placeholder="Describe your legal issue..."
                    />
                    {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      'Sending...'
                    ) : (
                      <>
                        <FiSend /> Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact