'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      data-nav-theme="dark"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-dark"
      style={{ zIndex: 0 }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 40px, #C5A55A 40px, #C5A55A 41px)',
        }}
      />

      {/* ── Product packs — desktop only ── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none">

        {/* Subtle gold radial glow behind packs */}
        <div
          className="absolute"
          style={{
            right: '120px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(197,165,90,0.07) 0%, transparent 70%)',
          }}
        />

        {/* TeaGate pack — behind, tilted right */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            willChange: 'auto',
            position: 'absolute',
            right: '150px',
            top: '25%',
            transform: 'translateY(-58%) rotate(6deg)',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
          }}
        >
          <Image
            src="/images/products/teagate-nobg.png"
            alt="TeaGate Premium Assam Tea 1 Kg"
            width={260}
            height={320}
            style={{ willChange: 'auto' }}
            className="h-auto w-[190px] xl:w-[220px]"
          />
        </motion.div>

        {/* Kitaya pack — front, tilted left */}
        <motion.div
          initial={{ opacity: 0, x: 20, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            willChange: 'auto',
            position: 'absolute',
            right: '270px',
            top: '35%',
            transform: 'translateY(-44%) rotate(-5deg)',
            filter: 'drop-shadow(0 48px 72px rgba(0,0,0,0.6))',
          }}
        >
          <Image
            src="/images/products/kitaya-nobg.png"
            alt="Kitaya Bold Assam Tea 1 Kg"
            width={280}
            height={340}
            style={{ willChange: 'auto' }}
            className="h-auto w-[250px] xl:w-[285px]"
          />
        </motion.div>
      </div>

      {/* ── Text — left-aligned on desktop, centered on mobile ── */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-[60px] pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-24 md:pb-12">
        <div className="lg:max-w-[520px] text-center lg:text-left">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ willChange: 'auto' }}
            className="inline-block border border-gold/25 text-gold-light text-[10px] sm:text-[11px] tracking-[3px] md:tracking-[4px] uppercase px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 mb-6 sm:mb-8 md:mb-10 font-light"
          >
            Crafted in Assam · Loved Everywhere
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ willChange: 'auto' }}
            className="font-display text-[36px] sm:text-5xl md:text-6xl lg:text-[68px] font-normal text-bg-warm leading-[1.06] mb-5 sm:mb-6 text-balance"
          >
            The Finest Tea,
            <br />
            <em className="text-gold">Straight from the Gardens</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{ willChange: 'auto' }}
            className="font-accent text-[18px] sm:text-[20px] md:text-[22px] text-warm-gray font-light tracking-[0.5px] sm:tracking-[1px] mb-8 sm:mb-10 md:mb-12 max-w-[480px] lg:mx-0 mx-auto text-balance"
          >
            Two brands. One promise. Exceptional tea in every cup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ willChange: 'auto' }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start"
          >
            <Link href="/shop" className="btn-primary text-center w-full sm:w-auto">
              Explore Our Teas
            </Link>
            <Link href="/export" className="btn-secondary text-center w-full sm:w-auto">
              For Export Inquiries
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ willChange: 'auto' }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="text-warm-gray text-[11px] tracking-[3px] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
      </motion.div>
    </section>
  );
}