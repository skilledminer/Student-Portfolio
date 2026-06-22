"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  Upload,
  Eye,
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Award,
  FileText,
  Palette,
  Home,
  Users,
  Heart,
  Lightbulb,
  Trophy,
  UserCheck,
  Smile,
  Save,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ValidatedInput } from "@/components/ui/validated-input"
import { useToast } from "@/hooks/use-toast"
import { getDefaultStudentData, type StudentPortfolioData } from "./student-portfolio-data"
import StudentPortfolioPreview from "./student-portfolio-preview"
import StudentPortfolioPDF from "./student-portfolio-pdf"
import PortfolioLogo from "./portfolio-logo"

// Import section components
import PersonalInfoEditor from "./student-sections/personal-info-editor"
import EducationEditor from "./student-sections/education-editor"
import WorkExperienceEditor from "./student-sections/work-experience-editor"
import ExtraCurricularsEditor from "./student-sections/extra-curriculars-editor"
import VolunteerExperienceEditor from "./student-sections/volunteer-experience-editor"
import ProjectsEditor from "./student-sections/projects-editor"
import SkillsEditor from "./student-sections/skills-editor"
import AchievementsEditor from "./student-sections/achievements-editor"
import CertificationsEditor from "./student-sections/certifications-editor"
import HobbiesEditor from "./student-sections/hobbies-editor"
import ReferencesEditor from "./student-sections/references-editor"
import ThemeEditor from "./student-sections/theme-editor"
import DashboardEditor from "./student-sections/dashboard-editor"

interface StudentPortfolioBuilderProps {
  onBack: () => void
  initialData?: StudentPortfolioData | null
}

