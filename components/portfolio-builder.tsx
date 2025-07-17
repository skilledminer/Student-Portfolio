"use client"

import { useState, createContext } from "react"
import {
  Home,
  User,
  FolderKanban,
  Mail,
  Settings,
  Eye,
  EyeOff,
  Save,
  Layout,
  GraduationCap,
  Briefcase,
  Users,
  Heart,
  Lightbulb,
  Trophy,
  Award,
  UserCheck,
  ArrowLeft,
  Palette,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// Import modular components
import DashboardPanel from "./portfolio-builder/dashboard-panel"
import HeroEditor from "./portfolio-builder/hero-editor"
import PortfolioPreview from "./portfolio-preview"

// Import editor components
import EducationEditorComponent from "./portfolio-builder/education-editor"
import WorkExperienceEditorComponent from "./portfolio-builder/work-experience-editor"
import ExtraCurricularsEditorComponent from "./portfolio-builder/extra-curriculars-editor"
import VolunteerExperienceEditor from "./portfolio-builder/volunteer-experience-editor"
import SkillsEditor from "./portfolio-builder/skills-editor"
import AchievementsEditor from "./portfolio-builder/achievements-editor"
import CertificationsEditor from "./portfolio-builder/certifications-editor"
import HobbiesEditor from "./portfolio-builder/hobbies-editor"
import ReferencesEditor from "./portfolio-builder/references-editor"

// Import types and default data
import { getDefaultPortfolioData, type PortfolioData } from "./portfolio-data"

// Create the context directly in this file
export const PortfolioContext = createContext({
  portfolioData: {} as PortfolioData,
  updatePortfolioData: (newData: Partial<PortfolioData>) => {},
  unsavedChanges: false,
  saveChanges: () => {},
})

const builderSections = [
  { title: "Dashboard", icon: Home, id: "dashboard" },
  { title: "Hero Section", icon: Layout, id: "hero" },
  { title: "Projects", icon: FolderKanban, id: "projects" },
  { title: "Education", icon: GraduationCap, id: "education" },
  { title: "Work Experience", icon: Briefcase, id: "workExperience" },
  { title: "Extra Curriculars", icon: Users, id: "extraCurriculars" },
  { title: "Volunteer Experience", icon: Heart, id: "volunteerExperience" },
  { title: "About Me", icon: User, id: "about" },
  { title: "Skills", icon: Lightbulb, id: "skills" },
  { title: "Achievements", icon: Trophy, id: "achievements" },
  { title: "Certifications", icon: Award, id: "certifications" },
  { title: "Hobbies", icon: Palette, id: "hobbies" },
  { title: "References", icon: UserCheck, id: "references" },
  { title: "Contact", icon: Mail, id: "contact" },
  { title: "Settings", icon: Settings, id: "settings" },
]

interface PortfolioBuilderProps {
  portfolioId: string
  onBack: () => void
}

export default function PortfolioBuilder({ portfolioId, onBack }: PortfolioBuilderProps) {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [showPreview, setShowPreview] = useState(true)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Load portfolio data from localStorage or use default
  const [portfolioData, setPortfolioData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(`portfolio-data-${portfolioId}`)
      if (savedData) {
        return JSON.parse(savedData)
      }
    }
    return getDefaultPortfolioData()
  })

  // Function to update portfolio data
  const updatePortfolioData = (newData) => {
    setPortfolioData((prev) => ({ ...prev, ...newData }))
    setUnsavedChanges(true)
  }

  // Function to save changes
  const saveChanges = () => {
    // Save to localStorage
    localStorage.setItem(`portfolio-data-${portfolioId}`, JSON.stringify(portfolioData))

    // Update last edited timestamp in portfolios list
    const savedPortfolios = localStorage.getItem("portfolios")
    if (savedPortfolios) {
      const portfolios = JSON.parse(savedPortfolios)
      const updatedPortfolios = portfolios.map((p) => {
        if (p.id === portfolioId) {
          return {
            ...p,
            lastEdited: new Date().toISOString(),
            template: portfolioData.theme.template,
          }
        }
        return p
      })
      localStorage.setItem("portfolios", JSON.stringify(updatedPortfolios))
    }

    toast({
      title: "Changes saved",
      description: "Your portfolio changes have been saved successfully.",
      action: <ToastAction altText="OK">OK</ToastAction>,
    })
    setUnsavedChanges(false)
  }

  return (
    <PortfolioContext.Provider value={{ portfolioData, updatePortfolioData, unsavedChanges, saveChanges }}>
      <div className="flex h-screen w-full overflow-hidden bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white">
          <div className="flex items-center gap-2 border-b px-4 py-6">
            <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-bold">Portfolio Builder</h1>
          </div>
          <div className="p-4">
            <div className="space-y-1">
              {builderSections.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(item.id)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              ))}
            </div>
          </div>
          <div className="border-t p-4">
            <Button className="w-full" onClick={saveChanges} disabled={!unsavedChanges}>
              <Save className="mr-2 h-4 w-4" />
              {unsavedChanges ? "Save Changes" : "All Changes Saved"}
            </Button>
          </div>
        </div>

        <main className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium">Portfolio Builder</h2>
              {unsavedChanges && (
                <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700">
                  Unsaved Changes
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="preview-mode" checked={showPreview} onCheckedChange={setShowPreview} />
                <Label htmlFor="preview-mode">Preview</Label>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Show Preview
                  </>
                )}
              </Button>
              <Button size="sm" onClick={saveChanges} disabled={!unsavedChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          <div className="h-[calc(100vh-65px)] overflow-auto">
            <div className={`grid ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} h-full`}>
              {/* Builder Panel */}
              <div className="overflow-auto border-r p-6">
                {activeSection === "dashboard" && <DashboardPanel setActiveSection={setActiveSection} />}
                {activeSection === "hero" && <HeroEditor />}
                {activeSection === "education" && <EducationEditorComponent />}
                {activeSection === "workExperience" && <WorkExperienceEditorComponent />}
                {activeSection === "extraCurriculars" && <ExtraCurricularsEditorComponent />}
                {activeSection === "volunteerExperience" && <VolunteerExperienceEditor />}
                {activeSection === "skills" && <SkillsEditor />}
                {activeSection === "achievements" && <AchievementsEditor />}
                {activeSection === "certifications" && <CertificationsEditor />}
                {activeSection === "hobbies" && <HobbiesEditor />}
                {activeSection === "references" && <ReferencesEditor />}
                {/* Other sections would be imported and used here */}
              </div>

              {/* Preview Panel */}
              {showPreview && (
                <div className="overflow-auto border-l bg-white p-6">
                  <div className="mx-auto max-w-3xl">
                    <div className="mb-4 rounded-md bg-gray-100 p-2 text-center text-sm text-gray-500">
                      Preview Mode - This is how your portfolio will look
                    </div>
                    <PortfolioPreview data={portfolioData} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </PortfolioContext.Provider>
  )
}
