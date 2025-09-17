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
        <main className="w-full">
          <div className="px-4">{children}</div>
        </main>
      </body>
    </html>
  );
};
export default Layout;
