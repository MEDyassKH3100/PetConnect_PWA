import Link from 'next/link';
import Image from 'next/image';
import {
  HeartPulse,
  Utensils,
  GraduationCap,
  Home,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
} from 'lucide-react';

export default function LandingPage() {
  const services = [
    { icon: <HeartPulse size={32} />, title: 'Suivi de Santé', description: 'Gérez les vaccins, rendez-vous vétérinaires et historique médical de vos animaux en un seul endroit.', color: 'bg-red-100 text-red-600' },
    { icon: <Utensils size={32} />, title: 'Nutrition', description: 'Plans alimentaires personnalisés, suivi des repas et recommandations nutritionnelles adaptées.', color: 'bg-orange-100 text-orange-600' },
    { icon: <GraduationCap size={32} />, title: 'Éducation', description: "Ressources éducatives, guides de dressage et conseils d'experts pour mieux comprendre vos animaux.", color: 'bg-blue-100 text-blue-600' },
    { icon: <Home size={32} />, title: 'Adoption', description: "Trouvez votre compagnon idéal parmi des milliers d'animaux à adopter près de chez vous.", color: 'bg-green-100 text-green-600' },
  ];

  const features = [
    { icon: <ShieldCheck size={24} />, title: 'Données Sécurisées', description: 'Vos informations et celles de vos animaux sont protégées avec un cryptage de niveau bancaire.' },
    { icon: <Clock size={24} />, title: 'Disponible 24/7', description: 'Accédez à votre compte et aux informations de vos animaux à tout moment, où que vous soyez.' },
    { icon: <Users size={24} />, title: 'Communauté Active', description: "Rejoignez une communauté de passionnés d'animaux et partagez vos expériences." },
  ];

  const documentation = [
    { title: 'Guide de Démarrage', description: 'Apprenez à configurer votre compte et ajouter vos premiers animaux.', link: '#' },
    { title: 'FAQ', description: 'Réponses aux questions les plus fréquemment posées par nos utilisateurs.', link: '#' },
    { title: 'Tutoriels Vidéo', description: 'Découvrez toutes les fonctionnalités en vidéo pas à pas.', link: '#' },
    { title: 'API Documentation', description: 'Documentation technique pour les développeurs souhaitant intégrer notre plateforme.', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-2">
                <HeartPulse size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">PetCareVerse</span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-[#FF9A3D] transition-colors">Services</a>
              <a href="#documentation" className="text-gray-600 hover:text-[#FF9A3D] transition-colors">Documentation</a>
              <a href="#contact" className="text-gray-600 hover:text-[#FF9A3D] transition-colors">Contact</a>
              <Link href="/auth/login" className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white px-6 py-2 rounded-lg hover:from-[#FF9A3D] hover:to-[#FFB8C2] transition-all shadow-md">Connexion</Link>
            </div>
            <div className="md:hidden">
              <Link href="/auth/login" className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white px-4 py-2 rounded-lg hover:from-[#FF9A3D] hover:to-[#FFB8C2] transition-all text-sm shadow-md">Connexion</Link>
            </div>
          </div>
        </div>
      </nav>

<<<<<<< Updated upstream
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
=======
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Prenez soin de vos animaux avec{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D]">PetCareVerse</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                La plateforme tout-en-un pour gérer la santé, la nutrition, l&apos;éducation et le bien-être de vos compagnons à quatre pattes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register" className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white px-8 py-4 rounded-lg hover:from-[#FF9A3D] hover:to-[#FFB8C2] transition-all text-center font-medium flex items-center justify-center shadow-lg transform hover:scale-105">
                  Commencer Gratuitement
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <Link href="/auth/login" className="bg-white text-[#FF9A3D] border-2 border-[#FF9A3D] px-8 py-4 rounded-lg hover:bg-[#FF9A3D] hover:text-white transition-all text-center font-medium shadow-lg transform hover:scale-105">
                  Se Connecter
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <Image
                  src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Happy pets"
                  width={800}
                  height={600}
                  className="rounded-xl w-full h-auto"
                  priority
                />
              </div>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce dont vous avez besoin pour prendre soin de vos animaux, disponible en ligne et hors ligne.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pourquoi PetCareVerse ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Documentation & Ressources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tout ce que vous devez savoir pour tirer le meilleur parti de PetCareVerse.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentation.map((doc, index) => (
              <a key={index} href={doc.link} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-start">
                  <BookOpen size={24} className="text-[#FF9A3D] mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#FF9A3D] transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-gray-600">{doc.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#F5F5DC] via-[#FFB8C2]/30 to-[#FF9A3D]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Notre équipe est là pour vous aider. N&apos;hésitez pas à nous contacter.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
              <p className="text-gray-600">+33 1 23 45 67 89</p>
              <p className="text-sm text-gray-500 mt-2">Lun-Ven: 9h-18h</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contact@petcareverse.com</p>
              <p className="text-sm text-gray-500 mt-2">Réponse sous 24h</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm text-center">
              <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
              <p className="text-gray-600">123 Avenue des Animaux</p>
              <p className="text-gray-600">75001 Paris, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Prêt à commencer ?</h2>
          <p className="text-xl text-white/90 mb-8">
            Rejoignez des milliers de propriétaires d&apos;animaux qui font confiance à PetCareVerse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="bg-white text-[#FF9A3D] px-8 py-4 rounded-lg hover:bg-gray-100 transition-all text-center font-medium inline-flex items-center justify-center shadow-lg transform hover:scale-105">
              Créer un Compte Gratuit
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link href="/auth/login" className="bg-[#F5F5DC] text-gray-800 px-8 py-4 rounded-lg hover:bg-white transition-all text-center font-medium shadow-lg transform hover:scale-105">
              Se Connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-[#FFB8C2] to-[#FF9A3D] rounded-full p-2">
                  <HeartPulse size={20} className="text-white" />
                </div>
                <span className="text-xl font-bold text-white">PetCareVerse</span>
              </Link>
              <p className="text-gray-400">La plateforme complète pour le bien-être de vos animaux.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Santé</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Nutrition</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Éducation</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Adoption</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-[#FFB8C2] transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PetCareVerse. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}