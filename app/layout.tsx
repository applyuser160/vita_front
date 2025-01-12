"use client";

import {
  Banknote,
  ChartNoAxesCombined,
  CreditCard,
  Home,
  ReceiptText,
  Send,
} from "lucide-react";
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
          title: "Account",
          url: "#",
          icon: CreditCard,
        },
        {
          id: "3",
          title: "SubAccount",
          url: "#",
          icon: CreditCard,
        },
        {
          id: "4",
          title: "Balance",
          url: "#",
          icon: ReceiptText,
        },
        {
          id: "5",
          title: "Cash",
          url: "#",
          icon: Banknote,
        },
        {
          id: "6",
          title: "Plan",
          url: "#",
          icon: Send,
        },
        {
          id: "7",
          title: "Analytics",
          url: "#",
          icon: ChartNoAxesCombined,
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
