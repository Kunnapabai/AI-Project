import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SummaryCardProps {
  title: string
  value: string | number
  description?: string
  percentage?: number
  isPositive?: boolean
}

export function SummaryCard({ title, value, description, percentage, isPositive = true }: SummaryCardProps) {
  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle className="text-base font-medium text-gray-800">{title}</CardTitle>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
          <Info className="h-4 w-4" />
          <span className="sr-only">Info</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        {percentage !== undefined && (
          <div className={`flex items-center mt-2 text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
            <span>
              {isPositive ? "↑" : "↓"} {percentage}%
            </span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

