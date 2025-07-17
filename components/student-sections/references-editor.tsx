"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface Reference {
  id: number
  name: string
  relationship: string
  company: string
  email: string
  phone: string
  description: string
}

interface Props {
  data: Reference[]
  updateData: (section: string, newData: Reference[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function ReferencesEditor({ data, updateData }: Props) {
  const [refs, setRefs] = useState<Reference[]>(data)

  const sync = (next: Reference[]) => {
    setRefs(next)
    updateData("references", next)
  }

  const addRef = () => {
    sync([
      ...refs,
      {
        id: Date.now(),
        name: "Reference Name",
        relationship: "Professional Relationship",
        company: "Company / Institution",
        email: "email@example.com",
        phone: "",
        description: "",
      },
    ])
    toast({ title: "Reference added" })
  }

  const updateField = (id: number, field: keyof Reference, value: string) => {
    const next = refs.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    sync(next)
  }

  const removeRef = (id: number) => {
    sync(refs.filter((r) => r.id !== id))
    toast({ title: "Reference removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">References</h2>
        <Button size="sm" onClick={addRef}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reference
        </Button>
      </div>

      {refs.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No references yet. Click “Add Reference” to begin.</p>
          </CardContent>
        </Card>
      ) : (
        refs.map((r) => (
          <Card key={r.id}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-lg">{r.name}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => removeRef(r.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`name-${r.id}`}>Name</Label>
                  <Input
                    id={`name-${r.id}`}
                    value={r.name}
                    onChange={(e) => updateField(r.id, "name", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`relationship-${r.id}`}>Relationship</Label>
                  <Input
                    id={`relationship-${r.id}`}
                    value={r.relationship}
                    onChange={(e) => updateField(r.id, "relationship", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor={`company-${r.id}`}>Company / Institution</Label>
                  <Input
                    id={`company-${r.id}`}
                    value={r.company}
                    onChange={(e) => updateField(r.id, "company", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`email-${r.id}`}>Email</Label>
                  <Input
                    type="email"
                    id={`email-${r.id}`}
                    value={r.email}
                    onChange={(e) => updateField(r.id, "email", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`phone-${r.id}`}>Phone (optional)</Label>
                <Input
                  id={`phone-${r.id}`}
                  value={r.phone}
                  onChange={(e) => updateField(r.id, "phone", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor={`description-${r.id}`}>Additional Notes (optional)</Label>
                <Textarea
                  id={`description-${r.id}`}
                  rows={3}
                  value={r.description}
                  onChange={(e) => updateField(r.id, "description", e.target.value)}
                  placeholder="Context of your relationship, length of time worked together, etc."
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
