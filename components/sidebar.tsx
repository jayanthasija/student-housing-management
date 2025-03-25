"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  Key,
  Wrench,
  CreditCard,
  Calendar,
  Bell,
  Users,
  FileText,
  Building2,
  MessageSquare,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const routes = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Student Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Room Assignments",
    href: "/rooms",
    icon: Key,
  },
  {
    name: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    name: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    name: "Scheduling",
    href: "/scheduling",
    icon: Calendar,
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Roommate Matching",
    href: "/roommates",
    icon: Users,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Building Layouts",
    href: "/buildings",
    icon: Building2,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquare,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)

  const navigation = (
    <nav className="grid items-start px-2 py-4 md:px-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href} onClick={() => setOpen(false)}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground mb-1",
              pathname === route.href ? "bg-accent" : "transparent",
            )}
          >
            <route.icon className="mr-2 h-4 w-4" />
            <span>{route.name}</span>
          </span>
        </Link>
      ))}
    </nav>
  )

  if (isMobile) {
    return (
      <>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="border-b py-4 flex items-center justify-center">
              <span className="text-xl font-bold">Campus Housing</span>
            </div>
            {navigation}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return <aside className="hidden w-64 border-r md:block">{navigation}</aside>
}

