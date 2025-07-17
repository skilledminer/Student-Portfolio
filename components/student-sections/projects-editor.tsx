"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface Project {
  id: number
  name: string
  description: string
  technologies: string[]
  url: string
  githubUrl: string
  startDate: string
  endDate: string
}

interface Props {
  data: Project[]
  updateData: (section: string, newData: Project[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function ProjectsEditor({ data, updateData }: Props) {
  const [projects, setProjects] = useState<Project[]>(data)

  const addProject = () => {
    const next: Project[] = [
      ...projects,
      {
        id: Date.now(),
        name: "New Project",
        description: "Project description…",
        technologies: [],
        url: "",
        githubUrl: "",
        startDate: "",
        endDate: "",
      },
    ]
    setProjects(next)
    updateData("projects", next)
    toast({ title: "Project added" })
  }

  const updateField = (id: number, field: keyof Project, value: any) => {
    const next = projects.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    setProjects(next)
    updateData("projects", next)
  }

  const removeProject = (id: number) => {
    const next = projects.filter((p) => p.id !== id)
    setProjects(next)
    updateData("projects", next)
    toast({ title: "Project removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button size="sm" onClick={addProject}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No projects yet. Click “Add Project” to get started.</p>
          </CardContent>
        </Card>
      ) : (
        projects.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{p.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeProject(p.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <Input value={p.name} onChange={(e) => updateField(p.id, "name", e.target.value)} />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={p.description}
                  onChange={(e) => updateField(p.id, "description", e.target.value)}
                  placeholder="What the project does, challenges, accomplishments…"
                />
              </div>

              <div>
                <Label>Technologies (comma-separated)</Label>
                <Input
                  value={p.technologies.join(", ")}
                  onChange={(e) =>
                    updateField(
                      p.id,
                      "technologies",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Project URL</Label>
                  <Input value={p.url} onChange={(e) => updateField(p.id, "url", e.target.value)} />
                </div>
                <div>
                  <Label>GitHub URL</Label>
                  <Input value={p.githubUrl} onChange={(e) => updateField(p.id, "githubUrl", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={p.startDate}
                    onChange={(e) => updateField(p.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={p.endDate}
                    onChange={(e) => updateField(p.id, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
