"use client"

import React, { useCallback, useMemo } from "react"
import { Bold, Italic, Underline, List, ListOrdered, Undo, Redo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export function RichTextEditor({ value, onChange, placeholder, className, minHeight = "120px" }: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = React.useState(false)

  // Convert HTML to plain text for display
  const getPlainText = useCallback((html: string) => {
    const div = document.createElement("div")
    div.innerHTML = html
    return div.textContent || div.innerText || ""
  }, [])

  // Handle content changes
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML
      onChange(html)
    }
  }, [onChange])

  // Format commands
  const execCommand = useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value)
      editorRef.current?.focus()
      handleInput()
    },
    [handleInput],
  )

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            execCommand("bold")
            break
          case "i":
            e.preventDefault()
            execCommand("italic")
            break
          case "u":
            e.preventDefault()
            execCommand("underline")
            break
          case "z":
            e.preventDefault()
            if (e.shiftKey) {
              execCommand("redo")
            } else {
              execCommand("undo")
            }
            break
        }
      }
    },
    [execCommand],
  )

  // Check if command is active
  const isCommandActive = useCallback((command: string) => {
    return document.queryCommandState(command)
  }, [])

  // Initialize content
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const toolbarButtons = useMemo(
    () => [
      { command: "bold", icon: Bold, label: "Bold (Ctrl+B)" },
      { command: "italic", icon: Italic, label: "Italic (Ctrl+I)" },
      { command: "underline", icon: Underline, label: "Underline (Ctrl+U)" },
      { command: "insertUnorderedList", icon: List, label: "Bullet List" },
      { command: "insertOrderedList", icon: ListOrdered, label: "Numbered List" },
      { command: "undo", icon: Undo, label: "Undo (Ctrl+Z)" },
      { command: "redo", icon: Redo, label: "Redo (Ctrl+Shift+Z)" },
    ],
    [],
  )

  return (
    <div className={cn("border rounded-md", isFocused && "ring-2 ring-ring ring-offset-2", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
        {toolbarButtons.map(({ command, icon: Icon, label }) => (
          <Button
            key={command}
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", isCommandActive(command) && "bg-accent")}
            onClick={() => execCommand(command)}
            title={label}
            type="button"
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={cn(
          "p-3 outline-none prose prose-sm max-w-none",
          "focus:ring-0 focus:outline-none",
          !value && "text-muted-foreground",
        )}
        style={{ minHeight }}
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />

      {/* Placeholder */}
      {!value && (
        <div
          className="absolute top-[52px] left-3 text-muted-foreground pointer-events-none"
          style={{ marginTop: "12px" }}
        >
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default RichTextEditor
