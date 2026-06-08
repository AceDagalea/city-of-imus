import Link from "next/link";
import { Facebook, Youtube, Mail, Phone } from "lucide-react";
import { ImusWordmark } from "@/components/shared/ImusLogo";
import { CONTACT } from "@/lib/constants";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Services", href: "/forms" },
  { label: "Track Application", href: "/forms#track" },
  { label: "Contact Us", href: "/contact" },
];

const RESOURCES = [
  { label: "About Imus", href: "/about" },
  { label: "Full Disclosure", href: "/full-disclosure" },
  { label: "News & Events", href: "/news" },
  { label: "Tourism", href: "/tourism" },
];

export default function DigitalPortalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-imus-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <ImusWordmark size="lg" onDark />
            <p className="mt-1 text-xs text-imus-green">Cavite</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{CONTACT.address}</p>
            <div className="mt-4 flex gap-2">
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 hover:bg-imus-green hover:text-imus-navy focus-ring"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${CONTACT.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-2.5 hover:bg-imus-green hover:text-imus-navy focus-ring"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="rounded-full bg-white/10 p-2.5 hover:bg-imus-green hover:text-imus-navy focus-ring"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-imus-green">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white focus-ring rounded-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-imus-green">Other Resources</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white focus-ring rounded-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-imus-green">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-imus-green" />
                <a href={`tel:${CONTACT.mainLines[0].replace(/\D/g, "")}`} className="hover:text-white">
                  {CONTACT.mainLines[0]}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-imus-green" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {year} City Government of Imus. All rights reserved.
      </div>
    </footer>
  );
}
