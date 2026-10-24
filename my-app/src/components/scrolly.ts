// Shared helpers: step observer and a smooth numeric tween.

export function inview(node: HTMLElement, opts: { index: number; onenter: (i: number) => void }) {
  const io = new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) opts.onenter(opts.index);
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );
  io.observe(node);
  return { destroy: () => io.disconnect() };
}

/** Animate from -> to, calling set(v) each frame. Returns a cancel function. */
export function tween(from: number, to: number, set: (v: number) => void, perUnit = 160, min = 700, max = 2400) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || from === to) {
    set(to);
    return () => {};
  }
  const dur = Math.min(max, Math.max(min, Math.abs(to - from) * perUnit));
  const t0 = performance.now();
  let raf = 0;
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const tick = (now: number) => {
    const t = Math.min((now - t0) / dur, 1);
    set(from + (to - from) * ease(t));
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}