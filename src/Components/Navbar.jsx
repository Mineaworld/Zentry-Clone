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

// State management
const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(null);

  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hoverBackgroundRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (audioElementRef.current) {
      isAudioPlaying
        ? audioElementRef.current.play()
        : audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

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

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.05,
    });
  }, [isNavVisible]);

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

  const handleNavItemHover = (name, event) => {
    const targetElement = event.currentTarget;
    setActiveNavItem(name);

    if (hoverBackgroundRef.current && targetElement) {
      const rect = targetElement.getBoundingClientRect();
      gsap.to(hoverBackgroundRef.current, {
        width: rect.width + 20,
        height: rect.height + 10,
        x: targetElement.offsetLeft - 10,
        opacity: 1,
        duration: 0.25, // Smooth animation when switching
        ease: "power2.out",
      });
    }
  };

  const handleNavItemLeave = () => {
    setActiveNavItem(null);

    if (hoverBackgroundRef.current) {
      gsap.to(hoverBackgroundRef.current, {
        opacity: 0,
        duration: 0.1, // Quick fade-out
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-0 z-50 h-16 border-none transition-all duration-700 font-robertmedium bg-opacity-80"
    >
      <header className="relative w-full h-full ">
        <nav
          className="flex items-center justify-between p-4 h-full max-w-6xl mx-auto"
          href="#hero"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">
            <img
              src="/logo.png"
              alt="Zentry Logo"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
            />

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

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 relative">
              <div
                ref={hoverBackgroundRef}
                className="absolute z-0 bg-white rounded-full opacity-0"
                style={{
                  width: 0,
                  height: 0,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  top: "-5px",
                  left: 0,
                  transition:
                    "opacity 0.1s ease, transform 0s, width 0s, height 0s",
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
                    className={clsx(
                      "text-xs sm:text-sm relative z-10 px-2 py-1 transition-colors duration-200",
                      activeNavItem === item.name ? "text-black" : "text-white"
                    )}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="flex items-center justify-center space-x-0.5 group w-8 h-8"
              aria-label={isAudioPlaying ? "Pause audio" : "Play audio"}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={clsx(
                      "w-[1.5px] h-3 bg-white transform rounded-sm transition-transform ease-in-out duration-300",
                      isAudioPlaying
                        ? `animate-bar group-hover:scale-y-[1.8]`
                        : "scale-y-[1] bg-gray-800"
                    )}
                    style={{
                      animationDelay: `${bar * 0.3}s`,
                    }}
                  ></span>
                ))}
              </div>
            </button>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden z-50 text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        <div
          ref={mobileMenuRef}
          className="fixed inset-y-0 right-0 left-40 z-40 w-3/4 max-w-sm text-white transition-transform transform translate-x-full md:hidden"
        >
          <ul className="flex flex-col space-y-1 p-4 backdrop-blur-xl z-40">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className="block text-sm py-2 px-3 rounded-md hover:bg-gray-700/30 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
