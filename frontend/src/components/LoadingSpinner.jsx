const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-primary-600/20 animate-spin-slow" />
        <div className="absolute inset-2 rounded-full border-4 border-t-primary-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-4 rounded-full border-4 border-t-primary-400 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse' }} />
      </div>
      <p className="text-primary-400 font-medium animate-pulse">Loading...</p>
    </div>
  )
}

export default LoadingSpinner