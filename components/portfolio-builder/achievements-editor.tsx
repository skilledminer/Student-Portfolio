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

export default function AchievementsEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [achievements, setAchievements] = useState(portfolioData.achievements)

  // Add a new achievement
  const handleAddAchievement = () => {
    const newAchievement = {
      id: Date.now(),
      title: "New Achievement",
      date: "",
      description: "Description of your achievement...",
      issuer: "",
    }

    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    updatePortfolioData({ achievements: updatedAchievements })

    toast({
      title: "Achievement added",
      description: "New achievement has been added. Don't forget to save your changes.",
    })
  }

  // Update achievement
  const handleAchievementChange = (id, field, value) => {
    const updatedAchievements = achievements.map((achievement) => {
      if (achievement.id === id) {
        return { ...achievement, [field]: value }
      }
      return achievement
    })
    setAchievements(updatedAchievements)
  }

  // Save achievement changes
  const handleSaveAchievement = (id) => {
    updatePortfolioData({ achievements })

    toast({
      title: "Achievement updated",
      description: "Your achievement information has been updated.",
    })
  }

  // Delete achievement
  const handleDeleteAchievement = (id) => {
    const updatedAchievements = achievements.filter((achievement) => achievement.id !== id)
    setAchievements(updatedAchievements)
    updatePortfolioData({ achievements: updatedAchievements })

    toast({
      title: "Achievement deleted",
      description: "The achievement has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ achievements })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All achievements have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddAchievement}>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {achievements.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No achievements added yet. Click "Add Achievement" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{achievement.title || "New Achievement"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteAchievement(achievement.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`title-${achievement.id}`}>Title</Label>
                    <Input
                      id={`title-${achievement.id}`}
                      value={achievement.title}
                      onChange={(e) => handleAchievementChange(achievement.id, "title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${achievement.id}`}>Issuer/Organization</Label>
                    <Input
                      id={`issuer-${achievement.id}`}
                      value={achievement.issuer}
                      onChange={(e) => handleAchievementChange(achievement.id, "issuer", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`date-${achievement.id}`}>Date</Label>
                  <Input
                    id={`date-${achievement.id}`}
                    type="month"
                    value={achievement.date}
                    onChange={(e) => handleAchievementChange(achievement.id, "date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${achievement.id}`}>Description</Label>
                  <Textarea
                    id={`description-${achievement.id}`}
                    value={achievement.description}
                    onChange={(e) => handleAchievementChange(achievement.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Describe your achievement, its significance, and impact"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveAchievement(achievement.id)}>
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
