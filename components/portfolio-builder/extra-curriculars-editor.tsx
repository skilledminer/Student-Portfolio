"use client"

import { useState, useContext } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { PortfolioContext } from "../portfolio-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function ExtraCurricularsEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [extraCurriculars, setExtraCurriculars] = useState(portfolioData.extraCurriculars)

  // Add a new extracurricular entry
  const handleAddExtraCurricular = () => {
    const newExtraCurricular = {
      id: Date.now(),
      organization: "New Organization",
      role: "Role/Position",
      startDate: "",
      endDate: "",
      description: "Description of your involvement...",
    }

    const updatedExtraCurriculars = [...extraCurriculars, newExtraCurricular]
    setExtraCurriculars(updatedExtraCurriculars)
    updatePortfolioData({ extraCurriculars: updatedExtraCurriculars })

    toast({
      title: "Extra curricular added",
      description: "New extra curricular entry has been added. Don't forget to save your changes.",
    })
  }

  // Update extracurricular entry
  const handleExtraCurricularChange = (id, field, value) => {
    const updatedExtraCurriculars = extraCurriculars.map((activity) => {
      if (activity.id === id) {
        return { ...activity, [field]: value }
      }
      return activity
    })
    setExtraCurriculars(updatedExtraCurriculars)
  }

  // Save extracurricular changes
  const handleSaveExtraCurricular = (id) => {
    updatePortfolioData({ extraCurriculars })

    toast({
      title: "Extra curricular updated",
      description: "Your extra curricular information has been updated.",
    })
  }

  // Delete extracurricular entry
  const handleDeleteExtraCurricular = (id) => {
    const updatedExtraCurriculars = extraCurriculars.filter((activity) => activity.id !== id)
    setExtraCurriculars(updatedExtraCurriculars)
    updatePortfolioData({ extraCurriculars: updatedExtraCurriculars })

    toast({
      title: "Extra curricular deleted",
      description: "The extra curricular entry has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ extraCurriculars })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All extra curricular information has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Extra Curriculars</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddExtraCurricular}>
            <Plus className="mr-2 h-4 w-4" />
            Add Extra Curricular
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {extraCurriculars.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No extra curricular entries yet. Click "Add Extra Curricular" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {extraCurriculars.map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>
                    {activity.role} at {activity.organization || "New Organization"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteExtraCurricular(activity.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`organization-${activity.id}`}>Organization</Label>
                    <Input
                      id={`organization-${activity.id}`}
                      value={activity.organization}
                      onChange={(e) => handleExtraCurricularChange(activity.id, "organization", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-${activity.id}`}>Role/Position</Label>
                    <Input
                      id={`role-${activity.id}`}
                      value={activity.role}
                      onChange={(e) => handleExtraCurricularChange(activity.id, "role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${activity.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${activity.id}`}
                      type="month"
                      value={activity.startDate}
                      onChange={(e) => handleExtraCurricularChange(activity.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${activity.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${activity.id}`}
                      type="month"
                      value={activity.endDate}
                      onChange={(e) => handleExtraCurricularChange(activity.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${activity.id}`}>Description</Label>
                  <Textarea
                    id={`description-${activity.id}`}
                    value={activity.description}
                    onChange={(e) => handleExtraCurricularChange(activity.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your role, responsibilities, and achievements"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveExtraCurricular(activity.id)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
