"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Upload, X } from "lucide-react"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import type { StudentPortfolioData } from "../student-portfolio-data"

interface PersonalInfoEditorProps {
  data: StudentPortfolioData["personal"]
  profileImage: string
  setProfileImage: (image: string) => void
  updateData: (section: string, data: any) => void
  showProfileImage?: boolean
  updateShowProfileImage?: (show: boolean) => void
}

export default function PersonalInfoEditor({
  data,
  profileImage,
  setProfileImage,
  updateData,
  showProfileImage = true,
  updateShowProfileImage,
}: PersonalInfoEditorProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    updateData("personal", {
      ...data,
      [field]: value,
    })
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setProfileImage(result)
    }
    reader.readAsDataURL(file)
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Me</h2>
        <p className="text-gray-600">Tell us about yourself and add your contact information.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={data.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={data.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john.doe@email.com"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Image */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Add a professional photo to your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Profile Image Toggle */}
            {updateShowProfileImage && (
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-profile-image">Show Profile Picture</Label>
                  <p className="text-sm text-gray-500">Toggle whether your profile picture appears in your portfolio</p>
                </div>
                <Switch id="show-profile-image" checked={showProfileImage} onCheckedChange={updateShowProfileImage} />
              </div>
            )}

            {/* Profile Image Upload - Only show if toggle is enabled */}
            {showProfileImage && (
              <div>
                {profileImage && profileImage !== "/placeholder.svg?height=150&width=150" ? (
                  <div className="relative">
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-0 right-0 rounded-full w-6 h-6 p-0"
                      onClick={() => setProfileImage("/placeholder.svg?height=150&width=150")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                      dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("profile-upload")?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    <input
                      id="profile-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary *</CardTitle>
          <CardDescription>
            Write a compelling summary that highlights your key strengths, experiences, and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            value={data.summary}
            onChange={(value) => handleInputChange("summary", value)}
            placeholder="Write a brief professional summary about yourself, your goals, and what makes you unique..."
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Online Presence */}
      <Card>
        <CardHeader>
          <CardTitle>Online Presence</CardTitle>
          <CardDescription>Add links to your professional profiles and portfolio</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="website">Personal Website</Label>
            <Input
              id="website"
              value={data.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://johndoe.com"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={data.github}
              onChange={(e) => handleInputChange("github", e.target.value)}
              placeholder="https://github.com/johndoe"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
