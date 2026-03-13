"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Upload, X, User } from "lucide-react"
import RichTextEditor from "@/components/ui/rich-text-editor"
import { ValidatedInput } from "@/components/ui/validated-input"

interface PersonalInfoEditorProps {
  data: {
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
  profileImage: string
  setProfileImage: (image: string) => void
  updateData: (section: string, data: any) => void
  showProfileImage: boolean
  updateShowProfileImage: (show: boolean) => void
}

export default function PersonalInfoEditor({
  data,
  profileImage,
  setProfileImage,
  updateData,
  showProfileImage,
  updateShowProfileImage,
}: PersonalInfoEditorProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string) => {
    updateData("personal", { ...data, [field]: value })
  }

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  const removeImage = () => {
    setProfileImage("/placeholder.svg?height=150&width=150")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Picture
              </CardTitle>
              <CardDescription>Upload a professional photo for your portfolio</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="show-profile-image" className="text-sm font-medium">
                Show in portfolio
              </Label>
              <Switch id="show-profile-image" checked={showProfileImage} onCheckedChange={updateShowProfileImage} />
            </div>
          </div>
        </CardHeader>
        {showProfileImage && (
          <CardContent>
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  {profileImage !== "/placeholder.svg?height=150&width=150" && (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={removeImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your image here, or click to browse</p>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    Choose File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG, GIF up to 5MB</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your essential contact details and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <ValidatedInput
                type="text"
                value={data.firstName}
                onChange={(value) => handleInputChange("firstName", value)}
                watermark="Enter your first name (e.g., John)"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <ValidatedInput
                type="text"
                value={data.lastName}
                onChange={(value) => handleInputChange("lastName", value)}
                watermark="Enter your last name (e.g., Doe)"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email *</Label>
              <ValidatedInput
                type="email"
                value={data.email}
                onChange={(value) => handleInputChange("email", value)}
                watermark="Enter your email (e.g., john.doe@gmail.com)"
                allowCommas={false}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <ValidatedInput
                type="phone"
                value={data.phone}
                onChange={(value) => handleInputChange("phone", value)}
                watermark="Enter 10-digit phone number"
                allowCommas={false}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <ValidatedInput
              type="text"
              value={data.location}
              onChange={(value) => handleInputChange("location", value)}
              watermark="Enter your location (e.g., New York, NY, USA)"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary *</CardTitle>
          <CardDescription>A brief overview of your background, skills, and career objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={data.summary}
            onChange={(value) => handleInputChange("summary", value)}
            placeholder="Write a compelling summary highlighting your key strengths, experiences, and career goals. Example: 'Computer Science student with experience in web development and a passion for creating user-friendly applications...'"
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card>
        <CardHeader>
          <CardTitle>Online Presence</CardTitle>
          <CardDescription>Your professional online profiles and portfolio links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website">Personal Website</Label>
            <ValidatedInput
              type="url"
              value={data.website}
              onChange={(value) => handleInputChange("website", value)}
              watermark="Enter your website URL (e.g., https://johndoe.com)"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <ValidatedInput
              type="url"
              value={data.linkedin}
              onChange={(value) => handleInputChange("linkedin", value)}
              watermark="Enter LinkedIn URL (e.g., https://linkedin.com/in/johndoe)"
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub Profile</Label>
            <ValidatedInput
              type="url"
              value={data.github}
              onChange={(value) => handleInputChange("github", value)}
              watermark="Enter GitHub URL (e.g., https://github.com/johndoe)"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
