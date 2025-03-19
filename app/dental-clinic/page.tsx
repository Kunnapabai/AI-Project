"use client"

import { ChevronRight, Plus, Search, SlidersHorizontal, Download, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreateArticleDialog } from "../components/create-article-dialog"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface KeywordData {
  id: string
  keyword: string
  words: number
  score: number
  competitorScore: number
  searchIntent: string
  contentIntent: string
  searchVolume: number
  searchTrend: number[]
  lastEdited: string
}

export default function DentalClinicPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [keywordData, setKeywordData] = useState<KeywordData[]>([
    {
      id: "1",
      keyword: "dental implants",
      words: 1124,
      score: 87,
      competitorScore: 60,
      searchIntent: "information",
      contentIntent: "information",
      searchVolume: 165000,
      searchTrend: [40, 45, 50, 47, 55, 60, 58, 65, 70, 68, 72, 75],
      lastEdited: "2025-02-18",
    },
    {
      id: "2",
      keyword: "root canal treatment",
      words: 612,
      score: 90,
      competitorScore: 77,
      searchIntent: "information",
      contentIntent: "information",
      searchVolume: 6300,
      searchTrend: [30, 35, 32, 38, 40, 42, 45, 43, 47, 50, 48, 52],
      lastEdited: "2025-01-31",
    },
    {
      id: "3",
      keyword: "emergency dentist",
      words: 545,
      score: 92,
      competitorScore: 42,
      searchIntent: "Navigation",
      contentIntent: "information",
      searchVolume: 25000,
      searchTrend: [55, 58, 54, 60, 65, 63, 68, 70, 67, 72, 75, 73],
      lastEdited: "2024-12-10",
    },
    {
      id: "4",
      keyword: "endodontist",
      words: 978,
      score: 86,
      competitorScore: 59,
      searchIntent: "information",
      contentIntent: "Navigation",
      searchVolume: 50000,
      searchTrend: [45, 42, 40, 38, 35, 32, 30, 35, 38, 40, 42, 45],
      lastEdited: "2024-11-11",
    },
    {
      id: "5",
      keyword: "pediatric dentist",
      words: 235,
      score: 93,
      competitorScore: 67,
      searchIntent: "commercial",
      contentIntent: "Navigation",
      searchVolume: 39000,
      searchTrend: [50, 52, 55, 58, 60, 62, 65, 63, 67, 70, 68, 72],
      lastEdited: "2025-01-26",
    },
  ])
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [keywordToDelete, setKeywordToDelete] = useState<{ id: string; keyword: string } | null>(null)

  const navigateToProjects = () => {
    router.push("/")
  }

  const handleEditKeyword = (keyword: string) => {
    router.push(`/dental-clinic/${encodeURIComponent(keyword)}?showAnalysis=true`)
  }

  const handleAnalyzeKeyword = (keyword: string) => {
    // Generate random placeholder data for the new keyword
    const randomWords = Math.floor(Math.random() * 1000) + 200
    const randomScore = Math.floor(Math.random() * 15) + 80
    const randomCompetitorScore = Math.floor(Math.random() * 70) + 30

    const searchIntents = ["information", "Navigation", "commercial"]
    const randomSearchIntent = searchIntents[Math.floor(Math.random() * searchIntents.length)]
    const randomContentIntent = searchIntents[Math.floor(Math.random() * searchIntents.length)]

    const randomSearchVolume = Math.floor(Math.random() * 200000) + 5000

    // Generate random trend data
    const randomTrend = Array.from({ length: 12 }, () => Math.floor(Math.random() * 50) + 30)

    // Use current date for lastEdited
    const today = new Date()
    const formattedDate = today.toISOString().split("T")[0]

    // Create new keyword entry
    const newKeyword: KeywordData = {
      id: Date.now().toString(),
      keyword: keyword.toLowerCase(),
      words: randomWords,
      score: randomScore,
      competitorScore: randomCompetitorScore,
      searchIntent: randomSearchIntent,
      contentIntent: randomContentIntent,
      searchVolume: randomSearchVolume,
      searchTrend: randomTrend,
      lastEdited: formattedDate,
    }

    // Add to keyword data
    setKeywordData([newKeyword, ...keywordData])

    toast({
      title: "Keyword analyzed",
      description: `"${keyword}" has been analyzed and added to your list.`,
    })

    setShowCreateDialog(false)

    // Redirect to the edit page for the new keyword with showAnalysis=true
    router.push(`/dental-clinic/${encodeURIComponent(keyword.toLowerCase())}?showAnalysis=true`)
  }

  const handleDeleteClick = (id: string, keyword: string) => {
    setKeywordToDelete({ id, keyword })
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    if (keywordToDelete) {
      setKeywordData(keywordData.filter((item) => item.id !== keywordToDelete.id))
      toast({
        title: "Keyword deleted",
        description: `"${keywordToDelete.keyword}" has been deleted.`,
      })
      setShowDeleteDialog(false)
      setKeywordToDelete(null)
    }
  }

  const filteredKeywords = searchQuery
    ? keywordData.filter((item) => item.keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    : keywordData

  return (
    <div className="flex-1 overflow-auto px-6 py-4">
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Button
            variant="link"
            className="p-0 h-auto text-[#1a73e8] hover:text-[#1557b0]"
            onClick={navigateToProjects}
          >
            Projects
          </Button>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Dental clinic</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <Button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white" onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create new article
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-gray-300 text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              className="w-[250px] pl-10 bg-white border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
              placeholder="Search keywords..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-xs font-medium text-gray-500">Keyword</TableHead>
              <TableHead className="text-xs font-medium text-gray-500 text-right">Words</TableHead>
              <TableHead className="text-xs font-medium text-gray-500 text-right">Score</TableHead>
              <TableHead className="text-xs font-medium text-gray-500 text-right">Competitor's Score</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Search Intent</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Content Intent</TableHead>
              <TableHead className="text-xs font-medium text-gray-500 text-right">Search Volume</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Search Trend</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Last Edited</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredKeywords.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-[#1a73e8] hover:text-[#1557b0] cursor-pointer">
                  {item.keyword}
                </TableCell>
                <TableCell className="text-right">{item.words.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.score >= 90
                        ? "bg-green-100 text-green-800"
                        : item.score >= 80
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.score}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.competitorScore >= 70
                        ? "bg-red-100 text-red-800"
                        : item.competitorScore >= 50
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.competitorScore}
                  </span>
                </TableCell>
                <TableCell>{item.searchIntent}</TableCell>
                <TableCell>{item.contentIntent}</TableCell>
                <TableCell className="text-right">{item.searchVolume.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="w-24 h-6">
                    <svg viewBox="0 0 120 24" className="w-full h-full">
                      <path
                        d={`M ${item.searchTrend
                          .map((value, index) => `${index * 10},${24 - (value / 100) * 24} ${index === 0 ? "M" : "L"}`)
                          .join(" ")}`}
                        fill="none"
                        stroke="#1a73e8"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(item.lastEdited).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-[#1a73e8]"
                      onClick={() => handleEditKeyword(item.keyword)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-600"
                      onClick={() => handleDeleteClick(item.id, item.keyword)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateArticleDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onAnalyze={handleAnalyzeKeyword}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the keyword "{keywordToDelete?.keyword}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

