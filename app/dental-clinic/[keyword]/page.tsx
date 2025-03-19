"use client"

import { EditArticleForm } from "@/app/components/edit-article-form"
import { CompetitorAnalysis } from "@/app/components/competitor-analysis"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

// ใช้ React.use() เพื่อละการ Promise และเข้าถึง params
export default function EditArticlePage({ params }: { params: { keyword: string } }) {
  const [decodedKeyword, setDecodedKeyword] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const [showCompetitorAnalysis, setShowCompetitorAnalysis] = useState(false)

  // ใช้ useEffect เพื่อจัดการการแปลงค่า params หลังจาก component โหลดเสร็จ
  useEffect(() => {
    // ละการ Promise และเข้าถึงค่าของ params
    const unwrapParams = async () => {
      const unwrappedParams = await params
      if (unwrappedParams?.keyword) {
        setDecodedKeyword(decodeURIComponent(unwrappedParams.keyword))
      }
    }

    unwrapParams()
  }, [params])

  // ตรวจสอบว่า query parameter "showAnalysis" เป็น true หรือไม่
  useEffect(() => {
    if (searchParams.get("showAnalysis") === "true") {
      setShowCompetitorAnalysis(true)
    }
  }, [searchParams])

  if (!decodedKeyword) {
    return <div>Loading...</div> // จะแสดงข้อความว่าโหลดข้อมูลอยู่ในกรณีที่ decodedKeyword ยังไม่พร้อม
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Breadcrumb moved outside the form */}
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

      {/* Main content with adjusted proportions */}
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
