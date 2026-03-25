"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthContext } from "@/context/authContext";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const { Logout, user, userId } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleSignout = async () => {
    await Logout();
    setLogoutModalOpen(false);
    setMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      {userId ? (
        <>
          <Link
            href="/profile"
            className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Avatar size="sm" src={user?.profilePicture} alt={user?.username} fallback={user?.username?.charAt(0)} />
            <span className="hidden sm:inline">{user?.username}</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLogoutModalOpen(true)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild size="sm">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/auth/register">Get Started</Link>
          </Button>
        </>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Gallery
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavLinks />
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <NavLinks />
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {logoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setLogoutModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md mx-auto rounded-lg bg-background border p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Sign Out</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setLogoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSignout}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
