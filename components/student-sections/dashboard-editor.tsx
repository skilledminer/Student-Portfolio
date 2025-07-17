"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Eye, Palette } from "lucide-react"
import type { StudentPortfolioData } from "../student-portfolio-data"

interface DashboardEditorProps {
  data: StudentPortfolioData
  setActiveSection: (section: string) => void
}

export default function DashboardEditor({ data, setActiveSection }: DashboardEditorProps) {
  const calculateCompletion = () => {
    let completed = 0
    let total = 0

    // Check personal info
    if (data.personal.firstName && data.personal.lastName && data.personal.email) completed++
    total++

    // Check education
    if (data.education.length > 0 && data.education[0].university) completed++
    total++

    // Check projects
    if (data.projects.length > 0) completed++
    total++

    // Check skills
    if (data.skills.technical.length > 0 || data.skills.soft.length > 0) completed++
    total++

    // Check work experience
    if (data.workExperience.length > 0) completed++
    total++

    return Math.round((completed / total) * 100)
  }

  const completion = calculateCompletion()

  return (
    <div className="space-y-6">
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
                      data.personal.firstName && data.personal.lastName && data.personal.email
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {data.personal.firstName && data.personal.lastName && data.personal.email
                      ? "Complete"
                      : "In Progress"}
                  </Badge>
                  <span>Personal Information</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      data.education.length > 0 && data.education[0].university
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {data.education.length > 0 && data.education[0].university ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Education</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      data.projects.length >= 2 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {data.projects.length >= 2 ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Projects ({data.projects.length}/2)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      data.skills.technical.length > 0 || data.skills.soft.length > 0
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }
                  >
                    {data.skills.technical.length > 0 || data.skills.soft.length > 0 ? "Complete" : "In Progress"}
                  </Badge>
                  <span>Skills</span>
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
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setActiveSection("achievements")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Achievement
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection("theme")}>
                <Palette className="mr-2 h-4 w-4" />
                Customize Design
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setActiveSection("preview")}>
                <Eye className="mr-2 h-4 w-4" />
                Preview Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Portfolio Sections</CardTitle>
          <CardDescription>Overview of all sections in your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Education</h4>
              <p className="text-sm text-gray-600">{data.education.length} entries</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Work Experience</h4>
              <p className="text-sm text-gray-600">{data.workExperience.length} entries</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Projects</h4>
              <p className="text-sm text-gray-600">{data.projects.length} entries</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Achievements</h4>
              <p className="text-sm text-gray-600">{data.achievements.length} entries</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Certifications</h4>
              <p className="text-sm text-gray-600">{data.certifications.length} entries</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Volunteer Experience</h4>
              <p className="text-sm text-gray-600">{data.volunteerExperience.length} entries</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
