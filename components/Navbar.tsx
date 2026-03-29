"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/vs", label: "Compare" },
    { href: "/best", label: "Best Tools" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Image
              src="/images/logo-horizontal.svg"
              alt="Stack Pick"
              width={180}
              height={36}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  pathname?.startsWith(link.href)
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/#newsletter"
              className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Get weekly picks →
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-700 transition-all duration-200 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  pathname?.startsWith(link.href)
                    ? "bg-primary-light text-primary"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <Link
                href="/#newsletter"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-primary hover:bg-primary-dark text-white font-semibold px-4 py-3 rounded-lg text-sm transition-colors"
              >
                Get weekly picks →
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
