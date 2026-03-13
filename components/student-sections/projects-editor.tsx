"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import RichTextEditor from "@/components/ui/rich-text-editor"
import { ValidatedInput } from "@/components/ui/validated-input"
import { Plus, Trash2, Edit, Save, X, ExternalLink, Github } from "lucide-react"
import type { StudentPortfolioData } from "../student-portfolio-data"

interface ProjectsEditorProps {
  data: StudentPortfolioData["projects"]
  updateData: (section: string, data: any) => void
}

export default function ProjectsEditor({ data, updateData }: ProjectsEditorProps) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [newTechnology, setNewTechnology] = useState("")

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: "",
      description: "",
      technologies: [],
      url: "",
      githubUrl: "",
      startDate: "",
      endDate: "",
    }
    updateData("projects", [...data, newProject])
    setEditingId(newProject.id)
  }

  const updateProject = (id: number, field: string, value: any) => {
    const updatedData = data.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    updateData("projects", updatedData)
  }

  const deleteProject = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id)
    updateData("projects", updatedData)
  }

  const addTechnology = (id: number) => {
    if (newTechnology.trim()) {
      const project = data.find((item) => item.id === id)
      if (project) {
        const updatedTechnologies = [...project.technologies, newTechnology.trim()]
        updateProject(id, "technologies", updatedTechnologies)
        setNewTechnology("")
      }
    }
  }

  const removeTechnology = (id: number, techIndex: number) => {
    const project = data.find((item) => item.id === id)
    if (project) {
      const updatedTechnologies = project.technologies.filter((_, index) => index !== techIndex)
      updateProject(id, "technologies", updatedTechnologies)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Showcase your personal projects, coursework, and side projects.</p>
        </div>
        <Button onClick={addProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {data.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 mb-4">
                Add your personal projects, coursework, or side projects to showcase your skills.
              </p>
              <Button onClick={addProject}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {data.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name || "New Project"}</CardTitle>
                    {project.technologies.length > 0 && (
                      <CardDescription>
                        {project.technologies.slice(0, 3).join(", ")}
                        {project.technologies.length > 3 && ` +${project.technologies.length - 3} more`}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {editingId === project.id ? (
                      <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>
                        <Save className="h-4 w-4 mr-2" />
                        Done
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => setEditingId(project.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                    <Button variant="destructive" size="sm" onClick={() => deleteProject(project.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingId === project.id ? (
                  <>
                    <div>
                      <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
                      <ValidatedInput
                        type="text"
                        value={project.name}
                        onChange={(value) => updateProject(project.id, "name", value)}
                        watermark="Enter project name (e.g., E-commerce Website, Mobile App)"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`description-${project.id}`}>Project Description *</Label>
                      <RichTextEditor
                        value={project.description}
                        onChange={(value) => updateProject(project.id, "description", value)}
                        placeholder="Describe what your project does, the problem it solves, technologies used, and your role. Example: 'Built a responsive e-commerce website using React and Node.js that allows users to browse products, add to cart, and checkout securely...'"
                      />
                    </div>

                    <div>
                      <Label>Technologies Used</Label>
                      <div className="flex gap-2 mb-2">
                        <ValidatedInput
                          type="text"
                          value={newTechnology}
                          onChange={setNewTechnology}
                          watermark="Add technology (e.g., React, Python, MongoDB)"
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTechnology(project.id)
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={() => addTechnology(project.id)}
                          disabled={!newTechnology.trim()}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {tech}
                            <button
                              onClick={() => removeTechnology(project.id, index)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`url-${project.id}`}>Live Demo URL</Label>
                        <ValidatedInput
                          type="url"
                          value={project.url}
                          onChange={(value) => updateProject(project.id, "url", value)}
                          watermark="Enter live demo URL (e.g., https://myproject.com)"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`githubUrl-${project.id}`}>GitHub Repository</Label>
                        <ValidatedInput
                          type="url"
                          value={project.githubUrl}
                          onChange={(value) => updateProject(project.id, "githubUrl", value)}
                          watermark="Enter GitHub URL (e.g., https://github.com/username/project)"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                        <ValidatedInput
                          type="text"
                          value={project.startDate}
                          onChange={(value) => updateProject(project.id, "startDate", value)}
                          watermark="Enter start date (e.g., January 2024, 01/2024)"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                        <ValidatedInput
                          type="text"
                          value={project.endDate}
                          onChange={(value) => updateProject(project.id, "endDate", value)}
                          watermark="Enter end date (e.g., March 2024, Present)"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {project.description && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Description:</p>
                        <div
                          className="text-sm text-gray-600 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: project.description }}
                        />
                      </div>
                    )}
                    {project.technologies.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {(project.startDate || project.endDate) && (
                      <p className="text-sm text-gray-600">
                        <strong>Duration:</strong> {project.startDate} - {project.endDate || "Present"}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {project.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
