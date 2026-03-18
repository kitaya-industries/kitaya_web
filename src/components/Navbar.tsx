'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { navLinks } from '@/data/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

type TopTheme = 'light' | 'dark';

// Brand links shown in the Shop dropdown (desktop) and mobile menu
const brandLinks = [
  {
    href: '/kitaya',
    label: 'Kitaya',
    sub: 'Bold Assam Tea · Kadak Chai',
    color: 'bg-kitaya-red',
  },
  {
    href: '/teagate',
    label: 'TeaGate',
    sub: 'Premium Assam Black Tea',
    color: 'bg-teagate-blue',
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [topTheme, setTopTheme] = useState<TopTheme>('light');
  const navRef = useRef<HTMLElement | null>(null);
  const shopRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { totalItems } = useCart();

  useEffect(() => {
    const detectTopTheme = () => {
      if (window.scrollY > 50) return;
      const nav = navRef.current;
      if (!nav) return;
      const previousPointerEvents = nav.style.pointerEvents;
      nav.style.pointerEvents = 'none';
      const sampleX = window.innerWidth / 2;
      const sampleY = Math.max(10, nav.getBoundingClientRect().height / 2);
      const el = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;
      nav.style.pointerEvents = previousPointerEvents;
      const themedParent = el?.closest('[data-nav-theme]');
      const detectedTheme = themedParent?.getAttribute('data-nav-theme');
      setTopTheme(detectedTheme === 'dark' || detectedTheme === 'light' ? detectedTheme : 'light');
    };

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      if (!isScrolled) detectTopTheme();
    };

    const raf = requestAnimationFrame(() => { handleScroll(); detectTopTheme(); });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', detectTopTheme);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectTopTheme);
    };
  }, [pathname]);

  // Close mobile menu and shop dropdown on route change
  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close shop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const darkBehindNavbar = !scrolled && topTheme === 'dark';

  return (
    <>
      {/* ── Navbar bar ── */}
      <nav
        ref={navRef}
        style={{ isolation: 'isolate' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 sm:px-6 lg:px-[60px] ${
          scrolled
            ? 'bg-[#FAFAF7] py-3 md:py-3.5 shadow-[0_1px_0_rgba(0,0,0,0.08)]'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
            <Image
              src={darkBehindNavbar ? '/images/brands/logo-white.png' : '/images/brands/logo.png'}
              alt="Kitaya Industries"
              width={180}
              height={60}
              priority
              className="h-auto w-[118px] sm:w-[128px] md:w-[155px]"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => {
              // Replace the Shop link with a dropdown trigger
              if (link.href === '/shop') {
                return (
                  <div key="shop" ref={shopRef} className="relative">
                    <button
                      onClick={() => setShopOpen((o) => !o)}
                      onMouseEnter={() => setShopOpen(true)}
                      className={`flex items-center gap-1 text-sm font-normal tracking-[1.5px] uppercase relative pb-0.5 transition-colors duration-300 group ${
                        darkBehindNavbar ? 'text-white hover:text-gold-light' : 'text-charcoal hover:text-gold'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${shopOpen ? 'rotate-180' : ''}`}
                      />
                      {/* Underline */}
                      <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                        darkBehindNavbar ? 'bg-white' : 'bg-gold'
                      }`} />
                    </button>

                    {/* Dropdown panel */}
                    <div
                      onMouseLeave={() => setShopOpen(false)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] transition-all duration-300 ${
                        shopOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                      style={{ zIndex: 200 }}
                    >
                      {/* Small arrow pointer */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#FAFAF7] border-l border-t border-charcoal/8 rotate-45" />

                      <div className="bg-[#FAFAF7] border border-charcoal/8 shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden">
                        {/* Shop All link at top */}
                        <Link
                          href="/shop"
                          onClick={() => setShopOpen(false)}
                          className="flex items-center justify-between px-6 py-4 border-b border-charcoal/6 hover:bg-bg-warm transition-colors duration-200 group"
                        >
                          <span className="text-[11px] tracking-[2px] uppercase text-charcoal font-medium group-hover:text-gold transition-colors">
                            Shop All Teas
                          </span>
                          <span className="text-charcoal/30 group-hover:text-gold transition-colors text-sm">→</span>
                        </Link>

                        {/* Brand cards */}
                        <div className="p-3 flex flex-col gap-2">
                          {brandLinks.map((brand) => (
                            <Link
                              key={brand.href}
                              href={brand.href}
                              onClick={() => setShopOpen(false)}
                              className="flex items-center gap-4 p-3 hover:bg-bg-warm transition-colors duration-200 group"
                            >
                              {/* Brand colour dot */}
                              <div className={`w-8 h-8 shrink-0 ${brand.color} flex items-center justify-center`}>
                                <span className="text-white text-[9px] font-body tracking-[1px] uppercase font-medium">
                                  {brand.label[0]}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-display text-charcoal group-hover:text-gold transition-colors">
                                  {brand.label}
                                </div>
                                <div className="text-[11px] text-warm-gray font-light truncate">
                                  {brand.sub}
                                </div>
                              </div>
                              <span className="text-charcoal/20 group-hover:text-gold transition-all group-hover:translate-x-0.5 inline-block text-sm">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // All other nav links — unchanged
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-normal tracking-[1.5px] uppercase relative pb-0.5 transition-colors duration-300 group ${
                    darkBehindNavbar ? 'text-white hover:text-gold-light' : 'text-charcoal hover:text-gold'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    darkBehindNavbar ? 'bg-white' : 'bg-gold'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Cart + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className={`px-4 sm:px-6 py-2.5 text-[12px] sm:text-[13px] tracking-[1.5px] uppercase font-body transition-all duration-300 ${
                darkBehindNavbar
                  ? 'bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white hover:text-charcoal'
                  : 'bg-charcoal text-white hover:bg-gold'
              }`}
            >
              Bag ({totalItems})
            </Link>

            <button
              className={`lg:hidden p-2 transition-colors duration-300 ${
                darkBehindNavbar ? 'text-white' : 'text-charcoal'
              }`}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        aria-hidden={!mobileOpen}
        className={`lg:hidden fixed inset-0 z-[99] transition-opacity duration-500 ease-in-out ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: '#1A1A18' }}
      >
        {/* Diagonal gold pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent, transparent 40px, #C5A55A 40px, #C5A55A 41px)',
          }}
        />
        {/* Gold line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

        {/* Scrollable content */}
        <div className="absolute inset-x-0 top-[64px] sm:top-[72px] bottom-0 flex flex-col px-6 pt-6 pb-10 overflow-y-auto">

          {/* Main nav links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="group flex items-center justify-between py-[18px] border-b border-white/[0.08] transition-colors duration-300"
              >
                <span className="font-display text-[26px] sm:text-[30px] font-normal text-[#F5F3EE] group-hover:text-gold transition-colors duration-300">
                  {link.label}
                </span>
                <span className="text-gold/30 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 inline-block">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Brand links — indented under Shop, separated by label */}
          <div className="mt-2 mb-4">
            <div className="text-[9px] tracking-[3px] uppercase text-white/25 font-body mb-3 pt-4">
              Our Brands
            </div>
            <div className="flex flex-col gap-1">
              {brandLinks.map((brand) => (
                <Link
                  key={brand.href}
                  href={brand.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 py-3 px-0 border-b border-white/[0.05] group transition-colors duration-300"
                >
                  {/* Brand colour pill */}
                  <div className={`w-7 h-7 shrink-0 ${brand.color} flex items-center justify-center`}>
                    <span className="text-white text-[9px] font-body tracking-[1px] uppercase font-medium">
                      {brand.label[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-[20px] sm:text-[22px] font-display font-normal text-[#F5F3EE] group-hover:text-gold transition-colors duration-300">
                      {brand.label}
                    </div>
                    <div className="text-[11px] text-white/30 font-light">{brand.sub}</div>
                  </div>
                  <span className="text-gold/30 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <div className="w-8 h-px bg-gold/40 mb-1" />
            <Link
              href="/shop"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center bg-gold text-[#1A1A18] px-8 py-4 text-[12px] tracking-[2.5px] uppercase font-body font-medium transition-all duration-300 hover:bg-gold-light"
            >
              Explore Our Teas
            </Link>
            <Link
              href="/export"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center border border-white/20 text-[#F5F3EE] px-8 py-4 text-[12px] tracking-[2.5px] uppercase font-body font-normal transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Export Inquiries
            </Link>
          </div>

          {/* Brand tagline */}
          <p className="mt-6 text-center text-[10px] tracking-[2px] uppercase text-white/20 font-body">
            Crafted in Assam · Loved Everywhere
          </p>
        </div>
      </div>
    </>
  );
}