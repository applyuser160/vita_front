"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import "./globals.css";

import { AppSidebar, SidebarMenuGroupType } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const NoSsrThemeProvider = dynamic(
  () =>
    import("@/components/theme-provider").then(
      (module) => module.ThemeProvider
    ),
  { ssr: false }
);

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
  const items: SidebarMenuGroupType[] = [
    {
      id: "1",
      title: "App",
      items: [
        {
          id: "1",
          title: "Home",
          url: "#",
          icon: Home,
        },
        {
          id: "2",
          title: "Inbox",
          url: "#",
          icon: Inbox,
        },
        {
          id: "3",
          title: "Calendar",
          url: "#",
          icon: Calendar,
        },
        {
          id: "4",
          title: "Search",
          url: "#",
          icon: Search,
        },
        {
          id: "5",
          title: "Settings",
          url: "#",
          icon: Settings,
        },
      ],
    },
  ];

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
            <AppSidebar key="title" groups={items} />
            <SidebarTrigger />
            {children}
          </SidebarProvider>
        </NoSsrThemeProvider>
      </body>
    </html>
  );
}
