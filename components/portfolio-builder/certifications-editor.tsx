"use client"

import { useState, useContext } from "react"
import { Plus, Save, Trash2 } from "lucide-react"
import { PortfolioContext } from "../portfolio-builder"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function CertificationsEditor() {
  const { portfolioData, updatePortfolioData, saveChanges } = useContext(PortfolioContext)
  const [certifications, setCertifications] = useState(portfolioData.certifications)

  // Add a new certification
  const handleAddCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: "New Certification",
      issuer: "Issuing Organization",
      date: "",
      expiryDate: "",
      credentialID: "",
      credentialURL: "",
    }

    const updatedCertifications = [...certifications, newCertification]
    setCertifications(updatedCertifications)
    updatePortfolioData({ certifications: updatedCertifications })

    toast({
      title: "Certification added",
      description: "New certification has been added. Don't forget to save your changes.",
    })
  }

  // Update certification
  const handleCertificationChange = (id, field, value) => {
    const updatedCertifications = certifications.map((cert) => {
      if (cert.id === id) {
        return { ...cert, [field]: value }
      }
      return cert
    })
    setCertifications(updatedCertifications)
  }

  // Save certification changes
  const handleSaveCertification = (id) => {
    updatePortfolioData({ certifications })

    toast({
      title: "Certification updated",
      description: "Your certification information has been updated.",
    })
  }

  // Delete certification
  const handleDeleteCertification = (id) => {
    const updatedCertifications = certifications.filter((cert) => cert.id !== id)
    setCertifications(updatedCertifications)
    updatePortfolioData({ certifications: updatedCertifications })

    toast({
      title: "Certification deleted",
      description: "The certification has been removed.",
    })
  }

  // Save all changes
  const handleSaveAll = () => {
    updatePortfolioData({ certifications })
    saveChanges()

    toast({
      title: "All changes saved",
      description: "All certifications have been saved.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleAddCertification}>
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
          <Button size="sm" onClick={handleSaveAll}>
            <Save className="mr-2 h-4 w-4" />
            Save All
          </Button>
        </div>
      </div>

      {certifications.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No certifications added yet. Click "Add Certification" to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert) => (
            <Card key={cert.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle>{cert.name || "New Certification"}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCertification(cert.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                    <Input
                      id={`name-${cert.id}`}
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(cert.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                    <Input
                      id={`issuer-${cert.id}`}
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(cert.id, "issuer", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`date-${cert.id}`}>Issue Date</Label>
                    <Input
                      id={`date-${cert.id}`}
                      type="month"
                      value={cert.date}
                      onChange={(e) => handleCertificationChange(cert.id, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`expiry-date-${cert.id}`}>Expiry Date (Optional)</Label>
                    <Input
                      id={`expiry-date-${cert.id}`}
                      type="month"
                      value={cert.expiryDate}
                      onChange={(e) => handleCertificationChange(cert.id, "expiryDate", e.target.value)}
                      placeholder="No Expiration"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`credential-id-${cert.id}`}>Credential ID (Optional)</Label>
                    <Input
                      id={`credential-id-${cert.id}`}
                      value={cert.credentialID}
                      onChange={(e) => handleCertificationChange(cert.id, "credentialID", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`credential-url-${cert.id}`}>Credential URL (Optional)</Label>
                    <Input
                      id={`credential-url-${cert.id}`}
                      value={cert.credentialURL}
                      onChange={(e) => handleCertificationChange(cert.id, "credentialURL", e.target.value)}
                      placeholder="https://example.com/verify/credential"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button size="sm" onClick={() => handleSaveCertification(cert.id)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
