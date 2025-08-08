"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Heart,
  X,
  User,
  LogOut,
  Settings,
  Bookmark,
  ChevronDown,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import femaleAvatar from "../../../../public/female_avatar.jpg";
import maleAvatar from "../../../../public/men_avatar.webp";
import type { User as UserType } from "@/types/user";

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
          ? "bg-white/95 backdrop-blur-md shadow-lg border-rose-100"
          : "bg-white border-rose-50"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:shadow-rose-200 transition-all duration-300 group-hover:scale-105">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 opacity-80 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                Nikah
              </span>
              <span className="text-xs text-rose-500/70 font-medium -mt-1">
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
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-rose-50 group",
                  pathname === item.href
                    ? "text-rose-700 bg-rose-50"
                    : "text-gray-700 hover:text-rose-700"
                )}
              >
                {item.title}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rose-600 rounded-full"></div>
                )}
                <div className="absolute inset-0 rounded-lg bg-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Profile Dropdown */}
                <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 hover:bg-rose-50 transition-all duration-200 p-2 rounded-lg cursor-pointer"
                    >
                      <Avatar className="h-8 w-8 rounded-lg ring-2 ring-rose-100 hover:ring-rose-200 transition-all duration-200">
                        <AvatarImage
                          src={
                            user?.gender === "male"
                              ? maleAvatar.src
                              : femaleAvatar.src
                          }
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-rose-500 to-rose-600 text-white font-semibold text-sm">
                          {getInitials(user?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-200" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-80 p-0 shadow-xl border-0 bg-white/95 backdrop-blur-sm"
                    align="end"
                  >
                    {/* User Info Header */}
                    <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white shadow-md">
                          <AvatarImage
                            src={
                              user?.gender === "male"
                                ? maleAvatar.src
                                : femaleAvatar.src
                            }
                            alt={user?.name}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-rose-500 to-rose-600 text-white font-semibold text-lg">
                            {getInitials(user?.name || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          {/* <div className="flex items-center space-x-2">
                            <p className="font-semibold text-gray-800 truncate">{user?.name || "User"}</p>
                            {user?.isPremium && <Crown className="h-4 w-4 text-amber-500" />}
                            {user?.verified && <Shield className="h-4 w-4 text-blue-500" />}
                          </div> */}
                          <p className="text-sm text-gray-600 truncate">
                            {user?.userEmail || "user@example.com"}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link href="/profile">
                        <button
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-rose-50 transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="h-9 w-9 rounded-lg bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                            <User className="h-4 w-4 text-rose-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              My Profile
                            </p>
                            <p className="text-xs text-gray-500">
                              View and edit your profile
                            </p>
                          </div>
                        </button>
                      </Link>

                      <Link href="/favorites">
                        <button
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-rose-50 transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="h-9 w-9 rounded-lg bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                            <Bookmark className="h-4 w-4 text-pink-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              Favorites
                            </p>
                            <p className="text-xs text-gray-500">
                              Saved profiles
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-pink-100 text-pink-700 text-xs"
                          >
                            12
                          </Badge>
                        </button>
                      </Link>

                      <Link href="/settings">
                        <button
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-rose-50 transition-colors duration-200 group cursor-pointer"
                        >
                          <div className="h-9 w-9 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Settings className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              Settings
                            </p>
                            <p className="text-xs text-gray-500">
                              Account preferences
                            </p>
                          </div>
                        </button>
                      </Link>

                      <Separator className="my-2 bg-rose-100" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 group cursor-pointer"
                      >
                        <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Sign Out</p>
                          <p className="text-xs text-gray-500">
                            Logout from your account
                          </p>
                        </div>
                      </button>
                    </div>

                    {/* Premium Badge */}
                    {/* {user?.isPremium && (
                      <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100 border-t border-amber-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Crown className="h-4 w-4 text-amber-600" />
                            <span className="text-sm font-medium text-amber-800">Premium Member</span>
                          </div>
                          <Badge className="bg-amber-500 text-white text-xs">Active</Badge>
                        </div>
                      </div>
                    )} */}
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className="text-rose-700 hover:text-rose-800 hover:bg-rose-50 font-medium transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/registration">
                  <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg hover:shadow-rose-200 transition-all duration-300 font-medium px-6">
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
                className="text-rose-700 hover:bg-rose-50 transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] sm:w-[350px] bg-white/95 backdrop-blur-sm px-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-4 border-b border-rose-100">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-md">
                      <Heart className="h-4 w-4 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                      Nikah
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* User Info in Mobile */}
                {isAuthenticated && (
                  <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-b border-rose-100">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12 rounded-lg ring-2 ring-white shadow-md">
                        <AvatarImage
                          src={
                            user?.gender === "male"
                              ? maleAvatar.src
                              : femaleAvatar.src
                          }
                          alt={user?.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-rose-500 to-rose-600 text-white font-semibold">
                          {getInitials(user?.name || "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-800 truncate">
                            {user?.name || "User"}
                          </p>
                          {/* {user?.isPremium && <Crown className="h-4 w-4 text-amber-500" />} */}
                        </div>
                        <p className="text-sm text-gray-600 truncate">
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
                          ? "text-rose-700 bg-rose-50 border-l-4 border-rose-600 shadow-sm"
                          : "text-gray-700 hover:text-rose-700 hover:bg-rose-50"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}

                  {/* Mobile User Menu Items */}
                  {isAuthenticated && (
                    <>
                      <Separator className="my-4 bg-rose-100" />

                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">My Profile</span>
                      </Link>

                      <Link
                        href="/favorites"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <Bookmark className="h-5 w-5" />
                        <span className="font-medium">Favorites</span>
                        <Badge
                          variant="secondary"
                          className="ml-auto bg-pink-100 text-pink-700 text-xs"
                        >
                          12
                        </Badge>
                      </Link>

                      <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-6 py-3 text-gray-700 hover:text-rose-700 hover:bg-rose-50 transition-all duration-200 mx-2 rounded-lg"
                      >
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                      </Link>
                    </>
                  )}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="border-t border-rose-100 p-4 space-y-3">
                  {isAuthenticated ? (
                    <Button
                      onClick={handleLogout}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transition-all duration-300"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link href="/login" className="block">
                        <Button
                          variant="outline"
                          className="w-full border-rose-200 text-rose-700 hover:bg-rose-50 bg-transparent transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/registration" className="block">
                        <Button
                          className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg transition-all duration-300"
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
