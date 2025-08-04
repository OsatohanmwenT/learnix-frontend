import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { FadeUp } from "../ui/animations";

const Footer = () => {
  return (
    <footer className="bg-[#131313] text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <FadeUp className="col-span-1 lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-hanken mb-4">
                Learn<span className="text-[#278576]">ix</span>
              </h3>
              <p className="text-neutral-400 font-hanken leading-relaxed mb-6">
                Unlock your potential with our comprehensive online courses.
                Master new skills and advance your career with expert-led
                training.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Quick Links */}
          <FadeUp delay={0.1}>
            <div>
              <h4 className="text-lg font-semibold font-hanken mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/courses"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/instructors"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Instructors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Categories */}
          <FadeUp delay={0.2}>
            <div>
              <h4 className="text-lg font-semibold font-hanken mb-6">
                Categories
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/categories/programming"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Programming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/design"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/business"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Business
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/marketing"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories/data-science"
                    className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 font-hanken"
                  >
                    Data Science
                  </Link>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Contact Info */}
          <FadeUp delay={0.3}>
            <div>
              <h4 className="text-lg font-semibold font-hanken mb-6">
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-[#278576]" />
                  <span className="text-neutral-400 font-hanken">
                    info@skillhub.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-[#278576]" />
                  <span className="text-neutral-400 font-hanken">
                    +1 (555) 123-4567
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-[#278576] mt-1" />
                  <span className="text-neutral-400 font-hanken">
                    123 Learning Street
                    <br />
                    Education City, EC 12345
                  </span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Bottom Bar */}
      <FadeUp>
        <div className="border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-5 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-neutral-400 text-sm font-hanken">
                © 2025 SkillHub. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="/privacy"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 text-sm font-hanken"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 text-sm font-hanken"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-neutral-400 hover:text-[#278576] transition-colors duration-300 text-sm font-hanken"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </footer>
  );
};

export default Footer;
