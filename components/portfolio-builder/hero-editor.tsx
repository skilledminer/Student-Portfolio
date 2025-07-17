"use client"

import { useState, useContext } from "react"
import { Edit } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { PortfolioContext } from "../portfolio-builder"

export default function HeroEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)

  // Local state for form values
  const [name, setName] = useState(portfolioData.name)
  const [title, setTitle] = useState(portfolioData.title)
  const [primaryCta, setPrimaryCta] = useState(portfolioData.primaryCta.text)
  const [primaryCtaLink, setPrimaryCtaLink] = useState(portfolioData.primaryCta.link)
  const [secondaryCta, setSecondaryCta] = useState(portfolioData.secondaryCta.text)
  const [secondaryCtaLink, setSecondaryCtaLink] = useState(portfolioData.secondaryCta.link)

  // Settings state
  const [showSocial, setShowSocial] = useState(true)
  const [showBgImage, setShowBgImage] = useState(false)
  const [animatedText, setAnimatedText] = useState(true)

  // Handle form submission
  const handleSave = () => {
    updatePortfolioData({
      name,
      title,
      primaryCta: {
        text: primaryCta,
        link: primaryCtaLink,
      },
      secondaryCta: {
        text: secondaryCta,
        link: secondaryCtaLink,
      },
    })

    toast({
      title: "Hero section updated",
      description: "Your hero section has been updated successfully.",
    })

    saveChanges()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hero Section</h2>
        <Button size="sm" onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Edit your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
              <img src="/placeholder.svg?height=128&width=128" alt="Profile" className="h-full w-full object-cover" />
              <Button
                size="sm"
                variant="secondary"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                onClick={() => {
                  toast({
                    title: "Upload image",
                    description: "Image upload functionality would be implemented here.",
                  })
                }}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Profile Picture</span>
              </Button>
            </div>
            <div className="space-y-4 sm:flex-1">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Call-to-Action Buttons</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primary-cta">Primary Button Text</Label>
                <Input id="primary-cta" value={primaryCta} onChange={(e) => setPrimaryCta(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primary-cta-link">Primary Button Link</Label>
                <Input
                  id="primary-cta-link"
                  value={primaryCtaLink}
                  onChange={(e) => setPrimaryCtaLink(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-cta">Secondary Button Text</Label>
                <Input id="secondary-cta" value={secondaryCta} onChange={(e) => setSecondaryCta(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-cta-link">Secondary Button Link</Label>
                <Input
                  id="secondary-cta-link"
                  value={secondaryCtaLink}
                  onChange={(e) => setSecondaryCtaLink(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section Settings</CardTitle>
          <CardDescription>Customize the appearance of your hero section</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Social Media Icons</Label>
                <p className="text-sm text-gray-500">Display your social media profiles</p>
              </div>
              <Switch checked={showSocial} onCheckedChange={setShowSocial} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Background Image</Label>
                <p className="text-sm text-gray-500">Add a background image to the hero section</p>
              </div>
              <Switch checked={showBgImage} onCheckedChange={setShowBgImage} />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Animated Text</Label>
                <p className="text-sm text-gray-500">Add typing animation to your title</p>
              </div>
              <Switch checked={animatedText} onCheckedChange={setAnimatedText} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
