"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

interface Project {
  id: string
  title: string
  keywords: number
  searchEngine: string
  language: string
  flag: string
  lastUpdated: string
}

interface DataTableProps {
  projects: Project[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function DataTable({ projects, onEdit, onDelete }: DataTableProps) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
        <CardTitle className="text-base font-medium text-gray-800">All Projects</CardTitle>
        <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-700">
          Export
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-xs font-medium text-gray-500">Project</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Keywords</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Search Engine</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Language</TableHead>
              <TableHead className="text-xs font-medium text-gray-500">Last Updated</TableHead>
              {(onEdit || onDelete) && (
                <TableHead className="text-xs font-medium text-gray-500 text-right">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">{project.title}</TableCell>
                <TableCell className="text-sm">{project.keywords}</TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-1">
                    <img
                      src={`https://flagcdn.com/24x18/${project.flag.toLowerCase()}.png`}
                      alt={`${project.flag} flag`}
                      className="h-4 w-5 rounded-sm object-cover"
                    />
                    <span>{project.searchEngine}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{project.language}</TableCell>
                <TableCell className="text-sm text-gray-500">{project.lastUpdated}</TableCell>
                {(onEdit || onDelete) && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-[#1a73e8]"
                          onClick={() => onEdit(project.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600"
                          onClick={() => onDelete(project.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

