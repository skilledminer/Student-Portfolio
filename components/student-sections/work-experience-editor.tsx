"use client"

import type { StudentPortfolioData } from "../student-portfolio-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface WorkExperienceEditorProps {
  data: StudentPortfolioData["workExperience"]
  updateData: (section: string, newData: any) => void
}

export default function WorkExperienceEditor({ data, updateData }: WorkExperienceEditorProps) {
  const updateEntry = (index: number, updated: any) => {
    const copy = [...data]
    copy[index] = updated
    updateData("workExperience", copy)
  }

  const removeEntry = (index: number) => {
    updateData(
      "workExperience",
      data.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      {data.map((exp, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-lg">Experience #{idx + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Company / Organization</Label>
                <Input value={exp.company} onChange={(e) => updateEntry(idx, { ...exp, company: e.target.value })} />
              </div>
              <div>
                <Label>Position</Label>
                <Input value={exp.position} onChange={(e) => updateEntry(idx, { ...exp, position: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Start Date</Label>
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateEntry(idx, { ...exp, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input value={exp.endDate} onChange={(e) => updateEntry(idx, { ...exp, endDate: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateEntry(idx, { ...exp, description: e.target.value })}
              />
            </div>
            <Button variant="destructive" size="sm" onClick={() => removeEntry(idx)}>
              Remove Experience
            </Button>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        onClick={() =>
          updateData("workExperience", [
            ...data,
            { company: "", position: "", startDate: "", endDate: "", description: "" },
          ])
        }
      >
        Add Experience
      </Button>
    </div>
  )
}
