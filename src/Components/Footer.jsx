import React from "react";
import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from "react-icons/fa";

const links = [
  { href: "https://www.Discord.com", icon: <FaDiscord /> },
  { href: "https://www.X.com", icon: <FaTwitter /> },
  { href: "https://www.Youtube.com", icon: <FaYoutube /> },
  { href: "https://www.Meduim.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="bg-violet-300 w-screen py-4 text-black">
      <div className="container mx-auto flex items-center justify-between flex-col gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left font-general">
          &copy; Zentry 2025. All rights reserved
        </p>
        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link) => (
            <a
              key={link}
              href={link.href}
              terget="_blank"
              rel="noopener noreferrer"
              className="text-black duration-500 transition-colors ease-in-out hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <a
          href="#privacy-policy"
          className="text-center text-sm md:text-right font-general mr-5"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
