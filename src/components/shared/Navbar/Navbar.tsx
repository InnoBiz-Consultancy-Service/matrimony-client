"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Heart, X, User, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/app/(auth)/context/auth-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import femaleAvatar from "../../../../public/female_avatar.jpg";
import maleAvatar from "../../../../public/men_avatar.webp";
import type { User as UserType } from "@/types/user";
import { ThemeToggle } from "@/components/features/public/ThemeToggle/ThemeToggle";

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Find Match", href: "/biodatas" },
  { title: "Success Stories", href: "/success-stories" },
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const {
    user,
    isAuthenticated,
    logout,
  }: { user: UserType | null; isAuthenticated: boolean; logout: () => void } =
    useAuth();

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-emerald-100 dark:border-gray-800"
          : "bg-white dark:bg-gray-950 border-emerald-50 dark:border-gray-800"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-[#50C878] dark:bg-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-800/30 transition-all duration-300 group-hover:scale-105">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 opacity-80 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-emerald-600 dark:bg-emerald-500 bg-clip-text text-transparent">
                Nikah
              </span>
              <span className="text-xs text-[#50C878] dark:text-emerald-400 font-medium -mt-1">
                Find Your Perfect Match
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 group",
                  pathname === item.href
                    ? "text-[#50C878] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70"
                    : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                )}
              >
                {item.title}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
                )}
                <div className="absolute inset-0 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Profile Dropdown */}
                <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200 p-2 rounded-lg cursor-pointer"
                    >
                      <Avatar className="h-8 w-8 rounded-lg ring-2 ring-emerald-100 dark:ring-emerald-900 hover:ring-emerald-200 dark:hover:ring-emerald-700 transition-all duration-200">
                        <AvatarImage
                          src={
                            user?.gender === "male"
                              ? maleAvatar.src
                              : femaleAvatar.src
                          }
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold text-sm">
                          {getInitials(user?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800"
                    align="end"
                  >
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-emerald-50 to-pink-50 dark:from-emerald-950/50 dark:to-pink-950/50 border-b border-emerald-100 dark:border-emerald-900">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-gray-800 shadow-md">
                          <AvatarImage
                            src={
                              user?.gender === "male"
                                ? maleAvatar.src
                                : femaleAvatar.src
                            }
                            alt={user?.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold text-lg">
                            {getInitials(user?.name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {user?.userEmail || "user@example.com"}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors duration-200 group cursor-pointer"
                      >
                        <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                          <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        {user?.role === "admin" ? (
                          <Link href={"/dashboard"}>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                Admin Dashboard
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Manage users and content
                              </p>
                            </div>
                          </Link>
                        ) : (
                          <Link href={"/profile"}>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-200">
                                My Profile
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                View and edit your profile
                              </p>
                            </div>
                          </Link>
                        )}
                      </button>
                      <Separator className="my-2 bg-emerald-100 dark:bg-emerald-900" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors duration-200 group cursor-pointer"
                      >
                        <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                          <LogOut className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-gray-200">
                            Sign Out
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Logout from your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 font-medium transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/registration">
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-800/30 transition-all duration-300 font-medium px-6">
                    Join Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Menu"
                className="text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] sm:w-[350px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-0 border-l border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-emerald-100 dark:border-emerald-900">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 flex items-center justify-center shadow-md">
                      <Heart className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 bg-clip-text text-transparent">
                      Nikah
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Info in Mobile */}
                {isAuthenticated && (
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-pink-50 dark:from-emerald-950/50 dark:to-pink-950/50 border-b border-emerald-100 dark:border-emerald-900">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-gray-800 shadow-md">
                        <AvatarImage
                          src={
                            user?.gender === "male"
                              ? maleAvatar.src
                              : femaleAvatar.src
                          }
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold">
                          {getInitials(user?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {user?.name || "User"}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {user?.userEmail || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-1 py-4 flex-1 px-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 mx-2",
                        pathname === item.href
                          ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border-l-4 border-emerald-600 dark:border-emerald-500 shadow-sm"
                          : "text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}

                  {/* Mobile User Menu Items */}
                  {isAuthenticated && (
                    <>
                      <Separator className="my-4 bg-emerald-100 dark:bg-emerald-900" />

                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">My Profile</span>
                      </Link>
                    </>
                  )}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="border-t border-emerald-100 dark:border-emerald-900 p-4 space-y-3">
                  {isAuthenticated ? (
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg transition-all duration-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link href="/login" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 bg-transparent transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/registration" className="block">
                        <Button
                          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg transition-all duration-300"
                          onClick={() => setIsOpen(false)}
                        >
                          Join Free
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, Heart, X, User, LogOut, ChevronDown, Globe } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useAuth } from "@/app/(auth)/context/auth-context";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import femaleAvatar from "../../../../public/female_avatar.jpg";
// import maleAvatar from "../../../../public/men_avatar.webp";
// import type { User as UserType } from "@/types/user";
// import { ThemeToggle } from "@/components/features/public/ThemeToggle/ThemeToggle";
// import { i18n } from "@/lib/i18n";

// const getNavigationItems = (dictionary) => [
//   { title: dictionary.common.home, href: "/" },
//   { title: dictionary.navigation.findMatch || "Find Match", href: "/biodatas" },
//   { title: dictionary.navigation.successStories || "Success Stories", href: "/success-stories" },
//   { title: dictionary.common.about, href: "/about" },
//   { title: dictionary.common.contact, href: "/contact" },
// ];

// export default function Navbar({ lang, dictionary }) {
//   const pathname = usePathname();
//   const [isScrolled, setIsScrolled] = React.useState(false);
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [isProfileOpen, setIsProfileOpen] = React.useState(false);
//   const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
//   const languageDropdownRef = React.useRef(null);
  
//   const {
//     user,
//     isAuthenticated,
//     logout,
//   }: { user: UserType | null; isAuthenticated: boolean; logout: () => void } =
//     useAuth();

//   const navigationItems = getNavigationItems(dictionary);

//   // Handle scroll effect
//   React.useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close language dropdown when clicking outside
//   React.useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
//         setIsLanguageOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const redirectedPathName = (locale) => {
//     if (!pathname) return '/';
//     const segments = pathname.split('/');
//     segments[1] = locale;
//     return segments.join('/');
//   };

//   const getCurrentLanguageLabel = () => {
//     return lang === 'en' ? 'English' : 'বাংলা';
//   };

//   const getLanguageFlag = (locale) => {
//     return locale === 'en' ? '🇺🇸' : '🇧🇩';
//   };

//   const handleLogout = () => {
//     logout();
//     setIsProfileOpen(false);
//   };

//   const getInitials = (name: string) => {
//     return (
//       name
//         ?.split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase() || "U"
//     );
//   };

//   return (
//     <header
//       className={cn(
//         "sticky top-0 z-50 w-full transition-all duration-300 border-b",
//         isScrolled
//           ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-emerald-100 dark:border-gray-800"
//           : "bg-white dark:bg-gray-950 border-emerald-50 dark:border-gray-800"
//       )}
//     >
//       <div className="container mx-auto px-4 lg:px-8">
//         <div className="flex h-20 items-center justify-between">
//           {/* Logo */}
//           <Link href={`/${lang}`} className="flex items-center space-x-3 group">
//             <div className="relative">
//               <div className="h-10 w-10 rounded-full bg-[#50C878] dark:bg-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-emerald-200 dark:group-hover:shadow-emerald-800/30 transition-all duration-300 group-hover:scale-105">
//                 <Heart className="h-5 w-5 text-white fill-white" />
//               </div>
//               <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 opacity-80 animate-pulse"></div>
//             </div>
//             <div className="flex flex-col">
//               <span className="text-2xl font-bold bg-emerald-600 dark:bg-emerald-500 bg-clip-text text-transparent">
//                 Nikah
//               </span>
//               <span className="text-xs text-[#50C878] dark:text-emerald-400 font-medium -mt-1">
//                 {dictionary.navigation?.tagline || "Find Your Perfect Match"}
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-1">
//             {navigationItems.map((item) => (
//               <Link
//                 key={item.title}
//                 href={`/${lang}${item.href}`}
//                 className={cn(
//                   "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 group",
//                   pathname === `/${lang}${item.href}` || (item.href === "/" && pathname === `/${lang}`)
//                     ? "text-[#50C878] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70"
//                     : "text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
//                 )}
//               >
//                 {item.title}
//                 {(pathname === `/${lang}${item.href}` || (item.href === "/" && pathname === `/${lang}`)) && (
//                   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full"></div>
//                 )}
//                 <div className="absolute inset-0 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop CTA Buttons */}
//           <div className="hidden lg:flex items-center space-x-3">
//             {/* Language Switcher */}
//             <div className="relative" ref={languageDropdownRef}>
//               <Button
//                 variant="ghost"
//                 onClick={() => setIsLanguageOpen(!isLanguageOpen)}
//                 className="flex items-center space-x-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
//               >
//                 <Globe className="h-4 w-4" />
//                 <span className="text-sm font-medium">{getCurrentLanguageLabel()}</span>
//                 <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`} />
//               </Button>

//               {isLanguageOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 py-2 z-10 dropdown-menu">
//                   {i18n.locales.map((locale) => (
//                     <Link
//                       key={locale}
//                       href={redirectedPathName(locale)}
//                       className={cn(
//                         "flex items-center space-x-3 px-4 py-2 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors",
//                         lang === locale 
//                           ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400' 
//                           : 'text-gray-700 dark:text-gray-300'
//                       )}
//                       onClick={() => setIsLanguageOpen(false)}
//                     >
//                       <span className="text-lg">{getLanguageFlag(locale)}</span>
//                       <div className="flex flex-col">
//                         <span className="font-medium">
//                           {locale === 'en' ? 'English' : 'বাংলা'}
//                         </span>
//                         <span className="text-xs text-gray-500 dark:text-gray-400">
//                           {locale === 'en' ? 'English' : 'Bangla'}
//                         </span>
//                       </div>
//                       {lang === locale && (
//                         <svg className="w-4 h-4 ml-auto text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                         </svg>
//                       )}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <ThemeToggle />
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-3">
//                 {/* User Profile Dropdown */}
//                 <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       className="flex items-center space-x-2 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200 p-2 rounded-lg cursor-pointer"
//                     >
//                       <Avatar className="h-8 w-8 rounded-lg ring-2 ring-emerald-100 dark:ring-emerald-900 hover:ring-emerald-200 dark:hover:ring-emerald-700 transition-all duration-200">
//                         <AvatarImage
//                           src={
//                             user?.gender === "male"
//                               ? maleAvatar.src
//                               : femaleAvatar.src
//                           }
//                           alt={user?.name}
//                         />
//                         <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold text-sm">
//                           {getInitials(user?.name || "")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200" />
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent
//                     className="w-80 p-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800"
//                     align="end"
//                   >
//                     {/* User Info Header */}
//                     <div className="p-4 bg-gradient-to-r from-emerald-50 to-pink-50 dark:from-emerald-950/50 dark:to-pink-950/50 border-b border-emerald-100 dark:border-emerald-900">
//                       <div className="flex items-center space-x-3">
//                         <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-gray-800 shadow-md">
//                           <AvatarImage
//                             src={
//                               user?.gender === "male"
//                                 ? maleAvatar.src
//                                 : femaleAvatar.src
//                             }
//                             alt={user?.name}
//                           />
//                           <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold text-lg">
//                             {getInitials(user?.name || "")}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                             {user?.userEmail || "user@example.com"}
//                           </p>
//                           <div className="flex items-center space-x-2 mt-1">
//                             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
//                             <span className="text-xs text-green-600 dark:text-green-400 font-medium">
//                               {dictionary.navigation?.online || "Online"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                       <button
//                         onClick={() => setIsProfileOpen(false)}
//                         className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors duration-200 group cursor-pointer"
//                       >
//                         <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
//                           <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
//                         </div>
//                         {user?.role === "admin" ? (
//                           <Link href={`/${lang}/dashboard`}>
//                             <div className="flex-1">
//                               <p className="font-medium text-gray-800 dark:text-gray-200">
//                                 {dictionary.navigation?.adminDashboard || "Admin Dashboard"}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 {dictionary.navigation?.manageUsers || "Manage users and content"}
//                               </p>
//                             </div>
//                           </Link>
//                         ) : (
//                           <Link href={`/${lang}/profile`}>
//                             <div>
//                               <p className="font-medium text-gray-800 dark:text-gray-200">
//                                 {dictionary.navigation?.myProfile || "My Profile"}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 {dictionary.navigation?.viewProfile || "View and edit your profile"}
//                               </p>
//                             </div>
//                           </Link>
//                         )}
//                       </button>
//                       <Separator className="my-2 bg-emerald-100 dark:bg-emerald-900" />

//                       <button
//                         onClick={handleLogout}
//                         className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors duration-200 group cursor-pointer"
//                       >
//                         <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
//                           <LogOut className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-gray-200">
//                             {dictionary.navigation?.signOut || "Sign Out"}
//                           </p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400">
//                             {dictionary.navigation?.logout || "Logout from your account"}
//                           </p>
//                         </div>
//                       </button>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//             ) : (
//               <>
//                 <Link href={`/${lang}/login`}>
//                   <Button
//                     variant="ghost"
//                     className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 font-medium transition-all duration-200"
//                   >
//                     {dictionary.navigation?.signIn || "Sign In"}
//                   </Button>
//                 </Link>
//                 <Link href={`/${lang}/registration`}>
//                   <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-800/30 transition-all duration-300 font-medium px-6">
//                     {dictionary.navigation?.joinFree || "Join Free"}
//                   </Button>
//                 </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <Sheet open={isOpen} onOpenChange={setIsOpen}>
//             <SheetTrigger asChild className="lg:hidden">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 aria-label="Menu"
//                 className="text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200"
//               >
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent
//               side="right"
//               className="w-[320px] sm:w-[350px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-0 border-l border-gray-200 dark:border-gray-800"
//             >
//               <div className="flex flex-col h-full">
//                 {/* Mobile Header */}
//                 <div className="flex items-center justify-between p-4 border-b border-emerald-100 dark:border-emerald-900">
//                   <div className="flex items-center space-x-3">
//                     <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 flex items-center justify-center shadow-md">
//                       <Heart className="h-4 w-4 text-white fill-white" />
//                     </div>
//                     <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 bg-clip-text text-transparent">
//                       Nikah
//                     </span>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => setIsOpen(false)}
//                     className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
//                   >
//                     <X className="h-5 w-5" />
//                   </Button>
//                 </div>

//                 {/* Language Switcher in Mobile */}
//                 <div className="p-4 border-b border-emerald-100 dark:border-emerald-900">
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                       {dictionary.common.language}
//                     </span>
//                     <div className="flex gap-2">
//                       {i18n.locales.map((locale) => (
//                         <Link
//                           key={locale}
//                           href={redirectedPathName(locale)}
//                           className={cn(
//                             "flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-all",
//                             lang === locale
//                               ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400'
//                               : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
//                           )}
//                           onClick={() => setIsOpen(false)}
//                         >
//                           <span>{getLanguageFlag(locale)}</span>
//                           <span className="font-medium">
//                             {locale === 'en' ? 'EN' : 'বাং'}
//                           </span>
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* User Info in Mobile */}
//                 {isAuthenticated && (
//                   <div className="p-4 bg-gradient-to-r from-emerald-50 to-pink-50 dark:from-emerald-950/50 dark:to-pink-950/50 border-b border-emerald-100 dark:border-emerald-900">
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white dark:ring-gray-800 shadow-md">
//                         <AvatarImage
//                           src={
//                             user?.gender === "male"
//                               ? maleAvatar.src
//                               : femaleAvatar.src
//                           }
//                           alt={user?.name}
//                         />
//                         <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 text-white font-semibold">
//                           {getInitials(user?.name || "")}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-2">
//                           <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
//                             {user?.name || "User"}
//                           </p>
//                         </div>
//                         <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
//                           {user?.userEmail || "user@example.com"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Mobile Navigation */}
//                 <nav className="flex flex-col space-y-1 py-4 flex-1 px-2">
//                   {navigationItems.map((item) => (
//                     <Link
//                       key={item.title}
//                       href={`/${lang}${item.href}`}
//                       onClick={() => setIsOpen(false)}
//                       className={cn(
//                         "flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 mx-2",
//                         pathname === `/${lang}${item.href}` || (item.href === "/" && pathname === `/${lang}`)
//                           ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 border-l-4 border-emerald-600 dark:border-emerald-500 shadow-sm"
//                           : "text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50"
//                       )}
//                     >
//                       {item.title}
//                     </Link>
//                   ))}

//                   {/* Mobile User Menu Items */}
//                   {isAuthenticated && (
//                     <>
//                       <Separator className="my-4 bg-emerald-100 dark:bg-emerald-900" />

//                       <Link
//                         href={`/${lang}/profile`}
//                         onClick={() => setIsOpen(false)}
//                         className="flex items-center space-x-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-all duration-200 mx-2 rounded-lg"
//                       >
//                         <User className="h-5 w-5" />
//                         <span className="font-medium">{dictionary.navigation?.myProfile || "My Profile"}</span>
//                       </Link>
//                     </>
//                   )}
//                 </nav>

//                 {/* Mobile CTA Buttons */}
//                 <div className="border-t border-emerald-100 dark:border-emerald-900 p-4 space-y-3">
//                   {isAuthenticated ? (
//                     <Button
//                       onClick={handleLogout}
//                       className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg transition-all duration-300"
//                     >
//                       <LogOut className="mr-2 h-4 w-4" />
//                       {dictionary.navigation?.signOut || "Sign Out"}
//                     </Button>
//                   ) : (
//                     <>
//                       <Link href={`/${lang}/login`} className="block">
//                         <Button
//                           variant="outline"
//                           className="w-full border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 bg-transparent transition-all duration-200"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           {dictionary.navigation?.signIn || "Sign In"}
//                         </Button>
//                       </Link>
//                       <Link href={`/${lang}/registration`} className="block">
//                         <Button
//                           className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 hover:from-emerald-600 hover:to-emerald-700 dark:hover:from-emerald-700 dark:hover:to-emerald-800 text-white shadow-lg transition-all duration-300"
//                           onClick={() => setIsOpen(false)}
//                         >
//                           {dictionary.navigation?.joinFree || "Join Free"}
//                         </Button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }