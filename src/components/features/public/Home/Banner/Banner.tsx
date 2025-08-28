"use client";
import { Heart, Users, Shield, ArrowRight, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { bannerContent } from "@/dictionary/banner";

export default function Banner() {
  const { language } = useLanguage();
  const t = bannerContent[language];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200/20 dark:bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/10 to-pink-100/10 dark:from-emerald-800/5 dark:to-pink-800/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium border dark:border-emerald-700/30">
              <Heart className="h-4 w-4 fill-current" />
              <span>{t.banner?.tagLine}</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900 dark:text-white">
                  {t.banner?.title}
                </span>
                {/* <span className="block text-emerald-600 dark:text-emerald-400">
                  Perfect Match
                </span>
                <span className="block text-gray-800 dark:text-gray-200">
                  Today
                </span> */}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                {t.banner?.description}
              </p>
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:border-emerald-300 dark:hover:border-emerald-600 font-semibold px-8 py-4 text-lg rounded-xl group bg-transparent transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div> */}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t.banner?.happyCouples}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t.banner?.activeMember}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  0
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {t.banner?.successRate}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="relative hidden lg:flex">
            {/* Main Hero Image Placeholder */}
            <div className="relative">
              <div className="w-full h-[500px] bg-gradient-to-br from-emerald-100 to-pink-100 dark:from-emerald-900/30 dark:to-pink-900/30 rounded-3xl shadow-2xl dark:shadow-emerald-500/10 overflow-hidden border dark:border-gray-700/50">
                <Image
                  width={500}
                  height={500}
                  src="https://t3.ftcdn.net/jpg/06/52/48/90/360_F_652489048_7AjxWwFhIEGCl1Md0VV5u78UR1MYjW4d.jpg"
                  alt="Happy couple"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Feature Card */}
              <Card className="absolute -right-6 bottom-20 w-56 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-xl dark:shadow-emerald-500/20 border-0 dark:border dark:border-gray-600/30">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {t.banner?.badgeVerify}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {t.banner?.privacy}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {t.banner?.privacyDesc}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
