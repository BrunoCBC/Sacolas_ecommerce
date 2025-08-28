'use client'

import React from "react"

type CardProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow p-4 hover:shadow-xl transition ${className ?? ""}`}
    >
      {children}
    </div>
  )
}
