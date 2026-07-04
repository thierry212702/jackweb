// components/ErrorMessage.jsx
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="font-display text-2xl text-charcoal mb-4">Something went wrong</p>
      <p className="text-taupe mb-8 max-w-md font-light">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-3 border border-gold text-gold tracking-wider uppercase text-sm hover:bg-gold hover:text-white transition-all duration-500"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage