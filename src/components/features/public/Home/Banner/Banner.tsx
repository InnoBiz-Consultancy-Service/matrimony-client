"use client"
import { Heart, Users, Shield, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Banner() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-pink-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/10 to-pink-100/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="h-4 w-4 fill-current" />
              <span>Trusted by Happy Couples</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your
                <span className="primary-color">
                  Perfect Match
                </span>
                <span className="block text-gray-800">Today</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                Join thousands of successful couples who found their soulmate through our trusted matrimony platform.
                Your journey to happily ever after starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Link href="/register"> */}
                <Button className="primary-btn">
                  Start Free Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              {/* </Link> */}
              <Button
                variant="outline"
                className="border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 font-semibold px-8 py-4 text-lg rounded-xl group bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">0</div>
                <div className="text-sm text-gray-600">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">0</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">0</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="relative hidden lg:flex">
            {/* Main Hero Image Placeholder */}
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-emerald-100 to-pink-100 rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  width={500}
                  height={500}
                  src="https://t3.ftcdn.net/jpg/06/52/48/90/360_F_652489048_7AjxWwFhIEGCl1Md0VV5u78UR1MYjW4d.jpg"
                  alt="Happy couple"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Feature Card */}
              <Card className="absolute -right-6 bottom-20 w-56 bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      <span className="font-semibold text-gray-800">100% Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-emerald-600" />
                      <span className="font-semibold text-gray-800">Privacy Protected</span>
                    </div>
                    <div className="text-sm text-gray-600">All profiles are manually verified for your safety</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
