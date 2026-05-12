import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, X, FileText, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/content';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.id === parseInt(id || '0'));

  const [currentImg, setCurrentImg] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      if (e.key === 'Escape') setModalOpen(false);
      if (e.key === 'ArrowLeft') setModalImg(p => (p - 1 + project!.gallery.length) % project!.gallery.length);
      if (e.key === 'ArrowRight') setModalImg(p => (p + 1) % project!.gallery.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalOpen, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-hero)' }}>
        <div className="text-center">
          <p className="font-display text-2xl mb-4" style={{ color: 'var(--text-dark)' }}>Project not found 🍋</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-full font-semibold"
            style={{ background: 'var(--lemon-bright)', color: 'var(--text-dark)' }}
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const hasPdfPreview = project.id === 20 || project.id === 40;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-hero)' }}>

      {/* ── Top bar with back button ── */}
      <header
        style={{
          background: 'rgba(255,253,240,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px dashed var(--lemon-bright)',
          padding: '14px 32px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-semibold text-sm transition-colors duration-200"
          style={{ color: 'var(--text-mid)', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-mid)')}
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </button>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* ── Project hero area with subtle dessert watermark ── */}
        <div className="relative mb-8">
          {/* Faint dessert watermark top-right — subtle lemon dessert per project */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              fontSize: '5rem',
              opacity: 0.07,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {project.dessertEmoji}
          </span>

          <span
            className="pill-label mb-4 inline-block"
            style={{ background: 'var(--lemon-pale)', color: 'var(--lemon-rind)', border: '1px solid var(--lemon-bright)' }}
          >
            {project.dessertName}
          </span>

          <h1
            className="font-display mb-2"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, color: 'var(--text-dark)' }}
          >
            {project.title}
          </h1>
          <p style={{ color: 'var(--text-light)', fontSize: '1rem', marginBottom: '16px' }}>{project.date}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map(t => (
              <span
                key={t}
                className="skill-chip"
                style={{ fontSize: '0.78rem' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Media: gallery or PDF preview ── */}
        {hasPdfPreview && project.pdfUrl ? (
          <div className="mb-10">
            <h2 className="font-display mb-4" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Presentation Preview
            </h2>
            <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid var(--lemon-bright)', boxShadow: '0 8px 28px var(--lemon-shadow)' }}>
              <iframe
                src={project.pdfUrl}
                className="w-full"
                style={{ height: '420px', border: 'none' }}
                title={`${project.title} PDF`}
              />
            </div>
          </div>
        ) : (
          <div className="mb-10">
            <h2 className="font-display mb-4" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)' }}>
              Project Gallery
            </h2>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden mb-3" style={{ boxShadow: '0 8px 28px var(--lemon-shadow)' }}>
              <img
                src={project.gallery[currentImg]}
                alt={`${project.title} image ${currentImg + 1}`}
                className="w-full cursor-pointer hover:opacity-95 transition-opacity"
                style={{ height: '380px', objectFit: 'cover' }}
                onClick={() => { setModalImg(currentImg); setModalOpen(true); }}
              />
              <button
                onClick={() => setCurrentImg(p => (p - 1 + project.gallery.length) % project.gallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer' }}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => setCurrentImg(p => (p + 1) % project.gallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer' }}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
              <div
                className="absolute bottom-3 right-3 text-xs font-semibold rounded-full px-2.5 py-1"
                style={{ background: 'rgba(0,0,0,0.45)', color: 'white' }}
              >
                {currentImg + 1} / {project.gallery.length}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {project.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImg(i)}
                  className="flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                  style={{
                    width: '72px',
                    height: '72px',
                    border: currentImg === i ? '2.5px solid var(--accent)' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                  }}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Content ── */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">

            <section>
              <h2 className="font-display mb-3" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-dark)' }}>Overview</h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>{project.overview}</p>
            </section>

            <section>
              <h2 className="font-display mb-3" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-dark)' }}>Project Details</h2>
              <div className="space-y-4">
                {Array.isArray(project.mainBody)
                  ? project.mainBody.map((p, i) => (
                      <p key={i} style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>{p}</p>
                    ))
                  : <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>{project.mainBody}</p>
                }
              </div>
            </section>

            <section>
              <h2 className="font-display mb-3" style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--text-dark)' }}>Outcomes & Learning</h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1rem' }}>{project.outcomes}</p>

              {/* Special: old portfolio link for project 30 */}
              {project.id === 30 && (
                <div className="mt-5 p-4 rounded-xl" style={{ background: 'var(--lemon-pale)', border: '1px solid var(--lemon-bright)' }}>
                  <p className="font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>Previous Portfolio</p>
                  <a
                    href="https://sites.google.com/view/cboss-hs-en/home"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-colors"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    <ExternalLink size={14} /> Visit Previous Portfolio
                  </a>
                </div>
              )}

              {/* Special: circuit PDF for karaoke project */}
              {project.id === 35 && project.pdfUrl && (
                <div className="mt-5 p-4 rounded-xl" style={{ background: 'var(--lemon-pale)', border: '1px solid var(--lemon-bright)' }}>
                  <p className="font-semibold mb-1" style={{ color: 'var(--text-dark)' }}>Circuit Documentation</p>
                  <p className="text-sm mb-3" style={{ color: 'var(--text-mid)' }}>View the detailed circuit diagram and technical specs.</p>
                  <a
                    href={project.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm"
                    style={{ background: 'var(--accent)', color: 'white' }}
                  >
                    <FileText size={14} /> View Circuit Diagram
                  </a>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar */}
          <aside>
            <div
              className="rounded-2xl p-5 sticky top-24"
              style={{ background: 'var(--lemon-pale)', border: '1.5px solid var(--lemon-bright)' }}
            >
              <h3 className="font-display mb-4" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                Project Info
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-light)' }}>Date</p>
              <p className="mb-4" style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>{project.date}</p>

              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-light)' }}>Tech & Skills</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map(t => (
                  <span key={t} className="skill-chip" style={{ fontSize: '0.73rem', padding: '3px 10px' }}>{t}</span>
                ))}
              </div>

              {/* Dessert theme badge */}
              <div className="mt-5 text-center">
                <span style={{ fontSize: '2.5rem' }}>{project.dessertEmoji}</span>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px', fontStyle: 'italic' }}>
                  {project.dessertName} edition
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Lightbox modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setModalOpen(false)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <button
              onClick={() => setModalImg(p => (p - 1 + project.gallery.length) % project.gallery.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white' }}
              aria-label="Previous"
            >
              <ChevronLeft size={26} />
            </button>
            <button
              onClick={() => setModalImg(p => (p + 1) % project.gallery.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white' }}
              aria-label="Next"
            >
              <ChevronRight size={26} />
            </button>
            <img
              src={project.gallery[modalImg]}
              alt=""
              className="w-full object-contain rounded-xl"
              style={{ maxHeight: '80vh' }}
            />
            <p className="text-center mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {modalImg + 1} / {project.gallery.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
