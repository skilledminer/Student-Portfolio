"use client"

import { useContext } from "react"
import { Edit, Plus, Palette, Eye, FileText, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { PortfolioContext } from "../portfolio-builder"

export default function DashboardPanel({ setActiveSection }) {
  const { portfolioData } = useContext(PortfolioContext)

  // Calculate completion percentage based on filled sections
  const calculateCompletion = () => {
    let completed = 0
    let total = 0

    // Check hero section
    if (portfolioData.name && portfolioData.title) {
      completed++
    }
    total++

    // Check projects section
    if (portfolioData.projects.length > 0) {
      completed++
    }
    total++

    // Check about section
    if (portfolioData.about) {
      completed++
    }
    total++

    // Check education section
    if (portfolioData.education.length > 0) {
      completed++
    }
    total++

    // Check work experience section
    if (portfolioData.workExperience.length > 0) {
      completed++
    }
    total++

    // Check skills section
    if (portfolioData.skills.length > 0) {
      completed++
    }
    total++

    // Check contact section
    if (portfolioData.contactSettings.fields.email) {
      completed++
    }
    total++

    return Math.round((completed / total) * 100)
  }

  const completion = calculateCompletion()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Status</CardTitle>
            <CardDescription>Your portfolio completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Completion</span>
                  <span className="text-sm text-gray-500">{completion}%</span>
                </div>
                <Progress value={completion} className="h-2" />
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      portfolioData.name && portfolioData.title
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {portfolioData.name && portfolioData.title ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Hero Section</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      portfolioData.projects.length >= 3 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {portfolioData.projects.length >= 3 ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Projects ({portfolioData.projects.length}/3)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={portfolioData.about ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}
                  >
                    {portfolioData.about ? "Complete" : "In Progress"}
                  </Badge>
                  <span>About Me</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      portfolioData.education.length > 0 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {portfolioData.education.length > 0 ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Education</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      portfolioData.workExperience.length > 0
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {portfolioData.workExperience.length > 0 ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Work Experience</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common portfolio tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection("projects")}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Project
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection("education")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setActiveSection("workExperience")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Work Experience
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection("settings")}>
                <Palette className="mr-2 h-4 w-4" />
                Customize Template
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // This would typically open a new tab or window with the preview
                  toast({
                    title: "Preview opened",
                    description: "Your portfolio preview has been opened in a new tab.",
                  })
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Portfolio
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // This would typically trigger a PDF download
                  toast({
                    title: "PDF Export started",
                    description: "Your portfolio is being prepared as a PDF resume.",
                    action: <ToastAction altText="Download">Download</ToastAction>,
                  })
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Changes</CardTitle>
          <CardDescription>Latest updates to your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-gray-100 p-1">
                <Edit className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Updated project "{portfolioData.projects[0]?.title}"</p>
                <p className="text-sm text-gray-500">Today at 2:34 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-gray-100 p-1">
                <Plus className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">
                  Added new skill "{portfolioData.skills[portfolioData.skills.length - 1]?.skill}"
                </p>
                <p className="text-sm text-gray-500">Yesterday at 11:15 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-gray-100 p-1">
                <Palette className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Changed template to "{portfolioData.theme.template}"</p>
                <p className="text-sm text-gray-500">Yesterday at 9:45 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-gray-100 p-1">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <p className="font-medium">Removed project "Weather App"</p>
                <p className="text-sm text-gray-500">Apr 15, 2025</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
