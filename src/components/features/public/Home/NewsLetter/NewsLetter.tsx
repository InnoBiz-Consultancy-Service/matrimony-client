import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React from "react";

const NewsLetter = () => {
  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Get Marriage Tips & Success Stories
            </h3>
            <p className="text-emerald-100 mb-8 text-lg">
              Join and get weekly relationship advice and inspiring love stories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-emerald-100 focus:border-white/40 rounded-xl"
              />
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-8 rounded-xl whitespace-nowrap">
                Subscribe Free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;