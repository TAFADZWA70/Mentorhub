import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRealtimeDB } from '../hooks/useRealtimeDB';
import { Zap, Mail, Lock, AlertCircle, Eye, EyeOff, User, Phone, CreditCard, Briefcase } from 'lucide-react';

export default function GraduateSignup() {
    const navigate = useNavigate();
    const { signup, error: authError } = useAuth();
    const { writeData, readData } = useRealtimeDB();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        idNumber: '',
        password: '',
        confirmPassword: '',
        field: 'Tech',
        customField: '',
        graduationYear: new Date().getFullYear().toString(),
        currentSituation: 'unemployed',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fields = [
        'Tech / IT',
        'Software Engineering',
        'Data Science & Analytics',
        'Finance & Accounting',
        'Banking',
        'Marketing & Advertising',
        'Sales',
        'Human Resources',
        'Administration & Office',
        'Retail & Customer Service',
        'Healthcare & Medicine',
        'Nursing',
        'Education & Teaching',
        'Engineering (Civil/Mechanical/Electrical)',
        'Architecture',
        'Business Management',
        'Entrepreneurship',
        'Law & Legal',
        'Media & Communications',
        'Journalism',
        'Design & Creative Arts',
        'Agriculture',
        'Logistics & Supply Chain',
        'Hospitality & Tourism',
        'Social Work & NGO',
        'Other (type below)',
    ];

    const situations = [
        { value: 'unemployed', label: 'Unemployed, actively looking' },
        { value: 'first_job', label: 'In my first job' },
        { value: 'transitioning', label: 'Transitioning fields' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const sanitizeId = (id: string) => id.trim().replace(/[.#$[\]/\s]/g, '-');

    // Final field value — use customField if "Other" selected
    const resolvedField = formData.field === 'Other (type below)'
        ? formData.customField.trim()
        : formData.field;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.idNumber.trim()) {
            setError('ID / Passport number is required');
            setLoading(false);
            return;
        }
        if (formData.idNumber.trim().length < 6) {
            setError('Please enter a valid ID or passport number');
            setLoading(false);
            return;
        }
        if (formData.field === 'Other (type below)' && !formData.customField.trim()) {
            setError('Please type your field / career');
            setLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        const userId = sanitizeId(formData.idNumber);

        try {
            const existing = await readData(`users/${userId}`);
            if (existing) {
                setError('An account with this ID number already exists. Please sign in.');
                setLoading(false);
                return;
            }

            const userCredential = await signup(formData.email, formData.password);

            if (userCredential) {
                await writeData(`users/${userId}`, {
                    firebaseUid: userCredential.uid,
                    idNumber: formData.idNumber.trim(),
                    email: formData.email,
                    name: formData.name,
                    phoneNumber: formData.phoneNumber,
                    userType: 'graduate',
                    field: resolvedField,
                    profilePicture: '',
                    bio: '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    isVerified: false,
                    ratings: 0,
                });

                await writeData(`graduates/${userId}`, {
                    graduationYear: parseInt(formData.graduationYear),
                    currentSituation: formData.currentSituation,
                    skills: [],
                    goals: [],
                    linkedinUrl: '',
                });

                await writeData(`uid_map/${userCredential.uid}`, { userId });

                navigate('/dashboard/graduate');
            }
        } catch (err) {
            setError(authError || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '48px', paddingBottom: '48px' }}>
            <div className="auth-card auth-card-wide animate-fadeUp">

                <Link to="/" className="auth-logo" style={{ textDecoration: 'none' }}>
                    <div className="auth-logo-icon"><Zap size={20} /></div>
                    <span className="auth-logo-text">MentorHub</span>
                </Link>

                <h2 className="auth-title">Join as a Graduate</h2>
                <p className="auth-subtitle">Get paired with a mentor to accelerate your career</p>

                {error && (
                    <div className="alert alert-error" style={{ marginBottom: '24px' }}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} />
                            <input type="text" name="name" value={formData.name} onChange={handleChange}
                                placeholder="John Doe" required className="form-input" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">National ID / Passport Number</label>
                        <div className="input-wrapper">
                            <CreditCard className="input-icon" size={18} />
                            <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange}
                                placeholder="e.g. 63-123456A78 or A12345678"
                                required className="form-input" />
                        </div>
                        <span className="form-helper">Used as your unique account identifier</span>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                                placeholder="your@email.com" required className="form-input" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-wrapper">
                            <Phone className="input-icon" size={18} />
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                placeholder="+263 77 000 0000" required className="form-input" />
                        </div>
                    </div>

                    {/* Field + custom input */}
                    <div className="form-group">
                        <label className="form-label">Field / Career</label>
                        <div className="input-wrapper" style={{ marginBottom: formData.field === 'Other (type below)' ? '10px' : '0' }}>
                            <Briefcase className="input-icon" size={18} />
                            <select name="field" value={formData.field} onChange={handleChange}
                                className="form-select" style={{ paddingLeft: '44px' }}>
                                {fields.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        {formData.field === 'Other (type below)' && (
                            <input
                                type="text"
                                name="customField"
                                value={formData.customField}
                                onChange={handleChange}
                                placeholder="e.g. Human Resources, Retail, Admin, Agriculture…"
                                className="form-input"
                                autoFocus
                            />
                        )}
                        <span className="form-helper">
                            Can't find your career? Select "Other (type below)" to enter it manually.
                        </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                            <label className="form-label">Graduation Year</label>
                            <input type="number" name="graduationYear" value={formData.graduationYear}
                                onChange={handleChange} min="2015" max={new Date().getFullYear()}
                                className="form-input" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Current Situation</label>
                            <select name="currentSituation" value={formData.currentSituation} onChange={handleChange} className="form-select">
                                {situations.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password}
                                onChange={handleChange} placeholder="••••••••" required className="form-input"
                                style={{ paddingRight: '44px' }} />
                            <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword"
                                value={formData.confirmPassword} onChange={handleChange}
                                placeholder="••••••••" required className="form-input"
                                style={{ paddingRight: '44px' }} />
                            <button type="button" className="input-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit"
                        className={`btn btn-primary btn-full${loading ? ' btn-loading' : ''}`}
                        disabled={loading} style={{ marginTop: '8px', padding: '14px' }}>
                        {loading ? 'Creating account…' : 'Create Graduate Account'}
                    </button>
                </form>

                <div className="auth-divider"><span>Already have an account?</span></div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to="/login" className="btn btn-ghost btn-sm" style={{ flex: 1, textAlign: 'center' }}>Sign In</Link>
                    <Link to="/signup/mentor" className="btn btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center' }}>I'm a Mentor</Link>
                </div>
            </div>
        </div>
    );
}