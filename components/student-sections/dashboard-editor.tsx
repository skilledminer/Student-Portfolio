"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Users,
  Heart,
  Lightbulb,
  Trophy,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import type { StudentPortfolioData } from "../student-portfolio-data"

interface DashboardEditorProps {
  data: StudentPortfolioData
  setActiveSection: (section: string) => void
}

export default function DashboardEditor({ data, setActiveSection }: DashboardEditorProps) {
  const calculateSectionProgress = () => {
    const sections = [
      {
        id: "about",
        name: "About Me",
        icon: User,
        required: true,
        completed: !!(
          data.personal.firstName &&
          data.personal.lastName &&
          data.personal.email &&
          data.personal.summary
        ),
        progress: [data.personal.firstName, data.personal.lastName, data.personal.email, data.personal.summary].filter(
          Boolean,
        ).length,
        total: 4,
      },
      {
        id: "education",
        name: "Education",
        icon: GraduationCap,
        required: true,
        completed: !!(data.education.length > 0 && data.education[0].university && data.education[0].degree),
        progress:
          data.education.length > 0
            ? [data.education[0].university, data.education[0].degree, data.education[0].major].filter(Boolean).length
            : 0,
        total: 3,
      },
      {
        id: "projects",
        name: "Projects",
        icon: FolderOpen,
        required: true,
        completed: data.projects.some((p) => p.name && p.description),
        progress: data.projects.filter((p) => p.name && p.description).length,
        total: Math.max(1, data.projects.length),
      },
      {
        id: "skills",
        name: "Skills",
        icon: Lightbulb,
        required: true,
        completed: data.skills.technical.length > 0,
        progress: data.skills.technical.length > 0 ? 1 : 0,
        total: 1,
      },
      {
        id: "workExperience",
        name: "Work Experience",
        icon: Briefcase,
        required: false,
        completed: data.workExperience.some((w) => w.company && w.position),
        progress: data.workExperience.filter((w) => w.company && w.position).length,
        total: Math.max(1, data.workExperience.length),
      },
      {
        id: "extraCurriculars",
        name: "Extra Curriculars",
        icon: Users,
        required: false,
        completed: data.extraCurriculars.some((e) => e.organization && e.role),
        progress: data.extraCurriculars.filter((e) => e.organization && e.role).length,
        total: Math.max(1, data.extraCurriculars.length),
      },
      {
        id: "volunteerExperience",
        name: "Volunteer Experience",
        icon: Heart,
        required: false,
        completed: data.volunteerExperience.some((v) => v.organization && v.role),
        progress: data.volunteerExperience.filter((v) => v.organization && v.role).length,
        total: Math.max(1, data.volunteerExperience.length),
      },
      {
        id: "achievements",
        name: "Achievements",
        icon: Trophy,
        required: false,
        completed: data.achievements.some((a) => a.title),
        progress: data.achievements.filter((a) => a.title).length,
        total: Math.max(1, data.achievements.length),
      },
    ]

    return sections
  }

  const sections = calculateSectionProgress()
  const completedSections = sections.filter((s) => s.completed).length
  const totalSections = sections.length
  const overallProgress = Math.round((completedSections / totalSections) * 100)

  const requiredSections = sections.filter((s) => s.required)
  const completedRequired = requiredSections.filter((s) => s.completed).length
  const allRequiredComplete = completedRequired === requiredSections.length

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedSections} of {totalSections} sections completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Required Sections</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedRequired}/{requiredSections.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {allRequiredComplete ? "All required sections complete!" : "Complete required sections first"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allRequiredComplete ? "Ready" : "Draft"}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {allRequiredComplete ? "Ready for export" : "Needs more information"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section Status */}
      <Card>
        <CardHeader>
          <CardTitle>Section Progress</CardTitle>
          <CardDescription>Complete each section to build your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section) => {
              const Icon = section.icon
              const sectionProgress = Math.round((section.progress / section.total) * 100)

              return (
                <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{section.name}</span>
                        {section.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                        {section.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={sectionProgress} className="w-32 h-2" />
                        <span className="text-xs text-muted-foreground">
                          {section.progress}/{section.total}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={section.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.completed ? "Edit" : "Complete"}
                  </Button>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common next steps to improve your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {!data.personal.firstName && (
              <Button variant="outline" onClick={() => setActiveSection("about")} className="justify-start">
                <User className="mr-2 h-4 w-4" />
                Add your name and contact info
              </Button>
            )}
            {!data.personal.summary && (
              <Button variant="outline" onClick={() => setActiveSection("about")} className="justify-start">
                <User className="mr-2 h-4 w-4" />
                Write your professional summary
              </Button>
            )}
            {data.education.length === 0 ||
              (!data.education[0].university && (
                <Button variant="outline" onClick={() => setActiveSection("education")} className="justify-start">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add your education details
                </Button>
              ))}
            {data.projects.length === 0 && (
              <Button variant="outline" onClick={() => setActiveSection("projects")} className="justify-start">
                <FolderOpen className="mr-2 h-4 w-4" />
                Showcase your projects
              </Button>
            )}
            {data.skills.technical.length === 0 && (
              <Button variant="outline" onClick={() => setActiveSection("skills")} className="justify-start">
                <Lightbulb className="mr-2 h-4 w-4" />
                List your technical skills
              </Button>
            )}
            {data.workExperience.length === 0 && (
              <Button variant="outline" onClick={() => setActiveSection("workExperience")} className="justify-start">
                <Briefcase className="mr-2 h-4 w-4" />
                Add work experience
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
