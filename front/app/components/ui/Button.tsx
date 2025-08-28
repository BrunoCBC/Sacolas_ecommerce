'use client'

import React from "react"

type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "danger"
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = "primary", onClick, className }: ButtonProps) {
  const base = "px-4 py-2 rounded font-semibold transition"
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    danger: "bg-red-500 text-white hover:bg-red-600"
  }

  return (
    <button className={`${base} ${styles[variant]} ${className ?? ""}`} onClick={onClick}>
      {children}
    </button>
  )
}
