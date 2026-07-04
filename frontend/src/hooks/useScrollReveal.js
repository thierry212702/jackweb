// hooks/useScrollReveal.js
import { useEffect, useRef } from 'react'

const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Optionally stop observing after reveal
            if (options.once !== false) {
              observer.unobserve(entry.target)
            }
          } else if (options.replay) {
            entry.target.classList.remove('visible')
          }
        })
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -50px 0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
      observer.disconnect()
    }
  }, [options.threshold, options.rootMargin, options.replay, options.once])

  return elementRef
}

export default useScrollReveal