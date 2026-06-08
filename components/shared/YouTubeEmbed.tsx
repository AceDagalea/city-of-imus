interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  startSeconds?: number;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title,
  startSeconds = 0,
  className = "",
}: YouTubeEmbedProps) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    color: "white",
  });
  if (startSeconds > 0) params.set("start", String(startSeconds));

  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  return (
    <div className={`relative aspect-video w-full overflow-hidden bg-imus-navy ${className}`}>
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
