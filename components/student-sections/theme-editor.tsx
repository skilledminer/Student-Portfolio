"use client"

import { Layout, Palette, Type } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { studentThemes, studentFonts, studentTemplates } from "../student-portfolio-data"

interface Theme {
  template: "modern" | "creative" | "academic" | "minimal" | "tech" | "artistic"
  colorScheme: "blue" | "purple" | "green" | "orange" | "pink" | "teal" | "red"
  fontFamily: "inter" | "poppins" | "roboto" | "playfair" | "montserrat"
  layout: "standard" | "compact" | "spacious"
}

interface ThemeEditorProps {
  data: Theme
  updateData: (section: string, data: Theme) => void
}

export default function ThemeEditor({ data, updateData }: ThemeEditorProps) {
  const updateTheme = (key: keyof Theme, value: any) => {
    updateData("theme", { ...data, [key]: value })
  }

  return (
    <div className="space-y-8">
      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Layout className="mr-2 h-5 w-5" />
          Choose Your Template
        </h3>
        <RadioGroup
          value={data.template}
          onValueChange={(value) => updateTheme("template", value)}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {Object.entries(studentTemplates).map(([key, template]) => (
            <div key={key} className="relative">
              <RadioGroupItem value={key} id={key} className="peer sr-only" />
              <Label
                htmlFor={key}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="text-3xl mb-2">{template.preview}</div>
                <div className="text-center">
                  <div className="font-semibold">{template.name}</div>
                  <div className="text-sm text-muted-foreground">{template.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Color Scheme */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          Pick Your Colors
        </h3>
        <RadioGroup
          value={data.colorScheme}
          onValueChange={(value) => updateTheme("colorScheme", value)}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"
        >
          {Object.entries(studentThemes).map(([key, theme]) => (
            <div key={key} className="relative">
              <RadioGroupItem value={key} id={`color-${key}`} className="peer sr-only" />
              <Label
                htmlFor={`color-${key}`}
                className="flex items-center space-x-3 rounded-lg border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <div className="flex space-x-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondary }} />
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
                <div>
                  <div className="font-medium">{theme.name}</div>
                  <div className="text-sm text-muted-foreground">{theme.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Font Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Type className="mr-2 h-5 w-5" />
          Choose Your Font
        </h3>
        <Select value={data.fontFamily} onValueChange={(value) => updateTheme("fontFamily", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(studentFonts).map(([key, font]) => (
              <SelectItem key={key} value={key}>
                <div className="flex flex-col">
                  <span style={{ fontFamily: font.family }}>{font.name}</span>
                  <span className="text-sm text-muted-foreground">{font.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Layout Options */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Layout Style</h3>
        <RadioGroup
          value={data.layout}
          onValueChange={(value) => updateTheme("layout", value)}
          className="grid gap-3 md:grid-cols-3"
        >
          <div className="relative">
            <RadioGroupItem value="compact" id="layout-compact" className="peer sr-only" />
            <Label
              htmlFor="layout-compact"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="font-semibold">Compact</div>
              <div className="text-sm text-muted-foreground">Dense layout, more content</div>
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem value="standard" id="layout-standard" className="peer sr-only" />
            <Label
              htmlFor="layout-standard"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="font-semibold">Standard</div>
              <div className="text-sm text-muted-foreground">Balanced spacing</div>
            </Label>
          </div>
          <div className="relative">
            <RadioGroupItem value="spacious" id="layout-spacious" className="peer sr-only" />
            <Label
              htmlFor="layout-spacious"
              className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="font-semibold">Spacious</div>
              <div className="text-sm text-muted-foreground">Lots of white space</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
