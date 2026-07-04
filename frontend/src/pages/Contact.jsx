// pages/Contact.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { contactAPI } from '../services/api'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await contactAPI.submit(data)
      toast.success('Thank you for your enquiry. We will be in touch shortly.')
      reset()
    } catch (error) {
      toast.error('Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-0 py-4 bg-transparent border-b border-border-light text-charcoal placeholder-taupe focus:border-gold outline-none transition-all duration-500 font-light"

  return (
    <div>
      {/* Header */}
      <section className="bg-cream py-32">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16 text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">Contact</p>
          <h1 className="font-display text-5xl lg:text-7xl text-charcoal font-light mb-6">
            Enquire
          </h1>
          <p className="text-taupe text-lg max-w-xl mx-auto font-light">
            We look forward to hearing from you and discussing how we may be of service.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Contact Information */}
            <div className="animate-slide-left">
              <h2 className="font-display text-3xl text-charcoal mb-8">
                Our Offices
              </h2>
              
              <div className="space-y-12">
                <div>
                  <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">New York</p>
                  <p className="text-taupe leading-relaxed">
                    123 Legal Street<br />
                    New York, NY 10001
                  </p>
                </div>
                
                <div>
                  <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Contact</p>
                  <p className="text-taupe mb-2">
                    <a href="tel:+15551234567" className="hover:text-gold transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </p>
                  <p className="text-taupe">
                    <a href="mailto:info@sarahmichelle.com" className="hover:text-gold transition-colors">
                      info@sarahmichelle.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">Hours</p>
                  <p className="text-taupe leading-relaxed">
                    Monday – Friday<br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="animate-fade-up">
              <h2 className="font-display text-3xl text-charcoal mb-12">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className={inputClass}
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="text-rose text-xs mt-2">Please enter your name</p>}
                </div>

                <div>
                  <input
                    type="email"
                    {...register('email', { 
                      required: true,
                      pattern: /^\S+@\S+$/i 
                    })}
                    className={inputClass}
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="text-rose text-xs mt-2">Please enter a valid email</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    {...register('phone')}
                    className={inputClass}
                    placeholder="Phone Number"
                  />
                </div>

                <div>
                  <select {...register('caseType')} className={inputClass}>
                    <option value="">Area of Interest</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="family">Family Law</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="employment">Employment Law</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <textarea
                    {...register('message', { required: true, minLength: 10 })}
                    className={`${inputClass} resize-none`}
                    rows="1"
                    placeholder="Your Message"
                    onInput={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = e.target.scrollHeight + 'px'
                    }}
                  />
                  {errors.message && <p className="text-rose text-xs mt-2">Please tell us about your enquiry</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gold text-white tracking-[0.2em] uppercase text-sm hover:bg-gold-dark disabled:opacity-50 transition-all duration-500"
                >
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact