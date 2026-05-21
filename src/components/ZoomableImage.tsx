"use client";

import { type ComponentPropsWithoutRef, useEffect, useState } from "react";

type ZoomableImageProps = ComponentPropsWithoutRef<"img">;

export default function ZoomableImage({
  src,
  alt = "",
  className,
  ...props
}: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const srcText = typeof src === "string" ? src : "";

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!srcText) {
    return <img src={src} alt={alt} className={className} {...props} />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group block w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0 text-left"
        aria-label={`${alt || "画像"}を拡大表示`}
      >
        <img
          src={srcText}
          alt={alt}
          className={[
            "w-full rounded-lg transition duration-150 group-hover:opacity-90",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        <span className="mt-1 block text-right text-xs text-gray-500 opacity-0 transition group-hover:opacity-100">
          クリックで拡大
        </span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt || "画像の拡大表示"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gray-900 shadow"
            onClick={() => setIsOpen(false)}
          >
            閉じる
          </button>
          <img
            src={srcText}
            alt={alt}
            className="max-h-[90vh] max-w-[95vw] rounded-lg bg-white object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
