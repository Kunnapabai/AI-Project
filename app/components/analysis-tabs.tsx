"use client"

import { useState } from "react"
import { CompetitorAnalysis } from "./competitor-analysis"
import { ContentAnalysis } from "./content-analysis"

interface AnalysisTabsProps {
  keyword: string
  initialTab?: "competitor" | "content"
  showContentTab?: boolean
}

export function AnalysisTabs({ keyword, initialTab = "competitor", showContentTab = true }: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState<"competitor" | "content">(initialTab)

  // If content tab shouldn't be shown, force competitor tab
  if (!showContentTab && activeTab === "content") {
    setActiveTab("competitor")
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation - only show if content tab should be visible */}
      {showContentTab && (
        <div className="flex w-full border-b">
          <button
            className={`flex-1 px-6 py-3 text-lg font-medium ${
              activeTab === "competitor"
                ? "text-[#1a73e8] border-b-2 border-[#1a73e8]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("competitor")}
          >
            Competitor Analysis
          </button>
          <button
            className={`flex-1 px-6 py-3 text-lg font-medium ${
              activeTab === "content"
                ? "text-[#1a73e8] border-b-2 border-[#1a73e8]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("content")}
          >
            Content Analysis
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "competitor" || !showContentTab ? (
          <CompetitorAnalysis keyword={keyword} />
        ) : (
          <ContentAnalysis keyword={keyword} />
        )}
      </div>
    </div>
  )
}

