"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  youtubeId: string;
  title: string;
  poster: string;
  availableFrom?: string;
};

export default function CaseVideo({ youtubeId, title, poster, availableFrom }: Props) {
  const [playing, setPlaying] = useState(false);
  const [now, setNow] = useState(0);
  const available = !availableFrom || now >= Date.parse(availableFrom);
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;

  useEffect(() => {
    if (!availableFrom) return;
    const update = () => setNow(Date.now());
    const initial = window.setTimeout(update, 0);
    const timer = window.setInterval(update, 60_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(timer);
    };
  }, [availableFrom]);

  return (
    <section className="mb-8" aria-label="紹介動画">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : !available ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 896px) 100vw, 864px"
            className="object-contain"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${title}を再生（YouTubeに接続）`}
            className="group absolute inset-0 w-full focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-600"
          >
            <Image
              src={poster}
              alt={title}
              fill
              sizes="(max-width: 896px) 100vw, 864px"
              className="object-contain"
            />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded bg-gray-900/95 px-3 py-2 text-sm font-semibold text-white group-hover:bg-blue-700">
              <span aria-hidden="true">&#9654;</span>
              紹介動画を再生
            </span>
          </button>
        )}
      </div>
      {available ? <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm text-blue-700 underline underline-offset-4"
      >
        YouTubeで見る（別タブ）
      </a> : <p className="mt-2 text-sm text-gray-600">
        動画公開予定：<time dateTime={availableFrom}>
          {new Intl.DateTimeFormat("ja-JP", {
            timeZone: "Asia/Tokyo", year: "numeric", month: "numeric", day: "numeric",
            hour: "2-digit", minute: "2-digit", hour12: false,
          }).format(new Date(availableFrom!))}
        </time>（日本時間）
      </p>}
    </section>
  );
}
