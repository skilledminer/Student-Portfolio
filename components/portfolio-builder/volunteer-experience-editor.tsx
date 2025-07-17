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

export default function VolunteerExperienceEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [volunteerExperience, setVolunteerExperience] = useState(portfolioData.volunteerExperience)

  // Add a new volunteer experience entry
  const handleAddVolunteerExperience = () => {
    const newVolunteerExperience = {
      id: Date.now(),
      organization: "New Organization",
      role: "Volunteer Role",
      startDate: "",
      endDate: "",
      description: "Description of your volunteer work...",
      location: "Location",
    }

    const updatedVolunteerExperience = [...volunteerExperience, newVolunteerExperience]
    setVolunteerExperience(updatedVolunteerExperience)
    updatePortfolioData({ volunteerExperience: updatedVolunteerExperience })

    toast({
      title: "Volunteer experience added",
      description: "New volunteer experience entry has been added. Don't forget to save your changes.",
    })
  }

  // Update volunteer experience entry
  const handleVolunteerExperienceChange = (id, field, value) => {
    const updatedVolunteerExperience = volunteerExperience.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    setVolunteerExperience(updatedVolunteerExperience)
  }

  // Save volunteer experience changes
  const handleSaveVolunteerExperience = (id) => {
    updatePortfolioData({ volunteerExperience })

    toast({
      title: "Volunteer experience updated",
      description: "Your volunteer experience information has been updated.",
    })
  }

  // Delete volunteer experience entry
  const handleDeleteVolunteerExperience = (id) => {
    const updatedVolunteerExperience = volunteerExperience.filter((exp) => exp.id !== id)
    setVolunteerExperience(updatedVolunteerExperience)
    updatePortfolioData({ volunteerExperience: updatedVolunteerExperience })

    toast({
      title: "Volunteer experience deleted",
      description: "The volunteer experience entry has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ volunteerExperience })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All volunteer experience information has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Volunteer Experience</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddVolunteerExperience}>
            <Plus className="mr-2 h-4 w-4" />
            Add Volunteer Experience
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {volunteerExperience.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No volunteer experience entries yet. Click "Add Volunteer Experience" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {volunteerExperience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>
                    {exp.role} at {exp.organization || "New Organization"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteVolunteerExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`organization-${exp.id}`}>Organization</Label>
                    <Input
                      id={`organization-${exp.id}`}
                      value={exp.organization}
                      onChange={(e) => handleVolunteerExperienceChange(exp.id, "organization", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`role-${exp.id}`}>Role</Label>
                    <Input
                      id={`role-${exp.id}`}
                      value={exp.role}
                      onChange={(e) => handleVolunteerExperienceChange(exp.id, "role", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => handleVolunteerExperienceChange(exp.id, "location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleVolunteerExperienceChange(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleVolunteerExperienceChange(exp.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => handleVolunteerExperienceChange(exp.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your volunteer work, impact, and responsibilities"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveVolunteerExperience(exp.id)}>
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
