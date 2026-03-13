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
import { Plus, Edit, Trash2, GraduationCap, Calendar, MapPin } from "lucide-react"
import RichTextEditor from "@/components/ui/rich-text-editor"
import { ValidatedInput } from "@/components/ui/validated-input"

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  gpa: string
  description: string
}

interface EducationEditorProps {
  data: Education[]
  updateData: (section: string, data: Education[]) => void
}

export default function EducationEditor({ data, updateData }: EducationEditorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Education | null>(null)
  const [formData, setFormData] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    gpa: "",
    description: "",
  })

  const handleInputChange = (field: keyof Omit<Education, "id">, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (editingItem) {
      const updatedData = data.map((item) => (item.id === editingItem.id ? { ...formData, id: editingItem.id } : item))
      updateData("education", updatedData)
    } else {
      const newItem: Education = {
        ...formData,
        id: Date.now().toString(),
      }
      updateData("education", [...data, newItem])
    }

    setIsDialogOpen(false)
    setEditingItem(null)
    setFormData({
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      gpa: "",
      description: "",
    })
  }

  const handleEdit = (item: Education) => {
    setEditingItem(item)
    setFormData({
      institution: item.institution,
      degree: item.degree,
      field: item.field,
      location: item.location,
      startDate: item.startDate,
      endDate: item.endDate,
      current: item.current,
      gpa: item.gpa,
      description: item.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedData = data.filter((item) => item.id !== id)
    updateData("education", updatedData)
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
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">Add your educational background and qualifications</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Education" : "Add Education"}</DialogTitle>
              <DialogDescription>
                Add details about your educational background, degrees, and academic achievements.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="institution">Institution *</Label>
                <ValidatedInput
                  type="text"
                  value={formData.institution}
                  onChange={(value) => handleInputChange("institution", value)}
                  watermark="Enter school name (e.g., Harvard University, MIT)"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="degree">Degree *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.degree}
                    onChange={(value) => handleInputChange("degree", value)}
                    watermark="Enter degree type (e.g., Bachelor of Science, Master's)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="field">Field of Study *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.field}
                    onChange={(value) => handleInputChange("field", value)}
                    watermark="Enter major/field (e.g., Computer Science, Business)"
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
                  watermark="Enter location (e.g., Cambridge, MA)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.startDate}
                    onChange={(value) => handleInputChange("startDate", value)}
                    watermark="Enter start date (e.g., September 2020)"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <ValidatedInput
                    type="text"
                    value={formData.endDate}
                    onChange={(value) => handleInputChange("endDate", value)}
                    watermark="Enter graduation date (e.g., May 2024)"
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
                <Label htmlFor="current">Currently enrolled</Label>
              </div>

              <div>
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <ValidatedInput
                  type="text"
                  value={formData.gpa}
                  onChange={(value) => handleInputChange("gpa", value)}
                  watermark="Enter GPA (e.g., 3.8/4.0, 3.75)"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => handleInputChange("description", value)}
                  placeholder="Add relevant coursework, academic achievements, honors, thesis work, or other notable academic accomplishments..."
                  className="w-full"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!formData.institution || !formData.degree || !formData.field}>
                {editingItem ? "Update" : "Add"} Education
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No education added yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add your educational background to showcase your academic qualifications and achievements.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Education
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
                      <GraduationCap className="h-5 w-5" />
                      {item.degree} in {item.field}
                    </CardTitle>
                    <CardDescription className="text-base font-medium text-foreground">
                      {item.institution}
                    </CardDescription>
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
                    <div className="flex items-center gap-2 mt-2">
                      {item.current && <Badge variant="secondary">Currently Enrolled</Badge>}
                      {item.gpa && <Badge variant="outline">GPA: {item.gpa}</Badge>}
                    </div>
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
              {item.description && (
                <CardContent>
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.description }} />
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
