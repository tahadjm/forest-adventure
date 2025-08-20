"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MaxWidthWrapper } from "../ui/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";

const parks = [
  {
    name: "Forest Adventure Annaba",
    slug: "annaba",
    activities: [
      "Parcours Orange",
      "Route Vert",
      "Lasergame",
      "Archery",
      "Quads",
    ],
  },
  {
    name: "Forest Adventure Tipaza",
    slug: "tipaza",
    activities: ["Parcours Orange", "Route Vert", "Lasergame"],
  },
];

const staticLinks = [
  { name: "About", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const menuTitles: Record<string, string> = {
  parks: "Parks",
  activities: "Activities",
};

function ParkMenuList({ titleKey }: { titleKey: keyof typeof menuTitles }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{menuTitles[titleKey]}</NavigationMenuTrigger>
      <NavigationMenuContent className="min-w-[400px] max-w-[500px]">
        {titleKey === "parks" ? (
          <ul className="p-4 space-y-1">
            {parks.map((park) => (
              <li key={park.slug}>
                <NavigationMenuLink asChild>
                  <Link
                    href={`/${park.slug}`}
                    className="block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {park.name}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-6 p-6 lg:grid-cols-2">
            {parks.map((park) => (
              <li key={park.slug} className="space-y-2">
                <p className="font-semibold text-sm">{park.name}</p>
                <ul className="space-y-1 pl-2">
                  {park.activities.map((act) => (
                    <li key={act}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${park.slug}/${act.toLowerCase()}`}
                          className="block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {act}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white sticky z-59 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-100">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="forest adventure logo"
                  width={40}
                  height={40}
                  className="rounded-xl"
                />
                <span className="font-semibold hidden sm:inline">
                  Forest Adventure
                </span>
              </Link>
              <div className="hidden lg:flex lg:items-center lg:gap-x-8">
                <NavigationMenu>
                  <NavigationMenuList>
                    <ParkMenuList titleKey="parks" />
                    <ParkMenuList titleKey="activities" />

                    {/* Static Links */}
                    {staticLinks.map((link) => (
                      <NavigationMenuItem key={link.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="text-sm font-medium hover:text-primary transition-colors"
                          >
                            {link.name}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="hidden lg:flex items-center gap-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">User</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/logout">Logout</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="lg:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[280px] sm:w-[320px] px-4 py-6 flex flex-col"
                  >
                    <VisuallyHidden>
                      <SheetTitle>Mobile Menu</SheetTitle>
                    </VisuallyHidden>

                    <nav className="flex flex-col gap-y-2 overflow-y-auto flex-1 pr-2 -mr-2">
                      <div>
                        <h3 className="text-base font-semibold tracking-tight pt-10 my-4">
                          Découvrez nos parcs
                        </h3>
                        <ul className="space-y-5">
                          {parks.map((p) => (
                            <li key={p.slug} >
                              <Link href={"#"} className="p-2 rounded-sm text-sm font-medium text-muted-foreground hover:bg-accent mb-2">
                                {p.name}
                              </Link>
                              <ul className="pl-3 space-y-1.5 border-l border-muted-foreground/20">
                                {p.activities.map((act) => (
                                  <li key={act}>
                                    <Link
                                      href={`/${p.slug}/${act
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      onClick={() => setOpen(false)}
                                      className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition"
                                    >
                                      {act}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-base font-semibold tracking-tight mb-4">
                          Plus
                        </h3>
                        <ul className="space-y-2">
                          {staticLinks.map((link) => (
                            <li key={link.name}>
                              <Link
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition"
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator className="my-4" />
                      <div>
                        <h3 className="text-base font-semibold tracking-tight mb-4">
                          Compte
                        </h3>
                        <ul className="space-y-2">
                          <li>
                            <Link
                              href="/profile"
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition"
                            >
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/logout"
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition"
                            >
                              Déconnexion
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
