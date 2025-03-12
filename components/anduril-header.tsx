"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AndurilHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollPosition > 50 ? "bg-background/80 anduril-header" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <span className="text-xl font-medium tracking-wider">
            <span className="text-white" style={{ color: "#ffffff !important" }}>
              HENRY{" "}
            </span>
            <span className="name-gradient">SPEISER</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-sm font-medium uppercase tracking-wider hover:text-white/80 transition-colors relative overflow-hidden group text-white"
            href="#projects"
            style={{ color: "#ffffff !important" }}
          >
            Projects
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>
          <a
            className="text-sm font-medium uppercase tracking-wider hover:text-white/80 transition-colors relative overflow-hidden group text-white"
            href="#about"
            style={{ color: "#ffffff !important" }}
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>
          <a
            className="text-sm font-medium uppercase tracking-wider hover:text-white/80 transition-colors relative overflow-hidden group text-white"
            href="#contact"
            style={{ color: "#ffffff !important" }}
          >
            Contact
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 anduril-header">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              className="text-sm font-medium uppercase tracking-wider py-2 hover:text-white/80 transition-colors text-white"
              href="#projects"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: "#ffffff !important" }}
            >
              Projects
            </a>
            <a
              className="text-sm font-medium uppercase tracking-wider py-2 hover:text-white/80 transition-colors text-white"
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: "#ffffff !important" }}
            >
              About
            </a>
            <a
              className="text-sm font-medium uppercase tracking-wider py-2 hover:text-white/80 transition-colors text-white"
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              style={{ color: "#ffffff !important" }}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

