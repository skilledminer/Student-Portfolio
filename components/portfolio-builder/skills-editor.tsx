"use client"

import { useState, useContext } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { PortfolioContext } from "../portfolio-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function SkillsEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [skills, setSkills] = useState(portfolioData.skills)

  // Add a new skill
  const handleAddSkill = () => {
    const newSkill = {
      skill: "New Skill",
      level: 50,
    }

    const updatedSkills = [...skills, newSkill]
    setSkills(updatedSkills)
    updatePortfolioData({ skills: updatedSkills })

    toast({
      title: "Skill added",
      description: "New skill has been added. Don't forget to save your changes.",
    })
  }

  // Update skill
  const handleSkillChange = (index, field, value) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = { ...updatedSkills[index], [field]: value }
    setSkills(updatedSkills)
  }

  // Delete skill
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index)
    setSkills(updatedSkills)
    updatePortfolioData({ skills: updatedSkills })

    toast({
      title: "Skill deleted",
      description: "The skill has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ skills })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All skills have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddSkill}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.length === 0 ? (
            <div className="text-center text-muted-foreground">
              <p>No skills added yet. Click "Add Skill" to get started.</p>
            </div>
          ) : (
            skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <Input
                      value={skill.skill}
                      onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                      className="w-full max-w-[200px]"
                      placeholder="Skill name"
                    />
                    <span className="text-sm">{skill.level}%</span>
                  </div>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, "level", Number.parseInt(e.target.value))}
                    className="h-2"
                  />
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteSkill(index)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            ))
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
