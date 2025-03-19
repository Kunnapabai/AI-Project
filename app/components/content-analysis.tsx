"use client"

interface ContentAnalysisProps {
  keyword: string
}

export function ContentAnalysis({ keyword }: ContentAnalysisProps) {
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
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1 text-center">Search Intent</p>
              <p className="text-2xl font-bold text-[#1a73e8] text-center">Transactional</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1 text-center">Content Intent</p>
              <p className="text-2xl font-bold text-[#1a73e8] text-center">Product</p>
            </div>
          </div>
        </div>

        {/* Entities - Improved layout */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">Entities</h3>
          <div className="flex flex-wrap gap-2">
            {entities.map((entity, index) => (
              <span key={index} className="px-3 py-1 bg-[#E8F0FE] text-[#1a73e8] rounded-full text-xs">
                {entity}
              </span>
            ))}
          </div>
        </div>

        {/* Structure & Content */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4 border-t border-gray-200 pt-4 text-center">
            Structure & Content
          </h3>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Main Content</h4>
              <p className="text-xs text-gray-600">
                Example2 delivers strategic digital marketing solutions for growing businesses. Our experienced team
                specializes in creating data-driven campaigns that increase visibility, drive qualified traffic, and
                convert visitors into customers with measurable ROI.
              </p>
            </div>

            <div>
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
                  <span className="text-gray-600">The Example2 Approach</span>
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
                  <strong className="text-gray-800">H3</strong> <span className="text-gray-600">Implementation</span>
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
                <li>Founded in 2015 by former Google employees.</li>
                <li>Specializes in data-driven marketing strategies.</li>
                <li>Team of 30+ specialists across 4 countries.</li>
                <li>Works primarily with SaaS and technology companies.</li>
                <li>Featured on TechCrunch and Marketing Land.</li>
                <li>Proprietary AI-powered content optimization tool.</li>
                <li>Average client retention of 2.5 years.</li>
                <li>ISO 27001 certified for information security.</li>
                <li>Partners with major marketing platforms like HubSpot and Semrush.</li>
                <li>Offers performance-based pricing models.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

