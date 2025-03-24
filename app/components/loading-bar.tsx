"use client"

import { useEffect, useState } from "react"

export function LoadingBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start with a quick initial progress to show responsiveness
    setProgress(10)

    // Simulate loading progress
    const timer1 = setTimeout(() => setProgress(25), 300)
    const timer2 = setTimeout(() => setProgress(40), 600)
    const timer3 = setTimeout(() => setProgress(60), 1000)
    const timer4 = setTimeout(() => setProgress(80), 1500)
    const timer5 = setTimeout(() => setProgress(95), 2000)
    const timer6 = setTimeout(() => setProgress(100), 2500)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-[#4285f4] transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-4 text-sm text-gray-600 font-medium">{progress}% Loading...</p>
    </div>
  )
}

