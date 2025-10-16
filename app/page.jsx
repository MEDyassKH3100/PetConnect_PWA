"use client";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter(); 

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to right, #F5F5DC, #ffb8c2ec 100%)",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0rem 3rem",
          justifyContent: "space-between",
        }}
      >
   
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div style={{ position: "relative", width: "200px", height: "60px" }}>
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "black",
            }}
          >
            <a
              href="#"
              style={{
                textDecoration: "none",
                color: "black",
                borderBottom: "2px solid black",
                paddingBottom: "2px",
              }}
            >
              Home
            </a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
              Contact
            </a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
              Services
            </a>
            <a href="#" style={{ textDecoration: "none", color: "black" }}>
              About Us
            </a>
          </div>
        </div>

     
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
            fontSize: "1.3rem",
            marginRight: "2.5rem",
          }}
        >
          <a
            href="https://facebook.com"
            target="_blank"
            style={{ color: "black" }}
          >
            <FaFacebookF
              style={{
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#4267B2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            style={{ color: "black" }}
          >
            <FaInstagram
              style={{
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C13584")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            style={{ color: "black" }}
          >
            <FaTwitter
              style={{
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1DA1F2")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            />
          </a>
        </div>
      </nav>

  
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem",
        }}
      >

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "3rem",
            gap: "0.5rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              background:
                "linear-gradient(90deg, #3D9EFF 0%, #C97BFF 50%, #FF9A3D 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            THE #1 PET CARE PLATFORM
          </h3>

          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "black",
            }}
          >
            We Care Your Pets, Every Paw, Every Heartbeat!
          </h1>

          <p
            style={{
              fontSize: "1rem",
              color: "grey",
              maxWidth: "500px",
            }}
          >
            From grooming and wellness checkups to special packages designed for
            their happiness, we provide the highest standard of care to make
            sure your furry friends feel loved, safe, and cherished every day.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1.5rem", paddingLeft: "4rem" }}>
            <button
              style={{
                background:
                  "linear-gradient(90deg, #3D9EFF, #C97BFF, #FF9A3D)", // blue → violet → orange
                color: "#F5F5DC",
                padding: "0.5rem 1rem",
                borderRadius: "30px",
                border: "none",
                width: "150px",
                height: "38px",
                cursor: "pointer",
                textAlign: "center",
                fontWeight: "bold",
                boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => router.push("/home")}
            >
              Login
            </button>

            <button
              style={{
                background: "none",
                border: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "1rem",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0.5rem 1rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "black")}
            >
              Sign In
            </button>
          </div>
        </div>

       
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            borderRadius: "60px",
            overflow: "hidden",
            marginTop: "4rem",
          }}
        >
          <Image
            src="/pet.png"
            alt="Pet Care"
            fill
            style={{ objectFit: "cover", borderRadius: "60px" }}
          />
        </div>
      </div>
    </div>
  );
}
