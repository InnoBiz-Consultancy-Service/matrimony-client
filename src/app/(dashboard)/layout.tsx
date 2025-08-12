"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { JSX, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UserRoundPen } from "lucide-react";
import { AppSidebar } from "@/components/ui/app-sidebar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const [breadcrumbItems, setBreadcrumbItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generateBreadcrumbItems = () => {
      if (!pathname) return;
      const segments = pathname
        .split("/")
        .filter((segment) => segment.length > 0);
      const items: JSX.Element[] = [];

      let currentPath = "";
      segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // Add a separator
        if (index > 0) {
          items.push(<BreadcrumbSeparator key={`separator-${index}`} />);
        }

        // Create the breadcrumb item
        if (index < segments.length - 1) {
          items.push(
            <BreadcrumbItem key={segment}>
              <Link href={currentPath}>
                <BreadcrumbPage>
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </BreadcrumbPage>
              </Link>
            </BreadcrumbItem>
          );
        } else {
          // If it's the last segment, just display the text
          items.push(
            <BreadcrumbItem key={segment}>
              <BreadcrumbPage>
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        }
      });

      setBreadcrumbItems(items);
    };

    generateBreadcrumbItems();
  }, [pathname]);

  return (
    <html>
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="flex items-center space-x-10">
              <div>
                <SidebarTrigger />
              </div>
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full border-b bg-white px-4 sm:px-6 py-4 shadow-sm gap-4">
                <div className="w-full sm:w-auto">
                  <Breadcrumb>
                    <BreadcrumbList>{breadcrumbItems}</BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100 flex-shrink-0 border ">
                    <UserRoundPen className="h-5 w-5" />
                    {/* <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-indigo-500"></span> */}
                  </button>
                </div>
              </header>
            </div>
            <div className="px-4">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
};
export default Layout;
