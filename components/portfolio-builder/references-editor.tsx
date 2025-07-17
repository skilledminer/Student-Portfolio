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

export default function ReferencesEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [references, setReferences] = useState(portfolioData.references)

  // Add a new reference
  const handleAddReference = () => {
    const newReference = {
      id: Date.now(),
      name: "Reference Name",
      relationship: "Professional Relationship",
      company: "Company",
      email: "email@example.com",
      phone: "",
      description: "",
    }

    const updatedReferences = [...references, newReference]
    setReferences(updatedReferences)
    updatePortfolioData({ references: updatedReferences })

    toast({
      title: "Reference added",
      description: "New reference has been added. Don't forget to save your changes.",
    })
  }

  // Update reference
  const handleReferenceChange = (id, field, value) => {
    const updatedReferences = references.map((ref) => {
      if (ref.id === id) {
        return { ...ref, [field]: value }
      }
      return ref
    })
    setReferences(updatedReferences)
  }

  // Save reference changes
  const handleSaveReference = (id) => {
    updatePortfolioData({ references })

    toast({
      title: "Reference updated",
      description: "Your reference information has been updated.",
    })
  }

  // Delete reference
  const handleDeleteReference = (id) => {
    const updatedReferences = references.filter((ref) => ref.id !== id)
    setReferences(updatedReferences)
    updatePortfolioData({ references: updatedReferences })

    toast({
      title: "Reference deleted",
      description: "The reference has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ references })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All references have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">References</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddReference}>
            <Plus className="mr-2 h-4 w-4" />
            Add Reference
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {references.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No references added yet. Click "Add Reference" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {references.map((ref) => (
            <Card key={ref.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{ref.name || "Reference Name"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteReference(ref.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${ref.id}`}>Name</Label>
                    <Input
                      id={`name-${ref.id}`}
                      value={ref.name}
                      onChange={(e) => handleReferenceChange(ref.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`relationship-${ref.id}`}>Relationship</Label>
                    <Input
                      id={`relationship-${ref.id}`}
                      value={ref.relationship}
                      onChange={(e) => handleReferenceChange(ref.id, "relationship", e.target.value)}
                      placeholder="e.g., Former Manager, Colleague, Client"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`company-${ref.id}`}>Company</Label>
                    <Input
                      id={`company-${ref.id}`}
                      value={ref.company}
                      onChange={(e) => handleReferenceChange(ref.id, "company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`email-${ref.id}`}>Email</Label>
                    <Input
                      id={`email-${ref.id}`}
                      type="email"
                      value={ref.email}
                      onChange={(e) => handleReferenceChange(ref.id, "email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`phone-${ref.id}`}>Phone (Optional)</Label>
                  <Input
                    id={`phone-${ref.id}`}
                    value={ref.phone}
                    onChange={(e) => handleReferenceChange(ref.id, "phone", e.target.value)}
                    placeholder="e.g., +1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`description-${ref.id}`}>Additional Notes (Optional)</Label>
                  <Textarea
                    id={`description-${ref.id}`}
                    value={ref.description}
                    onChange={(e) => handleReferenceChange(ref.id, "description", e.target.value)}
                    rows={3}
                    placeholder="Any additional context about this reference"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveReference(ref.id)}>
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
