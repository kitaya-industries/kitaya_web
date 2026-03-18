'use client';

const STYLES = `
  .brew-step {
    opacity: 0;
    transform: translateY(16px);
    animation: bstepin 0.6s ease forwards;
  }
  .brew-step:nth-child(1) { animation-delay: 0s; }
  .brew-step:nth-child(2) { animation-delay: 0.15s; }
  .brew-step:nth-child(3) { animation-delay: 0.3s; }
  .brew-step:nth-child(4) { animation-delay: 0.45s; }
  .brew-step:nth-child(5) { animation-delay: 0.6s; }
  @keyframes bstepin { to { opacity: 1; transform: translateY(0); } }

  .dr {
    stroke-dasharray: var(--l, 300);
    stroke-dashoffset: var(--l, 300);
    animation: bdrawon 1s cubic-bezier(.4,0,.2,1) forwards;
  }
  .brew-step:nth-child(1) .dr { animation-delay: 0.05s; }
  .brew-step:nth-child(2) .dr { animation-delay: 0.22s; }
  .brew-step:nth-child(3) .dr { animation-delay: 0.42s; }
  .brew-step:nth-child(4) .dr { animation-delay: 0.62s; }
  .brew-step:nth-child(5) .dr { animation-delay: 0.82s; }
  @keyframes bdrawon { to { stroke-dashoffset: 0; } }

  /* Tea granules falling */
  @keyframes bgrain1 { 0%{transform:translateY(0);opacity:.8} 100%{transform:translateY(22px);opacity:0} }
  @keyframes bgrain2 { 0%{transform:translateY(0);opacity:.7} 100%{transform:translateY(22px);opacity:0} }
  @keyframes bgrain3 { 0%{transform:translateY(0);opacity:.6} 100%{transform:translateY(22px);opacity:0} }
  .bg1 { animation: bgrain1 0.9s ease-in infinite 1.1s; }
  .bg2 { animation: bgrain2 0.9s ease-in infinite 1.4s; }
  .bg3 { animation: bgrain3 0.9s ease-in infinite 1.7s; }

  /* Milk stream */
  @keyframes bmstream { 0%{stroke-dashoffset:60} 100%{stroke-dashoffset:0} }
  .bmstr { stroke-dasharray: 8 4; animation: bmstream 0.6s linear infinite 1.3s; }
  @keyframes bmripple { 0%{r:2;opacity:.6} 100%{r:9;opacity:0} }

  /* Pestle grind */
  @keyframes bgrind { 0%{transform:rotate(-12deg) translate(0,0)} 50%{transform:rotate(8deg) translate(3px,2px)} 100%{transform:rotate(-12deg) translate(0,0)} }
  .bpestle { transform-origin: 55px 52px; animation: bgrind 1.2s ease-in-out infinite 1.5s; }
  @keyframes bspice { 0%,100%{transform:translateX(0)} 50%{transform:translateX(3px)} }
  .bspice { animation: bspice 1.2s ease-in-out infinite 1.5s; }

  /* Simmer steam */
  @keyframes bst1 { 0%{transform:translateY(0);opacity:.6} 60%{opacity:.4} 100%{transform:translateY(-22px);opacity:0} }
  @keyframes bst2 { 0%{transform:translateY(0);opacity:.5} 60%{opacity:.3} 100%{transform:translateY(-22px);opacity:0} }
  @keyframes bst3 { 0%{transform:translateY(0);opacity:.4} 60%{opacity:.2} 100%{transform:translateY(-22px);opacity:0} }
  .bst1 { animation: bst1 1.6s ease-out infinite 1.7s; }
  .bst2 { animation: bst2 1.6s ease-out infinite 2.1s; }
  .bst3 { animation: bst3 1.6s ease-out infinite 2.5s; }

  /* Cup steam curls */
  @keyframes bcurl1 { 0%{transform:translateY(0) scaleX(1);opacity:.65} 50%{transform:translateY(-10px) scaleX(1.2);opacity:.4} 100%{transform:translateY(-20px) scaleX(.8);opacity:0} }
  @keyframes bcurl2 { 0%{transform:translateY(0) scaleX(1);opacity:.55} 50%{transform:translateY(-10px) scaleX(.8);opacity:.35} 100%{transform:translateY(-20px) scaleX(1.1);opacity:0} }
  .bsc1 { animation: bcurl1 2s ease-out infinite 1.9s; }
  .bsc2 { animation: bcurl2 2s ease-out infinite 2.6s; }
  .bsc3 { animation: bcurl1 2s ease-out infinite 3.2s; }
`;

