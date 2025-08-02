import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/_providers/auth";
import { GetSession } from "@/_actions/auth/session";
import { Toaster } from "@/_components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "SaaS Boilerplate",
    template: "SaaS Boilerplate - %s",
  },
  description: "Um boilerplate completo para aplicações SaaS modernas com autenticação, dashboard e componentes reutilizáveis.",
  keywords: [
    "saas",
    "boilerplate",
    "next.js",
    "typescript",
    "autenticação",
    "dashboard",
    "aplicação web",
    "react",
    "prisma",
    "tailwind css",
  ].join(", "),
  applicationName: "SaaS Boilerplate",
  authors: [{ name: "SaaS Boilerplate" }],
  creator: "SaaS Boilerplate",
  publisher: "SaaS Boilerplate",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "../../public/logo.svg",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "../../public/logo.svg",
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "http://localhost:3000",
    title: "SaaS Boilerplate",
    description: "Um boilerplate completo para aplicações SaaS modernas com autenticação, dashboard e componentes reutilizáveis.",
    siteName: "SaaS Boilerplate",
    images: [
      {
        url: "../../public/saas-boilerplate-preview.webp",
        width: 1200,
        height: 630,
        alt: "SaaS Boilerplate - Template para aplicações SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Boilerplate",
    description: "Um boilerplate completo para aplicações SaaS modernas com autenticação, dashboard e componentes reutilizáveis.",
    images: ["../../public/saas-boilerplate-preview.webp"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await GetSession();

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <div vaul-drawer-wrapper="" className="min-h-[100vh] bg-slate-50">
            {children}
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
