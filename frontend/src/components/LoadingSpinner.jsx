// components/LoadingSpinner.jsx
const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 border-2 border-gold/20 rounded-full" />
        <div className="absolute top-0 left-0 w-12 h-12 border-2 border-transparent border-t-gold rounded-full animate-spin" 
          style={{ animationDuration: '1.5s' }} 
        />
      </div>
    </div>
  )
}

export default LoadingSpinner