"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Project {
  id: string
  title: string
  keywords: number
  searchEngine: string
  language: string
  flag: string
  lastUpdated: string
}

interface ProjectContextType {
  projects: Project[]
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Cryptocurrency",
      keywords: 6,
      searchEngine: "google.co.uk",
      language: "English",
      flag: "GB",
      lastUpdated: "Today, 2:30 PM",
    },
    {
      id: "2",
      title: "Car Insurance",
      keywords: 14,
      searchEngine: "google.ca",
      language: "English",
      flag: "CA",
      lastUpdated: "Yesterday, 9:15 AM",
    },
    {
      id: "3",
      title: "Animal Hospital",
      keywords: 8,
      searchEngine: "google.co.jp",
      language: "Japanese",
      flag: "JP",
      lastUpdated: "Feb 25, 2025",
    },
    {
      id: "4",
      title: "Dental Clinic",
      keywords: 5,
      searchEngine: "google.no",
      language: "Norwegian",
      flag: "NO",
      lastUpdated: "Feb 24, 2025",
    },
    {
      id: "5",
      title: "Home and Garden",
      keywords: 11,
      searchEngine: "google.co.th",
      language: "Thai",
      flag: "TH",
      lastUpdated: "Feb 23, 2025",
    },
  ])

  // Load projects from localStorage on initial render
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects))
  }, [projects])

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev])
  }

  const updateProject = (project: Project) => {
    setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <ProjectContext.Provider value={{ projects, setProjects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

