import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, X, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/content';

// ─────────────────────────────────────────────────────────────────
// CAROUSEL DESIGN NOTES
//
// Strategy: Cloned-edge infinite loop
//   - We keep N_CLONES copies of the end cards prepended,
//     and N_CLONES copies of the start cards appended.
//   - When we reach a clone edge, we silently jump (no animation)
//     to the real counterpart.
//   - The center card index is tracked and used to apply the
//     is-center CSS class for the enlarged treatment.
//   - Cards are 300px wide + 20px gap. The visible window shows
//     the center card at full size, neighbors at 88%.
//
// Touch/drag:
//   - pointerdown / pointermove / pointerup for drag
//   - threshold 40px to trigger a slide
//
// Juicer:
//   - Every time the active index changes, the juicer gets class "squeeze"
//     for 600ms, then it's removed.
// ─────────────────────────────────────────────────────────────────

const CARD_WIDTH = 300;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;
const N_CLONES = 2; // clones on each side

export default function Projects() {
  const navigate = useNavigate();
  const projects = projectsData;

  // Build the cloned list: [...last N, ...all, ...first N]
  const clonedProjects = [
    ...projects.slice(-N_CLONES),
    ...projects,
    ...projects.slice(0, N_CLONES),
  ];

  // Real index within clonedProjects (starts at N_CLONES so first real card is center)
  const [trackIndex, setTrackIndex] = useState(N_CLONES);
  const [isAnimating, setIsAnimating] = useState(false);
  const [squeezing, setSqueezing] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const isDragging = useRef(false);

  // Real project index (0-based within projects array)
  const realIndex = trackIndex - N_CLONES;

  // ── Compute translateX so the center card is centered in the viewport ──
  const computeTranslate = useCallback((idx: number, containerWidth: number) => {
    // Center of container
    const center = containerWidth / 2;
    // Left edge of card at idx
    const cardLeft = idx * CARD_STEP;
    // We want cardLeft + CARD_WIDTH/2 = center
    return center - cardLeft - CARD_WIDTH / 2;
  }, []);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (outerRef.current) setContainerWidth(outerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const translateX = containerWidth ? computeTranslate(trackIndex, containerWidth) : 0;

  // ── Navigate to a track index ──
  const goTo = useCallback((newIdx: number, animate = true) => {
    if (isAnimating) return;
    setIsAnimating(animate);
    setTrackIndex(newIdx);

    // Trigger juicer squeeze
    setSqueezing(true);
    setTimeout(() => setSqueezing(false), 600);

    if (animate) {
      setTimeout(() => {
        // After animation, check if we're on a clone edge and jump silently
        setIsAnimating(false);
        setTrackIndex(prev => {
          const total = clonedProjects.length;
          if (prev < N_CLONES) {
            // jumped past left edge — jump to real counterpart
            return prev + projects.length;
          }
          if (prev >= total - N_CLONES) {
            // jumped past right edge
            return prev - projects.length;
          }
          return prev;
        });
      }, 460);
    }
  }, [isAnimating, clonedProjects.length, projects.length]);

  const prev = () => goTo(trackIndex - 1);
  const next = () => goTo(trackIndex + 1);

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // ── Drag/touch ──
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    dragCurrentX.current = e.clientX;
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartX.current - dragCurrentX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }
  };

  // ── Click on a dot ──
  const goToReal = (realIdx: number) => {
    goTo(realIdx + N_CLONES);
  };

  // ── Click on a card ──
  const handleCardClick = (cloneIdx: number) => {
    // If it's not the center, navigate carousel to it
    if (cloneIdx !== trackIndex) {
      goTo(cloneIdx);
      return;
    }
    // Center card click → navigate to detail page
    const ri = cloneIdx - N_CLONES;
    const safeRi = ((ri % projects.length) + projects.length) % projects.length;
    navigate(`/project/${projects[safeRi].id}`);
  };

  return (
    <section id="projects" style={{ background: 'var(--bg-projects)', padding: '80px 0 80px' }}>

      {/* Header */}
      <div className="text-center mb-8 px-8 reveal">
        <span className="pill-label">🍋 My Work</span>
        <h2
          className="font-display mt-3 mb-3"
          style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text-dark)' }}
        >
          Projects, freshly squeezed.
        </h2>
        <p style={{ color: 'var(--text-mid)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.75, fontSize: '0.95rem' }}>
          Drag or use arrows to spin the carousel. Click the center card to open the full project.
        </p>
      </div>

      {/* ── JUICER SCENE ──
          Sits above the carousel. Tilts + drips when carousel moves.
          SWAP: replace the emoji spans with your Procreate juicer/lemon images.
          e.g. <img src="./juicer.png" style={{ width:'80px' }} alt="" />
      */}
      <div className="flex justify-center items-end gap-8 mb-6 reveal delay-1" style={{ height: '110px' }}>
        {/* Waiting lemon — SWAP with <img src="./lemon.png"> */}
        <span
          aria-hidden="true"
          style={{ fontSize: '2.8rem', alignSelf: 'flex-end', marginBottom: '8px' }}
        >
          🍋
        </span>

        {/* Juicer rig */}
        <div className={`juicer-rig${squeezing ? ' squeeze' : ''}`} aria-hidden="true">
          {/* SWAP with <img src="./juicer.png" style={{ width:'72px' }} alt="Juicer" /> */}
          <span style={{ fontSize: '4rem', lineHeight: 1 }}>🍋</span>
          {/* Juice drip bar */}
          <div className="juice-drip" />
        </div>

        {/* Juiced half — SWAP with <img src="./lemon-half.png"> */}
        <span
          aria-hidden="true"
          style={{ fontSize: '2rem', alignSelf: 'flex-end', marginBottom: '6px', opacity: 0.55, transform: 'rotate(18deg)' }}
        >
          🍋
        </span>
      </div>

      {/* ── CAROUSEL ── */}
      <div
        ref={outerRef}
        className="carousel-outer"
        style={{ padding: '20px 0 30px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={trackRef}
          className={`carousel-track${isAnimating ? ' is-animating' : ''}`}
          style={{
            transform: `translateX(${translateX}px)`,
            paddingLeft: `0px`,
          }}
        >
          {clonedProjects.map((project, idx) => {
            const isCenter = idx === trackIndex;
            return (
              <div
                key={`${project.id}-${idx}`}
                className={`project-card${isCenter ? ' is-center' : ''}`}
                onClick={() => handleCardClick(idx)}
                role="button"
                tabIndex={isCenter ? 0 : -1}
                aria-label={isCenter ? `Open project: ${project.title}` : `Go to project: ${project.title}`}
                onKeyDown={e => { if (e.key === 'Enter') handleCardClick(idx); }}
              >
                {/* Card image */}
                <div
                  style={{ height: '160px', overflow: 'hidden', background: 'var(--lemon-pale)', position: 'relative' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    draggable={false}
                  />
                  {/* Dessert watermark — subtle lemon dessert on each project */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '10px',
                      fontSize: '1.6rem',
                      opacity: 0.35,
                      pointerEvents: 'none',
                    }}
                  >
                    {project.dessertEmoji}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: '16px' }}>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.slice(0, 2).map(t => (
                      <span
                        key={t}
                        style={{
                          background: 'var(--lemon-pale)',
                          color: 'var(--lemon-rind)',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '999px',
                          border: '1px solid var(--lemon-bright)',
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="font-display mb-1"
                    style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.25 }}
                  >
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', lineHeight: 1.55 }}>
                    {project.shortDescription}
                  </p>

                  {isCenter && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginTop: '10px' }}>
                      Click to explore →
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Navigation: prev / dots / next ── */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={prev}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ border: '2px solid var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
          aria-label="Previous project"
        >
          <ChevronLeft size={20} style={{ color: 'var(--text-dark)' }} />
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToReal(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: realIndex === i ? '24px' : '10px',
                height: '10px',
                borderRadius: '999px',
                background: realIndex === i ? 'var(--lemon-bright)' : 'var(--accent-lt)',
                border: '1.5px solid var(--accent)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ border: '2px solid var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
          aria-label="Next project"
        >
          <ChevronRight size={20} style={{ color: 'var(--text-dark)' }} />
        </button>
      </div>

      {/* ── See All button ── */}
      <div className="text-center mt-8 px-8">
        <button
          onClick={() => setShowAll(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1"
          style={{ borderColor: 'var(--lemon-bright)', background: 'white', color: 'var(--text-dark)', boxShadow: '0 4px 14px var(--lemon-shadow)' }}
        >
          <BookOpen size={16} />
          See All Projects — Recipe Book View
        </button>
      </div>

      {/* ── RECIPE BOOK OVERLAY ── */}
      {showAll && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{ background: 'var(--bg-projects)' }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  📖 The Recipe Book
                </h2>
                <p style={{ color: 'var(--text-mid)', marginTop: '4px', fontSize: '0.92rem' }}>
                  All projects — click any card to open it.
                </p>
              </div>
              <button
                onClick={() => setShowAll(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 hover:bg-yellow-100 transition-colors"
                style={{ borderColor: 'var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
                aria-label="Close recipe book"
              >
                <X size={18} />
              </button>
            </div>

            {/* Recipe card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...projectsData].sort((a, b) => b.id - a.id).map(project => (
                <div
                  key={project.id}
                  className="recipe-card"
                  onClick={() => { setShowAll(false); navigate(`/project/${project.id}`); }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => { if (e.key === 'Enter') { setShowAll(false); navigate(`/project/${project.id}`); }}}
                >
                  {/* Recipe card top image */}
                  <div style={{ height: '130px', overflow: 'hidden', background: 'var(--lemon-pale)', position: 'relative' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Dessert emoji watermark */}
                    <span
                      aria-hidden="true"
                      style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '1.4rem', opacity: 0.4 }}
                    >
                      {project.dessertEmoji}
                    </span>
                  </div>

                  <div style={{ padding: '14px 18px 18px' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--lemon-rind)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {project.dessertName}
                    </p>
                    <h3 className="font-display mb-1" style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-mid)', lineHeight: 1.55, marginBottom: '10px' }}>
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} style={{ background: 'var(--lemon-pale)', color: 'var(--lemon-rind)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--lemon-bright)' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-3" style={{ color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600 }}>
                      View Recipe <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
