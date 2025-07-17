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
export interface EducationEntry {
  id: number
  university: string
  degree: string
  major: string
  gpa: string
  startDate: string
  endDate: string
  location: string
  relevantCourses: string[]
  description: string
}

interface Props {
  data: EducationEntry[]
  updateData: (section: string, newData: EducationEntry[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function EducationEditor({ data, updateData }: Props) {
  const [education, setEducation] = useState<EducationEntry[]>(data)

  const sync = (next: EducationEntry[]) => {
    setEducation(next)
    updateData("education", next)
  }

  const addEdu = () => {
    sync([
      ...education,
      {
        id: Date.now(),
        university: "New University",
        degree: "Degree",
        major: "",
        gpa: "",
        startDate: "",
        endDate: "",
        location: "",
        relevantCourses: [],
        description: "",
      },
    ])
    toast({ title: "Education entry added" })
  }

  const updateField = (id: number, field: keyof EducationEntry, value: any) => {
    const next = education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    sync(next)
  }

  const removeEdu = (id: number) => {
    sync(education.filter((e) => e.id !== id))
    toast({ title: "Education entry removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Education</h2>
        <Button size="sm" onClick={addEdu}>
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No education entries yet. Click “Add Education” to begin.</p>
          </CardContent>
        </Card>
      ) : (
        education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {edu.degree} @ {edu.university}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeEdu(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>University / College</Label>
                  <Input value={edu.university} onChange={(e) => updateField(edu.id, "university", e.target.value)} />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input value={edu.degree} onChange={(e) => updateField(edu.id, "degree", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Major / Field</Label>
                  <Input value={edu.major} onChange={(e) => updateField(edu.id, "major", e.target.value)} />
                </div>
                <div>
                  <Label>GPA (optional)</Label>
                  <Input value={edu.gpa} onChange={(e) => updateField(edu.id, "gpa", e.target.value)} />
                </div>
                <div>
                  <Label>Location</Label>
                  <Input value={edu.location} onChange={(e) => updateField(edu.id, "location", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => updateField(edu.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => updateField(edu.id, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div>
                <Label>Relevant Courses (comma-separated)</Label>
                <Input
                  value={edu.relevantCourses.join(", ")}
                  onChange={(e) =>
                    updateField(
                      edu.id,
                      "relevantCourses",
                      e.target.value
                        .split(",")
                        .map((c) => c.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={edu.description}
                  onChange={(e) => updateField(edu.id, "description", e.target.value)}
                  placeholder="Achievements, honors, coursework, etc."
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
