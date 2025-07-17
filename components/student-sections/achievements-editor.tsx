"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface Achievement {
  id: number
  title: string
  date: string
  description: string
  issuer: string
}

interface AchievementsEditorProps {
  data: Achievement[]
  updateData: (section: string, data: Achievement[]) => void
}

export default function AchievementsEditor({ data, updateData }: AchievementsEditorProps) {
  const [achievements, setAchievements] = useState<Achievement[]>(data)

  const handleAddAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now(),
      title: "New Achievement",
      date: "",
      description: "Description of your achievement...",
      issuer: "",
    }

    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    updateData("achievements", updatedAchievements)

    toast({
      title: "Achievement added",
      description: "New achievement has been added.",
    })
  }

  const handleAchievementChange = (id: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = achievements.map((achievement) => {
      if (achievement.id === id) {
        return { ...achievement, [field]: value }
      }
      return achievement
    })
    setAchievements(updatedAchievements)
    updateData("achievements", updatedAchievements)
  }

  const handleDeleteAchievement = (id: number) => {
    const updatedAchievements = achievements.filter((achievement) => achievement.id !== id)
    setAchievements(updatedAchievements)
    updateData("achievements", updatedAchievements)

    toast({
      title: "Achievement deleted",
      description: "The achievement has been removed.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <Button size="sm" onClick={handleAddAchievement}>
          <Plus className="mr-2 h-4 w-4" />
          Add Achievement
        </Button>
      </div>

      {achievements.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No achievements added yet. Click "Add Achievement" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          {achievements.map((achievement) => (
            <Card key={achievement.id}>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg">{achievement.title || "New Achievement"}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAchievement(achievement.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
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
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
