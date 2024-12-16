import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaBars, FaTimes } from "react-icons/fa";

import Button from "./Button";

const navItems = [
  { name: "Nexus", href: "#nexus" },
  { name: "Vault", href: "#vault" },
  { name: "Prologue", href: "#prologue" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  // State management
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(null);

  // Refs
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemRefs = useRef({});
  const hoverBackgroundRef = useRef(null);

  // Scroll management
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Audio and indicator toggle
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Audio playback effect
  useEffect(() => {
    if (audioElementRef.current) {
      isAudioPlaying
        ? audioElementRef.current.play()
        : audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Scroll-based navbar visibility
  useEffect(() => {
    const navContainer = navContainerRef.current;
    if (!navContainer) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainer.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainer.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainer.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Navbar visibility animation
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: isMobileMenuOpen ? 0 : "100%",
        opacity: isMobileMenuOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMobileMenuOpen]);

  // Nav item hover effect
  const handleNavItemHover = (name, event) => {
    const targetElement = event.currentTarget;
    setActiveNavItem(name);

    // Animate hover background
    if (hoverBackgroundRef.current && targetElement) {
      const rect = targetElement.getBoundingClientRect();
      gsap.to(hoverBackgroundRef.current, {
        width: rect.width + 20,
        height: rect.height + 10,
        x: targetElement.offsetLeft - 10,
        opacity: 1,
        duration: 0.15, // Reduced duration for faster animation
        ease: "power1.out", // Faster, smoother easing
      });
    }
  };

  const handleNavItemLeave = () => {
    setActiveNavItem(null);

    // Hide hover background
    if (hoverBackgroundRef.current) {
      gsap.to(hoverBackgroundRef.current, {
        width: 0,
        height: 0,
        opacity: 0,
        duration: 0.1, // Reduced duration for faster animation
        ease: "power1.out", // Faster, smoother easing
      });
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-16 border-none transition-all duration-700 font-robertmedium bg-opacity-80"
    >
      <header className="relative w-full h-full">
        <nav className="flex items-center justify-between p-4 h-full max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <img
              src="/logo.png"
              alt="Zentry Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />

            {/* Desktop Product Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                id="product-button"
                title="Products"
                rightIcon={<TiArrowSortedDown />}
                containerClass="bg-blue-50 text-xs sm:text-sm flex items-center justify-center px-2 sm:px-3 py-1"
              />
              <Button
                id="whitepaper-button"
                title="Whitepaper"
                containerClass="bg-blue-50 text-xs sm:text-sm flex items-center justify-center px-2 sm:px-3 py-1"
              />
            </div>
          </div>

          {/* Navigation and Audio Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 relative">
              {/* Hover Background */}
              <div
                ref={hoverBackgroundRef}
                className="absolute z-0 bg-white rounded-full opacity-0 transition-all duration-300"
                style={{
                  width: 0,
                  height: 0,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  top: "-5px",
                  left: 0,
                }}
              />

              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={(e) => handleNavItemHover(item.name, e)}
                  onMouseLeave={handleNavItemLeave}
                >
                  <a
                    href={item.href}
                    ref={(el) => (navItemRefs.current[item.name] = el)}
                    className={clsx(
                      "text-xs sm:text-sm relative z-10 px-2 py-1 transition-colors duration-300",
                      activeNavItem === item.name ? "text-black" : "text-white"
                    )}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Rest of the component remains the same */}
            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5"
              aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>

            {/* Mobile menu toggle and other sections remain the same */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu sections remain the same */}
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
