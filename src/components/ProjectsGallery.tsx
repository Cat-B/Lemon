import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projectsData } from '../data/content';

export default function ProjectsGallery() {
  const navigate = useNavigate();
  const sorted = [...projectsData].sort((a, b) => b.id - a.id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-projects)' }}>
      <header
        style={{
          background: 'rgba(255,253,240,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '2px dashed var(--lemon-bright)',
          padding: '14px 32px',
        }}
      >
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 font-semibold text-sm"
          style={{ color: 'var(--text-mid)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </button>
      </header>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
        <div className="text-center mb-12">
          <h1 className="font-display mb-2" style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-dark)' }}>
            📖 All Projects
          </h1>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
            A full collection of engineering projects, challenges, and experiments.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {sorted.map(project => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="recipe-card block"
              style={{ textDecoration: 'none' }}
            >
              <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <span aria-hidden="true" style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '1.5rem', opacity: 0.4 }}>
                  {project.dessertEmoji}
                </span>
              </div>
              <div style={{ padding: '14px 18px 20px' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--lemon-rind)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                  {project.dessertName}
                </p>
                <h3 className="font-display mb-1" style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-mid)', lineHeight: 1.5, marginBottom: '10px' }}>
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} style={{ background: 'var(--lemon-pale)', color: 'var(--lemon-rind)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', border: '1px solid var(--lemon-bright)' }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="inline-flex items-center gap-1" style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>
                  View Recipe <ExternalLink size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
