import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import GraduateSignup from './pages/GraduateSignup';
import MentorSignup from './pages/MentorSignup';
import './App.css';

function App() {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-page">
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '20px',
                }}>
                    <div style={{
                        width: '48px', height: '48px',
                        background: 'linear-gradient(135deg, var(--gold-500), var(--gold-300))',
                        borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: 'var(--shadow-gold)',
                        animation: 'pulse-gold 1.5s ease-in-out infinite',
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--navy-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <div className="spinner" />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading MentorHub…</p>
                </div>
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup/graduate" element={<GraduateSignup />} />
                <Route path="/signup/mentor" element={<MentorSignup />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;