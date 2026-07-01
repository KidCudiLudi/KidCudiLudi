"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Target, CheckSquare,
  Calendar, Heart, BookOpen, Wallet, BarChart2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants/routes";

const navItems = [
  { href: ROUTES.HOME,      label: "Home",    icon: LayoutDashboard },
  { href: ROUTES.GOALS,     label: "Cele",    icon: Target },
  { href: ROUTES.HABITS,    label: "Nawyki",  icon: CheckSquare },
  { href: ROUTES.CALENDAR,  label: "Kalend.", icon: Calendar },
  { href: ROUTES.WELLNESS,  label: "Zdrowie", icon: Heart },
  { href: ROUTES.READING,   label: "Książki", icon: BookOpen },
  { href: ROUTES.FINANCE,   label: "Finanse", icon: Wallet },
  { href: ROUTES.ANALYTICS, label: "Analityka", icon: BarChart2 },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background border-t flex">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] transition-colors",
              active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
