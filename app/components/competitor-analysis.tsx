"use client"

import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { useState } from "react"

interface CompetitorAnalysisProps {
  keyword: string
}

export function CompetitorAnalysis({ keyword }: CompetitorAnalysisProps) {
  const [expandedSites, setExpandedSites] = useState<number[]>([1])

  const toggleSite = (index: number) => {
    setExpandedSites((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  // Top websites
  const websites = [
    { id: 1, url: "www.website01.com", score: 82 },
    { id: 2, url: "www.website02.com", score: 85 },
    { id: 3, url: "www.website03.com", score: 78 },
    { id: 4, url: "www.website04.com", score: 80 },
    { id: 5, url: "www.website05.com", score: 72 },
    { id: 6, url: "www.website06.com", score: 75 },
    { id: 7, url: "www.website07.com", score: 68 },
    { id: 8, url: "www.website08.com", score: 81 },
    { id: 9, url: "www.website09.com", score: 79 },
    { id: 10, url: "www.website10.com", score: 66 },
  ]

  // Top entities
  const entities = [
    "digital marketing",
    "SEO",
    "content strategy",
    "social media",
    "PPC",
    "conversion rate",
    "analytics",
    "website traffic",
    "lead generation",
    "ROI",
    "brand awareness",
    "email marketing",
    "target audience",
    "keyword research",
    "Google Ads",
    "Facebook Ads",
    "landing pages",
    "content marketing",
    "copywriting",
    "marketing strategy",
  ]

  // Function to create pie chart segments
  const createPieSegment = (startAngle: number, endAngle: number, color: string) => {
    const startRad = ((startAngle - 90) * Math.PI) / 180
    const endRad = ((endAngle - 90) * Math.PI) / 180

    const x1 = 50 + 40 * Math.cos(startRad)
    const y1 = 50 + 40 * Math.sin(startRad)
    const x2 = 50 + 40 * Math.cos(endRad)
    const y2 = 50 + 40 * Math.sin(endRad)

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    return <path d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} fill={color} />
  }

  return (
    <div className="h-full overflow-auto p-6">
      <div className="space-y-8">
        {/* Content Score and Word Count - Updated layout */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Average Content Score</p>
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
              <p className="text-sm text-gray-600 mb-1">Word Count Range</p>
              <p className="text-2xl font-bold text-[#1a73e8]">1,100 - 1,300</p>
              <p className="text-sm text-gray-600">
                Average: <span className="text-gray-800">1,200 words</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Image Count Range</p>
              <p className="text-2xl font-bold text-[#1a73e8]">5 - 15</p>
              <p className="text-sm text-gray-600">
                Average: <span className="text-gray-800">8 images</span>
              </p>
            </div>
          </div>
        </div>

        {/* Intent Analysis */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Intent Analysis
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2 text-center">Search Intent</p>
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="#f5f5f5" />

                  {/* Transactional - green (90%) */}
                  {createPieSegment(0, 324, "#4CAF50")}

                  {/* Informational - blue (10%) */}
                  {createPieSegment(324, 360, "#2196F3")}
                </svg>
              </div>
              <div className="flex flex-col items-center mt-2 text-xs">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#4CAF50] rounded-full mr-1"></span>
                  <span className="text-[#4CAF50]">Transactional: 90%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#2196F3] rounded-full mr-1"></span>
                  <span className="text-[#2196F3]">Informational: 10%</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2 text-center">Content Intent</p>
              <div className="relative w-32 h-32 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="#f5f5f5" />

                  {/* Product - orange (65%) */}
                  {createPieSegment(0, 234, "#FFA726")}

                  {/* Service - purple (25%) */}
                  {createPieSegment(234, 324, "#7B1FA2")}

                  {/* Blog - blue (10%) */}
                  {createPieSegment(324, 360, "#2196F3")}
                </svg>
              </div>
              <div className="flex flex-col items-center mt-2 text-xs">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#FFA726] rounded-full mr-1"></span>
                  <span className="text-[#FFA726]">Product: 65%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#7B1FA2] rounded-full mr-1"></span>
                  <span className="text-[#7B1FA2]">Service: 25%</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-[#2196F3] rounded-full mr-1"></span>
                  <span className="text-[#2196F3]">Blog: 10%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Entities */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Top 20 Entities
          </h3>
          <div className="flex flex-wrap gap-2">
            {entities.map((entity, index) => (
              <span key={index} className="px-3 py-1 bg-[#E8F0FE] text-[#1a73e8] rounded-full text-xs">
                {entity}
              </span>
            ))}
          </div>
        </div>

        {/* Top Ranking Websites */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Top 10 Ranking Websites
          </h3>
          <div className="space-y-2">
            {websites.map((site) => (
              <div key={site.id} className="border border-gray-200 rounded-md overflow-hidden">
                <div
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleSite(site.id)}
                >
                  <div className="flex items-center">
                    {expandedSites.includes(site.id) ? (
                      <ChevronDown className="h-4 w-4 text-gray-500 mr-2" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500 mr-2" />
                    )}
                    <span className="font-medium">#{site.id}</span>
                    <span className="ml-2 text-gray-600">{site.url}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs bg-[#E8F0FE] text-[#1a73e8] px-2 py-0.5 rounded">
                      Score: {site.score}/100
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 ml-2" />
                  </div>
                </div>

                {expandedSites.includes(site.id) && (
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Main Content</h4>
                      <p className="text-xs text-gray-600">
                        Example2 delivers strategic digital marketing solutions for growing businesses. Our experienced
                        team specializes in creating data-driven campaigns that increase visibility, drive qualified
                        traffic, and convert visitors into customers with measurable ROI.
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Headings Structure</h4>
                      <div className="space-y-1 text-xs">
                        <p>
                          <strong className="text-gray-800">H1</strong>{" "}
                          <span className="text-gray-600">Data-Driven Digital Marketing Agency</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H2</strong>{" "}
                          <span className="text-gray-600">Our Marketing Services</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H2</strong>{" "}
                          <span className="text-gray-600">Our Unique Approach</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H3</strong>{" "}
                          <span className="text-gray-600">Research & Analysis</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H3</strong>{" "}
                          <span className="text-gray-600">Strategy Development</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H3</strong>{" "}
                          <span className="text-gray-600">Implementation</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H2</strong>{" "}
                          <span className="text-gray-600">Our Technology Stack</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H2</strong>{" "}
                          <span className="text-gray-600">Client Success Stories</span>
                        </p>
                        <p>
                          <strong className="text-gray-800">H2</strong>{" "}
                          <span className="text-gray-600">Start Your Growth Journey</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Facts</h4>
                      <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                        <li>Founded in 2016 by former Google employees.</li>
                        <li>Specializes in data-driven marketing strategies.</li>
                        <li>Team of 30+ specialists across 6 countries.</li>
                        <li>Works primarily with SaaS and technology companies.</li>
                        <li>Maintains a 95% client retention rate.</li>
                        <li>Proprietary AI-powered content optimization tool.</li>
                        <li>Average client retention of 2.5 years.</li>
                        <li>Certified Google and Meta marketing agency.</li>
                        <li>Partners with major marketing platforms like HubSpot and Semrush.</li>
                        <li>Offers performance-based pricing models.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

