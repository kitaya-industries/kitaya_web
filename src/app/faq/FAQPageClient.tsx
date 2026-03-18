'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/data/faqs';

interface FAQPageClientProps {
  categories: { title: string; faqs: FAQItem[] }[];
}

function FAQItemComponent({ faq }: { faq: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-display text-lg font-medium text-charcoal group-hover:text-gold transition-colors duration-300">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className="text-warm-gray" />
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
            <p className="pb-5 text-[15px] leading-7 font-light text-warm-gray">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPageClient({ categories }: FAQPageClientProps) {
  return (
    <section className="pb-20 px-6 lg:px-[60px] bg-bg">
      <div className="max-w-[800px] mx-auto">
        {categories.map((category, i) => (
          <div key={i} className="mb-14 last:mb-0">
            <h2 className="font-display text-2xl font-normal text-charcoal mb-6 pb-3 border-b-2 border-gold/20">
              {category.title}
            </h2>
            <div>
              {category.faqs.map((faq, j) => (
                <FAQItemComponent key={j} faq={faq} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}