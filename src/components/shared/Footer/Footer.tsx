"use client"

import Link from "next/link"
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Clock,
} from "lucide-react"

export default function Footer() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold primary-color">
                    Nikah
                  </span>
                  <p className="text-xs text-gray-400 -mt-1">Find Your Perfect Match</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                The most trusted matrimony platform connecting hearts worldwide. We&apos;ve helped over 50,000 couples find
                their perfect match.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="h-10 w-10 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 bg-gray-700 hover:bg-rose-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Find Matches", href: "/biodatas" },
                  { name: "Success Stories", href: "/success-stories" },
                  { name: "Premium Plans", href: "/pricing" },
                  { name: "Mobile App", href: "/app" },
                  { name: "Help Center", href: "/help" },
                  { name: "Blog", href: "/blog" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-rose-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Safety Tips", href: "/safety" },
                  { name: "Report Profile", href: "/report" },
                  { name: "Refund Policy", href: "/refund" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-rose-400 transition-colors duration-200 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-rose-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Love Street</p>
                    <p className="text-gray-300">Heart City, HC 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-rose-400 flex-shrink-0" />
                  <Link href="tel:+1234567890" className="text-gray-300 hover:text-rose-400 transition-colors">
                    +1 (234) 567-8900
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-rose-400 flex-shrink-0" />
                  <Link href="mailto:support@nikah.com" className="text-gray-300 hover:text-rose-400 transition-colors">
                    support@nikah.com
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-rose-400 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">24/7 Support</p>
                    <p className="text-sm text-gray-400">Always here to help</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Nikah. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-rose-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-rose-400 transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-rose-400 transition-colors">
                Cookies
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-rose-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
