import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/data/company';
import { footerLinks } from '@/data/navigation';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-dark pt-20 pb-10 px-6 lg:px-[60px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10 pb-16 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div>
            <Image
              src="/images/brands/logo-white.png"
              alt="Kitaya Industries"
              width={140}
              height={48}
              className="h-auto w-[120px] mb-4"
            />
            <p className="text-warm-gray text-[13px] leading-7 font-light max-w-[300px]">
              Premium tea crafted with care from the gardens of Assam. Two brands, one commitment to
              quality in every cup.
            </p>
            <div className="mt-6 text-[13px] text-warm-gray font-light leading-7">
              {company.name}
              <br />
              1, {company.address.line1.replace(/^\d+,?\s*/, '')}
              <br />
              {company.address.city} - {company.address.pincode}, {company.address.state}
              <br />
              {company.contact.phone}
            </div>
          </div>

          {/* Link Columns */}
          {Object.values(footerLinks).map((col) => (
            <div key={col.title}>
              <div className="text-[11px] tracking-[3px] uppercase text-gold font-medium mb-6">
                {col.title}
              </div>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-warm-gray text-sm font-light transition-colors duration-300 hover:text-bg-warm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-gray text-xs font-light">
            &copy; {currentYear} {company.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-warm-gray text-xs transition-colors duration-300 hover:text-bg-warm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-warm-gray text-xs transition-colors duration-300 hover:text-bg-warm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}