'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/data/faqs';

interface FAQAccordionProps {
  faqs: FAQItem[];
  sectionLabel?: string;
  sectionTitle?: string;
  darkMode?: boolean;
}

function FAQItemComponent({ faq, darkMode }: { faq: FAQItem; darkMode: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-b ${
        darkMode ? 'border-white/[0.08]' : 'border-charcoal/[0.08]'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span
          className={`font-display text-lg font-medium ${
            darkMode ? 'text-bg-warm' : 'text-charcoal'
          } group-hover:text-gold transition-colors duration-300`}
        >
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className={darkMode ? 'text-warm-gray' : 'text-warm-gray'} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p
              className={`pb-5 text-[15px] leading-7 font-light ${
                darkMode ? 'text-warm-gray' : 'text-warm-gray'
              }`}
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordion({
  faqs,
  sectionLabel,
  sectionTitle,
  darkMode = false,
}: FAQAccordionProps) {
  return (
    <section className={`section-padding ${darkMode ? 'bg-bg-dark' : 'bg-bg'}`}>
      <div className="max-w-[800px] mx-auto">
        {(sectionLabel || sectionTitle) && (
          <div className="text-center mb-16">
            {sectionLabel && <div className="section-label">{sectionLabel}</div>}
            {sectionTitle && (
              <h2
                className={`section-title ${darkMode ? '!text-bg-warm' : ''}`}
              >
                {sectionTitle}
              </h2>
            )}
          </div>
        )}

        <div>
          {faqs.map((faq, i) => (
            <FAQItemComponent key={i} faq={faq} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}
