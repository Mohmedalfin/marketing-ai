import { useState, useEffect, useRef } from "react";
import logoGambar from "../../assets/logo.png";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar({ variant = "landing" }: { variant?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { handleLogout } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 z-50 flex w-full justify-center transition-all duration-300
      ${isScrolled ? "top-4 px-4 md:px-6" : "top-0 px-0"}`}
    >
      <nav
        className={`mx-auto flex w-full items-center justify-between transition-all duration-300 border
        ${
          isScrolled
            ? "max-w-[1400px] rounded-full border-gray-200/70 bg-white/85 px-6 lg:px-8 py-3.5 shadow-[0_4px_24px_rgb(0,0,0,0.08)] backdrop-blur-md"
            : "max-w-[1560px] border-transparent bg-transparent px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-5"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-1 items-center justify-between md:justify-start">
          <a href={variant === "app" ? "/dashboard" : "/"} aria-label="Brand">
            <img
              src={logoGambar}
              alt="AiGency Logo"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Mobile Button */}
          <button
            className="md:hidden flex size-9 items-center justify-center rounded-full hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className={`${isOpen ? "hidden" : "block"} size-6`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
              className={`${isOpen ? "block" : "hidden"} size-6`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Center Menu */}
        <div className="hidden absolute left-1/2 -translate-x-1/2 md:flex items-center gap-x-8">
          {variant === "landing" && (
            <>
              <a
                href="#features"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                How it Works
              </a>

              <a
                href="#solutions"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                Solutions
              </a>
            </>
          )}
        </div>

        {/* Right Button */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-x-6">
          {variant === "landing" && (
            <>
              <a
                href="/login"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                Sign In
              </a>

              <a
                href="/register"
                className="rounded-full bg-[#3BB77E] px-6 py-2.5 text-white font-semibold hover:bg-[#2fa36d]"
              >
                Get Started
              </a>
            </>
          )}

          {variant === "app" && (
            <>
            <a
                href="/dashboard"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                Dashboard
              </a>
              <a
                href="/schedule"
                className="text-lg font-semibold text-gray-700 hover:text-[#38C074]"
              >
                Schedule
              </a>
            <a
              href="/ai"
              className="rounded-full bg-[#3BB77E] px-6 py-2.5 text-white font-semibold hover:bg-[#2fa36d]"
            >
              Ai Studio
            </a>

            {/* Profile Dropdown */}
            <div className="relative ml-2" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex size-11 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BB77E] focus:ring-offset-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-5 w-48 rounded-xl bg-white py-2 shadow-lg ring-1 ring-black/5 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">User Profile</p>
                  </div>
                  <a
                    href="/profile"
                    className="px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Profil Saya
                  </a>
                  <button
                    onClick={() => handleLogout(() => setIsProfileOpen(false))}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            </>
            
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`absolute left-4 right-4 top-full mt-3 md:hidden bg-white rounded-2xl shadow-xl transition-all
          ${isOpen ? "max-h-[30rem] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
        >
          <div className="flex flex-col gap-4 p-6">
            {variant === "landing" && (
              <>
                <a className="font-semibold text-gray-700" href="#features">
                  Features
                </a>
                <a className="font-semibold text-gray-700" href="#how-it-works">
                  How it Works
                </a>
                <a className="font-semibold text-gray-700" href="#solutions">
                  Solutions
                </a>

                <hr />

                <a href="/login" className="font-semibold text-gray-700">
                  Sign In
                </a>

                <a
                  href="/register"
                  className="rounded-full bg-[#3BB77E] px-4 py-2 text-center text-white"
                >
                  Get Started
                </a>
              </>
            )}

            {variant === "app" && (
              <>
                <a href="/dashboard" className="font-semibold text-gray-700">
                  Beranda
                </a>
                <a href="/schedule" className="font-semibold text-gray-700">
                  Schedule
                </a>
                <a
                  href="/ai"
                  className="rounded-full bg-[#3BB77E] px-4 py-2 text-center text-white"
                >
                  Ai Studio
                </a>

                <hr className="my-2 border-gray-100" />
                
                <a href="/profile" className="font-semibold text-gray-700">
                  Profil Saya
                </a>
                
                <button 
                  className="text-left font-semibold text-red-600 focus:outline-none"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}