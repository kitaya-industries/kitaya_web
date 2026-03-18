import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="section-padding bg-bg">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[100px] items-center">
        {/* Visual Block */}
        <div className="relative aspect-[4/5] pb-8 pr-8 md:pb-10 md:pr-10">
          <div className="relative w-full h-full bg-bg-dark overflow-hidden">
            <img
              src="/images/products/story-homepage.png"
              alt="Assam tea"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* Badge */}
          <div className="absolute bottom-8 right-8 md:bottom-10 md:right-10 translate-x-1/4 translate-y-1/4 md:translate-x-1/3 md:translate-y-1/3 w-[84px] h-[84px] md:w-[108px] md:h-[108px] bg-gold flex flex-col items-center justify-center text-white z-10 shadow-lg">
            <div className="font-display text-[22px] md:text-[32px] font-semibold leading-none">
              100%
            </div>
            <div className="text-[8px] md:text-[9px] tracking-[2px] uppercase mt-1.5">
              Assam Tea
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="font-display text-3xl md:text-[40px] font-normal leading-tight mb-8">
            From the gardens of Assam,
            <br />
            <em className="text-gold">to your cup.</em>
          </h2>
          <p className="text-base text-warm-gray leading-7 font-light mb-5">
            At Kitaya Industries, we believe every cup of tea tells a story. Our teas are carefully
            sourced from the finest gardens in Assam, processed with care, and delivered fresh to
            ensure you taste the difference.
          </p>
          <p className="text-base text-warm-gray leading-7 font-light mb-10">
            Whether you choose the bold everyday strength of Kitaya or the refined premium notes of
            TeaGate, you&apos;re choosing tea that&apos;s been tasted by master tea tasters and
            tested in our own NABL accredited lab.
          </p>

          {/* Stats */}
          <div className="flex gap-12 pt-10 border-t border-charcoal/10">
            <div>
              <div className="font-display text-3xl md:text-4xl text-charcoal font-medium">100%</div>
              <div className="text-[12px] tracking-[2px] uppercase text-warm-gray mt-1.5">
                Black Tea
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-charcoal font-medium">FSSAI</div>
              <div className="text-[12px] tracking-[2px] uppercase text-warm-gray mt-1.5">
                Certified
              </div>
            </div>
            <div>
              <div className="font-display text-3xl md:text-4xl text-charcoal font-medium">NABL</div>
              <div className="text-[12px] tracking-[2px] uppercase text-warm-gray mt-1.5">
                Lab Tested
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="inline-block mt-10 text-gold text-[13px] tracking-[2px] uppercase font-normal hover:text-gold-light transition-colors"
          >
            Read Our Full Story →
          </Link>
        </div>
      </div>
    </section>
  );
}