import Link from "next/link";
import {
  Building2,
  Clock,
  CircleCheck,
  Tag,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import type { FormHelpContact } from "@/lib/form-application-meta";

interface FormApplicationSidebarProps {
  office: string;
  processingTime: string;
  requirements: string[];
  fee: string;
  help: FormHelpContact;
}

export default function FormApplicationSidebar({
  office,
  processingTime,
  requirements,
  fee,
  help,
}: FormApplicationSidebarProps) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
        <h2 className="font-heading text-lg font-bold text-imus-navy">Application Overview</h2>

        <ul className="mt-5 space-y-4 text-sm">
          <li className="flex gap-3">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-imus-red" aria-hidden="true" />
            <div>
              <p className="font-medium text-imus-navy">Office</p>
              <p className="text-gray-600">{office}</p>
            </div>
          </li>
          <li className="flex gap-3">
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-imus-red" aria-hidden="true" />
            <div>
              <p className="font-medium text-imus-navy">Processing Time</p>
              <p className="text-gray-600">{processingTime}</p>
            </div>
          </li>
          <li>
            <p className="mb-2 font-medium text-imus-navy">Requirements</p>
            <ul className="space-y-2">
              {requirements.map((req, i) => (
                <li key={req} className="flex gap-2 text-gray-600">
                  <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                  <span>
                    {i + 1}. {req}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li className="flex gap-3">
            <Tag className="mt-0.5 h-5 w-5 shrink-0 text-imus-red" aria-hidden="true" />
            <div>
              <p className="font-medium text-imus-navy">Fee</p>
              <p className="text-gray-600">{fee}</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-card">
        <h3 className="font-heading font-bold text-imus-navy">Need Help?</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <Link
              href={help.liveChat ?? "/contact"}
              className="flex items-center gap-3 text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-md"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-imus-red" />
              Live Chat
            </Link>
          </li>
          {help.phone && (
            <li>
              <a
                href={`tel:${help.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-3 text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-md"
              >
                <Phone className="h-5 w-5 shrink-0 text-imus-red" />
                {help.phone}
              </a>
            </li>
          )}
          {help.email && (
            <li>
              <a
                href={`mailto:${help.email}`}
                className="flex items-center gap-3 break-all text-imus-navy transition-colors hover:text-imus-red focus-ring rounded-md"
              >
                <Mail className="h-5 w-5 shrink-0 text-imus-red" />
                {help.email}
              </a>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
