"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  BarChartIcon,
  BusIcon,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  MapIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Bookings",
      url: "/dashboard/bookings",
      icon: ClipboardListIcon,
    },
    {
      title: "Buses",
      url: "/dashboard/buses",
      icon: BusIcon, 
    },
    {
      title: "Routes",
      url: "/dashboard/routes",
      icon: MapIcon, // You may need to import or choose an appropriate icon
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="transition-colors"
      {...props}
    >
      <SidebarHeader className="">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="flex items-center gap-2 px-4 py-3 hover:bg-accent/50"
            >
              <Link href="/">
                <ArrowUpCircleIcon className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold">bookam</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} bookam
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
