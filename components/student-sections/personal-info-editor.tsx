"use client"

import type React from "react"

import { useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  summary: string
  location: string
  website: string
  linkedin: string
  github: string
}

interface PersonalInfoEditorProps {
  data: PersonalInfo
  profileImage: string
  setProfileImage: (image: string) => void
  updateData: (section: string, data: PersonalInfo) => void
}

export default function PersonalInfoEditor({
  data,
  profileImage,
  setProfileImage,
  updateData,
}: PersonalInfoEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateData("personal", { ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-32 w-32">
          <img
            src={profileImage || "/placeholder.svg"}
            alt="Profile"
            className="h-full w-full rounded-full object-cover border-4 border-white shadow-lg"
          />
          <Button
            size="sm"
            className="absolute bottom-0 right-0 rounded-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" value={data.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" value={data.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={data.email} onChange={(e) => handleChange("email", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={data.phone} onChange={(e) => handleChange("phone", e.target.value)} />
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={data.location} onChange={(e) => handleChange("location", e.target.value)} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={data.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={data.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="https://github.com/yourusername"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          rows={4}
          value={data.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          placeholder="Brief description of your academic background and career goals..."
        />
      </div>
    </div>
  )
}
