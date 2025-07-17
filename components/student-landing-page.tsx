"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowRight, Shield, Download, Upload, Sparkles, Users, BookOpen, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import StudentPortfolioBuilder from "./student-portfolio-builder"
import PortfolioLogo from "./portfolio-logo"
import { toast } from "@/components/ui/use-toast"

export default function StudentLandingPage() {
  const [showBuilder, setShowBuilder] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleUploadProfile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(".profile")) {
      toast({
        title: "Invalid File Type",
        description: "Please select a .profile file. Only .profile files created by this app are supported.",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Profile files should be smaller than 10MB. Please check your file.",
        variant: "destructive",
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const profileData = JSON.parse(content)

        // Validate file structure
        if (!profileData.appName || profileData.appName !== "Student Portfolio Builder") {
          throw new Error("Invalid profile file - not created by Student Portfolio Builder")
        }

        if (!profileData.data) {
          throw new Error("Invalid profile file - missing data")
        }

        // Validate required fields
        if (!profileData.data.personal) {
          throw new Error("Invalid profile file - missing personal information")
        }

        setPortfolioData(profileData.data)
        setShowBuilder(true)

        toast({
          title: "Profile Loaded Successfully!",
          description: `Welcome back! Your portfolio data has been restored.`,
        })
      } catch (error) {
        console.error("Profile upload error:", error)
        toast({
          title: "Invalid Profile File",
          description:
            "The selected file is not a valid .profile file created by Student Portfolio Builder. Please check your file and try again.",
          variant: "destructive",
        })
      }
    }

    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Could not read the selected file. Please try again.",
        variant: "destructive",
      })
    }

    reader.readAsText(file)
  }

  if (showBuilder) {
    return <StudentPortfolioBuilder onBack={() => setShowBuilder(false)} initialData={portfolioData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <PortfolioLogo size={40} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="mr-2 h-4 w-4" />
              100% Free • No Registration Required
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Create Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Student Portfolio{" "}
              </span>
              in Minutes
            </h1>

            <p className="mb-8 text-xl text-gray-600 md:text-2xl">
              Build stunning academic profiles, showcase your projects, and download professional PDFs.
              <br />
              <strong className="text-gray-800">Your data stays with you - we don't store anything!</strong>
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold"
                onClick={() => setShowBuilder(true)}
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => uploadRef.current?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Existing .profile File
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-green-500" />
                No Data Stored
              </div>
              <div className="flex items-center">
                <Download className="mr-2 h-4 w-4 text-blue-500" />
                PDF Export
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4 text-purple-500" />
                Student Focused
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Everything You Need as a Student</h2>
            <p className="text-lg text-gray-600">
              Designed specifically for students to showcase their academic journey, projects, and achievements
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Academic Focus</CardTitle>
                <CardDescription>
                  Showcase your education, coursework, GPA, and academic achievements in a professional format
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Project Showcase</CardTitle>
                <CardDescription>
                  Display your projects, internships, research work, and extracurricular activities with images and
                  descriptions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your data never leaves your device. Create, edit, and download everything locally without any
                  registration
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Download className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Professional PDF</CardTitle>
                <CardDescription>
                  Export your portfolio as a clean, professional PDF resume perfect for job applications and internships
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                  <Upload className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Save & Resume</CardTitle>
                <CardDescription>
                  Download your work as a .profile file and upload it later to continue editing - no accounts needed
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Modern Templates</CardTitle>
                <CardDescription>
                  Choose from beautiful, modern templates designed specifically for students and recent graduates
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">How It Works</h2>
            <p className="text-lg text-gray-600">Simple, fast, and completely private</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold">Fill Your Info</h3>
              <p className="text-gray-600">
                Add your personal details, education, projects, and achievements using our simple form
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold">Choose Template</h3>
              <p className="text-gray-600">
                Select from our collection of modern, student-friendly templates and customize colors
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-600">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold">Download & Share</h3>
              <p className="text-gray-600">Export as PDF for applications or save as .profile file to edit later</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Ready to Create Your Portfolio?</h2>
            <p className="mb-8 text-lg text-gray-600">
              Join thousands of students who have created professional portfolios with our free tool
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold"
              onClick={() => setShowBuilder(true)}
            >
              Start Building Now - It's Free!
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Student Portfolio Builder</strong> - Create professional portfolios without compromising your
              privacy
            </p>
            <p className="text-sm">No registration • No data storage • Completely free • Built for students</p>
          </div>
        </div>
      </footer>
      <input ref={uploadRef} type="file" accept=".profile" onChange={handleUploadProfile} className="hidden" />
    </div>
  )
}
