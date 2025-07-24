"use client"

import type React from "react"
import toast from 'react-hot-toast';
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, MapPin, GraduationCap, Users, Heart, Phone, Search, Save, Camera, CheckCircle } from "lucide-react"
// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // Address
  presentDivision: z.string().optional(),
  presentDistrict: z.string().optional(),
  presentUpazila: z.string().optional(),
  presentDetails: z.string().optional(),
  permanentDivision: z.string().optional(),
  permanentDistrict: z.string().optional(),
  permanentUpazila: z.string().optional(),
  permanentDetails: z.string().optional(),
  country: z.string().optional(),
  // Education
  sscYear: z.string().optional(),
  sscGroup: z.string().optional(),
  sscResult: z.string().optional(),
  hscYear: z.string().optional(),
  hscGroup: z.string().optional(),
  hscResult: z.string().optional(),
  honours: z.string().optional(),
  // Family Info
  fatherAlive: z.string().optional(),
  fatherOccupation: z.string().optional(),
  motherAlive: z.string().optional(),
  motherOccupation: z.string().optional(),
  brothers: z.string().optional(),
  sisters: z.string().optional(),
  siblingsDetails: z.string().optional(),
  // Personal Info
  beard: z.string().optional(),
  salat: z.string().optional(),
  mahramTravel: z.string().optional(),
  health: z.string().optional(),
  disability: z.string().optional(),
  // Physical Info
  height: z.string().optional(),
  bodyColor: z.string().optional(),
  bloodGroup: z.string().optional(),
  weight: z.string().optional(),
  // Marital Info
  maritalStatus: z.string().optional(),
  childAllow: z.string().optional(),
  whyWantToMarry: z.string().optional(),
  futurePlan: z.string().optional(),
  // Contact Info
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email().optional().or(z.literal("")),
  facebook: z.string().optional(),
  // Preferences
  ageRange: z.string().optional(),
  educationLevel: z.string().optional(),
  preferredMaritalStatus: z.string().optional(),
  religiousPractice: z.string().optional(),
  physicalAppearance: z.string().optional(),
  additionalQualities: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfileUpdate() {
  const [activeTab, setActiveTab] = useState("basic")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [completionPercentage, setCompletionPercentage] = useState(65)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Ahmed Rahman",
      description: "A practicing Muslim seeking a life partner who shares similar values and beliefs.",
      phone: "+8801712345678",
      email: "ahmed.rahman@email.com",
      country: "Bangladesh",
      // Add more default values as needed
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Simulate API call
      console.log("Profile data submitted:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Profile updated successfully!")
    } catch (error) {
      toast.error("Failed to update profile. Please try again.")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "family", label: "Family", icon: Users },
    { id: "personal", label: "Personal", icon: Heart },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "preferences", label: "Preferences", icon: Search },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Profile</h1>
              <p className="text-gray-600">Keep your information up to date to find better matches</p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Mobile Tab Navigation */}
              <div className="md:hidden mb-6">
                <Select value={activeTab} onValueChange={setActiveTab}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select section to edit" />
                  </SelectTrigger>
                  <SelectContent>
                    {tabs.map((tab) => (
                      <SelectItem key={tab.id} value={tab.id}>
                        <div className="flex items-center gap-2">
                          <tab.icon className="h-4 w-4" />
                          {tab.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Desktop Tab Navigation */}
              <TabsList className="hidden md:grid w-full grid-cols-7 mb-8 bg-rose-50">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 data-[state=active]:bg-rose-600 data-[state=active]:text-white">
                    <tab.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-rose-600" />
                      Basic Information
                    </CardTitle>
                    <CardDescription>Your basic profile information that others will see first</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center gap-4">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={profileImage || "/placeholder.svg?height=128&width=128"} />
                        <AvatarFallback className="text-2xl">AR</AvatarFallback>
                      </Avatar>
                      <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" className="relative bg-transparent">
                          <Camera className="h-4 w-4 mr-2" />
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>About Yourself *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write a brief description about yourself, your values, and what you're looking for in a life partner..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will be the first thing potential matches see about you
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Address Information */}
              <TabsContent value="address" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-rose-600" />
                      Address Information
                    </CardTitle>
                    <CardDescription>Your current and permanent address details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Present Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="presentDivision"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Division</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select division" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dhaka">Dhaka</SelectItem>
                                  <SelectItem value="chittagong">Chittagong</SelectItem>
                                  <SelectItem value="sylhet">Sylhet</SelectItem>
                                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                                  <SelectItem value="khulna">Khulna</SelectItem>
                                  <SelectItem value="barisal">Barisal</SelectItem>
                                  <SelectItem value="rangpur">Rangpur</SelectItem>
                                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="presentDistrict"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter district" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="presentUpazila"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upazila</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter upazila" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="presentDetails"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Detailed Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="House/Road/Area details..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Permanent Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="permanentDivision"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Division</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select division" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dhaka">Dhaka</SelectItem>
                                  <SelectItem value="chittagong">Chittagong</SelectItem>
                                  <SelectItem value="sylhet">Sylhet</SelectItem>
                                  <SelectItem value="rajshahi">Rajshahi</SelectItem>
                                  <SelectItem value="khulna">Khulna</SelectItem>
                                  <SelectItem value="barisal">Barisal</SelectItem>
                                  <SelectItem value="rangpur">Rangpur</SelectItem>
                                  <SelectItem value="mymensingh">Mymensingh</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permanentDistrict"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter district" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="permanentUpazila"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upazila</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter upazila" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="permanentDetails"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Detailed Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="House/Road/Area details..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-rose-600" />
                      Educational Background
                    </CardTitle>
                    <CardDescription>Your academic qualifications and achievements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">SSC Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="sscYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Passing Year</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 2015" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sscGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="science">Science</SelectItem>
                                  <SelectItem value="commerce">Commerce</SelectItem>
                                  <SelectItem value="arts">Arts</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sscResult"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Result</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., GPA 5.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">HSC Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="hscYear"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Passing Year</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 2017" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="hscGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="science">Science</SelectItem>
                                  <SelectItem value="commerce">Commerce</SelectItem>
                                  <SelectItem value="arts">Arts</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="hscResult"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Result</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., GPA 5.00" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <FormField
                      control={form.control}
                      name="honours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Higher Education</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Bachelor's, Master's, or other higher education details..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include degree, institution, year, and any special achievements
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Family Information */}
              <TabsContent value="family" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-rose-600" />
                      Family Information
                    </CardTitle>
                    <CardDescription>Details about your family background</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Father's Information</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="fatherAlive"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="alive">Alive</SelectItem>
                                    <SelectItem value="deceased">Deceased</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="fatherOccupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Father's occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Mother's Information</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="motherAlive"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="alive">Alive</SelectItem>
                                    <SelectItem value="deceased">Deceased</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="motherOccupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupation</FormLabel>
                                <FormControl>
                                  <Input placeholder="Mother's occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Siblings Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="brothers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Brothers</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 2" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sisters"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Sisters</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="siblingsDetails"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Siblings Details</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief information about your siblings (occupation, marital status, etc.)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Personal Information */}
              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-600" />
                      Personal & Religious Information
                    </CardTitle>
                    <CardDescription>Your personal characteristics and religious practices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Religious Practice</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="beard"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Beard</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select option" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                    <SelectItem value="sometimes">Sometimes</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="salat"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prayer (Salat)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="regular">Regular (5 times)</SelectItem>
                                    <SelectItem value="sometimes">Sometimes</SelectItem>
                                    <SelectItem value="rarely">Rarely</SelectItem>
                                    <SelectItem value="learning">Learning</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mahramTravel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Travel with Mahram</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select preference" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes, always</SelectItem>
                                    <SelectItem value="depends">Depends on situation</SelectItem>
                                    <SelectItem value="no">No restriction</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Health & Physical</h3>
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="height"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Height</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 5'8&quot; or 173 cm" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 70 kg" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bodyColor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Complexion</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select complexion" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="fair">Fair</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bloodGroup"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Group</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="health"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Health Condition</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your general health condition..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="disability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Any Disability</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please mention if you have any disability or special needs..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Marital Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="maritalStatus"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marital Status</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="never-married">Never Married</SelectItem>
                                  <SelectItem value="divorced">Divorced</SelectItem>
                                  <SelectItem value="widowed">Widowed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="childAllow"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Children Allowed</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select preference" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="depends">Depends</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="whyWantToMarry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why do you want to get married?</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Share your thoughts about marriage and what it means to you..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="futurePlan"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Future Plans</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your future plans and goals..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Information */}
              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-rose-600" />
                      Contact Information
                    </CardTitle>
                    <CardDescription>How others can reach you</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+8801712345678" {...field} />
                            </FormControl>
                            <FormDescription>This will be used for verification and contact</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormDescription>Optional but recommended for account recovery</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook Profile (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="https://facebook.com/yourprofile" {...field} />
                          </FormControl>
                          <FormDescription>This can help verify your identity</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Partner Preferences */}
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-rose-600" />
                      Partner Preferences
                    </CardTitle>
                    <CardDescription>What you're looking for in a life partner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="ageRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Age Range</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 22-28" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="educationLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Education Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="ssc">SSC or equivalent</SelectItem>
                                <SelectItem value="hsc">HSC or equivalent</SelectItem>
                                <SelectItem value="bachelor">Bachelor's degree</SelectItem>
                                <SelectItem value="master">Master's degree</SelectItem>
                                <SelectItem value="phd">PhD or higher</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="preferredMaritalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marital Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="never-married">Never Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="religiousPractice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Religious Practice</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select preference" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="very-religious">Very Religious</SelectItem>
                                <SelectItem value="moderately-religious">Moderately Religious</SelectItem>
                                <SelectItem value="learning">Learning</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="physicalAppearance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Physical Appearance Preferences</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your preferences for physical appearance (height, complexion, etc.)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additionalQualities"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Qualities</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="What other qualities are important to you in a life partner?"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Mention personality traits, values, lifestyle preferences, etc.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>All changes are saved automatically</span>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline">
                  Preview Profile
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
