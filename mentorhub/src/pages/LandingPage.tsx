import { useNavigate } from 'react-router-dom';
import { Users, TrendingUp, Award, MessageCircle, Zap, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="page-container">

            {/* ── NAVBAR ── */}
            <nav className="navbar">
                <div className="navbar-inner">
                    <a href="/" className="navbar-logo">
                        <div className="navbar-logo-icon">
                            <Zap size={18} />
                        </div>
                        <span className="navbar-logo-text">MentorHub</span>
                    </a>
                    <div className="navbar-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>
                            Sign In
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => navigate('/signup/graduate')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ── */}
            <section style={{
                padding: '100px 24px 80px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                    width: '700px', height: '400px',
                    background: 'radial-gradient(ellipse, rgba(22,38,73,0.8) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }} className="animate-fadeUp">
                    <div className="badge badge-gold" style={{ marginBottom: '24px', display: 'inline-flex' }}>
                        <Star size={12} /> Empowering careers across Africa
                    </div>

                    <h1 style={{ marginBottom: '24px', lineHeight: 1.15 }}>
                        Connect with Mentors.{' '}
                        <span className="text-gold">Accelerate</span>{' '}
                        Your Career.
                    </h1>

                    <p style={{ fontSize: '1.125rem', maxWidth: '560px', margin: '0 auto 40px', color: 'var(--text-secondary)' }}>
                        Get personalized guidance from experienced professionals. Navigate your career transition with a mentor who's been there.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary btn-xl" onClick={() => navigate('/signup/graduate')}>
                            I'm a Graduate <ArrowRight size={18} />
                        </button>
                        <button className="btn btn-secondary btn-xl" onClick={() => navigate('/signup/mentor')}>
                            I'm a Mentor
                        </button>
                    </div>
                </div>

                {/* Stats row */}
                <div style={{
                    display: 'flex', gap: '48px', justifyContent: 'center',
                    marginTop: '72px', flexWrap: 'wrap',
                }} className="stagger-2 animate-fadeUp">
                    {[
                        { value: '500+', label: 'Graduates Placed' },
                        { value: '120+', label: 'Active Mentors' },
                        { value: '4.9★', label: 'Average Rating' },
                    ].map(stat => (
                        <div key={stat.label} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: '2rem', fontWeight: 700,
                                color: 'var(--gold-400)',
                                lineHeight: 1,
                                marginBottom: '6px',
                            }}>{stat.value}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <p className="section-eyebrow">What We Offer</p>
                    <h2>Everything You Need to Grow</h2>
                </div>

                <div className="grid-3">
                    {[
                        {
                            icon: <Users size={24} />,
                            title: 'Smart Matching',
                            desc: 'Get paired with mentors aligned to your field, experience level, and career goals.',
                        },
                        {
                            icon: <MessageCircle size={24} />,
                            title: 'Real-Time Chat',
                            desc: 'Message your mentor directly. Get instant feedback and guidance whenever you need it.',
                        },
                        {
                            icon: <TrendingUp size={24} />,
                            title: 'Track Progress',
                            desc: 'Set goals, track milestones, and celebrate wins with structured check-ins.',
                        },
                    ].map((f, i) => (
                        <div key={f.title} className={`card card-gold animate-fadeUp stagger-${i + 1}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{
                                width: '52px', height: '52px',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--gold-glow)',
                                border: '1px solid var(--border-subtle)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--gold-400)',
                            }}>
                                {f.icon}
                            </div>
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>{f.title}</h4>
                            <p style={{ fontSize: '0.9375rem', margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHY MENTORHUB ── */}
            <section style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                <div className="card card-elevated" style={{ padding: '56px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <p className="section-eyebrow">Why MentorHub?</p>
                        <h2>Built for Both Sides of the Journey</h2>
                    </div>

                    <div className="grid-2" style={{ gap: '48px' }}>
                        {[
                            {
                                title: 'For Graduates',
                                items: [
                                    'Learn what skills actually matter in the real world',
                                    'Get insider tips on breaking into your field',
                                    'Land your first job with expert guidance',
                                    'Navigate career transitions confidently',
                                    'Build a lasting professional network',
                                ],
                            },
                            {
                                title: 'For Mentors',
                                items: [
                                    'Give back and make a real impact on careers',
                                    'Grow your own professional network',
                                    'Share your expertise on your own schedule',
                                    'Track your mentees\' growth and progress',
                                    'Be recognized as a leader in your field',
                                ],
                            },
                        ].map(col => (
                            <div key={col.title}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                    <div style={{
                                        width: '36px', height: '36px',
                                        background: 'var(--gold-glow)',
                                        border: '1px solid var(--border-default)',
                                        borderRadius: 'var(--radius-md)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--gold-400)',
                                    }}>
                                        <Award size={18} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{col.title}</h3>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                    {col.items.map(item => (
                                        <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <span style={{ color: 'var(--gold-400)', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>✓</span>
                                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: '60px 24px 100px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '72px 48px',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow-gold)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
                        width: '600px', height: '300px',
                        background: 'radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />
                    <div style={{ position: 'relative' }}>
                        <p className="section-eyebrow" style={{ marginBottom: '16px' }}>Get Started Today</p>
                        <h2 style={{ marginBottom: '16px' }}>Ready to Start Your Journey?</h2>
                        <p style={{ fontSize: '1.0625rem', marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
                            Join hundreds of graduates and mentors building successful careers together across Africa.
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary btn-xl" onClick={() => navigate('/signup/graduate')}>
                                Sign Up as Graduate <ArrowRight size={18} />
                            </button>
                            <button className="btn btn-secondary btn-xl" onClick={() => navigate('/signup/mentor')}>
                                Sign Up as Mentor
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{
                borderTop: '1px solid var(--border-subtle)',
                padding: '32px 24px',
                textAlign: 'center',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{
                        width: '28px', height: '28px',
                        background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
                        borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--navy-900)',
                    }}>
                        <Zap size={14} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>MentorHub</span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                    © 2025 MentorHub. Empowering careers across Africa.
                </p>
            </footer>
        </div>
    );
}