import { ReactNode } from "react";
import Head from "next/head";
import "./globals.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Random Credit Card Generator</title>
        <meta
          name="description"
          content="Generate random credit card numbers for testing purposes, including Visa, MasterCard, AMEX, Discover, and more. Export to JSON, CSV, or PIEP formats."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Random Credit Card Generator" />
        <meta
          property="og:description"
          content="Generate random credit card numbers for testing purposes."
        />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="http://localhost:3000" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
