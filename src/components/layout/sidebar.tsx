"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Target, CheckSquare, Calendar, Heart,
  BookOpen, Wallet, BarChart2, Settings, LogOut, PawPrint,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/constants/routes";
import { signOutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: ROUTES.HOME,      label: "Dashboard",  icon: LayoutDashboard },
  { href: ROUTES.GOALS,     label: "Cele",        icon: Target },
  { href: ROUTES.HABITS,    label: "Nawyki",      icon: CheckSquare },
  { href: ROUTES.CALENDAR,  label: "Kalendarz",   icon: Calendar },
  { href: ROUTES.WELLNESS,  label: "Zdrowie",     icon: Heart },
  { href: ROUTES.READING,   label: "Czytanie",    icon: BookOpen },
  { href: ROUTES.FINANCE,   label: "Finanse",     icon: Wallet },
  { href: ROUTES.ANALYTICS, label: "Analityka",   icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-56 min-h-screen border-r bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-sidebar-border">
        <PawPrint className="h-6 w-6 text-primary" />
        <span className="font-semibold text-base">Sammy OS</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-sidebar-foreground/70 hover:bg-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-sidebar-border space-y-0.5">
        <Link
          href={ROUTES.SETTINGS}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === ROUTES.SETTINGS
              ? "bg-primary text-primary-foreground font-medium"
              : "text-sidebar-foreground/70 hover:bg-accent hover:text-sidebar-foreground"
          )}
        >
          <Settings className="h-4 w-4" />
          Ustawienia
        </Link>
        <form action={signOutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground/70 hover:bg-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Wyloguj się
          </button>
        </form>
      </div>
    </aside>
  );
}
