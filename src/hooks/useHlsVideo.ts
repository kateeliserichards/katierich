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

// Placeholder background stream.
//
// TODO: swap in a real Perth homes/build clip. Recommended look: a slow,
// MUTED, golden-hour drone glide over a modern Perth home or new estate
// (10–30s, loops cleanly). It sits under a dark overlay, so it reads as
// mood/texture rather than a feature. Two ways to use a real clip:
//   1. HLS (.m3u8) — best for streaming; set the URL here.
//   2. A plain .mp4 in src/assets — import it and pass that URL instead;
//      the <video> tag will play it directly (the hook simply no-ops for
//      non-HLS sources).
// If the source can't load, the section falls back to a branded dark
// gradient (see Hero/Footer), so an empty video never looks broken.
export const HERO_VIDEO_SRC =
  "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
