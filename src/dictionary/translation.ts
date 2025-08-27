export const translations = {
  en: {
    banner: {
      tagLine: "Trusted by Happy Couples",
      title: "Find Your Match Perfect Today",
      description:
        "Join thousands of successful couples who found their soulmate through our trusted matrimony platform. Your journey to happily ever after starts here.",
      badgeVerify: "100% Verified",
      privacy: "Privacy Protected",
      privacyDesc: "All profiles are manually verified for your safety",
      happyCouples: "Happy Couples",
      activeMember: "Active Member",
      successRate: "Success Rate",
    },
  },
  bn: {
    banner: {
      tagLine: "সুখী দম্পতিদের দ্বারা বিশ্বস্ত",
      title: "এখনই আপনার নিখুঁত সঙ্গী খুঁজে বের করুন",
      description:
        "আমাদের বিশ্বস্ত বিবাহ প্ল্যাটফর্মের মাধ্যমে হাজার হাজার সফল দম্পতির সাথে যোগ দিন যারা তাদের আত্মার সঙ্গী খুঁজে পেয়েছেন। আপনার সুখী জীবনের যাত্রা এখান থেকে শুরু হয়",
      badgeVerify: "১০০% যাচাইকৃত",
      privacy: "গোপনীয়তা সুরক্ষিত",
      privacyDesc:
        "আপনার নিরাপত্তার জন্য সমস্ত প্রোফাইল ম্যানুয়ালি যাচাই করা হয়",
      happyCouples: "সুখী দম্পতিরা",
      activeMember: "সক্রিয় সদস্য",
      successRate: "সাফল্যের হার",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
