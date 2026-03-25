import Header from "@/components/global/header/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { AppProvider } from "@/context/context";
import { AuthContextProvider } from "@/context/authContext";
import { Suspense } from "react";
import Spinner from "@/components/global/loader/Spinner";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/global/footer/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getEnv } from "@/lib/config/env";
import ErrorBoundary from "@/components/global/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Gallery - Free Stock Photos & Images",
  description: "Discover millions of free high-quality stock photos, illustrations, and vectors on Gallery. Search, download, and share the best creative imagery.",
};

// Validate environment variables on app startup
getEnv();

export default function RootLayout({ children }) {
  return (
    <AppProvider>
      <AuthContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
              <Suspense fallback={<Spinner />}>
                <ErrorBoundary>
                  <a href="#main-content" className="skip-link">
                    Skip to content
                  </a>
                  <main id="main-content">
                    <Header />
                    <div className="min-h-[calc(100vh-4rem)] bg-background">
                      {children}
                    </div>
                    <Footer />
                  </main>
                  <ToastContainer />
                </ErrorBoundary>
              </Suspense>
            </body>
          </html>
        </ThemeProvider>
      </AuthContextProvider>
    </AppProvider>
  );
}
