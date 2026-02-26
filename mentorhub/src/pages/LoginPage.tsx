import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Zap, Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const navigate = useNavigate();
    const { signin, error: authError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signin(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(authError || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card animate-fadeUp">

                {/* Logo */}
                <Link to="/" className="auth-logo" style={{ textDecoration: 'none' }}>
                    <div className="auth-logo-icon">
                        <Zap size={20} />
                    </div>
                    <span className="auth-logo-text">MentorHub</span>
                </Link>

                {/* Heading */}
                <h2 className="auth-title">Welcome back</h2>
                <p className="auth-subtitle">Sign in to continue your journey</p>

                {/* Error */}
                {error && (
                    <div className="alert alert-error" style={{ marginBottom: '24px' }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="form-input"
                                style={{ paddingRight: '44px' }}
                            />
                            <button
                                type="button"
                                className="input-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary btn-full${loading ? ' btn-loading' : ''}`}
                        disabled={loading}
                        style={{ marginTop: '8px', padding: '14px' }}
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <span>New to MentorHub?</span>
                </div>

                {/* Role buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to="/signup/graduate" className="btn btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center' }}>
                        I'm a Graduate
                    </Link>
                    <Link to="/signup/mentor" className="btn btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center' }}>
                        I'm a Mentor
                    </Link>
                </div>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--gold-400)', fontWeight: 500 }}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
}