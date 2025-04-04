"use client"

import { EditArticleForm } from "@/app/components/edit-article-form"
import { CompetitorAnalysis } from "@/app/components/competitor-analysis"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams, useParams } from "next/navigation"

export default function EditArticlePage() {
  const params = useParams() as { keyword: string } // ✅ ใช้ useParams() แทน
  const decodedKeyword = decodeURIComponent(params.keyword)
  const searchParams = useSearchParams()
  const [showCompetitorAnalysis, setShowCompetitorAnalysis] = useState(false)

  // ตรวจสอบว่ามี showAnalysis ใน URL หรือไม่
  useEffect(() => {
    if (searchParams.get("showAnalysis") === "true") {
      setShowCompetitorAnalysis(true)
    }
  }, [searchParams])

  return (
    <div className="flex-1 overflow-auto">
      {/* Breadcrumb */}
      <div className="px-6 py-4">
        <div className="flex items-center text-sm">
          <Link href="/" className="text-[#1a73e8] hover:text-[#1557b0]">
            Projects
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
          <Link href="/dental-clinic" className="text-[#1a73e8] hover:text-[#1557b0]">
            Dental clinic
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-500">{decodedKeyword}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-5 gap-6 px-6 h-[calc(100vh-8rem)]">
        <div className="col-span-3 h-full overflow-hidden">
          <EditArticleForm keyword={decodedKeyword} onShowCompetitorAnalysis={setShowCompetitorAnalysis} />
        </div>
        <div className="col-span-2 rounded-lg border border-gray-200 bg-white h-full overflow-hidden">
          {showCompetitorAnalysis ? (
            <CompetitorAnalysis keyword={decodedKeyword} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>Competitor analysis will appear here after generating outlines</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
