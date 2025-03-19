"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, HelpCircle } from "lucide-react"
import { useProjects } from "../contexts/project-context"

interface SidebarLink {
  title: string
  href: string
  icon: React.ReactNode
}

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [shouldShowContent, setShouldShowContent] = useState(true)
  const { projects } = useProjects()

  const navigation: SidebarLink[] = [
    {
      title: "Projects",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
  ]

  const bottomNavigation: SidebarLink[] = [
    {
      title: "Tutorials",
      href: "#",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Help & Support",
      href: "#",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (!isCollapsed || isHovered) {
      timeoutId = setTimeout(() => {
        setShouldShowContent(true)
      }, 150)
    } else {
      setShouldShowContent(false)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isCollapsed, isHovered])

  const handleToggle = () => {
    setIsHovered(false)
    setIsCollapsed(!isCollapsed)
  }

  const handleProjectClick = (item: string) => {
    // Convert item to kebab-case for URL
    const urlPath = item.toLowerCase().replace(/\s+/g, "-")
    router.push(`/${urlPath}`)
  }

  const handleSectionClick = (href: string) => {
    router.push(href)
  }

  const showContent = shouldShowContent

  return (
    <motion.div
      className="relative flex h-[calc(100vh-3.5rem)] flex-col bg-white border-r border-gray-200 p-4"
      initial={false}
      animate={{ width: !isCollapsed || isHovered ? 256 : 64 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="mt-2 flex-1 space-y-6">
        {navigation.map((section) => (
          <div key={section.title}>
            <div
              className={`relative flex items-center gap-2 px-2 py-1.5 rounded-lg ${
                pathname === section.href ? "bg-[#e8f0fe]" : "hover:bg-gray-100"
              }`}
            >
              <div
                className={`w-5 flex-shrink-0 cursor-pointer ${pathname === section.href ? "text-[#1a73e8]" : "text-gray-400"}`}
                onClick={() => handleSectionClick(section.href)}
              >
                {section.icon}
              </div>
              <AnimatePresence mode="wait">
                {showContent && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`text-sm font-medium overflow-hidden whitespace-nowrap cursor-pointer ${
                      pathname === section.href ? "text-[#1a73e8]" : "text-gray-700"
                    }`}
                    onClick={() => handleSectionClick(section.href)}
                  >
                    {section.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {showContent && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 space-y-1"
                >
                  {projects.map((project) => {
                    const itemPath = `/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                    const isActive = pathname.startsWith(itemPath)

                    return (
                      <li key={project.id}>
                        <button
                          onClick={() => handleProjectClick(project.title)}
                          className={`block w-full text-left rounded-lg px-2 py-1.5 text-sm transition-colors ${
                            isActive
                              ? "bg-[#e8f0fe] text-[#1a73e8]"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {project.title}
                        </button>
                      </li>
                    )
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="mt-auto pt-4 space-y-2">
        {bottomNavigation.map((section) => (
          <div key={section.title}>
            <div className="relative flex items-center gap-2 px-2 rounded-lg transition-colors hover:bg-gray-100 cursor-pointer py-1.5">
              <div className="w-5 flex-shrink-0 text-gray-400">{section.icon}</div>
              <AnimatePresence mode="wait">
                {showContent && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-sm font-medium text-gray-700 overflow-hidden whitespace-nowrap"
                  >
                    {section.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

