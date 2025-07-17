"use client"

import { useState, useEffect } from "react"
import { Plus, Folder, Settings, ArrowRight, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import PortfolioBuilder from "./portfolio-builder"

// Define the portfolio metadata type
type PortfolioMeta = {
  id: string
  name: string
  lastEdited: string
  template: string
}

export default function LandingPage() {
  const [portfolios, setPortfolios] = useState<PortfolioMeta[]>([])
  const [newPortfolioName, setNewPortfolioName] = useState("")
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null)
  const [showBuilder, setShowBuilder] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Load portfolios from localStorage on component mount
  useEffect(() => {
    const savedPortfolios = localStorage.getItem("portfolios")
    if (savedPortfolios) {
      setPortfolios(JSON.parse(savedPortfolios))
    } else {
      // Initialize with a sample portfolio if none exist
      const initialPortfolio = {
        id: "default-portfolio",
        name: "My First Portfolio",
        lastEdited: new Date().toISOString(),
        template: "minimal",
      }
      setPortfolios([initialPortfolio])
      localStorage.setItem("portfolios", JSON.stringify([initialPortfolio]))
    }
  }, [])

  // Save portfolios to localStorage whenever they change
  useEffect(() => {
    if (portfolios.length > 0) {
      localStorage.setItem("portfolios", JSON.stringify(portfolios))
    }
  }, [portfolios])

  const handleCreatePortfolio = () => {
    if (!newPortfolioName.trim()) {
      toast({
        title: "Portfolio name required",
        description: "Please enter a name for your portfolio.",
        variant: "destructive",
      })
      return
    }

    const newPortfolio = {
      id: `portfolio-${Date.now()}`,
      name: newPortfolioName,
      lastEdited: new Date().toISOString(),
      template: "minimal",
    }

    setPortfolios([...portfolios, newPortfolio])
    setNewPortfolioName("")
    setIsCreateDialogOpen(false)

    toast({
      title: "Portfolio created",
      description: `"${newPortfolioName}" has been created successfully.`,
    })
  }

  const handleDeletePortfolio = (id: string) => {
    const updatedPortfolios = portfolios.filter((portfolio) => portfolio.id !== id)
    setPortfolios(updatedPortfolios)

    toast({
      title: "Portfolio deleted",
      description: "The portfolio has been deleted successfully.",
    })
  }

  const handleSelectPortfolio = (id: string) => {
    setSelectedPortfolio(id)
    setShowBuilder(true)
  }

  const handleBackToList = () => {
    setShowBuilder(false)
    setSelectedPortfolio(null)
  }

  // If a portfolio is selected, show the builder
  if (showBuilder && selectedPortfolio) {
    return <PortfolioBuilder portfolioId={selectedPortfolio} onBack={handleBackToList} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">Create Your Professional Portfolio</h1>
            <p className="mb-8 text-lg md:text-xl">
              Build stunning portfolios in minutes with our easy-to-use builder. Showcase your work, skills, and
              experience.
            </p>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="rounded-full bg-white px-8 text-blue-600 hover:bg-gray-100">
                  Create New Portfolio
                  <Plus className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Portfolio</DialogTitle>
                  <DialogDescription>
                    Give your portfolio a name to get started. You can customize it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="portfolio-name">Portfolio Name</Label>
                  <Input
                    id="portfolio-name"
                    value={newPortfolioName}
                    onChange={(e) => setNewPortfolioName(e.target.value)}
                    placeholder="My Professional Portfolio"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePortfolio}>Create Portfolio</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section - Moved before portfolios list */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Use Our Portfolio Builder?</h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Settings className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Multiple Templates</h3>
              <p className="text-gray-600">
                Choose from various professional templates to showcase your work in style.
              </p>
            </div>

            <div className="rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Edit className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Easy Customization</h3>
              <p className="text-gray-600">Customize colors, fonts, layouts and more with our intuitive editor.</p>
            </div>

            <div className="rounded-lg p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <ArrowRight className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">PDF Export</h3>
              <p className="text-gray-600">Export your portfolio as a professional PDF resume with one click.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Portfolios</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Portfolio
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Folder className="mr-2 h-5 w-5 text-blue-500" />
                    {portfolio.name}
                  </CardTitle>
                  <CardDescription>Last edited: {new Date(portfolio.lastEdited).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 rounded-md bg-gray-100 p-4">
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <Settings className="mr-2 h-5 w-5" />
                      {portfolio.template.charAt(0).toUpperCase() + portfolio.template.slice(1)} Template
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleDeletePortfolio(portfolio.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" onClick={() => handleSelectPortfolio(portfolio.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Portfolio
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
