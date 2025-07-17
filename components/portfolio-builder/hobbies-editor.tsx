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

export default function HobbiesEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [hobbies, setHobbies] = useState(portfolioData.hobbies)

  // Add a new hobby
  const handleAddHobby = () => {
    const newHobby = {
      id: Date.now(),
      name: "New Hobby",
      description: "Description of your hobby...",
    }

    const updatedHobbies = [...hobbies, newHobby]
    setHobbies(updatedHobbies)
    updatePortfolioData({ hobbies: updatedHobbies })

    toast({
      title: "Hobby added",
      description: "New hobby has been added. Don't forget to save your changes.",
    })
  }

  // Update hobby
  const handleHobbyChange = (id, field, value) => {
    const updatedHobbies = hobbies.map((hobby) => {
      if (hobby.id === id) {
        return { ...hobby, [field]: value }
      }
      return hobby
    })
    setHobbies(updatedHobbies)
  }

  // Save hobby changes
  const handleSaveHobby = (id) => {
    updatePortfolioData({ hobbies })

    toast({
      title: "Hobby updated",
      description: "Your hobby information has been updated.",
    })
  }

  // Delete hobby
  const handleDeleteHobby = (id) => {
    const updatedHobbies = hobbies.filter((hobby) => hobby.id !== id)
    setHobbies(updatedHobbies)
    updatePortfolioData({ hobbies: updatedHobbies })

    toast({
      title: "Hobby deleted",
      description: "The hobby has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ hobbies })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All hobbies have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hobbies & Interests</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddHobby}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hobby
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {hobbies.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No hobbies added yet. Click "Add Hobby" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {hobbies.map((hobby) => (
            <Card key={hobby.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{hobby.name || "New Hobby"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteHobby(hobby.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`name-${hobby.id}`}>Hobby Name</Label>
                  <Input
                    id={`name-${hobby.id}`}
                    value={hobby.name}
                    onChange={(e) => handleHobbyChange(hobby.id, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${hobby.id}`}>Description</Label>
                  <Textarea
                    id={`description-${hobby.id}`}
                    value={hobby.description}
                    onChange={(e) => handleHobbyChange(hobby.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your hobby, what you enjoy about it, and any achievements"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveHobby(hobby.id)}>
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
