import { FiDownload, FiFile, FiFileText } from 'react-icons/fi'

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: "2024 Case Strategy Kit",
      description: "Complete workbook for organizing your legal case with step-by-step guidance",
      type: "PDF",
      icon: FiFileText,
      color: "from-red-600 to-red-700"
    },
    {
      id: 2,
      title: "Evidence Log Template",
      description: "Professional template for tracking and organizing evidence",
      type: "Excel",
      icon: FiFile,
      color: "from-green-600 to-green-700"
    },
    {
      id: 3,
      title: "Legal Terms Glossary",
      description: "Comprehensive glossary of common legal terms and definitions",
      type: "PDF",
      icon: FiFileText,
      color: "from-blue-600 to-blue-700"
    },
    {
      id: 4,
      title: "Court Preparation Checklist",
      description: "Everything you need to prepare for your court appearance",
      type: "PDF",
      icon: FiFileText,
      color: "from-purple-600 to-purple-700"
    },
    {
      id: 5,
      title: "Witness Interview Guide",
      description: "Professional guide for conducting effective witness interviews",
      type: "PDF",
      icon: FiFileText,
      color: "from-orange-600 to-orange-700"
    },
    {
      id: 6,
      title: "Settlement Calculator",
      description: "Excel tool to help estimate potential settlement values",
      type: "Excel",
      icon: FiFile,
      color: "from-teal-600 to-teal-700"
    }
  ]

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-dark-900 to-dark-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4 animate-fade-in-up">
            Free Legal Resources
          </h1>
          <p className="text-dark-400 text-lg animate-fade-in-up max-w-2xl mx-auto">
            Download templates, guides, and tools to help with your legal journey
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div
                key={resource.id}
                className="group bg-dark-800/30 backdrop-blur-sm border border-primary-600/10 rounded-2xl p-6 hover:border-primary-600/30 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <resource.icon className="text-xl text-white" />
                  </div>
                  <span className="px-3 py-1 bg-dark-700/50 text-dark-400 rounded-lg text-xs font-medium">
                    {resource.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {resource.title}
                </h3>
                <p className="text-dark-400 mb-6 leading-relaxed">
                  {resource.description}
                </p>
                
                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold hover:shadow-lg transition-all">
                  <FiDownload /> Download Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-6">
            Need More Help?
          </h2>
          <p className="text-dark-400 text-lg mb-8">
            Our resources are designed to help you understand the legal process, 
            but every case is unique. Schedule a consultation for personalized guidance.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-white font-semibold text-lg hover:shadow-xl transition-all"
          >
            Get Free Consultation
          </a>
        </div>
      </section>
    </div>
  )
}

export default Resources