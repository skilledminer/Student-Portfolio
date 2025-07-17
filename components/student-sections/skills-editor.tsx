"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export interface SkillsBlock {
  technical: string[]
  soft: string[]
  languages: string[]
}

interface Props {
  data: SkillsBlock
  updateData: (section: string, newData: SkillsBlock) => void
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const makeAdder =
  (
    cat: keyof SkillsBlock,
    setLocal: (update: (prev: SkillsBlock) => SkillsBlock) => void,
    updateParent: (val: SkillsBlock) => void,
  ) =>
  (value: string) => {
    if (!value.trim()) return
    setLocal((prev) => {
      const next = { ...prev, [cat]: [...prev[cat], value.trim()] }
      updateParent(next)
      return next
    })
  }

const makeRemover =
  (
    cat: keyof SkillsBlock,
    setLocal: (update: (prev: SkillsBlock) => SkillsBlock) => void,
    updateParent: (val: SkillsBlock) => void,
  ) =>
  (index: number) => {
    setLocal((prev) => {
      const copy = [...prev[cat]]
      copy.splice(index, 1)
      const next = { ...prev, [cat]: copy }
      updateParent(next)
      return next
    })
  }

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function SkillsEditor({ data, updateData }: Props) {
  const [skills, setSkills] = useState<SkillsBlock>(data)
  const [draft, setDraft] = useState({ technical: "", soft: "", languages: "" })

  const updateParent = (val: SkillsBlock) => updateData("skills", val)

  const addTech = makeAdder("technical", setSkills, updateParent)
  const addSoft = makeAdder("soft", setSkills, updateParent)
  const addLang = makeAdder("languages", setSkills, updateParent)

  const removeTech = makeRemover("technical", setSkills, updateParent)
  const removeSoft = makeRemover("soft", setSkills, updateParent)
  const removeLang = makeRemover("languages", setSkills, updateParent)

  const handleAdd = (cat: keyof SkillsBlock) => {
    const value = draft[cat]
    if (cat === "technical") addTech(value)
    if (cat === "soft") addSoft(value)
    if (cat === "languages") addLang(value)
    setDraft({ ...draft, [cat]: "" })
    toast({ title: "Skill added" })
  }

  /* ---------------------------------------------------------------- */
  /* Render helpers                                                   */
  /* ---------------------------------------------------------------- */
  const renderCategory = (
    label: string,
    cat: keyof SkillsBlock,
    addFn: (val: string) => void,
    remFn: (i: number) => void,
  ) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{label}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Badges */}
        {skills[cat].length === 0 ? (
          <p className="text-sm text-muted-foreground">No {label.toLowerCase()} yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills[cat].map((s, i) => (
              <Badge key={i} className="flex items-center gap-1 px-3 py-1">
                {s}
                <Button variant="ghost" className="h-4 w-4 p-0" size="sm" onClick={() => remFn(i)} aria-label="Remove">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}

        {/* Add input */}
        <div className="flex gap-2">
          <Input
            placeholder={`Add ${label.slice(0, -1).toLowerCase()}…`}
            value={draft[cat]}
            onChange={(e) => setDraft({ ...draft, [cat]: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addFn(draft[cat])
                setDraft({ ...draft, [cat]: "" })
              }
            }}
          />
          <Button size="sm" onClick={() => handleAdd(cat)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skills</h2>

      {renderCategory("Technical Skills", "technical", addTech, removeTech)}
      {renderCategory("Soft Skills", "soft", addSoft, removeSoft)}
      {renderCategory("Languages", "languages", addLang, removeLang)}
    </div>
  )
}
