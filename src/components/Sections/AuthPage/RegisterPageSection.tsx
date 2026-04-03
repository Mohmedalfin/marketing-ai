import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRegister } from '../../../hooks/useRegister';
import type { RegisterRequest } from '../../../types/auth';

// Menggunakan asset yang tersedia
import loginIllustration from '../../../assets/LoginIcon.svg';
import bgImage from '../../../assets/bg-landingpage.svg';

export default function RegisterFormSection() {
    const navigate = useNavigate();
    const { handleRegister, loading, error } = useRegister();
    const [isVisible, setIsVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [isAgreed, setIsAgreed] = useState(false);
    
    const [formError, setFormError] = useState('');

    // Form state
    const [formData, setFormData] = useState<RegisterRequest>({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        business: '',
        domicile: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleNextStep = () => {
        if (!formData.username || !formData.email || !formData.password) {
            setFormError('Silakan isi Username, Email, dan Password sebelum melanjutkan.');
            return;
        }
        setFormError('');
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isAgreed) return;
        
        if (!formData.first_name || !formData.last_name || !formData.business || !formData.domicile) {
            setFormError('Silakan isi semua data sebelum mendaftar.');
            return;
        }

        setFormError('');

        try {
            await handleRegister(formData);
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch {
            // error sudah ditangani di hook
        }
    };

    return (
        <section 
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden px-6 py-12 md:px-12 lg:px-16 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            
            {/* Animasi Melayang untuk Ilustrasi */}
            <style>
                {`
                    @keyframes float-login {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-12px); }
                        100% { transform: translateY(0px); }
                    }
                    .animate-float-login {
                        animation: float-login 4s ease-in-out infinite;
                    }
                `}
            </style>

            <div className="mx-auto w-full max-w-6xl">

                {/* --- MAIN GRID LAYOUT (Form Kiri, Gambar Kanan) --- */}
                <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-32 xl:gap-40">
                    
                    {/* --- KOLOM KIRI: FORM LOGIN --- */}
                    <div className={`flex w-full flex-col justify-center transition-all duration-700 delay-200 ease-out lg:max-w-md lg:justify-self-end
                        ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
                    `}>
                        <h2 className="text-2xl font-extrabold text-dark tracking-wide uppercase">Register</h2>

                        {/* Step Indicator */}
                        <div className="mb-6 mt-4 flex justify-center gap-2">
                            <button 
                                type="button"
                                onClick={() => setStep(1)}
                                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step === 1 ? 'bg-primary' : 'bg-white border border-primary'}`}
                                aria-label="Step 1"
                            />
                            <button 
                                type="button"
                                onClick={() => setStep(2)}
                                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step === 2 ? 'bg-primary' : 'bg-white border border-primary'}`}
                                aria-label="Step 2"
                            />
                        </div>

                        {(error || formError) && (
                            <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
                                {error || formError}
                            </div>
                        )}

                        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                            {/* --- STEP 1 --- */}
                            {step === 1 && (
                                <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-bold text-primary" htmlFor="username">
                                            Username
                                        </label>
                                        <input 
                                            type="text" 
                                            id="username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-bold text-primary" htmlFor="email">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            id="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-bold text-primary" htmlFor="password">
                                            Password
                                        </label>
                                        <input 
                                            type="password" 
                                            id="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                        />
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={handleNextStep}
                                        className="mt-4 w-full rounded-full bg-primary py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-lg focus:outline-hidden"
                                    >
                                        Selanjutnya
                                    </button>
                                </div>
                            )}

                            {/* --- STEP 2 --- */}
                            {step === 2 && (
                                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                    <div className="flex w-full justify-between gap-3">
                                        <div className="flex w-full flex-col">
                                            <label className="mb-1 text-sm font-bold text-primary" htmlFor="firstName">
                                                Nama Awal
                                            </label>
                                            <input 
                                                type="text" 
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                            />
                                        </div>
                                        <div className="flex w-full flex-col">
                                            <label className="mb-1 text-sm font-bold text-primary" htmlFor="last_name">
                                                Nama Akhir
                                            </label>
                                            <input 
                                                type="text" 
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-bold text-primary" htmlFor="business">
                                            Bisnis
                                        </label>
                                        <input 
                                            type="text" 
                                            id="business"
                                            value={formData.business}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 text-sm font-bold text-primary" htmlFor="domicile">
                                            Domisili
                                        </label>
                                        <input 
                                            type="text" 
                                            id="domicile"
                                            value={formData.domicile}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-full border border-primary px-5 py-3 text-base text-dark focus:border-primary-hover focus:outline-hidden focus:ring-1 focus:ring-primary transition-all bg-white"
                                        />
                                    </div>

                                    {/* Checkbox Syarat & Ketentuan */}
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="relative shrink-0 flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                id="agree-terms-register"
                                                checked={isAgreed}
                                                onChange={(e) => setIsAgreed(e.target.checked)}
                                                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-primary bg-white checked:bg-primary transition-all"
                                            />
                                            <svg
                                                className="pointer-events-none absolute h-2.5 w-2.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                                                viewBox="0 0 12 12"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="2,6 5,9 10,3" />
                                            </svg>
                                        </div>
                                        <label htmlFor="agree-terms-register" className="cursor-pointer text-xs text-gray-600 leading-snug">
                                            Dengan mendaftar, Anda setuju dengan{' '}
                                            <a href="/syarat-ketentuan" className="font-semibold text-primary hover:underline">
                                                syarat &amp; ketentuan
                                            </a>{' '}kami
                                        </label>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={!isAgreed || loading}
                                        className="mt-4 w-full rounded-full bg-primary py-3 text-base font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-lg focus:outline-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-primary"
                                    >
                                        {loading ? 'Mendaftar...' : 'Daftar'}
                                    </button>
                                </div>
                            )}
                        </form>


                        {/* Garis Pemisah "Atau" */}
                        <div className="my-6 flex items-center justify-center gap-4">
                            <span className="h-px w-full bg-gray-400/50"></span>
                            <span className="text-sm font-medium text-gray-500">Atau</span>
                            <span className="h-px w-full bg-gray-400/50"></span>
                        </div>

                        {/* Tombol Login Google */}
                        <button 
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-full border border-primary bg-white py-3 transition-all hover:bg-light-bg focus:outline-hidden"
                        >
                            {/* SVG Logo Google Resmi */}
                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            <span className="text-sm font-bold text-primary">Register Google</span>
                        </button>

                        
                        {/* Link Login */}
                        <p className="mt-4 text-center text-sm font-medium text-dark">
                            Sudah Punya Akun? <a href="/login" className="font-bold text-[#F98C23] hover:underline">Login</a>
                        </p>
                    </div>

                    {/* --- KOLOM KANAN: ILUSTRASI --- */}
                    <div className={`hidden lg:flex w-full items-center justify-center transition-all duration-700 delay-400 ease-out
                        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
                    `}>
                        <img 
                            src={loginIllustration} 
                            alt="Login Illustration" 
                            className="w-full max-w-[400px] object-contain animate-float-login drop-shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}