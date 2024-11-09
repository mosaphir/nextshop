import React from "react";
import Link from "next/link";
import { FaCreditCard, FaHome, FaQuestionCircle } from "react-icons/fa";
import Head from "next/head";
import "./globals.css";

type LayoutProps = {
  children: React.ReactNode;
  pageTitle?: string; // Optionally accept a custom page title
  pageDescription?: string; // Optionally accept a custom page description
};

const Layout = ({
  children,
  pageTitle = "Random Credit Card Generator",
  pageDescription = "Generate random credit card details with BIN prefixes.",
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-blue-500 to-teal-500 text-white">
      {/* SEO Head */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="/path/to/your-image.jpg" /> {/* Optional Open Graph image */}
        <meta property="og:url" content="https://www.yoursite.com" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className="bg-blue-800 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-4xl font-bold flex items-center gap-2">
            <FaHome />
            Home
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/generate" className="flex items-center gap-2 text-lg hover:text-blue-200">
                  <FaCreditCard />
                  Generate Cards
                </Link>
              </li>
              <li>
                <Link href="/faq" className="flex items-center gap-2 text-lg hover:text-blue-200">
                  <FaQuestionCircle />
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto p-4">{children}</div>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-800 text-center p-4 mt-8">
        <p className="text-sm">
          &copy; 2024 Random Credit Card Generator. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
