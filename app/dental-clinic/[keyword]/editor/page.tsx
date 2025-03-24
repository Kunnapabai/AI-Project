"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ContentEditor } from "@/app/components/content-editor"
import { AnalysisTabs } from "@/app/components/analysis-tabs"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

export default function ContentEditorPage() {
  const params = useParams() as { keyword: string } // ✅ Use useParams()
  const decodedKeyword = decodeURIComponent(params.keyword)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<"competitor" | "content">("competitor")

  // Check if content was generated to determine if we should show the content tab
  useEffect(() => {
    if (searchParams.get("regenerated") !== null) {
      setActiveTab("content")
    }
  }, [searchParams])

  const handleSave = () => {
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully.",
    })
    router.push("/dental-clinic")
  }

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
          <Link
            href={`/dental-clinic/${encodeURIComponent(decodedKeyword)}`}
            className="text-[#1a73e8] hover:text-[#1557b0]"
          >
            {decodedKeyword}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4 text-gray-500" />
          <span className="text-gray-500">Editor</span>
        </div>
      </div>

      {/* Main content with grid layout */}
      <div className="grid grid-cols-5 gap-6 px-6 h-[calc(100vh-8rem)]">
        <div className="col-span-3 h-full overflow-hidden">
          <ContentEditor keyword={decodedKeyword} onSave={handleSave} />
        </div>
        <div className="col-span-2 rounded-lg border border-gray-200 bg-white h-full overflow-hidden">
          <AnalysisTabs keyword={decodedKeyword} initialTab={activeTab} showContentTab={true} />
        </div>
      </div>
    </div>
  )
}
