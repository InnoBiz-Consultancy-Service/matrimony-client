"use client"

import { Heart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

// Main Page Loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center z-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative text-center space-y-8">
        {/* Logo with Animation */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg animate-bounce">
            <Heart className="h-8 w-8 text-white fill-white animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
              Nikah
            </span>
            <span className="text-sm text-rose-500/70 font-medium -mt-1">Find Your Perfect Match</span>
          </div>
        </div>

        {/* Animated Hearts */}
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={cn(
                "h-6 w-6 text-rose-400 fill-current animate-bounce",
                i === 1 && "animation-delay-200",
                i === 2 && "animation-delay-400",
              )}
              style={{
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Finding Your Perfect Match...</h3>
          <p className="text-gray-600">Please wait while we prepare something special</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-rose-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Button Loader
export function ButtonLoader({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={cn("animate-spin rounded-full border-2 border-white/30 border-t-white", sizeClasses[size])}></div>
      <span>Loading...</span>
    </div>
  )
}

// Card Loader
export function CardLoader() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-16 w-16 bg-rose-200 rounded-full"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-rose-200 rounded w-3/4"></div>
          <div className="h-3 bg-rose-100 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-rose-100 rounded"></div>
        <div className="h-3 bg-rose-100 rounded w-5/6"></div>
        <div className="h-3 bg-rose-100 rounded w-4/6"></div>
      </div>
    </div>
  )
}

// Spinner Loader
export function SpinnerLoader({
  size = "md",
  color = "rose",
}: { size?: "sm" | "md" | "lg"; color?: "rose" | "white" }) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const colorClasses = {
    rose: "border-rose-200 border-t-rose-600",
    white: "border-white/30 border-t-white",
  }

  return <div className={cn("animate-spin rounded-full border-2", sizeClasses[size], colorClasses[color])}></div>
}

// Dots Loader
export function DotsLoader() {
  return (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-3 w-3 bg-rose-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 200}ms`,
          }}
        ></div>
      ))}
    </div>
  )
}

// Profile Loading Skeleton
export function ProfileSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-rose-200"></div>
      <div className="p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-rose-200 rounded-full"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-rose-200 rounded w-3/4"></div>
            <div className="h-3 bg-rose-100 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-rose-100 rounded"></div>
          <div className="h-3 bg-rose-100 rounded w-5/6"></div>
        </div>
        <div className="flex space-x-2 pt-2">
          <div className="h-8 bg-rose-200 rounded w-20"></div>
          <div className="h-8 bg-rose-100 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

// Search Loader
export function SearchLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <div className="h-16 w-16 border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
        <Users className="absolute inset-0 m-auto h-6 w-6 text-rose-500" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">Searching for Matches...</h3>
        <p className="text-gray-600">Finding the perfect profiles for you</p>
      </div>
      <DotsLoader />
    </div>
  )
}

// Message Loader
export function MessageLoader() {
  return (
    <div className="flex items-center space-x-3 p-4">
      <div className="h-10 w-10 bg-rose-200 rounded-full animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 w-2 bg-rose-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 300}ms`,
              }}
            ></div>
          ))}
        </div>
        <div className="h-3 bg-rose-100 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  )
}

// Inline Loader
export function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center space-x-3 py-4">
      <SpinnerLoader size="sm" />
      <span className="text-gray-600">{text}</span>
    </div>
  )
}

// Full Screen Overlay Loader
export function OverlayLoader({ message = "Processing..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-6 max-w-sm mx-4">
        <div className="h-16 w-16 mx-auto border-4 border-rose-200 border-t-rose-600 rounded-full animate-spin"></div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
          <p className="text-gray-600 text-sm">Please wait a moment...</p>
        </div>
      </div>
    </div>
  )
}

// usee example of how to use these loaders in a component

// "use client"

// import {
//   PageLoader,
//   ButtonLoader,
//   CardLoader,
//   SpinnerLoader,
//   DotsLoader,
//   ProfileSkeleton,
//   SearchLoader,
//   MessageLoader,
//   InlineLoader,
//   OverlayLoader,
// } from "../../loaders"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useState } from "react"

// export default function LoadersDemo() {
//   const [showPageLoader, setShowPageLoader] = useState(false)
//   const [showOverlay, setShowOverlay] = useState(false)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 p-8">
//       <div className="container mx-auto space-y-12">
//         <div className="text-center space-y-4">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
//             Loader Components
//           </h1>
//           <p className="text-gray-600">Beautiful loading states for your matrimony website</p>
//         </div>

//         {/* Demo Buttons */}
//         <div className="flex flex-wrap gap-4 justify-center">
//           <Button
//             onClick={() => {
//               setShowPageLoader(true)
//               setTimeout(() => setShowPageLoader(false), 3000)
//             }}
//             className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
//           >
//             Show Page Loader
//           </Button>
//           <Button
//             onClick={() => {
//               setShowOverlay(true)
//               setTimeout(() => setShowOverlay(false), 3000)
//             }}
//             variant="outline"
//             className="border-rose-200 text-rose-700 hover:bg-rose-50"
//           >
//             Show Overlay Loader
//           </Button>
//         </div>

//         {/* Loader Examples Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* Button Loaders */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-rose-700">Button Loaders</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <Button disabled className="bg-rose-500">
//                 <ButtonLoader size="sm" />
//               </Button>
//               <Button disabled className="bg-rose-500">
//                 <ButtonLoader size="md" />
//               </Button>
//               <Button disabled className="bg-rose-500">
//                 <ButtonLoader size="lg" />
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Spinner Loaders */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-rose-700">Spinner Loaders</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4 flex flex-col items-center">
//               <SpinnerLoader size="sm" />
//               <SpinnerLoader size="md" />
//               <SpinnerLoader size="lg" />
//             </CardContent>
//           </Card>

//           {/* Dots Loader */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-rose-700">Dots Loader</CardTitle>
//             </CardHeader>
//             <CardContent className="flex justify-center">
//               <DotsLoader />
//             </CardContent>
//           </Card>

//           {/* Search Loader */}
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle className="text-rose-700">Search Loader</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <SearchLoader />
//             </CardContent>
//           </Card>

//           {/* Inline Loader */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-rose-700">Inline Loader</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <InlineLoader text="Finding matches..." />
//             </CardContent>
//           </Card>

//           {/* Message Loader */}
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle className="text-rose-700">Message Loader</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <MessageLoader />
//             </CardContent>
//           </Card>

//           {/* Card Loader */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-rose-700">Card Skeleton</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <CardLoader />
//             </CardContent>
//           </Card>

//           {/* Profile Skeleton */}
//           <Card className="md:col-span-2">
//             <CardHeader>
//               <CardTitle className="text-rose-700">Profile Skeleton</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ProfileSkeleton />
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Conditional Loaders */}
//       {showPageLoader && <PageLoader />}
//       {showOverlay && <OverlayLoader message="Creating your profile..." />}
//     </div>
//   )
// }
