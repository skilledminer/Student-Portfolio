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
export interface ExtraCurricular {
  id: number
  organization: string
  role: string
  startDate: string
  endDate: string
  description: string
}

interface Props {
  data: ExtraCurricular[]
  updateData: (section: string, data: ExtraCurricular[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function ExtraCurricularsEditor({ data, updateData }: Props) {
  const [activities, setActivities] = useState<ExtraCurricular[]>(data)

  const addActivity = () => {
    const next: ExtraCurricular[] = [
      ...activities,
      {
        id: Date.now(),
        organization: "New Organization",
        role: "Role / Position",
        startDate: "",
        endDate: "",
        description: "Describe your involvement, impact, and leadership here…",
      },
    ]
    setActivities(next)
    updateData("extraCurriculars", next)
    toast({ title: "Activity added", description: "New extracurricular entry created." })
  }

  const updateField = (id: number, field: keyof ExtraCurricular, value: string) => {
    const next = activities.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    setActivities(next)
    updateData("extraCurriculars", next)
  }

  const removeActivity = (id: number) => {
    const next = activities.filter((a) => a.id !== id)
    setActivities(next)
    updateData("extraCurriculars", next)
    toast({ title: "Activity removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Extra Curriculars</h2>
        <Button size="sm" onClick={addActivity}>
          <Plus className="mr-2 h-4 w-4" />
          Add Activity
        </Button>
      </div>

      {activities.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No extracurricular entries yet. Click “Add Activity” to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((a) => (
            <Card key={a.id}>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {a.role} @ {a.organization}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeActivity(a.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Organization</Label>
                    <Input value={a.organization} onChange={(e) => updateField(a.id, "organization", e.target.value)} />
                  </div>
                  <div>
                    <Label>Role / Position</Label>
                    <Input value={a.role} onChange={(e) => updateField(a.id, "role", e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={a.startDate}
                      onChange={(e) => updateField(a.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={a.endDate}
                      onChange={(e) => updateField(a.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={a.description}
                    onChange={(e) => updateField(a.id, "description", e.target.value)}
                    placeholder="Describe your responsibilities, impact, leadership, etc."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
