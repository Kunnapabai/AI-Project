"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: string
    title: string
    searchEngine: string
    language: string
    flag: string
    keywords: number
  } | null
  onSave: (project: {
    id: string
    title: string
    searchEngine: string
    language: string
    flag: string
    keywords: number
  }) => void
}

const searchEngines = [
  { value: "google.com", label: "google.com", flag: "us" },
  { value: "google.co.uk", label: "google.co.uk", flag: "gb" },
  { value: "google.ca", label: "google.ca", flag: "ca" },
  { value: "google.com.au", label: "google.com.au", flag: "au" },
  { value: "google.co.jp", label: "google.co.jp", flag: "jp" },
  { value: "google.no", label: "google.no", flag: "no" },
  { value: "google.co.th", label: "google.co.th", flag: "th" },
]

const languages = [
  { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  { value: "Japanese", label: "Japanese" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Thai", label: "Thai" },
]

export function EditProjectDialog({ open, onOpenChange, project, onSave }: EditProjectDialogProps) {
  const [projectName, setProjectName] = React.useState("")
  const [searchEngine, setSearchEngine] = React.useState("")
  const [language, setLanguage] = React.useState("")
  const [openSearchEngine, setOpenSearchEngine] = React.useState(false)
  const [openLanguage, setOpenLanguage] = React.useState(false)

  // Initialize form when project changes
  React.useEffect(() => {
    if (project) {
      setProjectName(project.title)
      setSearchEngine(project.searchEngine)
      setLanguage(project.language)
    }
  }, [project])

  const handleSave = () => {
    if (project) {
      const selectedEngine = searchEngines.find((engine) => engine.value === searchEngine)
      onSave({
        id: project.id,
        title: projectName,
        searchEngine,
        language,
        flag: selectedEngine?.flag.toUpperCase() || project.flag,
        keywords: project.keywords, // Keep the existing keywords value
      })
    }
    onOpenChange(false)
  }

  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="grid gap-2">
            <Label>Search engine</Label>
            <Popover open={openSearchEngine} onOpenChange={setOpenSearchEngine}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openSearchEngine}
                  className="justify-between border-gray-300 bg-white"
                >
                  {searchEngine ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/24x18/${
                          searchEngines.find((engine) => engine.value === searchEngine)?.flag
                        }.png`}
                        alt="Flag"
                        className="h-4 w-5"
                      />
                      {searchEngines.find((engine) => engine.value === searchEngine)?.label}
                    </div>
                  ) : (
                    "Select search engine..."
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search engines..." />
                  <CommandList>
                    <CommandEmpty>No search engine found.</CommandEmpty>
                    <CommandGroup>
                      {searchEngines.map((engine) => (
                        <CommandItem
                          key={engine.value}
                          value={engine.value}
                          onSelect={(currentValue) => {
                            setSearchEngine(currentValue)
                            setOpenSearchEngine(false)
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://flagcdn.com/24x18/${engine.flag}.png`}
                              alt={`${engine.flag} flag`}
                              className="h-4 w-5"
                            />
                            {engine.label}
                          </div>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              searchEngine === engine.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label>Language</Label>
            <Popover open={openLanguage} onOpenChange={setOpenLanguage}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openLanguage}
                  className="justify-between border-gray-300 bg-white"
                >
                  {language ? languages.find((l) => l.value === language)?.label : "Select language..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search languages..." />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {languages.map((lang) => (
                        <CommandItem
                          key={lang.value}
                          value={lang.value}
                          onSelect={(currentValue) => {
                            setLanguage(currentValue)
                            setOpenLanguage(false)
                          }}
                        >
                          {lang.label}
                          <Check
                            className={cn("ml-auto h-4 w-4", language === lang.value ? "opacity-100" : "opacity-0")}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#1a73e8] hover:bg-[#1557b0] text-white px-8"
            onClick={handleSave}
            disabled={!projectName || !searchEngine || !language}
          >
            Save changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

