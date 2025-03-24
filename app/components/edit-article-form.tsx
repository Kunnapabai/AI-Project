"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { OutlineSelection } from "./outline-selection"
import { useRouter } from "next/navigation"
import { CustomCheckbox } from "./custom-checkbox"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface EditArticleFormProps {
  keyword: string
  onShowCompetitorAnalysis: (show: boolean) => void
}

const entities = [
  // Left column (10 items)
  {
    column: "left",
    items: [
      { id: "dental-implants", label: "Dental Implants" },
      { id: "tooth-whitening", label: "Tooth Whitening" },
      { id: "root-canal", label: "Root Canal" },
      { id: "dental-crown", label: "Dental Crown" },
      { id: "oral-hygiene", label: "Oral Hygiene" },
      { id: "dental-bridge", label: "Dental Bridge" },
      { id: "teeth-cleaning", label: "Teeth Cleaning" },
      { id: "dental-filling", label: "Dental Filling" },
      { id: "gum-disease", label: "Gum Disease" },
      { id: "dental-xray", label: "Dental X-Ray" },
    ],
  },
  // Right column (10 items)
  {
    column: "right",
    items: [
      { id: "cosmetic-dentistry", label: "Cosmetic Dentistry" },
      { id: "orthodontics", label: "Orthodontics" },
      { id: "dental-surgery", label: "Dental Surgery" },
      { id: "preventive-care", label: "Preventive Care" },
      { id: "dental-emergency", label: "Dental Emergency" },
      { id: "sedation-dentistry", label: "Sedation Dentistry" },
      { id: "pediatric-dental", label: "Pediatric Dental" },
      { id: "dental-insurance", label: "Dental Insurance" },
      { id: "dental-clinic", label: "Dental Clinic" },
      { id: "dental-technology", label: "Dental Technology" },
    ],
  },
]

export function EditArticleForm({ keyword, onShowCompetitorAnalysis }: EditArticleFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [showOutlines, setShowOutlines] = React.useState(false)
  const [isGeneratingOutline, setIsGeneratingOutline] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  // Get all entity IDs from both columns
  const allEntityIds = entities.flatMap((column) => column.items.map((item) => item.id))
  const [selectedEntities, setSelectedEntities] = React.useState<string[]>(allEntityIds)

  const handleEntityChange = (entityId: string, checked: boolean) => {
    if (checked) {
      setSelectedEntities([...selectedEntities, entityId])
    } else {
      setSelectedEntities(selectedEntities.filter((id) => id !== entityId))
    }
  }

  const handleGenerateOutline = () => {
    setIsGeneratingOutline(true)
    setProgress(0)

    // Simulate outline generation with progress updates
    const totalTime = 3000 // 3 seconds total
    const intervalTime = 100 // Update every 100ms
    const steps = totalTime / intervalTime
    const increment = 100 / steps

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += increment

      // Add some randomness to make it look more natural
      const randomFactor = Math.random() * 0.5 + 0.8 // Between 0.8 and 1.3
      const adjustedIncrement = increment * randomFactor

      // Ensure we don't exceed 100%
      if (currentProgress >= 100) {
        setProgress(100)
        clearInterval(interval)

        // Complete the outline generation after reaching 100%
        setTimeout(() => {
          setIsGeneratingOutline(false)
          setShowOutlines(true)
          onShowCompetitorAnalysis(true)
        }, 300)
      } else {
        setProgress(Math.min(currentProgress, 99)) // Cap at 99% until complete
      }
    }, intervalTime)
  }

  const handleGenerateContent = (selectedOutlines: string[], isRegenerated: boolean) => {
    // The loading is now handled in the OutlineSelection component
    // We don't need to show a toast here as it would be hidden by the loading dialog
  }

  const handleRegenerateOutlines = () => {
    // This is now handled in the OutlineSelection component
  }

  if (showOutlines) {
    return (
      <OutlineSelection keyword={keyword} onGenerate={handleGenerateContent} onRegenerate={handleRegenerateOutlines} />
    )
  }

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white h-full overflow-hidden flex flex-col">
        <div className="p-6 overflow-y-auto">
          <h2 className="mb-6 text-lg font-medium">Please fill out the form to generate outlines.</h2>

          <div className="space-y-6">
            {/* Search Intent */}
            <div className="grid gap-2">
              <Label htmlFor="search-intent" className="text-sm text-gray-600">
                search intent
              </Label>
              <Select defaultValue="informational">
                <SelectTrigger id="search-intent" className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informational">informational</SelectItem>
                  <SelectItem value="navigational">navigational</SelectItem>
                  <SelectItem value="commercial">commercial</SelectItem>
                  <SelectItem value="transactional">transactional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content Intent */}
            <div className="grid gap-2">
              <Label htmlFor="content-intent" className="text-sm text-gray-600">
                content intent
              </Label>
              <Select defaultValue="informational">
                <SelectTrigger id="content-intent" className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informational">informational</SelectItem>
                  <SelectItem value="navigational">navigational</SelectItem>
                  <SelectItem value="commercial">commercial</SelectItem>
                  <SelectItem value="transactional">transactional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Content Type */}
            <div className="grid gap-2">
              <Label htmlFor="content-type" className="text-sm text-gray-600">
                content type
              </Label>
              <Select defaultValue="blogging">
                <SelectTrigger id="content-type" className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blogging">blogging</SelectItem>
                  <SelectItem value="article">article</SelectItem>
                  <SelectItem value="landing-page">landing page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Entities - Reorganized into two columns */}
            <div className="grid gap-2">
              <Label className="text-sm text-gray-600">select entities</Label>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-gray-200 p-4">
                {entities.map((column) => (
                  <div key={column.column} className="space-y-3">
                    {column.items.map((entity) => (
                      <div key={entity.id} className="flex items-center space-x-2">
                        <CustomCheckbox
                          id={entity.id}
                          checked={selectedEntities.includes(entity.id)}
                          onCheckedChange={(checked) => handleEntityChange(entity.id, checked as boolean)}
                        />
                        <Label
                          htmlFor={entity.id}
                          className={`text-sm font-normal ${
                            selectedEntities.includes(entity.id) ? "text-gray-900" : "text-gray-400 line-through"
                          }`}
                        >
                          {entity.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div className="grid gap-2">
              <Label htmlFor="tone" className="text-sm text-gray-600">
                tone
              </Label>
              <Select defaultValue="formal">
                <SelectTrigger id="tone" className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white"
              size="lg"
              onClick={handleGenerateOutline}
            >
              Generate outline
            </Button>
          </div>
        </div>
      </div>

      {/* Loading overlay dialog with progress bar */}
      <Dialog open={isGeneratingOutline} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px] flex flex-col items-center justify-center p-6">
          <div className="flex flex-col items-center justify-center gap-4 w-full">
            <DialogTitle className="text-xl text-center">Generating outline</DialogTitle>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[#1a73e8] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-gray-500 mt-2">{Math.round(progress)}% complete</p>

            <p className="text-center text-gray-500 mt-4">
              Please wait while we analyze your inputs and generate outlines...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

