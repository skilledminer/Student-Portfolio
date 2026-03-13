"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Underline, List, ListOrdered, Undo, Redo } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  minHeight?: string
}

export function RichTextEditor({ value, onChange, placeholder, className, minHeight = "120px" }: RichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  // Only set innerHTML on initial mount or when value changes externally
  useEffect(() => {
    if (editorRef.current) {
      // Only update if the value is different from current content
      // and the editor is not focused (to avoid interfering with user typing)
      if (!isFocused && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || ""
        isInitializedRef.current = true
      } else if (!isInitializedRef.current) {
        editorRef.current.innerHTML = value || ""
        isInitializedRef.current = true
      }
    }
  }, [value, isFocused])

  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML
      // Don't trigger onChange if content is just the placeholder or empty
      if (content !== "<br>" && content !== "") {
        onChange(content)
      } else {
        onChange("")
      }
    }
  }

  const executeCommand = (command: string, cmdValue?: string) => {
    document.execCommand(command, false, cmdValue)
    editorRef.current?.focus()
    handleInput()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          executeCommand("bold")
          break
        case "i":
          e.preventDefault()
          executeCommand("italic")
          break
        case "u":
          e.preventDefault()
          executeCommand("underline")
          break
        case "z":
          if (e.shiftKey) {
            e.preventDefault()
            executeCommand("redo")
          } else {
            e.preventDefault()
            executeCommand("undo")
          }
          break
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const showPlaceholder = !value && !isFocused

  return (
    <div className={cn("border rounded-md", className)}>
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
        <Button type="button" variant="ghost" size="sm" onClick={() => executeCommand("bold")} className="h-8 w-8 p-0">
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("italic")}
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("underline")}
          className="h-8 w-8 p-0"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("insertUnorderedList")}
          className="h-8 w-8 p-0"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => executeCommand("insertOrderedList")}
          className="h-8 w-8 p-0"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button type="button" variant="ghost" size="sm" onClick={() => executeCommand("undo")} className="h-8 w-8 p-0">
          <Undo className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => executeCommand("redo")} className="h-8 w-8 p-0">
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative">
        {showPlaceholder && placeholder && (
          <div className="absolute top-3 left-3 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="p-3 outline-none prose prose-sm max-w-none"
          style={{ minHeight }}
          suppressContentEditableWarning={true}
        />
      </div>
    </div>
  )
}

export default RichTextEditor
