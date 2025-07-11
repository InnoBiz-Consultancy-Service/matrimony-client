"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Heart, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Find Match", href: "/biodatas" },
  { title: "Success Stories", href: "/success-stories" },
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-rose-100" : "bg-white border-rose-50",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-rose-200 transition-all duration-300">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold primary-color">
                Nikah
              </span>
              <span className="text-xs primary-color font-medium -mt-1">Find Your Perfect Match</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-rose-50",
                  pathname === item.href ? "text-rose-700 bg-rose-50" : "text-gray-700 hover:text-rose-700",
                )}
              >
                {item.title}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rose-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/login">
              <Button variant="ghost" className="text-rose-700 hover:text-rose-800 hover:bg-rose-50 font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="primary-btn">
                Join Free
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-rose-700 hover:bg-rose-50">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[350px] bg-white">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between py-4 border-b border-rose-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold text-rose-700">Nikah</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2 py-6 flex-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                        pathname === item.href
                          ? "text-rose-700 bg-rose-50 border-l-4 border-rose-600"
                          : "text-gray-700 hover:text-rose-700 hover:bg-rose-50",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="border-t border-rose-100 pt-6 space-y-3">
                  <Link href="/login" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 bg-transparent"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button
                      className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Join Free
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
