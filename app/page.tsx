"use client"

import { Search } from "lucide-react"
import ProjectCard from "./components/project-card"
import { DataTable } from "./components/data-table"
import { Sidebar } from "./components/sidebar"
import { Header } from "./components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewProjectDialog } from "./components/new-project-dialog"
import { EditProjectDialog } from "./components/edit-project-dialog"
import { DeleteConfirmationDialog } from "./components/delete-confirmation-dialog"
import type React from "react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useProjects, type Project } from "./contexts/project-context"

export default function Dashboard() {
  const { toast } = useToast()
  const { projects, addProject, updateProject, deleteProject } = useProjects()

  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const [showEditProjectDialog, setShowEditProjectDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleCreateProject = (newProject: Omit<Project, "id" | "lastUpdated" | "keywords">) => {
    const now = new Date()
    const formattedDate = `${now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      keywords: Math.floor(Math.random() * 15) + 1, // Random number of keywords between 1-15
      lastUpdated: `Today, ${now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
    }

    addProject(project)

    toast({
      title: "Project created",
      description: `"${newProject.title}" has been created successfully.`,
    })
  }

  const handleEditProject = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      setSelectedProject(project)
      setShowEditProjectDialog(true)
    }
  }

  const handleDeleteProject = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      setSelectedProject(project)
      setShowDeleteDialog(true)
    }
  }

  const confirmDeleteProject = () => {
    if (selectedProject) {
      deleteProject(selectedProject.id)
      setShowDeleteDialog(false)

      toast({
        title: "Project deleted",
        description: `"${selectedProject.title}" has been deleted.`,
      })
    }
  }

  const saveEditedProject = (editedProject: Project) => {
    const updatedProject = {
      ...editedProject,
      lastUpdated: `Today, ${new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`,
    }

    updateProject(updatedProject)

    toast({
      title: "Project updated",
      description: `"${editedProject.title}" has been updated successfully.`,
    })
  }

  const filteredProjects = searchQuery
    ? projects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.searchEngine.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.language.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : projects

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto px-6 py-4">
          <div className="mb-8 flex items-center justify-between">
            <Button
              className="inline-flex items-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white px-6 py-2.5"
              onClick={() => setShowNewProjectDialog(true)}
            >
              <PlusIcon className="h-5 w-5" />
              Create new project
            </Button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                className="w-[300px] pl-10 bg-white border border-gray-300 focus:border-[#1a73e8] focus:ring-[#1a73e8]"
                placeholder="Search projects..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="cards" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-gray-100">
                <TabsTrigger value="cards" className="text-sm">
                  Card View
                </TabsTrigger>
                <TabsTrigger value="table" className="text-sm">
                  Table View
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cards" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    keywords={project.keywords}
                    searchEngine={project.searchEngine}
                    language={project.language}
                    flag={project.flag}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="table" className="mt-0">
              <DataTable projects={filteredProjects} onEdit={handleEditProject} onDelete={handleDeleteProject} />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Dialogs */}
      <NewProjectDialog
        open={showNewProjectDialog}
        onOpenChange={setShowNewProjectDialog}
        onCreateProject={handleCreateProject}
      />

      <EditProjectDialog
        open={showEditProjectDialog}
        onOpenChange={setShowEditProjectDialog}
        project={selectedProject}
        onSave={saveEditedProject}
      />

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        projectTitle={selectedProject?.title || ""}
        onConfirm={confirmDeleteProject}
      />
    </div>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

