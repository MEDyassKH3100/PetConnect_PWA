'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { EyeIcon, EyeOffIcon, UserIcon, LockIcon, MailIcon, CheckIcon, XIcon } from 'lucide-react';

// Imports des nouveaux composants d'authentification
import ForgotPasswordForm from './auth/ForgotPasswordForm';
import VerifyOTPForm from './auth/VerifyOTPForm';
import ResetPasswordForm from './auth/ResetPasswordForm';
import Login from './auth/Login';
import Register from './auth/Register';

export default function HomePage() {
  const searchParams = useSearchParams();
  const showLogin = searchParams.get('showLogin');
  const message = searchParams.get('message');
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isVerifyOTPOpen, setIsVerifyOTPOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  useEffect(() => {
    if (showLogin === 'true') {
      // Votre logique pour afficher la popup de login (ex. : setShowLoginModal(true))
      console.log('Afficher popup de login avec message :', message);
    }
  }, [showLogin, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Logique de soumission existante (gardée intacte)
      if (email === 'demo@example.com' && password === 'password') {
        router.push('/home');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    }, 1500);
  };

  // Logique pour Register (gardée intacte)
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!termsAccepted) {
      setError('Veuillez accepter les conditions d\'utilisation');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Logique de soumission existante
    }, 1500);
  };

  // Logique pour Forgot Password (gardée intacte)
  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsForgotPasswordOpen(false);
      setIsVerifyOTPOpen(true);
    }, 1500);
  };

  // Logique pour Verify OTP (gardée intacte)
  const handleVerifyOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsVerifyOTPOpen(false);
      setIsResetPasswordOpen(true);
    }, 1500);
  };

  // Logique pour Reset Password (gardée intacte)
  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsResetPasswordOpen(false);
      // Rediriger vers login ou ailleurs
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2]">
      {/* Navbar fixe (préservée exactement comme fournie) */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10 p-4 md:p-6">
        <div className="flex justify-center gap-8 text-lg font-semibold">
          <a href="#home" className="text-gray-700 hover:text-[#3D9EFF] transition-colors">Home</a>
          <a href="#about" className="text-gray-700 hover:text-[#3D9EFF] transition-colors">About Us</a>
          <a href="#services" className="text-gray-700 hover:text-[#3D9EFF] transition-colors">Services</a>
          <a href="#contact" className="text-gray-700 hover:text-[#3D9EFF] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Contenu scrollable (préservé exactement comme fourni) */}
      <div className="pt-20 overflow-y-auto">
        {/* Section Home (préservée exactement comme fournie, avec bouton ajusté) */}
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Welcome to PetCareVerse</h1>
            <p className="text-lg text-gray-600 mb-6">Votre plateforme complète pour le soin de vos animaux de compagnie. Découvrez nos services innovants pour la santé, la nutrition et bien plus.</p>
            <button
              className="bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg"
              onClick={() => { setIsLoginOpen(true); setIsRegister(false); }}
            >
              Get Started
            </button>
          </div>
          <div className="flex-1">
            <img src="/images/welcome_page/home-image.jpg" alt="Home" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Section About Us (ajoutée pour compléter, basée sur votre fichier) */}
        <section id="about" className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-8 bg-gray-50">
          <div className="flex-1">
            <img src="/images/welcome_page/about-image.jpg" alt="About Us" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">À Propos de Nous</h2>
            <p className="text-lg text-gray-600 mb-6">PetCareVerse est une plateforme dédiée au bien-être animal, utilisant l'IA pour offrir des soins personnalisés à vos chats et chiens. Notre mission : un écosystème mondial pour les pets.</p>
            <button className="bg-gradient-to-r from-[#C97BFF] to-[#FF9A3D] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">En Savoir Plus</button>
          </div>
        </section>

        {/* Section Services (ajoutée pour compléter, basée sur votre fichier) */}
        <section id="services" className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Nos Services</h2>
            <p className="text-lg text-gray-600 mb-6">Santé, Nutrition, Éducation, Adoption – tout ce dont votre animal a besoin, centralisé dans une IA intelligente pour des conseils personnalisés.</p>
            <button className="bg-gradient-to-r from-[#3D9EFF] to-[#C97BFF] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">Explorer</button>
          </div>
          <div className="flex-1">
            <img src="/images/welcome_page/services-image.jpg" alt="Services" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg" />
          </div>
        </section>

        {/* Section Contact (ajoutée pour compléter, basée sur votre fichier) */}
        <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Contactez-Nous</h2>
          <p className="text-lg text-gray-600 mb-6 text-center max-w-md">Besoin d'aide ? Envoyez-nous un message ou rejoignez notre communauté pour plus d'informations.</p>
          <img src="/images/welcome_page/contact-image.jpg" alt="Contact" className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-6" />
          <button className="bg-gradient-to-r from-[#FF9A3D] to-[#C97BFF] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">Nous Contacter</button>
        </section>

        {/* Ajoutez ici d'autres sections si présentes (ex. : témoignages, footer, etc.) – gardées intactes */}

        {/* Popups d'authentification intégrés */}
        {/* Popup de Login/Register */}
        {isLoginOpen && (
          <div className="fixed inset-0 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setIsLoginOpen(false)}>
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
              {!isRegister ? (
                <Login onSwitchToRegister={() => setIsRegister(true)} onOpenForgotPassword={() => setIsForgotPasswordOpen(true)} />
              ) : (
                <Register onSwitchToLogin={() => setIsRegister(false)} />
              )}
            </div>
          </div>
        )}

        {/* Popup de Forgot Password */}
        {isForgotPasswordOpen && (
          <div className="fixed inset-0 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setIsForgotPasswordOpen(false)}>
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
              <ForgotPasswordForm onOpenVerifyOTP={() => setIsVerifyOTPOpen(true)} onOpenLogin={() => setIsLoginOpen(true)} />
            </div>
          </div>
        )}

        {/* Popup de Verify OTP */}
        {isVerifyOTPOpen && (
          <div className="fixed inset-0 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setIsVerifyOTPOpen(false)}>
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
              <VerifyOTPForm onOpenResetPassword={() => setIsResetPasswordOpen(true)} onOpenLogin={() => setIsForgotPasswordOpen(true)} />
            </div>
          </div>
        )}

        {/* Popup de Reset Password */}
        {isResetPasswordOpen && (
          <div className="fixed inset-0 bg-gradient-to-r from-[#F5F5DC] to-[#FFB8C2] bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setIsResetPasswordOpen(false)}>
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-md" onClick={(e) => e.stopPropagation()}>
              <ResetPasswordForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}