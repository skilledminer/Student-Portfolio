"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Briefcase, Calendar, MapPin } from "lucide-react"
import RichTextEditor from "@/components/ui/rich-text-editor"
import { ValidatedInput } from "@/components/ui/validated-input"

interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface WorkExperienceEditorProps {
  data: WorkExperience[]
  updateData: (section: string, data: WorkExperience[]) => void
}

export default function WorkExperienceEditor({ data, updateData }: WorkExperienceEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<WorkExperience | null>(null)
  const [formData, setFormData] = useState<Omit<WorkExperience, "id">>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  const handleInputChange = (field: keyof Omit<WorkExperience, "id">, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (editingItem) {
      const updatedData = data.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item))
      updateData("workExperience", updatedData)
    } else {
      const newItem: WorkExperience = {
        ...formData,
        id: Date.now().toString(),
      }
      updateData("workExperience", [...data, newItem])
    }

    setIsDialogOpen(false)
    setEditingItem(null)
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
  }

  const handleEdit = (item: WorkExperience) => {
    setEditingItem(item)
    setFormData({
      company: item.company,
      position: item.position,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      description: item.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id)
    updateData("workExperience", updatedData)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <p className="text-muted-foreground">Add your professional work experience and internships</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Work Experience" : "Add Work Experience"}</DialogTitle>
              <DialogDescription>
                Add details about your work experience, internships, or part-time jobs.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.company}
                    onChange={(value) => handleInputChange("company", value)}
                    watermark="Enter company name (e.g., Google, Microsoft)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.position}
                    onChange={(value) => handleInputChange("position", value)}
                    watermark="Enter job title (e.g., Software Engineer Intern)"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <ValidatedInput
                  type="text"
                  value={formData.location}
                  onChange={(value) => handleInputChange("location", value)}
                  watermark="Enter location (e.g., San Francisco, CA or Remote)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.startDate}
                    onChange={(value) => handleInputChange("startDate", value)}
                    watermark="Enter start date (e.g., June 2023)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.endDate}
                    onChange={(value) => handleInputChange("endDate", value)}
                    watermark="Enter end date (e.g., August 2023) or leave blank if current"
                    disabled={formData.current}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={formData.current}
                  onChange={(e) => handleInputChange("current", e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="current">I currently work here</Label>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleInputChange("description", value)}
                  placeholder="Describe your responsibilities, achievements, and key projects. Use bullet points to highlight specific accomplishments and quantify results where possible..."
                  className="w-full"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.company || !formData.position || !formData.description}
              >
                {editingItem ? "Update" : "Add"} Experience
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No work experience added yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add your work experience, internships, and part-time jobs to showcase your professional background.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </CardContent>
          </Card>
        ) : (
          data.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      {item.position}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">{item.company}</CardDescription>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.startDate)} - {item.current ? "Present" : formatDate(item.endDate)}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                      )}
                    </div>
                    {item.current && (
                      <Badge variant="secondary" className="mt-2 w-fit">
                        Current Position
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.description }} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
