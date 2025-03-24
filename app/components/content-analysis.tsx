"use client"

import { useState, useEffect } from "react"

interface ContentAnalysisProps {
  keyword: string
}

export function ContentAnalysis({ keyword }: ContentAnalysisProps) {
  // Default values for title and description
  const defaultTitle = `${keyword} - Professional Treatment Options`
  const defaultDescription = `Learn about professional ${keyword} treatment options. Our experienced team provides safe and effective solutions for achieving your desired results. Schedule a consultation today!`

  // State for title and description
  const [title, setTitle] = useState(defaultTitle)
  const [description, setDescription] = useState(defaultDescription)

  // State for character counts and pixel estimates
  const [titleStats, setTitleStats] = useState({ chars: 0, maxChars: 60, pixels: 0, maxPixels: 580 })
  const [descStats, setDescStats] = useState({ chars: 0, maxChars: 160, pixels: 0, maxPixels: 920 })

  // Calculate stats when title or description changes
  useEffect(() => {
    // Estimate pixels (this is a rough estimate - in a real app you'd use more precise calculations)
    const titlePixels = Math.round(title.length * 9)
    const descPixels = Math.round(description.length * 5.75)

    setTitleStats({
      chars: title.length,
      maxChars: 60,
      pixels: titlePixels,
      maxPixels: 580,
    })

    setDescStats({
      chars: description.length,
      maxChars: 160,
      pixels: descPixels,
      maxPixels: 920,
    })
  }, [title, description])

  // Calculate progress percentages
  const titleProgress = Math.min((titleStats.chars / titleStats.maxChars) * 100, 100)
  const descProgress = Math.min((descStats.chars / descStats.maxChars) * 100, 100)

  // Determine if counts are over the limit
  const isTitleOverLimit = titleStats.chars > titleStats.maxChars
  const isDescOverLimit = descStats.chars > descStats.maxChars

  return (
    <div className="h-full overflow-auto p-6">
      <div className="space-y-8">
        {/* Content Score - Centered */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Content Score</p>
          <div className="relative w-32 h-32 mb-6">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circle */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
              {/* Progress circle - using orange color from image */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#FFA726"
                strokeWidth="12"
                strokeDasharray={`${65 * 2.51} 251`}
                strokeDashoffset="0"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-[#FFA726]">65</span>
            </div>
          </div>

          {/* Word Count and Image Count below Content Score */}
          <div className="grid grid-cols-2 gap-12 w-full max-w-md">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Word Count</p>
              <p className="text-4xl font-bold text-[#1a73e8]">1,200</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Image Count</p>
              <p className="text-4xl font-bold text-[#1a73e8]">0</p>
            </div>
          </div>
        </div>

        {/* Intent */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">Intent</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1 text-center">Search Intent</p>
              <p className="text-base font-bold text-[#1a73e8] text-center">Transactional</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1 text-center">Content Intent</p>
              <p className="text-base font-bold text-[#1a73e8] text-center">Product</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1 text-center">Content Type</p>
              <p className="text-base font-bold text-[#1a73e8] text-center">Article</p>
            </div>
          </div>
        </div>

        {/* Readability */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Readability
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Background circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#4CAF50"
                  strokeWidth="12"
                  strokeDasharray={`${78 * 2.51} 251`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-bold text-[#4CAF50]">78</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">Flesch Reading Ease Score</p>
            <p className="text-sm font-medium text-gray-800 text-center mt-2">Fairly Easy to Read</p>
          </div>
        </div>

        {/* Title & Description - New section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Title & Description
          </h3>

          {/* Title */}
          <div className="mb-6 bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">Title</p>
              <div className="flex items-center">
                <span className={`text-xs ${isTitleOverLimit ? "text-red-500 font-medium" : "text-gray-500"}`}>
                  {titleStats.chars}/{titleStats.maxChars} ({titleStats.pixels}px / {titleStats.maxPixels}px)
                </span>
                <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isTitleOverLimit ? "bg-red-500" : "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    }`}
                    style={{ width: `${titleProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md bg-white">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This is what will appear in the first line when this post shows up in the search results.
            </p>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">Description</p>
              <div className="flex items-center">
                <span className={`text-xs ${isDescOverLimit ? "text-red-500 font-medium" : "text-gray-500"}`}>
                  {descStats.chars}/{descStats.maxChars} ({descStats.pixels}px / {descStats.maxPixels}px)
                </span>
                <div className="ml-2 w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isDescOverLimit ? "bg-red-500" : "bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                    }`}
                    style={{ width: `${descProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="border border-gray-300 rounded-md bg-white">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md min-h-[80px] resize-y"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This is what will appear as the description when this post shows up in the search results.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

