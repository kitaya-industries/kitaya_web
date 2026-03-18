'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

export default function DistributorForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    businessType: '',
    volume: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.from('inquiries').insert({
        type: 'distributor',
        name: form.name,
        company: form.business,
        email: form.email,
        phone: form.phone,
        city: form.city,
        state: form.state,
        business_type: form.businessType,
        volume: form.volume,
        message: form.message,
      });

      if (dbError) throw dbError;
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email us directly at kitayaind@gmail.com');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-6">&#10003;</div>
        <h3 className="font-display text-2xl text-bg-warm mb-3">Application Received</h3>
        <p className="text-warm-gray text-base font-light">
          Thank you for your interest in distributing Kitaya and TeaGate tea. Our team will contact you within 48 hours.
        </p>
      </div>
    );
  }

  const inputClasses = 'w-full bg-white/[0.06] border border-white/[0.1] text-bg-warm px-5 py-3.5 text-sm font-light placeholder:text-warm-gray/60 focus:outline-none focus:border-gold/40 transition-colors';
  const labelClasses = 'text-[11px] tracking-[2px] uppercase text-warm-gray mb-2 block';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Full Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Business Name *</label>
          <input type="text" name="business" required value={form.business} onChange={handleChange} placeholder="Your business or firm name" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Email *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Phone *</label>
          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 9876543210" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>City *</label>
          <input type="text" name="city" required value={form.city} onChange={handleChange} placeholder="Your city" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>State *</label>
          <input type="text" name="state" required value={form.state} onChange={handleChange} placeholder="Your state" className={inputClasses} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Business Type *</label>
          <select name="businessType" required value={form.businessType} onChange={handleChange} className={inputClasses}>
            <option value="">Select type</option>
            <option value="super-stockist">Super Stockist</option>
            <option value="distributor">Distributor</option>
            <option value="retailer">Retailer / Kirana Store</option>
            <option value="supermarket">Supermarket / Chain</option>
            <option value="horeca">Hotel / Restaurant / Cafe</option>
            <option value="institutional">Institutional / Corporate</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Expected Monthly Volume</label>
          <select name="volume" value={form.volume} onChange={handleChange} className={inputClasses}>
            <option value="">Select volume</option>
            <option value="under-50kg">Under 50 Kg</option>
            <option value="50-200kg">50 - 200 Kg</option>
            <option value="200-500kg">200 - 500 Kg</option>
            <option value="500-1000kg">500 Kg - 1 Ton</option>
            <option value="1ton-plus">1 Ton+</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClasses}>Additional Information</label>
        <textarea name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Tell us about your existing distribution network, current brands you carry, and any specific requirements." className={inputClasses + ' resize-none'} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}