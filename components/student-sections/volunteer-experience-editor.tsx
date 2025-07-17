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
export interface VolunteerEntry {
  id: number
  organization: string
  role: string
  startDate: string
  endDate: string
  location: string
  description: string
}

interface Props {
  data: VolunteerEntry[]
  updateData: (section: string, newData: VolunteerEntry[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function VolunteerExperienceEditor({ data, updateData }: Props) {
  const [entries, setEntries] = useState<VolunteerEntry[]>(data)

  const addEntry = () => {
    const next: VolunteerEntry[] = [
      ...entries,
      {
        id: Date.now(),
        organization: "New Organization",
        role: "Volunteer Role",
        startDate: "",
        endDate: "",
        location: "",
        description: "Describe your volunteer work, impact, and responsibilities…",
      },
    ]
    setEntries(next)
    updateData("volunteerExperience", next)
    toast({ title: "Volunteer experience added" })
  }

  const updateField = (id: number, field: keyof VolunteerEntry, value: string) => {
    const next = entries.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    setEntries(next)
    updateData("volunteerExperience", next)
  }

  const removeEntry = (id: number) => {
    const next = entries.filter((e) => e.id !== id)
    setEntries(next)
    updateData("volunteerExperience", next)
    toast({ title: "Volunteer experience removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Volunteer Experience</h2>
        <Button size="sm" onClick={addEntry}>
          <Plus className="mr-2 h-4 w-4" />
          Add Volunteer
        </Button>
      </div>

      {entries.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No volunteer experience yet. Click “Add Volunteer” to get started.</p>
          </CardContent>
        </Card>
      ) : (
        entries.map((v) => (
          <Card key={v.id}>
            <CardHeader>
              <div className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">
                  {v.role} @ {v.organization}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeEntry(v.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label>Organization</Label>
                  <Input value={v.organization} onChange={(e) => updateField(v.id, "organization", e.target.value)} />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input value={v.role} onChange={(e) => updateField(v.id, "role", e.target.value)} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Location</Label>
                  <Input value={v.location} onChange={(e) => updateField(v.id, "location", e.target.value)} />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={v.startDate}
                    onChange={(e) => updateField(v.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={v.endDate}
                    onChange={(e) => updateField(v.id, "endDate", e.target.value)}
                    placeholder="Present"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={v.description}
                  onChange={(e) => updateField(v.id, "description", e.target.value)}
                  placeholder="Describe your volunteer activities, impact, leadership, etc."
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
