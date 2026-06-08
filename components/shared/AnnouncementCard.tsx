import Image from "next/image";
import Link from "next/link";

interface AnnouncementCardProps {
  image: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  readMoreLabel: string;
  external?: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function AnnouncementCard({
  image,
  date,
  title,
  excerpt,
  href,
  readMoreLabel,
  external = false,
}: AnnouncementCardProps) {
  const linkProps = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:border-l-4 hover:border-imus-green hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 inline-block w-fit rounded bg-imus-red px-2 py-0.5 text-xs text-white">
          {formatDate(date)}
        </span>
        <h3 className="text-base font-semibold text-imus-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
        <Link
          href={href}
          className="mt-4 text-sm font-medium text-imus-red hover:underline focus-ring"
          {...linkProps}
        >
          {readMoreLabel} →
        </Link>
      </div>
    </article>
  );
}
