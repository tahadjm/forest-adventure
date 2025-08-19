"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MaxWidthWrapper } from "../ui/MaxWidthWrapper";

export function Footer() {
  // Hydration-safe year
  const [year, setYear] = useState("2025");
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  // Config arrays
  const parks = [
    { name: "Forest Adventure Annaba", href: "/parks/annaba" },
    { name: "Forest Adventure Tipaza", href: "/parks/tipaza" },
  ];

  const activities = [
    { name: "Parcours Orange", href: "/activities/parcours-orange" },
    { name: "Route Verte", href: "/activities/route-verte" },
    { name: "Laser Game", href: "/activities/laser-game" },
  ];

  const services = [
    { name: "Group Bookings", href: "/services/group-bookings" },
    { name: "Corporate Events", href: "/services/corporate-events" },
    { name: "Birthday Parties", href: "/services/birthday-parties" },
    { name: "School Trips", href: "/services/school-trips" },
  ];

  const policies = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ];

  const socials = [
    { name: "Facebook", href: "https://facebook.com", icon: Facebook },
    { name: "Instagram", href: "https://instagram.com", icon: Instagram },
    { name: "TikTok", href: "https://tiktok.com", icon: Twitter },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <MaxWidthWrapper>
        {/* Main Footer */}
        <section className="py-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
                <Home />
              <span className="font-bold text-lg">Adventure Park</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Thrilling adventures across Algeria — perfect for families,
              friends, and explorers.
            </p>
            <div className="flex gap-2">
              {socials.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>

              {/* Parks Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-primary"
                    >
                      Parks
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    {parks.map((p) => (
                      <DropdownMenuItem key={p.name} asChild>
                        <Link href={p.href}>{p.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              {/* Activities Dropdown */}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-muted-foreground hover:text-primary"
                    >
                      Activities
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-2">
                    {activities.map((a) => (
                      <DropdownMenuItem key={a.name} asChild>
                        <Link href={a.href}>{a.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="hover:text-primary">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic space-y-4 text-sm text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                Annaba ,Ain achir
                <br />
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <a href="tel:+15551234567" className="hover:text-primary">
                  +213 663 663 663
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <a
                  href="mailto:info@adventurepark.com"
                  className="hover:text-primary"
                >
                  forest-adventure@contact.com
                </a>
              </div>
            </address>
          </div>
        </section>

        {/* Bottom Bar */}
        <section className="py-6 border-t text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            © {year} Adventure Park. All rights reserved.
          </p>
          <div className="mt-3 sm:mt-0 flex flex-wrap justify-center sm:justify-end gap-4 text-xs">
            {policies.map((p) => (
              <Link key={p.name} href={p.href} className="hover:text-primary">
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </footer>
  );
}
