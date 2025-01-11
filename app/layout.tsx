"use client"

import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import dynamic from 'next/dynamic'
import localFont from "next/font/local";
import "./globals.css";

import { AppSidebar, SidebarManuItemType } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const NoSsrThemeProvider = dynamic(() => import('@/components/theme-provider').then((module) => module.ThemeProvider), { ssr: false });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items: SidebarManuItemType[] = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NoSsrThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar title="Application" items={items} />
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </NoSsrThemeProvider>
      </body>
    </html>
  );
}
