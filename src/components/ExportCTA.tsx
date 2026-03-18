import Link from 'next/link';
import { Package, Tag, Globe } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: 'Bulk Supply',
    desc: 'Custom quantities from 10kg to container loads',
  },
  {
    icon: Tag,
    title: 'Private Labeling',
    desc: 'Your brand, our tea. Complete packaging solutions',
  },
  {
    icon: Globe,
    title: 'Global Shipping',
    desc: 'APEDA registered. Export-ready documentation',
  },
];

export default function ExportCTA() {
  return (
    <section className="section-padding bg-bg-dark text-center">
      <div className="section-label !text-gold-dark">Global Partnerships</div>
      <h2 className="section-title !text-bg-warm mb-4">Export & Bulk Orders</h2>
      <p className="text-warm-gray text-base font-light max-w-[600px] mx-auto leading-7">
        Looking for a trusted Indian tea supplier? We offer private labeling, bulk packaging, and
        custom blends for international markets.
      </p>

      <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-20 max-w-[900px] mx-auto mt-14 mb-12">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="w-[60px] h-[60px] mx-auto mb-5 border border-gold/20 flex items-center justify-center">
              <f.icon size={24} className="text-gold" strokeWidth={1.5} />
            </div>
            <div className="font-display text-lg text-bg-warm mb-2">{f.title}</div>
            <div className="text-[13px] text-warm-gray leading-6 font-light">{f.desc}</div>
          </div>
        ))}
      </div>

      <Link href="/export" className="btn-primary inline-block">
        Request Export Quote
      </Link>
    </section>
  );
}
