import Link from 'next/link';
import Image from 'next/image';

interface BrandCardProps {
  brand: 'kitaya' | 'teagate';
  tag: string;
  name: string;
  description: string;
  href: string;
}

export default function BrandCard({ brand, tag, name, description, href }: BrandCardProps) {
  const imageSrc =
    brand === 'kitaya'
      ? '/images/brands/kitaya-home-card.png'
      : '/images/brands/teagate-home-card.png';

  const tintClass =
    brand === 'kitaya'
      ? 'bg-gradient-to-br from-kitaya-red/80 via-kitaya-red-dark/65 to-[#2A0E0E]/75'
      : 'bg-gradient-to-br from-teagate-blue-mid/80 via-teagate-blue/68 to-[#0B1630]/78';

  return (
    <Link href={href} className="block group">
      <div className="relative overflow-hidden aspect-[4/5] flex flex-col justify-end p-10 md:p-[50px] transition-transform duration-500 group-hover:-translate-y-1.5">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Brand Tint Overlay */}
        <div className={`absolute inset-0 ${tintClass}`} />

        {/* Soft Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/18" />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, transparent, transparent 30px, white 30px, white 31px)',
          }}
        />

        {/* Gold Border */}
        <div className="absolute top-5 left-5 right-5 bottom-5 border border-gold/25 pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20">
          <div className="text-[11px] tracking-[3px] uppercase text-white/60 mb-3">{tag}</div>
          <div className="font-display text-4xl md:text-[42px] text-white font-medium mb-4">
            {name}
          </div>
          <p className="text-[15px] text-white/75 leading-7 font-light mb-8 max-w-[320px]">
            {description}
          </p>
          <div className="inline-flex items-center gap-2.5 text-gold text-[13px] tracking-[2px] uppercase font-normal transition-all duration-300 group-hover:gap-4">
            Shop {name}
            <span className="relative w-[30px] h-px bg-gold after:content-[''] after:absolute after:right-0 after:-top-[3px] after:w-[7px] after:h-[7px] after:border-r after:border-t after:border-gold after:rotate-45" />
          </div>
        </div>
      </div>
    </Link>
  );
}