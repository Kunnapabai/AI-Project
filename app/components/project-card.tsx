"use client"

import { Settings, ExternalLink, Pencil, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  id: string
  title: string
  keywords: number
  searchEngine: string
  language: string
  flag: string
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export default function ProjectCard({
  id,
  title,
  keywords,
  searchEngine,
  language,
  flag,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const router = useRouter()

  const handleViewDetails = () => {
    // Convert title to kebab-case for URL
    const urlPath = title.toLowerCase().replace(/\s+/g, "-")
    router.push(`/${urlPath}`)
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 transition-opacity group-hover:opacity-100 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit project</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(id)} className="cursor-pointer text-red-600 focus:text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Keywords:</span>
          <span className="text-sm text-gray-700">{keywords}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Search Engine:</span>
          <div className="flex items-center gap-1">
            <img
              src={`https://flagcdn.com/24x18/${flag.toLowerCase()}.png`}
              alt={`${flag} flag`}
              className="h-4 w-5 rounded-sm object-cover"
            />
            <span className="text-sm text-gray-700 break-all">{searchEngine}</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Language:</span>
          <span className="text-sm text-gray-700 break-all">{language}</span>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Button variant="link" size="sm" className="h-auto p-0 text-[#1a73e8]" onClick={handleViewDetails}>
            <span>View details</span>
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

