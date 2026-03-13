"use client"

import type React from "react"

import { useState } from "react"
import { studentThemes, studentFonts, type StudentPortfolioData } from "./student-portfolio-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Eye, EyeOff } from "lucide-react"

interface StudentPortfolioPreviewProps {
  data: StudentPortfolioData
  profileImage: string
}

interface PortfolioSection {
  id: string
  title: string
  visible: boolean
  component: React.ReactNode
}

// Helper function to strip HTML tags for plain text display
const stripHtml = (html: string): string => {
  if (typeof window !== "undefined") {
    const temp = document.createElement("div")
    temp.innerHTML = html
    return temp.textContent || temp.innerText || ""
  }
  // Fallback for server-side rendering
  return html.replace(/<[^>]*>/g, "")
}

// Helper function to render HTML content safely
const renderHtmlContent = (html: string) => {
  if (!html) return null
  return <div dangerouslySetInnerHTML={{ __html: html }} className="prose prose-sm max-w-none" />
}

export default function StudentPortfolioPreview({ data, profileImage }: StudentPortfolioPreviewProps) {
  const theme = studentThemes[data.theme.colorScheme]
  const font = studentFonts[data.theme.fontFamily]

  const getSpacing = () => {
    switch (data.theme.layout) {
      case "compact":
        return "space-y-4"
      case "spacious":
        return "space-y-12"
      default:
        return "space-y-8"
    }
  }

  const getPadding = () => {
    switch (data.theme.layout) {
      case "compact":
        return "p-4"
      case "spacious":
        return "p-8"
      default:
        return "p-6"
    }
  }

  const containerStyle = {
    fontFamily: font.family,
    backgroundColor: theme.background,
    color: theme.text,
  }

  const primaryStyle = {
    color: theme.primary,
  }

  const secondaryStyle = {
    color: theme.secondary,
  }

  const accentStyle = {
    backgroundColor: theme.accent,
    color: "white",
  }

  // Initialize sections with default visibility and order
  const [sections, setSections] = useState<PortfolioSection[]>([
    {
      id: "header",
      title: "Header",
      visible: true,
      component: (
        <div className="flex items-start gap-6 border-b pb-6" style={{ borderColor: theme.accent + "30" }}>
          {data.showProfileImage && profileImage && (
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover border-4"
              style={{ borderColor: theme.primary }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2" style={primaryStyle}>
              {data.personal.firstName} {data.personal.lastName}
            </h1>
            {data.education.length > 0 && data.education[0].degree && (
              <p className="text-lg mb-2" style={secondaryStyle}>
                {data.education[0].degree} {data.education[0].major && `in ${data.education[0].major}`}
              </p>
            )}
            <p className="text-sm opacity-75">
              {data.personal.email} {data.personal.phone && `• ${data.personal.phone}`}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "summary",
      title: "Professional Summary",
      visible: !!data.personal.summary,
      component: data.personal.summary && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Professional Summary
          </h2>
          {renderHtmlContent(data.personal.summary)}
        </div>
      ),
    },
    {
      id: "education",
      title: "Education",
      visible: data.education.length > 0 && !!data.education[0].university,
      component: data.education.length > 0 && data.education[0].university && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="rounded-lg p-4" style={{ backgroundColor: theme.primary + "10" }}>
                <h3 className="font-semibold text-lg">{edu.university}</h3>
                <p className="font-medium">
                  {edu.degree} {edu.major && `in ${edu.major}`}
                </p>
                <p className="text-sm opacity-75">
                  {edu.startDate && edu.endDate && `${edu.startDate} - ${edu.endDate}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
                {edu.description && <div className="mt-2 text-sm">{renderHtmlContent(edu.description)}</div>}
                {edu.relevantCourses.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Relevant Courses:</p>
                    <div className="flex flex-wrap gap-1">
                      {edu.relevantCourses.map((course, courseIndex) => (
                        <Badge key={courseIndex} variant="secondary" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects",
      visible: data.projects.length > 0 && data.projects.some((p) => p.name),
      component: data.projects.length > 0 && data.projects.some((p) => p.name) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {data.projects
              .filter((p) => p.name)
              .map((project, index) => (
                <div key={index} className="rounded-lg p-4 border" style={{ borderColor: theme.primary + "30" }}>
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  {project.description && <div className="text-sm mb-3">{renderHtmlContent(project.description)}</div>}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} style={accentStyle} className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {project.url && (
                    <p className="text-xs" style={primaryStyle}>
                      {project.url}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Work Experience",
      visible: data.workExperience.length > 0 && data.workExperience.some((w) => w.company),
      component: data.workExperience.length > 0 && data.workExperience.some((w) => w.company) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.workExperience
              .filter((w) => w.company)
              .map((exp, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p style={secondaryStyle}>{exp.company}</p>
                  <p className="text-sm opacity-75">
                    {exp.startDate} - {exp.endDate}
                  </p>
                  {exp.description && <div className="text-sm mt-2">{renderHtmlContent(exp.description)}</div>}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "skills",
      title: "Skills",
      visible: data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.languages.length > 0,
      component: (data.skills.technical.length > 0 ||
        data.skills.soft.length > 0 ||
        data.skills.languages.length > 0) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Skills
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {data.skills.technical.length > 0 && (
              <div>
                <h3 className="font-medium mb-2" style={secondaryStyle}>
                  Technical
                </h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.technical.map((skill, index) => (
                    <Badge key={index} style={accentStyle} className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <h3 className="font-medium mb-2" style={secondaryStyle}>
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.soft.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-medium mb-2" style={secondaryStyle}>
                  Languages
                </h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      id: "extracurriculars",
      title: "Extra Curriculars",
      visible: data.extraCurriculars.length > 0 && data.extraCurriculars.some((e) => e.organization),
      component: data.extraCurriculars.length > 0 && data.extraCurriculars.some((e) => e.organization) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Extra Curricular Activities
          </h2>
          <div className="space-y-3">
            {data.extraCurriculars
              .filter((e) => e.organization)
              .map((activity, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold">{activity.role}</h3>
                  <p style={secondaryStyle}>{activity.organization}</p>
                  <p className="text-sm opacity-75">
                    {activity.startDate} - {activity.endDate}
                  </p>
                  {activity.description && (
                    <div className="text-sm mt-2">{renderHtmlContent(activity.description)}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "volunteer",
      title: "Volunteer Experience",
      visible: data.volunteerExperience.length > 0 && data.volunteerExperience.some((v) => v.organization),
      component: data.volunteerExperience.length > 0 && data.volunteerExperience.some((v) => v.organization) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Volunteer Experience
          </h2>
          <div className="space-y-3">
            {data.volunteerExperience
              .filter((v) => v.organization)
              .map((volunteer, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold">{volunteer.role}</h3>
                  <p style={secondaryStyle}>{volunteer.organization}</p>
                  <p className="text-sm opacity-75">
                    {volunteer.startDate} - {volunteer.endDate}
                  </p>
                  {volunteer.description && (
                    <div className="text-sm mt-2">{renderHtmlContent(volunteer.description)}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "achievements",
      title: "Achievements",
      visible: data.achievements.length > 0 && data.achievements.some((a) => a.title),
      component: data.achievements.length > 0 && data.achievements.some((a) => a.title) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Achievements & Awards
          </h2>
          <div className="space-y-3">
            {data.achievements
              .filter((a) => a.title)
              .map((achievement, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  {achievement.issuer && <p style={secondaryStyle}>{achievement.issuer}</p>}
                  {achievement.date && <p className="text-sm opacity-75">{achievement.date}</p>}
                  {achievement.description && (
                    <div className="text-sm mt-2">{renderHtmlContent(achievement.description)}</div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "certifications",
      title: "Certifications",
      visible: data.certifications.length > 0 && data.certifications.some((c) => c.name),
      component: data.certifications.length > 0 && data.certifications.some((c) => c.name) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Certifications
          </h2>
          <div className="space-y-3">
            {data.certifications
              .filter((c) => c.name)
              .map((cert, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: theme.accent }}>
                  <h3 className="font-semibold">{cert.name}</h3>
                  {cert.issuer && <p style={secondaryStyle}>{cert.issuer}</p>}
                  {cert.date && <p className="text-sm opacity-75">{cert.date}</p>}
                  {cert.credentialURL && (
                    <p className="text-xs" style={primaryStyle}>
                      {cert.credentialURL}
                    </p>
                  )}
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      id: "hobbies",
      title: "Hobbies & Interests",
      visible: data.hobbies.length > 0 && data.hobbies.some((h) => h.name),
      component: data.hobbies.length > 0 && data.hobbies.some((h) => h.name) && (
        <div>
          <h2 className="text-xl font-semibold mb-3" style={primaryStyle}>
            Hobbies & Interests
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.hobbies
              .filter((h) => h.name)
              .map((hobby, index) => (
                <div key={index} className="p-3 rounded-lg" style={{ backgroundColor: theme.primary + "10" }}>
                  <h3 className="font-medium">{hobby.name}</h3>
                  {hobby.description && <div className="text-sm mt-1">{renderHtmlContent(hobby.description)}</div>}
                </div>
              ))}
          </div>
        </div>
      ),
    },
  ])

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newSections = [...sections]
    const draggedSection = newSections[draggedIndex]
    newSections.splice(draggedIndex, 1)
    newSections.splice(index, 0, draggedSection)

    setSections(newSections)
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const toggleSectionVisibility = (index: number) => {
    const newSections = [...sections]
    newSections[index].visible = !newSections[index].visible
    setSections(newSections)
  }

  return (
    <div className="space-y-6">
      {/* Section Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Section Order & Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-move transition-colors ${
                  draggedIndex === index ? "bg-blue-50 border-blue-300" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{section.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleSectionVisibility(index)}
                  className="h-8 w-8 p-0"
                >
                  {section.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`${getSpacing()} ${getPadding()} rounded-lg border`} style={containerStyle}>
            {sections
              .filter((section) => section.visible && section.component)
              .map((section, index) => (
                <div key={`${section.id}-${index}`}>{section.component}</div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
