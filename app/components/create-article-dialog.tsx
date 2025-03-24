"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CreateArticleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnalyze: (keyword: string) => void
}

export function CreateArticleDialog({ open, onOpenChange, onAnalyze }: CreateArticleDialogProps) {
  const [keyword, setKeyword] = React.useState("")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Reset form when dialog opens and focus the input
  React.useEffect(() => {
    if (open) {
      setKeyword("")
      setIsAnalyzing(false)
      setProgress(0)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleAnalyze = () => {
    if (keyword.trim()) {
      setIsAnalyzing(true)
      setProgress(0)

      // Simulate analysis process with progress updates
      const totalTime = 5000 // 5 seconds total
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

          // Complete the analysis after reaching 100%
          setTimeout(() => {
            setIsAnalyzing(false)
            onAnalyze(keyword)
            setKeyword("")
          }, 300)
        } else {
          setProgress(Math.min(currentProgress, 99)) // Cap at 99% until complete
        }
      }, intervalTime)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && keyword.trim() && !isAnalyzing) {
      handleAnalyze()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        // Prevent closing the dialog while analyzing
        if (isAnalyzing) return
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        {isAnalyzing ? (
          // Loading state content with progress bar
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <DialogTitle className="text-xl text-center">Analyzing keyword</DialogTitle>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-[#1a73e8] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-gray-500 mt-2">{Math.round(progress)}% complete</p>
            <p className="text-center text-gray-500 mt-4">
              Please wait while we analyze the keyword and generate insights...
            </p>
          </div>
        ) : (
          // Normal dialog content
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Create new article</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="keyword">Keyword</Label>
                <Input
                  id="keyword"
                  ref={inputRef}
                  placeholder="Enter keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-gray-300"
                />
                <Button
                  className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white"
                  onClick={handleAnalyze}
                  disabled={!keyword.trim()}
                >
                  Analyze keyword
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

