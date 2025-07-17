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
import { Badge } from "@/components/ui/badge"

export default function WorkExperienceEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [workExperience, setWorkExperience] = useState(portfolioData.workExperience)
  const [newAchievements, setNewAchievements] = useState({})

  // Add a new work experience entry
  const handleAddWorkExperience = () => {
    const newWorkExperience = {
      id: Date.now(),
      company: "New Company",
      position: "Position",
      startDate: "",
      endDate: "",
      description: "Description of your role and responsibilities...",
      location: "Location",
      achievements: [],
    }

    const updatedWorkExperience = [...workExperience, newWorkExperience]
    setWorkExperience(updatedWorkExperience)
    updatePortfolioData({ workExperience: updatedWorkExperience })

    toast({
      title: "Work experience added",
      description: "New work experience entry has been added. Don't forget to save your changes.",
    })
  }

  // Update work experience entry
  const handleWorkExperienceChange = (id, field, value) => {
    const updatedWorkExperience = workExperience.map((exp) => {
      if (exp.id === id) {
        return { ...exp, [field]: value }
      }
      return exp
    })
    setWorkExperience(updatedWorkExperience)
  }

  // Handle new achievement input change
  const handleNewAchievementChange = (id, value) => {
    setNewAchievements({
      ...newAchievements,
      [id]: value,
    })
  }

  // Add achievement to work experience
  const handleAddAchievement = (id) => {
    if (!newAchievements[id] || !newAchievements[id].trim()) return

    const updatedWorkExperience = workExperience.map((exp) => {
      if (exp.id === id) {
        return {
          ...exp,
          achievements: [...exp.achievements, newAchievements[id].trim()],
        }
      }
      return exp
    })

    setWorkExperience(updatedWorkExperience)
    setNewAchievements({
      ...newAchievements,
      [id]: "",
    })
  }

  // Remove achievement from work experience
  const handleRemoveAchievement = (expId, achievementIndex) => {
    const updatedWorkExperience = workExperience.map((exp) => {
      if (exp.id === expId) {
        const updatedAchievements = [...exp.achievements]
        updatedAchievements.splice(achievementIndex, 1)
        return { ...exp, achievements: updatedAchievements }
      }
      return exp
    })

    setWorkExperience(updatedWorkExperience)
  }

  // Save work experience changes
  const handleSaveWorkExperience = (id) => {
    updatePortfolioData({ workExperience })

    toast({
      title: "Work experience updated",
      description: "Your work experience information has been updated.",
    })
  }

  // Delete work experience entry
  const handleDeleteWorkExperience = (id) => {
    const updatedWorkExperience = workExperience.filter((exp) => exp.id !== id)
    setWorkExperience(updatedWorkExperience)
    updatePortfolioData({ workExperience: updatedWorkExperience })

    toast({
      title: "Work experience deleted",
      description: "The work experience entry has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ workExperience })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All work experience information has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Work Experience</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddWorkExperience}>
            <Plus className="mr-2 h-4 w-4" />
            Add Work Experience
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {workExperience.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No work experience entries yet. Click "Add Work Experience" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>
                    {exp.position} at {exp.company || "New Company"}
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteWorkExperience(exp.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                    <Input
                      id={`company-${exp.id}`}
                      value={exp.company}
                      onChange={(e) => handleWorkExperienceChange(exp.id, "company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${exp.id}`}>Position</Label>
                    <Input
                      id={`position-${exp.id}`}
                      value={exp.position}
                      onChange={(e) => handleWorkExperienceChange(exp.id, "position", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => handleWorkExperienceChange(exp.id, "location", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleWorkExperienceChange(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleWorkExperienceChange(exp.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => handleWorkExperienceChange(exp.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your role, responsibilities, and impact"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Achievements</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.achievements.map((achievement, index) => (
                      <Badge key={index} className="flex items-center gap-1 px-3 py-1">
                        {achievement}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => handleRemoveAchievement(exp.id, index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a key achievement"
                      value={newAchievements[exp.id] || ""}
                      onChange={(e) => handleNewAchievementChange(exp.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddAchievement(exp.id)
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => handleAddAchievement(exp.id)}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveWorkExperience(exp.id)}>
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
