import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
        <FiAlertCircle className="text-4xl text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
      <p className="text-dark-400 mb-6 max-w-md">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-xl text-white font-semibold transition-all"
        >
          <FiRefreshCw /> Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage