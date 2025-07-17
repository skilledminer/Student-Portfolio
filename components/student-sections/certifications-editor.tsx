"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface Certification {
  id: number
  name: string
  issuer: string
  date: string
  expiryDate: string
  credentialID: string
  credentialURL: string
}

interface Props {
  data: Certification[]
  updateData: (section: string, newData: Certification[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function CertificationsEditor({ data, updateData }: Props) {
  const [certs, setCerts] = useState<Certification[]>(data)

  // Helpers
  const sync = (next: Certification[]) => {
    setCerts(next)
    updateData("certifications", next)
  }

  const addCert = () => {
    sync([
      ...certs,
      {
        id: Date.now(),
        name: "New Certification",
        issuer: "Issuing Organization",
        date: "",
        expiryDate: "",
        credentialID: "",
        credentialURL: "",
      },
    ])
    toast({ title: "Certification added" })
  }

  const updateField = (id: number, field: keyof Certification, value: string) => {
    const next = certs.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    sync(next)
  }

  const removeCert = (id: number) => {
    sync(certs.filter((c) => c.id !== id))
    toast({ title: "Certification removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button size="sm" onClick={addCert}>
          <Plus className="mr-2 h-4 w-4" />
          Add Certification
        </Button>
      </div>

      {certs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No certifications yet. Click “Add Certification” to get started.</p>
          </CardContent>
        </Card>
      ) : (
        certs.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{c.name}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeCert(c.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`certification-name-${c.id}`}>Certification Name</Label>
                  <Input
                    id={`certification-name-${c.id}`}
                    value={c.name}
                    onChange={(e) => updateField(c.id, "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`issuing-organization-${c.id}`}>Issuing Organization</Label>
                  <Input
                    id={`issuing-organization-${c.id}`}
                    value={c.issuer}
                    onChange={(e) => updateField(c.id, "issuer", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`issue-date-${c.id}`}>Issue Date</Label>
                  <Input
                    id={`issue-date-${c.id}`}
                    type="month"
                    value={c.date}
                    onChange={(e) => updateField(c.id, "date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`expiration-date-${c.id}`}>Expiry Date (optional)</Label>
                  <Input
                    id={`expiration-date-${c.id}`}
                    type="month"
                    value={c.expiryDate}
                    onChange={(e) => updateField(c.id, "expiryDate", e.target.value)}
                    placeholder="No expiration"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`credential-id-${c.id}`}>Credential ID (optional)</Label>
                  <Input
                    id={`credential-id-${c.id}`}
                    value={c.credentialID}
                    onChange={(e) => updateField(c.id, "credentialID", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`credential-url-${c.id}`}>Credential URL (optional)</Label>
                  <Input
                    id={`credential-url-${c.id}`}
                    value={c.credentialURL}
                    onChange={(e) => updateField(c.id, "credentialURL", e.target.value)}
                    placeholder="https://example.com/verify"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
