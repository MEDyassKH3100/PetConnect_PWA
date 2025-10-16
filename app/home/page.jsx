"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const features = [
    { title: "Time to Eat !", subtitle: "Plan meals & track nutrition", image: "/feature1.png", link: "/features/eat" },
    { title: "Bath Time !", subtitle: "Keep your pet fresh & happy", image: "/feature3.png", link: "/features/bath" },
    { title: "Health and wealth", subtitle: "Never miss a vet appointment", image: "/feature2.png", link: "/features/vaccinations" },
    { title: "Play with your pet !", subtitle: "Fun time & bonding moments", image: "/feature4.png", link: "/features/play" },
    { title: "Story Time !", subtitle: "Share your pet’s adventures", image: "/feature5.png", link: "/features/story" },
  ];

  const commercialCards = [
    { smallTitle: "Local Deals", bigTitle: "Most Popular Treats", buttonText: "Buy Now", bgColor: "bg-[rgba(239,203,203,0.3)]", buttonBg: "#FFD6E4", buttonTextColor: "#DF5686", image: "/treats.png" },
    { smallTitle: "Local Deals", bigTitle: "Special Food Offers", buttonText: "Buy Now", bgColor: "bg-[rgba(246,214,87,0.3)]", buttonBg: "#FDDDA2", buttonTextColor: "#e17100", image: "/specialfood.png" },
    { smallTitle: "Local Deals", bigTitle: "Best Toys Offers", buttonText: "Buy Now", bgColor: "bg-[rgba(196,239,181,0.3)]", buttonBg: "#C4EFB5", buttonTextColor: "#249940", image: "/toys.png" },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[380px]">
        <Image src="/home.jpg" alt="Pet background" fill priority className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-start px-6 md:px-16">
          <div className="max-w-lg text-left space-y-4">
            <div className="flex items-center space-x-3">
              <Image src="/logo.png" alt="PetConnect Logo" width={150} height={150} className="rounded-full" />
            </div>
            <h2 className="text-white font-extrabold text-xl md:text-3xl leading-tight">
              Welcome to PetConnect – The #1 Pet Care Platform
            </h2>
            <p className="text-white text-sm md:text-base font-light">
              From grooming and wellness checkups to special packages designed for their happiness.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="w-full py-6 px-6 md:px-16 bg-white flex flex-col md:flex-row items-center gap-3 ms-20">
        <div className="md:w-1/2 flex flex-col space-y-3">
          <h2 className="text-2xl font-extrabold text-gray-900">Why Choose Us</h2>
          <p className="text-gray-500 text-base md:text-lg">
            Because your pet deserves the best care, attention, and love every day.
          </p>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-3 md:space-y-0">
            <div className="flex flex-col space-y-3 md:w-1/2">
              <div className="flex items-start space-x-3">
                <div className="text-[#FF9A3D] text-xl mt-1">🐾</div>
                <div>
                  <h3 className="font-bold text-gray-900">Loving Community</h3>
                  <p className="text-gray-500 text-sm">Donec mattis porta eros, aliquet finibus risus interdum at.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-[#FF9A3D] text-xl mt-1">❤️</div>
                <div>
                  <h3 className="font-bold text-gray-900">Care, Compassion, and Connection</h3>
                  <p className="text-gray-500 text-sm">All in one place. Donec mattis porta eros, aliquet finibus risus interdum at.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 md:w-1/2">
              <div className="flex items-start space-x-3">
                <div className="text-[#FF9A3D] text-xl mt-1">🌟</div>
                <div>
                  <h3 className="font-bold text-gray-900">More Than a Service</h3>
                  <p className="text-gray-500 text-sm">Donec mattis porta eros, aliquet finibus risus interdum at.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-[#FF9A3D] text-xl mt-1">⏰</div>
                <div>
                  <h3 className="font-bold text-gray-900">Smart Reminders</h3>
                  <p className="text-gray-500 text-sm">Get instant notifications for meals, vet visits, and more.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image src="/section2.jpg" alt="Why Choose Us" width={280} height={280} className="object-cover rounded-xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-6 px-6 md:px-16 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-black mb-1">Discover Our Features 🐾</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            Everything you need to keep your pet happy, healthy, and cared for.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => router.push(feature.link)}
              className="cursor-pointer bg-[#F5F5DC] rounded-xl shadow-md hover:scale-105 transition-transform duration-200 w-52 h-52 relative flex flex-col items-center justify-between overflow-hidden"
            >
              <div className="relative w-full flex-1 p-2">
                <Image src={feature.image} alt={feature.title} fill className="object-contain rounded-xl" />
              </div>
              <div className="absolute bottom-0 w-full text-center flex flex-col items-center justify-center h-14 rounded-b-xl backdrop-blur-sm bg-black/40">
                <h3 className="font-bold text-white text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-200">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commercial Section */}
      <section className="w-full py-6 px-6 md:px-16 bg-white flex justify-center gap-3 flex-wrap">
        {commercialCards.map((card, index) => (
          <div
            key={index}
            className={`relative w-[340px] h-[200px] rounded-xl shadow-md flex items-center justify-between px-3 overflow-hidden ${card.bgColor}`}
          >
            <div className="flex flex-col justify-start gap-1 max-w-[50%] pt-1">
              <h4 className="text-sm font-semibold" style={{ color: card.buttonTextColor }}>{card.smallTitle}</h4>
              <h2 className="text-black text-lg font-normal">{card.bigTitle}</h2>
              <button
                className="mt-1 px-3 py-1 rounded-[30px] font-semibold text-sm"
                style={{ backgroundColor: card.buttonBg, color: card.buttonTextColor }}
              >
                {card.buttonText}
              </button>
            </div>
            <div className="relative h-[140px] w-[140px] flex items-center justify-end">
              <Image src={card.image} alt={card.bigTitle} fill className="object-contain" />
            </div>
          </div>
        ))}
      </section>

      {/* Adoption Section */}
      <section className="w-full py-6 px-6 md:px-16 bg-white flex flex-col md:flex-row items-center gap-4 ms-35">
        <div className="relative w-[400px] h-[350px]">
          <Image src="/adoption.png" alt="Adoption" fill className="object-cover rounded-xl" />
        </div>
        <div className="md:w-1/2 w-full flex flex-col justify-center gap-2">
          <h2 className="text-lg md:text-xl font-bold text-black">
            Be Their Family<br />Every Pet Deserves a Loving Home
          </h2>
          <p className="text-gray-500 text-sm">
            We partner with trusted shelters and rescue organizations to help pets find loving families.
          </p>
          <button className="mt-1 px-4 py-2 bg-black text-white rounded-xl w-max hover:bg-gray-800 transition-colors">
            Adopt Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 px-6 md:px-16 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-2">PetConnect</h3>
            <p className="text-gray-400 text-sm">
              PetConnect is the #1 platform for pet care, grooming, adoption, and community.
            </p>
          </div>
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Adoption</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p className="text-gray-400 text-sm">123 Pet Street, PetCity, PC 12345</p>
            <p className="text-gray-400 text-sm">Email: info@petconnect.com</p>
            <p className="text-gray-400 text-sm">Phone: +1 (234) 567-890</p>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-2 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} PetConnect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
