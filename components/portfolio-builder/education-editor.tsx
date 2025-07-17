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

export default function EducationEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [education, setEducation] = useState(portfolioData.education)

  // Add a new education entry
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      institution: "New Institution",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      startDate: "",
      endDate: "",
      description: "Description of your education...",
      location: "Location",
      gpa: "",
    }

    const updatedEducation = [...education, newEducation]
    setEducation(updatedEducation)
    updatePortfolioData({ education: updatedEducation })

    toast({
      title: "Education added",
      description: "New education entry has been added. Don't forget to save your changes.",
    })
  }

  // Update education entry
  const handleEducationChange = (id, field, value) => {
    const updatedEducation = education.map((edu) => {
      if (edu.id === id) {
        return { ...edu, [field]: value }
      }
      return edu
    })
    setEducation(updatedEducation)
  }

  // Save education changes
  const handleSaveEducation = (id) => {
    updatePortfolioData({ education })

    toast({
      title: "Education updated",
      description: "Your education information has been updated.",
    })
  }

  // Delete education entry
  const handleDeleteEducation = (id) => {
    const updatedEducation = education.filter((edu) => edu.id !== id)
    setEducation(updatedEducation)
    updatePortfolioData({ education: updatedEducation })

    toast({
      title: "Education deleted",
      description: "The education entry has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ education })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All education information has been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddEducation}>
            <Plus className="mr-2 h-4 w-4" />
            Add Education
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {education.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No education entries yet. Click "Add Education" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{edu.institution || "New Institution"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteEducation(edu.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                    <Input
                      id={`institution-${edu.id}`}
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`location-${edu.id}`}>Location</Label>
                    <Input
                      id={`location-${edu.id}`}
                      value={edu.location}
                      onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(edu.id, "fieldOfStudy", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${edu.id}`}
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${edu.id}`}
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                    <Input
                      id={`gpa-${edu.id}`}
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                      placeholder="e.g., 3.8/4.0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${edu.id}`}>Description</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    value={edu.description}
                    onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your education, achievements, relevant coursework, etc."
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveEducation(edu.id)}>
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
