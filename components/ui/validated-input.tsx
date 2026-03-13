"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface ValidatedInputProps {
  type?: "text" | "email" | "phone" | "url"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  watermark?: string
  className?: string
  allowCommas?: boolean
  required?: boolean
}

export function ValidatedInput({
  type = "text",
  value,
  onChange,
  placeholder,
  watermark,
  className,
  allowCommas = true,
  required = false,
  ...props
}: ValidatedInputProps) {
  const [isValid, setIsValid] = useState(true)
  const [isFocused, setIsFocused] = useState(false)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const validateInput = (inputValue: string) => {
    // Don't show validation errors for empty non-required fields
    if (!inputValue && !required) return true
    if (!inputValue && required) return false

    switch (type) {
      case "email":
        // Only validate if there's content
        if (!inputValue) return true
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const validDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com", "edu", "org", "com", "net"]
        const domain = inputValue.split("@")[1]
        return emailRegex.test(inputValue) && (domain ? validDomains.some((d) => domain.endsWith(d)) : false)

      case "phone":
        // Only validate if there's content
        if (!inputValue) return true
        const digitsOnly = inputValue.replace(/\D/g, "")
        // Show error only if less than 10 digits and user has started typing
        return digitsOnly.length >= 10

      case "url":
        // Only validate if there's content
        if (!inputValue) return true
        try {
          new URL(inputValue)
          return true
        } catch {
          return inputValue.startsWith("http://") || inputValue.startsWith("https://")
        }

      default:
        return true
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value

    // Handle comma restriction for email and phone
    if ((type === "email" || type === "phone") && !allowCommas) {
      newValue = newValue.replace(/,/g, "")
    }

    // Phone number specific handling
    if (type === "phone") {
      // Only allow digits, spaces, parentheses, hyphens, and plus sign
      newValue = newValue.replace(/[^0-9\s\-$$$$+]/g, "")

      // Extract only digits for length checking
      const digitsOnly = newValue.replace(/\D/g, "")

      // Limit to 10 digits maximum
      if (digitsOnly.length > 10) {
        return // Don't update if more than 10 digits
      }

      // Format the phone number as user types
      if (digitsOnly.length <= 10) {
        if (digitsOnly.length === 0) {
          newValue = ""
        } else if (digitsOnly.length <= 3) {
          newValue = `(${digitsOnly}`
        } else if (digitsOnly.length <= 6) {
          newValue = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3)}`
        } else {
          newValue = `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`
        }
      }
    }

    setDisplayValue(newValue)
    onChange(newValue)
    setIsValid(validateInput(newValue))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "phone") {
      // Allow backspace, delete, tab, escape, enter
      if (
        [8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
        // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
        (e.keyCode === 65 && e.ctrlKey === true) ||
        (e.keyCode === 67 && e.ctrlKey === true) ||
        (e.keyCode === 86 && e.ctrlKey === true) ||
        (e.keyCode === 88 && e.ctrlKey === true)
      ) {
        return
      }

      // Get current digits count
      const currentDigits = displayValue.replace(/\D/g, "")

      // If we already have 10 digits, prevent more input
      if (currentDigits.length >= 10) {
        e.preventDefault()
        return
      }

      // Only allow numbers
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault()
      }
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (displayValue === watermark) {
      setDisplayValue("")
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (!displayValue && watermark) {
      setDisplayValue(watermark)
    }
  }

  const showWatermark = !isFocused && !value && watermark
  const inputValue = showWatermark ? watermark : displayValue

  return (
    <Input
      {...props}
      type={type === "phone" ? "tel" : type}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      className={cn(className, !isValid && "border-red-500 focus:border-red-500", showWatermark && "text-gray-400")}
    />
  )
}