export default function BrewGuide() {
  return (
    <section className="section-padding bg-bg">
      <style>{STYLES}</style>

      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="section-label">Brew Guide</div>
          <h2 className="font-display text-3xl md:text-[40px] font-normal text-charcoal mb-4">
            Make the Perfect Cup
          </h2>
          <p className="text-warm-gray text-base font-light leading-7 max-w-[480px] mx-auto">
            Five steps to the finest kadak chai at home.
          </p>
        </div>

        <div className="relative grid grid-cols-2 sm:grid-cols-5 gap-10 sm:gap-4">
          {/* Connector line
          <div className="hidden sm:block absolute top-[54px] left-[10%] right-[10%] h-px pointer-events-none"
            style={{ background: 'linear-gradient(to right,transparent,rgba(197,165,90,0.25) 20%,rgba(197,165,90,0.25) 80%,transparent)' }} /> */}

          {/* ── STEP 1: Teaspoon dropping tea granules ── */}
          <div className="brew-step flex flex-col items-center text-center gap-3">
            <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
              {/* Spoon handle angled top-right */}
              <path className="dr" style={{'--l':'90'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M78 12 Q82 18 76 28 L62 42"/>
              {/* Spoon bowl tilted, open side down-left */}
              <path className="dr" style={{'--l':'110'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M44 52 Q36 46 38 36 Q40 26 50 26 Q60 26 62 36 Q64 46 56 52 Q50 56 44 52Z"/>
              {/* Granules in bowl */}
              <circle cx="48" cy="40" r="2"   fill="none" stroke="#C5A55A" strokeWidth="1"   opacity="0.5"/>
              <circle cx="54" cy="38" r="1.5" fill="none" stroke="#C5A55A" strokeWidth="1"   opacity="0.45"/>
              <circle cx="51" cy="44" r="1.5" fill="none" stroke="#C5A55A" strokeWidth="1"   opacity="0.4"/>
              {/* Falling granules looping */}
              <g className="bg1"><circle cx="46" cy="57" r="2"   fill="none" stroke="#C5A55A" strokeWidth="1.1"/></g>
              <g className="bg2"><circle cx="52" cy="59" r="1.6" fill="none" stroke="#C5A55A" strokeWidth="1"/></g>
              <g className="bg3"><circle cx="48" cy="62" r="1.4" fill="none" stroke="#C5A55A" strokeWidth="1"/></g>
              {/* Settled granules below */}
              <circle cx="42" cy="82" r="1.5" fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.3"/>
              <circle cx="50" cy="85" r="1.2" fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.25"/>
              <circle cx="58" cy="83" r="1"   fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.2"/>
            </svg>
            <div>
              <div className="font-display text-[18px] text-charcoal leading-tight">1 tsp</div>
              <div className="text-[10px] tracking-[2px] uppercase text-charcoal/60 mt-1">Tea leaves</div>
              <div className="text-[11px] text-warm-gray font-light mt-1">Per cup</div>
            </div>
          </div>

          {/* ── STEP 2: Milk bottle pouring into pan ── */}
          <div className="brew-step flex flex-col items-center text-center gap-3">
            <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
              {/* Pan body */}
              <path className="dr" style={{'--l':'240'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                d="M10 90 L10 76 Q10 70 16 70 L94 70 Q100 70 100 76 L100 90 Q100 94 94 94 L16 94 Q10 94 10 90Z"/>
              {/* Pan handle */}
              <path className="dr" style={{'--l':'50'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M10 78 L2 77 Q-2 77 -2 82 Q-2 87 2 87 L10 86"/>
              {/* Milk surface in pan */}
              <path className="dr" style={{'--l':'60'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"
                d="M16 80 Q30 77 52 80 Q74 83 94 80"/>
              {/* Milk bottle body */}
              <path className="dr" style={{'--l':'200'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                d="M60 8 Q54 8 52 14 L50 30 Q46 34 46 40 Q46 46 50 48 L54 66 Q55 70 60 70 Q65 70 66 66 L70 48 Q74 46 74 40 Q74 34 70 30 L68 14 Q66 8 60 8Z"/>
              {/* Bottle neck ring */}
              <line className="dr" style={{'--l':'14'} as React.CSSProperties} x1="53" y1="20" x2="67" y2="20" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4"/>
              {/* Bottle cap */}
              <path className="dr" style={{'--l':'36'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M55 8 L55 4 Q55 1 60 1 Q65 1 65 4 L65 8"/>
              {/* Liquid level inside bottle */}
              <path className="dr" style={{'--l':'16'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.35"
                d="M50 58 Q60 56 70 58"/>
              {/* Milk stream flowing into pan */}
              <path className="bmstr dr" style={{'--l':'80'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.3" strokeLinecap="round" opacity="0.75"
                d="M57 70 Q55 74 54 78 Q53 82 52 86"/>
              {/* Splash ripples */}
              <circle cx="52" cy="80" r="2" fill="none" stroke="#C5A55A" strokeWidth="0.9" opacity="0" style={{animation:'bmripple 0.9s ease-out infinite 1.4s'}}/>
              <circle cx="52" cy="80" r="2" fill="none" stroke="#C5A55A" strokeWidth="0.9" opacity="0" style={{animation:'bmripple 0.9s ease-out infinite 1.9s'}}/>
            </svg>
            <div>
              <div className="font-display text-[18px] text-charcoal leading-tight">To taste</div>
              <div className="text-[10px] tracking-[2px] uppercase text-charcoal/60 mt-1">Pour milk</div>
              <div className="text-[11px] text-warm-gray font-light mt-1">Into the pan</div>
            </div>
          </div>

          {/* ── STEP 3: Pestle & Mortar ── */}
          <div className="brew-step flex flex-col items-center text-center gap-3">
            <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
              <path className="dr" style={{'--l':'220'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M18 60 Q16 82 30 88 Q55 94 80 88 Q94 82 92 60 Z"/>
              <path className="dr" style={{'--l':'100'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M14 60 Q14 54 55 54 Q96 54 96 60 Q96 64 55 64 Q14 64 14 60Z"/>
              <g className="bspice">
                <ellipse cx="40" cy="75" rx="5" ry="3" fill="none" stroke="#C5A55A" strokeWidth="1" opacity="0.55"/>
                <ellipse cx="55" cy="80" rx="4" ry="2.5" fill="none" stroke="#C5A55A" strokeWidth="1" opacity="0.5"/>
                <ellipse cx="70" cy="74" rx="3.5" ry="2" fill="none" stroke="#C5A55A" strokeWidth="1" opacity="0.45"/>
                <path fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.5"
                  d="M46 82 Q50 78 54 80 Q56 76 60 78"/>
              </g>
              <g className="bpestle">
                <line x1="55" y1="20" x2="55" y2="65" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"/>
                <ellipse cx="55" cy="66" rx="8" ry="5" fill="none" stroke="#C5A55A" strokeWidth="1.2"/>
                <circle cx="55" cy="20" r="4" fill="none" stroke="#C5A55A" strokeWidth="1.2"/>
                <line x1="52" y1="34" x2="58" y2="34" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4"/>
                <line x1="52" y1="40" x2="58" y2="40" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4"/>
                <line x1="52" y1="46" x2="58" y2="46" stroke="#C5A55A" strokeWidth="0.8" opacity="0.4"/>
              </g>
            </svg>
            <div>
              <div className="font-display text-[18px] text-charcoal leading-tight">Fresh</div>
              <div className="text-[10px] tracking-[2px] uppercase text-charcoal/60 mt-1">Grind spices</div>
              <div className="text-[11px] text-warm-gray font-light mt-1">Ginger, cardamom</div>
            </div>
          </div>

          {/* ── STEP 4: Simmering pan ── */}
          <div className="brew-step flex flex-col items-center text-center gap-3">
            <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
              <path className="dr" style={{'--l':'260'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                d="M18 72 L18 56 Q18 50 24 50 L86 50 Q92 50 92 56 L92 72 Q92 78 86 78 L24 78 Q18 78 18 72Z"/>
              <path className="dr" style={{'--l':'60'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M18 60 L6 58 Q2 58 2 63 Q2 68 6 68 L18 66"/>
              <path className="dr" style={{'--l':'90'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M22 50 Q22 44 55 44 Q88 44 88 50"/>
              <path className="dr" style={{'--l':'30'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M49 44 Q49 38 55 37 Q61 38 61 44"/>
              <path fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.45"
                d="M28 62 Q36 58 44 62 Q52 66 60 62 Q68 58 74 62"/>
              <path className="bst1" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.55"
                d="M36 44 Q34 38 36 32 Q38 26 36 20"/>
              <path className="bst2" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.5"
                d="M55 42 Q53 36 55 30 Q57 24 55 18"/>
              <path className="bst3" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.45"
                d="M74 44 Q72 38 74 32 Q76 26 74 20"/>
              <path className="dr" style={{'--l':'20'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.3"
                d="M36 82 Q38 88 36 93"/>
              <path className="dr" style={{'--l':'20'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.3"
                d="M55 82 Q57 88 55 93"/>
              <path className="dr" style={{'--l':'20'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.3"
                d="M74 82 Q76 88 74 93"/>
            </svg>
            <div>
              <div className="font-display text-[18px] text-charcoal leading-tight">3-5 min</div>
              <div className="text-[10px] tracking-[2px] uppercase text-charcoal/60 mt-1">Simmer</div>
              <div className="text-[11px] text-warm-gray font-light mt-1">Low flame, covered</div>
            </div>
          </div>

          {/* ── STEP 5: Teacup with steam ── */}
          <div className="brew-step flex flex-col items-center text-center gap-3 sm:col-auto col-span-2">
            <svg width="110" height="110" viewBox="0 0 110 110" overflow="visible">
              <path className="dr" style={{'--l':'100'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M14 90 Q14 96 55 96 Q96 96 96 90 Q96 84 55 84 Q14 84 14 90Z"/>
              <path className="dr" style={{'--l':'60'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"
                d="M30 90 Q30 93 55 93 Q80 93 80 90"/>
              <path className="dr" style={{'--l':'200'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
                d="M26 48 L30 82 Q30 86 55 86 Q80 86 80 82 L84 48 Z"/>
              <path className="dr" style={{'--l':'80'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M22 48 Q22 44 55 44 Q88 44 88 48 Q88 52 55 52 Q22 52 22 48Z"/>
              <path className="dr" style={{'--l':'90'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1.2" strokeLinecap="round"
                d="M80 56 Q96 56 96 66 Q96 76 80 76"/>
              <path className="dr" style={{'--l':'50'} as React.CSSProperties} fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.45"
                d="M38 58 Q46 54 55 58 Q64 62 72 58"/>
              <path className="bsc1" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.6"
                d="M40 42 Q36 34 40 26 Q44 18 40 10"/>
              <path className="bsc2" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.55"
                d="M55 40 Q51 32 55 24 Q59 16 55 8"/>
              <path className="bsc3" fill="none" stroke="#C5A55A" strokeWidth="1" strokeLinecap="round" opacity="0.5"
                d="M70 42 Q66 34 70 26 Q74 18 70 10"/>
              <circle cx="30" cy="91" r="1.5" fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.3"/>
              <circle cx="80" cy="91" r="1.5" fill="none" stroke="#C5A55A" strokeWidth="0.8" opacity="0.3"/>
            </svg>
            <div>
              <div className="font-display text-[18px] text-charcoal leading-tight">Serve</div>
              <div className="text-[10px] tracking-[2px] uppercase text-charcoal/60 mt-1">Strain &amp; pour</div>
              <div className="text-[11px] text-warm-gray font-light mt-1">Hot, fresh, magical</div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-charcoal/8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="text-[10px] tracking-[3px] uppercase text-gold font-medium shrink-0">Pro Tip</div>
          <p className="text-warm-gray text-sm font-light leading-7">
            Add crushed ginger and cardamom to cold water first, boil for 2 minutes before adding tea. This blooms the spices fully and gives a richer, deeper masala chai.
          </p>
        </div>
      </div>
    </section>
  );
}