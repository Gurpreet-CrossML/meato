"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Youtube, Heart } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Cuts", href: "/shop" },
    { label: "Premium Steaks", href: "/shop?category=premium-steaks" },
    { label: "BBQ Cuts", href: "/shop?category=bbq-cuts" },
    { label: "Wagyu Selection", href: "/shop?category=wagyu-selection" },
  ],
  Company: [
    { label: "About Meato", href: "/about" },
    { label: "Our Farms", href: "/about#farms" },
    { label: "Recipes", href: "/recipes" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "Delivery Info", href: "/delivery" },
    { label: "Returns", href: "/returns" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                Meato
                <span className="text-[#E86A33] dark:text-[#FF7A3C]">.</span>
              </span>
            </Link>
            <p className="text-sm text-foreground/50 leading-relaxed max-w-64">
              Premium beef, ethically sourced, expertly cut and delivered fresh
              to your door. Restaurant quality at home.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 glass rounded-full flex items-center justify-center text-foreground/50 hover:text-[#E86A33] dark:hover:text-[#FF7A3C] hover:border-[#E86A33]/30 transition"
                >
                  <s.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-sm mb-5 tracking-wide">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/50 hover:text-[#E86A33] dark:hover:text-[#FF7A3C] transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/40">
            © {new Date().getFullYear()} Meato. All rights reserved.
          </p>
          <p className="text-xs text-foreground/30 flex items-center gap-1">
            Crafted with{" "}
            <Heart size={10} className="text-[#E86A33] fill-[#E86A33]" /> for
            meat lovers
          </p>
          {/* Payment icons */}
          <div className="flex items-center gap-2">
            {["VISA", "MC", "AMEX", "PP"].map((p) => (
              <div
                key={p}
                className="px-2.5 py-1 glass rounded-md text-[9px] font-bold text-foreground/40 tracking-wider"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
