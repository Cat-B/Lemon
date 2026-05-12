import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, BookOpen, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projectsData } from '../data/content';

// ─────────────────────────────────────────────────────────────────
// CAROUSEL CONSTANTS
//
// All cards are the same DOM width (CARD_W). CSS scale makes the
// center one look larger. Only 3 cards visible at once:
//   - center: scale(1.0), full opacity  → visually ~520px on desktop
//   - ±1:     scale(0.78), 0.82 opacity → visually ~320px each
//   - ±2+:    opacity 0                 → hidden
//
// Infinite loop via N_CLONES cloned cards at each end.
// When we land on a clone, we silently jump to the real counterpart.
//
// Scroll wheel (horizontal OR vertical on the carousel area)
// triggers next/prev with a 520ms debounce so it doesn't fire rapidly.
// Touch/drag works via pointer events (40px drag threshold).
// ─────────────────────────────────────────────────────────────────

const CARD_W   = 400;    // DOM width of every card in px
const CARD_GAP = 32;     // gap between cards in px
const CARD_STEP = CARD_W + CARD_GAP;
const N_CLONES  = 2;

// Visual width of the juicer A+D container — matches scaled center card
const JUICER_CENTER_W = 420; // slightly wider than CARD_W to align with card border

export default function Projects() {
  const navigate = useNavigate();
  const projects = projectsData;

  // Cloned list: [...last N clones, ...all real, ...first N clones]
  const cloned = [...projects.slice(-N_CLONES), ...projects, ...projects.slice(0, N_CLONES)];

  const [trackIdx, setTrackIdx] = useState(N_CLONES); // start on first real card
  const [isAnimating, setIsAnimating] = useState(false);
  const [squeezeKey, setSqueezeKey] = useState(0);    // increment to re-trigger animation
  const [isMoving, setIsMoving] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [containerW, setContainerW] = useState(0);

  const outerRef   = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragCurX   = useRef(0);
  const isDragging = useRef(false);
  const lastWheel  = useRef(0);
  const animTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Real index (0-based within projects array)
  const realIdx = ((trackIdx - N_CLONES) % projects.length + projects.length) % projects.length;

  // Measure container width
  useEffect(() => {
    const measure = () => { if (outerRef.current) setContainerW(outerRef.current.offsetWidth); };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  // translateX so the center card sits at the horizontal midpoint
  const translateX = containerW
    ? containerW / 2 - trackIdx * CARD_STEP - CARD_W / 2
    : 0;

  // ── Navigate ──
  const goTo = useCallback((newIdx: number, animate = true) => {
    if (isAnimating) return;

    setIsAnimating(animate);
    setTrackIdx(newIdx);

    // trigger squeeze animation on the lemon
    setIsMoving(true);
    setSqueezeKey(k => k + 1);
    setTimeout(() => setIsMoving(false), 600);

    if (animate) {
      if (animTimer.current) clearTimeout(animTimer.current);
      animTimer.current = setTimeout(() => {
        setIsAnimating(false);
        // Silent-jump if we landed on a clone
        setTrackIdx(prev => {
          if (prev < N_CLONES) return prev + projects.length;
          if (prev >= N_CLONES + projects.length) return prev - projects.length;
          return prev;
        });
      }, 430);
    }
  }, [isAnimating, projects.length]);

  const prev = useCallback(() => goTo(trackIdx - 1), [goTo, trackIdx]);
  const next = useCallback(() => goTo(trackIdx + 1), [goTo, trackIdx]);

  // ── Keyboard ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  // ── Wheel scroll (horizontal trackpad swipe or mouse wheel over carousel) ──
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastWheel.current < 520) return;
      // Respond to both horizontal (deltaX) and vertical (deltaY) with threshold
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dx) < 18) return;
      lastWheel.current = now;
      dx > 0 ? next() : prev();
      // Prevent page scroll while interacting with carousel
      e.preventDefault();
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [next, prev]);

  // ── Drag / touch ──
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragCurX.current   = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (isDragging.current) dragCurX.current = e.clientX;
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = dragStartX.current - dragCurX.current;
    if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); }
  };

  // ── Card click ──
  const handleCardClick = (cloneI: number) => {
    if (cloneI !== trackIdx) { goTo(cloneI); return; }
    // center card → navigate to detail
    const ri = ((cloneI - N_CLONES) % projects.length + projects.length) % projects.length;
    navigate(`/project/${projects[ri].id}`);
  };

  // Determine visual state for a given clone index
  const dist = (i: number) => Math.abs(i - trackIdx);

  return (
    <section id="projects" style={{ background: 'var(--bg-projects)', padding: '56px 0 56px' }}>

      {/* Single impactful header */}
      <div className="text-center mb-4 px-8 reveal">
        <h2 className="font-display"
          style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--text-dark)' }}>
          Projects, freshly squeezed.
        </h2>
        <p style={{ color: 'var(--text-mid)', maxWidth: '420px', margin: '8px auto 0', lineHeight: 1.7, fontSize: '.93rem' }}>
          Swipe, scroll, or use arrows — click the center card to open it.
        </p>
      </div>

      {/* ══════════════════════════════════════════════════════════
          JUICER SCENE — Images A / B / C / D
          ══════════════════════════════════════════════════════════
          Image A  →  juicer body (static, same width as center card)
          Image B  →  left desktop filler (static)
          Image C  →  right desktop filler (static)
          Image D  →  lemon being squeezed (animates on carousel move)

          TO SWAP WITH YOUR PROCREATE ART:
            Image A: replace the SVG inside .juicer-a-inner with:
              <img src="./juicer-body.png" style={{width:'100%',height:'100%',objectFit:'contain',objectPosition:'bottom'}} alt="" />
            Image B: replace gradient div with:
              <img src="./juicer-bg-left.png" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'right bottom'}} alt="" />
            Image C: same for ./juicer-bg-right.png
            Image D: replace the SVG inside .lemon-d-inner with:
              <img src="./lemon-squeeze.png" style={{width:'80%',objectFit:'contain'}} alt="" />
      ══════════════════════════════════════════════════════════ */}
      <div className="juicer-scene reveal delay-1" style={{ height: '130px', marginBottom: '0' }}>

        {/* Image B — left desktop filler */}
        <div className="juicer-filler" style={{ height: '130px' }}>
          {/* SWAP: <img src="./juicer-bg-left.png" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'right bottom'}} alt="" /> */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to right, transparent 0%, var(--lemon-pale) 90%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '0 8px 4px 0' }}>
            <span style={{ fontSize: '.75rem', opacity: 0.35, fontStyle: 'italic', color: 'var(--text-light)' }}>
              ← SWAP: juicer-bg-left.png
            </span>
          </div>
        </div>

        {/* Images A + D — centered, width matches visual center card */}
        <div className="juicer-center" style={{ width: `${JUICER_CENTER_W}px`, height: '130px' }}>

          {/* Image A — juicer body (static) */}
          {/* SWAP: replace SVG with <img src="./juicer-body.png" ...> */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', pointerEvents: 'none' }}>
            <svg width="220" height="110" viewBox="0 0 220 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Juicer base */}
              <rect x="30" y="78" width="160" height="28" rx="8" fill="var(--lemon-zest)" opacity="0.9"/>
              <rect x="50" y="68" width="120" height="14" rx="6" fill="var(--accent)" opacity="0.8"/>
              {/* Cone reamer */}
              <polygon points="110,10 75,66 145,66" fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="2"/>
              <line x1="110" y1="10" x2="110" y2="66" stroke="var(--lemon-zest)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="92" y1="38" x2="128" y2="38" stroke="var(--lemon-zest)" strokeWidth="1.5" opacity="0.5"/>
              {/* Spout */}
              <rect x="98" y="82" width="24" height="20" rx="4" fill="var(--lemon-rind)" opacity="0.5"/>
            </svg>
          </div>

          {/* Image D — lemon being squeezed (animates on carousel move) */}
          {/* key prop forces remount → re-triggers CSS animation each time */}
          <div
            key={squeezeKey}
            className={`lemon-d${isMoving ? ' squeezing' : ''}`}
            style={{ pointerEvents: 'none' }}
          >
            {/* SWAP: replace SVG with <img src="./lemon-squeeze.png" style={{width:'70px',objectFit:'contain'}} alt="" /> */}
            <svg width="80" height="70" viewBox="0 0 80 70" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Lemon half sitting on reamer */}
              <ellipse cx="40" cy="42" rx="34" ry="24" fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="2"/>
              <ellipse cx="40" cy="42" rx="24" ry="16" fill="var(--lemon-pale)" opacity="0.6"/>
              <line x1="40" y1="26" x2="40" y2="58" stroke="var(--lemon-zest)" strokeWidth="1.5" opacity="0.5"/>
              <line x1="6" y1="42" x2="74" y2="42" stroke="var(--lemon-zest)" strokeWidth="1.5" opacity="0.5"/>
              {/* Juice drips */}
              <path d="M26,60 Q24,68 22,72" stroke="var(--lemon-zest)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
              <path d="M40,62 Q40,70 40,74" stroke="var(--lemon-zest)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
              <path d="M54,60 Q56,68 58,72" stroke="var(--lemon-zest)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6"/>
            </svg>
          </div>
        </div>

        {/* Image C — right desktop filler */}
        <div className="juicer-filler" style={{ height: '130px' }}>
          {/* SWAP: <img src="./juicer-bg-right.png" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'left bottom'}} alt="" /> */}
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to left, transparent 0%, var(--lemon-pale) 90%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: '0 0 4px 8px' }}>
            <span style={{ fontSize: '.75rem', opacity: 0.35, fontStyle: 'italic', color: 'var(--text-light)' }}>
              SWAP: juicer-bg-right.png →
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CAROUSEL TRACK
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={outerRef}
        className="carousel-outer"
        style={{ padding: '24px 0 32px' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          className={`carousel-track${isAnimating ? ' is-animating' : ''}`}
          style={{ transform: `translateX(${translateX}px)`, gap: `${CARD_GAP}px` }}
        >
          {cloned.map((project, i) => {
            const d = dist(i);
            const isCenter = d === 0;
            const isAdjacent = d === 1;
            // Everything beyond ±1 is hidden (opacity 0) — enforces 3-tile rule
            const cardClass = isCenter ? 'project-card is-center' : isAdjacent ? 'project-card is-adjacent' : 'project-card';

            return (
              <div
                key={`${project.id}-${i}`}
                className={cardClass}
                style={{ width: `${CARD_W}px` }}
                onClick={() => handleCardClick(i)}
                role="button"
                tabIndex={isCenter ? 0 : -1}
                aria-label={isCenter ? `Open: ${project.title}` : `Go to: ${project.title}`}
                onKeyDown={e => { if (e.key === 'Enter') handleCardClick(i); }}
              >
                {/* Card image */}
                <div style={{ height: '200px', overflow: 'hidden', background: 'var(--lemon-pale)', position: 'relative' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    draggable={false}
                  />
                  {/* Dessert watermark */}
                  <span aria-hidden="true" style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '1.8rem', opacity: .3, pointerEvents: 'none' }}>
                    {project.dessertEmoji}
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tech.slice(0, 2).map(t => (
                      <span key={t} style={{ background: 'var(--lemon-pale)', color: 'var(--lemon-rind)', fontSize: '.65rem', fontWeight: 700, padding: '2px 9px', borderRadius: '999px', border: '1px solid var(--lemon-bright)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display mb-1.5" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '.85rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                    {project.shortDescription}
                  </p>
                  {isCenter && (
                    <p style={{ fontSize: '.78rem', color: 'var(--accent)', fontWeight: 700, marginTop: '12px' }}>
                      Click to explore →
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation: prev / dots / next */}
      <div className="flex items-center justify-center gap-4 px-8">
        <button onClick={prev}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ border: '2px solid var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
          aria-label="Previous">
          <ChevronLeft size={20} style={{ color: 'var(--text-dark)' }} />
        </button>

        <div className="flex gap-2">
          {projects.map((_, i) => (
            <button key={i}
              onClick={() => goTo(i + N_CLONES)}
              aria-label={`Project ${i + 1}`}
              style={{ width: realIdx === i ? '22px' : '10px', height: '10px', borderRadius: '999px', background: realIdx === i ? 'var(--lemon-bright)' : 'var(--accent-lt)', border: '1.5px solid var(--accent)', cursor: 'pointer', transition: 'all .3s ease', padding: 0 }}
            />
          ))}
        </div>

        <button onClick={next}
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ border: '2px solid var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
          aria-label="Next">
          <ChevronRight size={20} style={{ color: 'var(--text-dark)' }} />
        </button>
      </div>

      {/* See All button */}
      <div className="text-center mt-7 px-8">
        <button onClick={() => setShowAll(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1"
          style={{ borderColor: 'var(--lemon-bright)', background: 'white', color: 'var(--text-dark)', boxShadow: '0 4px 14px var(--lemon-shadow)', cursor: 'pointer' }}>
          <BookOpen size={16} /> See All Projects — Recipe Book View
        </button>
      </div>

      {/* ── RECIPE BOOK OVERLAY ── */}
      {showAll && (
        <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: 'var(--bg-projects)' }}>
          <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '40px 32px' }}>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-dark)' }}>
                  📖 The Recipe Book
                </h2>
                <p style={{ color: 'var(--text-mid)', marginTop: '4px', fontSize: '.92rem' }}>All projects — click any card to open it.</p>
              </div>
              <button onClick={() => setShowAll(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{ borderColor: 'var(--lemon-bright)', background: 'white', cursor: 'pointer' }}
                aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...projectsData].sort((a,b) => b.id - a.id).map(project => (
                <div key={project.id} className="recipe-card"
                  onClick={() => { setShowAll(false); navigate(`/project/${project.id}`); }}
                  role="button" tabIndex={0}
                  onKeyDown={e => { if (e.key==='Enter') { setShowAll(false); navigate(`/project/${project.id}`); }}}>
                  <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                    <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span aria-hidden="true" style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '1.4rem', opacity: .35 }}>
                      {project.dessertEmoji}
                    </span>
                  </div>
                  <div style={{ padding: '14px 18px 18px' }}>
                    <p style={{ fontSize: '.7rem', fontWeight: 700, color: 'var(--lemon-rind)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '4px' }}>
                      {project.dessertName}
                    </p>
                    <h3 className="font-display mb-1" style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: '.83rem', color: 'var(--text-mid)', lineHeight: 1.5, marginBottom: '10px' }}>
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0,3).map(t => (
                        <span key={t} style={{ background: 'var(--lemon-pale)', color: 'var(--lemon-rind)', fontSize: '.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--lemon-bright)' }}>{t}</span>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1" style={{ color: 'var(--accent)', fontSize: '.8rem', fontWeight: 600 }}>
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
