import { ShieldCheck, FlaskRound, FileCheck, MapPin, Leaf } from 'lucide-react';

const certs = [
  { label: 'FSSAI Licensed', icon: ShieldCheck },
  { label: 'NABL Lab Tested', icon: FlaskRound },
  { label: 'GST Registered', icon: FileCheck },
  { label: '100% Assam Origin', icon: MapPin },
  { label: '100% Natural', icon: Leaf },
];

export default function CertificationsStrip() {
  return (
    <div className="py-12 md:py-16 px-6 bg-bg-warm flex flex-wrap items-center justify-center gap-10 md:gap-20">
      {certs.map((cert) => (
        <div
          key={cert.label}
          className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
        >
          <cert.icon size={24} className="text-charcoal" strokeWidth={1.5} />
          <span className="text-[11px] tracking-[2px] uppercase text-charcoal font-normal">
            {cert.label}
          </span>
        </div>
      ))}
    </div>
  );
}
