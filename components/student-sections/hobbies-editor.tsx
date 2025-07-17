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
export interface Hobby {
  id: number
  name: string
  description: string
}

interface Props {
  data: Hobby[]
  updateData: (section: string, newData: Hobby[]) => void
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function HobbiesEditor({ data, updateData }: Props) {
  const [hobbies, setHobbies] = useState<Hobby[]>(data)

  const sync = (next: Hobby[]) => {
    setHobbies(next)
    updateData("hobbies", next)
  }

  const addHobby = () => {
    sync([
      ...hobbies,
      {
        id: Date.now(),
        name: "New Hobby",
        description: "Describe what you enjoy about this hobby…",
      },
    ])
    toast({ title: "Hobby added" })
  }

  const updateField = (id: number, field: keyof Hobby, value: string) => {
    const next = hobbies.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    sync(next)
  }

  const removeHobby = (id: number) => {
    sync(hobbies.filter((h) => h.id !== id))
    toast({ title: "Hobby removed" })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Hobbies &amp; Interests</h2>
        <Button size="sm" onClick={addHobby}>
          <Plus className="mr-2 h-4 w-4" />
          Add Hobby
        </Button>
      </div>

      {hobbies.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex aspect-square items-center justify-center p-6 text-sm text-muted-foreground">
            No hobbies added yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {hobbies.map((h) => (
            <Card key={h.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{h.name}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => removeHobby(h.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Hobby Name</Label>
                    <Input id="name" value={h.name} onChange={(e) => updateField(h.id, "name", e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe why you enjoy this hobby or any notable achievements…"
                      value={h.description}
                      onChange={(e) => updateField(h.id, "description", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
