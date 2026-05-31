import { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * Attach a background video source to a <video> element.
 *
 * - Plain files (.mp4 / .webm): set directly as the source.
 * - HLS streams (.m3u8): played natively where supported (Safari), otherwise
 *   via hls.js.
 *
 * Fails quietly — if the source can't load, the element shows nothing and the
 * branded gradient behind it (see Hero/Footer) shows through instead.
 */
export function useHlsVideo(src: string) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | undefined;
    const isHls = src.endsWith(".m3u8");

    if (!isHls) {
      // Plain video file (e.g. /hero.mp4)
      video.src = src;
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
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

// Background video source for the hero + footer.
//
// DEFAULT: a plain MP4 served from /public — upload your clip as
// `public/hero.mp4` and it appears automatically (no code change). If the file
// isn't there yet, the video just fails to load and the branded dark gradient
// behind it shows instead, so the section never looks broken.
//
// Recommended clip: a slow, MUTED, golden-hour drone glide over a modern Perth
// home or new estate (10–30s, loops cleanly). It sits under a dark overlay, so
// it reads as mood/texture rather than a feature.
//
// Prefer streaming HLS instead? Point this at a .m3u8 URL and the hook will use
// hls.js automatically.
export const HERO_VIDEO_SRC = "/hero.mp4";
