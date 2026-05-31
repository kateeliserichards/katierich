import { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * Attach an HLS (.m3u8) source to a <video> element, using hls.js where the
 * browser can't play HLS natively (Safari can; most others need hls.js).
 *
 * Fails quietly — if the stream can't load, the element just shows its
 * poster / background colour, which is fine behind the dark overlays.
 */
export function useHlsVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | undefined;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
    }

    return () => {
      hls?.destroy();
    };
  }, [src]);

  return ref;
}

// Placeholder background stream. Swap in a real Perth homes/build clip.
// TODO: swap in Perth homes/build clip
export const HERO_VIDEO_SRC =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
