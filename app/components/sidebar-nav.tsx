"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Home, Users, CreditCard, Globe, Settings, BarChart, FileText, ChevronDown, ChevronRight } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  active?: boolean
}

export function SidebarNav() {
  const [activeItem, setActiveItem] = useState("Projects")

  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "#",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "#",
      icon: <FileText className="h-5 w-5" />,
      active: true,
    },
    {
      title: "Users",
      href: "#",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Billing",
      href: "#",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Domains",
      href: "#",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Reports",
      href: "#",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "#",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-64px)] overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              item.active ? "bg-[#e8f0fe] text-[#1a73e8]" : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveItem(item.title)}
          >
            {item.icon}
            {item.title}
            {item.active && <ChevronDown className="ml-auto h-4 w-4" />}
          </Link>
        ))}
      </nav>

      {activeItem === "Projects" && (
        <div className="px-4 py-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 px-3">Project List</div>
          <div className="space-y-1">
            {["Cryptocurrency", "Car Insurance", "Animal Hospital", "Dental Clinic", "Home and Garden"].map(
              (project) => (
                <Link
                  key={project}
                  href="#"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  <ChevronRight className="mr-2 h-4 w-4 text-gray-400" />
                  {project}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  )
}