export default function StudentPortfolioBuilder({ onBack, initialData }: StudentPortfolioBuilderProps) {
  const [portfolioData, setPortfolioData] = useState<StudentPortfolioData>(initialData || getDefaultStudentData())
  const [profileImage, setProfileImage] = useState<string>(
    initialData?.profileImage || "/placeholder.svg?height=150&width=150",
  )
  const [activeSection, setActiveSection] = useState("dashboard")
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const profileUploadRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const sections = [
    { id: "dashboard", title: "Dashboard", icon: Home },
    { id: "about", title: "About Me", icon: User },
    { id: "projects", title: "Projects", icon: FolderOpen },
    { id: "education", title: "Education", icon: GraduationCap },
    { id: "workExperience", title: "Work Experience", icon: Briefcase },
    { id: "extraCurriculars", title: "Extra Curriculars", icon: Users },
    { id: "volunteerExperience", title: "Volunteer Experience", icon: Heart },
    { id: "skills", title: "Skills", icon: Lightbulb },
    { id: "achievements", title: "Achievements", icon: Trophy },
    { id: "certifications", title: "Certifications", icon: Award },
    { id: "hobbies", title: "Hobbies", icon: Smile },
    { id: "references", title: "References", icon: UserCheck },
    { id: "theme", title: "Design & Theme", icon: Palette },
    { id: "preview", title: "Preview", icon: Eye },
  ]

  // Load data from localStorage on component mount
  useEffect(() => {
    if (!initialData) {
      const savedData = localStorage.getItem("studentPortfolioData")
      const savedImage = localStorage.getItem("studentProfileImage")

      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          // Ensure showProfileImage exists in loaded data
          if (parsedData.showProfileImage === undefined) {
            parsedData.showProfileImage = true
          }
          // Ensure projectName exists
          if (parsedData.projectName === undefined) {
            parsedData.projectName = ""
          }
          setPortfolioData(parsedData)
        } catch (error) {
          console.error("Error loading saved data:", error)
        }
      }

      if (savedImage) {
        setProfileImage(savedImage)
      }
    }
  }, [initialData])

  // Save data to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("studentPortfolioData", JSON.stringify(portfolioData))
  }, [portfolioData])

  // Save profile image to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("studentProfileImage", profileImage)
  }, [profileImage])

  const updateData = (section: string, data: any) => {
    setPortfolioData((prev) => ({ ...prev, [section]: data }))
  }

  const updateShowProfileImage = (show: boolean) => {
    setPortfolioData((prev) => ({
      ...prev,
      showProfileImage: show,
    }))
  }

  const updateProjectName = (name: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      projectName: name,
    }))
  }

  const calculateProgress = () => {
    let completed = 0
    let total = 0

    // Personal info (required fields) - only count if they have actual content
    const personalRequired = ["firstName", "lastName", "email", "summary"]
    personalRequired.forEach((field) => {
      total++
      const value = portfolioData.personal[field as keyof typeof portfolioData.personal]
      if (value && value.trim().length > 0) {
        completed++
      }
    })

    // Education (at least one entry with basic info) - only count if there's meaningful data
    total++
    if (portfolioData.education.length > 0) {
      const firstEducation = portfolioData.education[0]
      if (
        firstEducation.university &&
        firstEducation.university.trim().length > 0 &&
        firstEducation.degree &&
        firstEducation.degree.trim().length > 0
      ) {
        completed++
      }
    }

    // Projects (at least one project with name and description)
    total++
    if (portfolioData.projects.length > 0) {
      const hasCompleteProject = portfolioData.projects.some(
        (project) =>
          project.name &&
          project.name.trim().length > 0 &&
          project.description &&
          project.description.trim().length > 0,
      )
      if (hasCompleteProject) {
        completed++
      }
    }

    // Skills (at least some technical skills)
    total++
    if (portfolioData.skills.technical.length > 0) {
      completed++
    }

    // Work Experience (optional but counts if present)
    total++
    if (portfolioData.workExperience.length > 0) {
      const hasCompleteWork = portfolioData.workExperience.some(
        (work) => work.company && work.company.trim().length > 0 && work.position && work.position.trim().length > 0,
      )
      if (hasCompleteWork) {
        completed++
      }
    }

    // Theme selection (always has default, so only count if changed from default)
    total++
    if (portfolioData.theme.template !== "modern" || portfolioData.theme.colorScheme !== "blue") {
      completed++
    }

    return Math.round((completed / total) * 100)
  }

  const downloadProfileFile = () => {
    const fileName = portfolioData.projectName
      ? `${portfolioData.projectName}.profile`
      : `${portfolioData.personal.firstName || "student"}_${portfolioData.personal.lastName || "portfolio"}.profile`

    const profileData = {
      version: "1.0",
      createdAt: new Date().toISOString(),
      appName: "Student Portfolio Builder",
      data: {
        ...portfolioData,
        profileImage: profileImage,
      },
    }

    const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Profile file downloaded!",
      description: `Saved as ${fileName}`,
    })
  }

  const uploadProfileFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file extension
    if (!file.name.toLowerCase().endsWith(".profile")) {
      toast({
        title: "Invalid File Type",
        description: "Please select a .profile file. Only .profile files created by this app are supported.",
        variant: "destructive",
      })
      // Clear the input
      if (profileUploadRef.current) {
        profileUploadRef.current.value = ""
      }
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Profile files should be smaller than 10MB. Please check your file.",
        variant: "destructive",
      })
      if (profileUploadRef.current) {
        profileUploadRef.current.value = ""
      }
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

        // Ensure showProfileImage exists
        if (profileData.data.showProfileImage === undefined) {
          profileData.data.showProfileImage = true
        }

        // Ensure projectName exists
        if (profileData.data.projectName === undefined) {
          profileData.data.projectName = ""
        }

        setPortfolioData(profileData.data)
        if (profileData.data.profileImage) {
          setProfileImage(profileData.data.profileImage)
        }

        toast({
          title: "Profile Loaded Successfully!",
          description: "Your portfolio data has been restored from the .profile file.",
        })
      } catch (error) {
        console.error("Profile upload error:", error)
        toast({
          title: "Invalid Profile File",
          description:
            "The selected file is not a valid .profile file created by Student Portfolio Builder. Please ensure you're uploading a .profile file.",
          variant: "destructive",
        })
      }
    }

    reader.onerror = () => {
      toast({
        title: "File Read Error",
        description: "Could not read the .profile file. Please try again.",
        variant: "destructive",
      })
    }

    reader.readAsText(file)

    // Clear the input after processing
    if (profileUploadRef.current) {
      profileUploadRef.current.value = ""
    }
  }

  const downloadPDF = async () => {
    if (!portfolioData.personal.firstName || !portfolioData.personal.lastName) {
      toast({
        title: "Missing Information",
        description: "Please add your name in the About Me section before generating PDF.",
        variant: "destructive",
      })
      return
    }

    // Check if we're in the browser
    if (typeof window === "undefined") {
      toast({
        title: "PDF Export Failed",
        description: "PDF generation is only available in the browser.",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingPDF(true)

    try {
      // Dynamic import to prevent SSR issues
      const html2pdf = (await import("html2pdf.js")).default
      const { createRoot } = await import("react-dom/client")

      // Create a temporary container for the PDF content
      const tempContainer = document.createElement("div")
      tempContainer.style.position = "absolute"
      tempContainer.style.left = "-9999px"
      tempContainer.style.top = "-9999px"
      document.body.appendChild(tempContainer)

      // Render the PDF component
      const root = createRoot(tempContainer)

      await new Promise<void>((resolve) => {
        root.render(
          React.createElement(StudentPortfolioPDF, {
            data: portfolioData,
            profileImage: portfolioData.showProfileImage ? profileImage : "",
          }),
        )
        // Give React time to render
        setTimeout(resolve, 100)
      })

      const pdfElement = tempContainer.firstChild as HTMLElement

      const fileName = portfolioData.projectName
        ? `${portfolioData.projectName}.pdf`
        : `${portfolioData.personal.firstName}_${portfolioData.personal.lastName}_Portfolio.pdf`

      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "white",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
      }

      await html2pdf().set(opt).from(pdfElement).save()

      // Cleanup
      root.unmount()
      document.body.removeChild(tempContainer)

      toast({
        title: "PDF Downloaded!",
        description: `Your portfolio has been saved as ${fileName}`,
      })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "PDF Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardEditor data={portfolioData} setActiveSection={setActiveSection} />
      case "about":
        return (
          <PersonalInfoEditor
            data={portfolioData.personal}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            updateData={updateData}
            showProfileImage={portfolioData.showProfileImage}
            updateShowProfileImage={updateShowProfileImage}
          />
        )
      case "education":
        return <EducationEditor data={portfolioData.education} updateData={updateData} />
      case "workExperience":
        return <WorkExperienceEditor data={portfolioData.workExperience} updateData={updateData} />
      case "extraCurriculars":
        return <ExtraCurricularsEditor data={portfolioData.extraCurriculars} updateData={updateData} />
      case "volunteerExperience":
        return <VolunteerExperienceEditor data={portfolioData.volunteerExperience} updateData={updateData} />
      case "projects":
        return <ProjectsEditor data={portfolioData.projects} updateData={updateData} />
      case "skills":
        return <SkillsEditor data={portfolioData.skills} updateData={updateData} />
      case "achievements":
        return <AchievementsEditor data={portfolioData.achievements} updateData={updateData} />
      case "certifications":
        return <CertificationsEditor data={portfolioData.certifications} updateData={updateData} />
      case "hobbies":
        return <HobbiesEditor data={portfolioData.hobbies} updateData={updateData} />
      case "references":
        return <ReferencesEditor data={portfolioData.references} updateData={updateData} />
      case "theme":
        return <ThemeEditor data={portfolioData.theme} updateData={updateData} />
      case "preview":
        return (
          <StudentPortfolioPreview
            data={portfolioData}
            profileImage={portfolioData.showProfileImage ? profileImage : ""}
          />
        )
      default:
        return <div>Section not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <PortfolioLogo size={32} />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Portfolio Builder</h1>
                <p className="text-sm text-gray-500">Build your professional portfolio</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Progress:</span>
                <Progress value={calculateProgress()} className="w-24" />
                <span className="text-sm font-medium text-gray-900">{calculateProgress()}%</span>
              </div>
              <div className="flex items-center gap-2">
                <ValidatedInput
                  type="text"
                  value={portfolioData.projectName || ""}
                  onChange={updateProjectName}
                  watermark="Enter project name (e.g., My Portfolio)"
                  className="w-40"
                />
              </div>
              <input
                ref={profileUploadRef}
                type="file"
                accept=".profile"
                onChange={uploadProfileFile}
                className="hidden"
              />
              <Button variant="outline" size="sm" onClick={() => profileUploadRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" />
                Upload .profile File
              </Button>
              <Button variant="outline" size="sm" onClick={downloadProfileFile}>
                <Save className="mr-2 h-4 w-4" />
                Save .profile
              </Button>
              <Button size="sm" onClick={downloadPDF} disabled={isGeneratingPDF}>
                <FileText className="mr-2 h-4 w-4" />
                {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant={activeSection === section.id ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveSection(section.id)}
                    >
                      <section.icon className="mr-2 h-4 w-4" />
                      {section.title}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{sections.find((s) => s.id === activeSection)?.title}</CardTitle>
                <CardDescription>
                  {activeSection === "dashboard" && "Overview of your portfolio completion and quick actions"}
                  {activeSection === "about" && "Add your basic information and professional summary"}
                  {activeSection === "education" && "Include your academic background and achievements"}
                  {activeSection === "workExperience" && "Add internships, jobs, and work experience"}
                  {activeSection === "extraCurriculars" && "Include clubs, organizations, and leadership roles"}
                  {activeSection === "volunteerExperience" && "Add volunteer work and community service"}
                  {activeSection === "projects" && "Showcase your projects and technical work"}
                  {activeSection === "skills" && "List your technical and soft skills"}
                  {activeSection === "achievements" && "Add awards, honors, and recognitions"}
                  {activeSection === "certifications" && "Include professional certifications and licenses"}
                  {activeSection === "hobbies" && "Share your interests and hobbies"}
                  {activeSection === "references" && "Add professional and academic references"}
                  {activeSection === "theme" && "Customize the look and feel of your portfolio"}
                  {activeSection === "preview" && "Review your portfolio before downloading"}
                </CardDescription>
              </CardHeader>
              <CardContent>{renderActiveSection()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
