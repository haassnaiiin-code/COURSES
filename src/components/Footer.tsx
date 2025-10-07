import { Link } from "react-router-dom";
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-foreground/10 rounded-lg p-2">
                <BookOpen className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">LearnHub</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering learners worldwide with free, high-quality online courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Popular Categories</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Web Development
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Data Science
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Design
              </li>
              <li className="hover:text-primary-foreground transition-colors cursor-pointer">
                Business
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="h-4 w-4" />
              <span className="text-sm text-primary-foreground/80">
                support@learnhub.com
              </span>
            </div>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} LearnHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
