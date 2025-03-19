"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface CreateArticleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAnalyze: (keyword: string) => void
}

export function CreateArticleDialog({ open, onOpenChange, onAnalyze }: CreateArticleDialogProps) {
  const [keyword, setKeyword] = React.useState("")
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Reset form when dialog opens and focus the input
  React.useEffect(() => {
    if (open) {
      setKeyword("")
      setIsAnalyzing(false)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  const handleAnalyze = () => {
    if (keyword.trim()) {
      setIsAnalyzing(true)

      // Simulate analysis process for 5 seconds
      setTimeout(() => {
        setIsAnalyzing(false)
        onAnalyze(keyword)
        setKeyword("")
      }, 5000)
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
          // Loading state content
          <div className="flex flex-col items-center justify-center py-8 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#1a73e8]" />
            <DialogTitle className="text-xl text-center">Analyzing keyword</DialogTitle>
            <p className="text-center text-gray-500">
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

