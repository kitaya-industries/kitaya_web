import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createMeta(
  'Privacy Policy | Kitaya Industries Pvt. Ltd.',
  'Read the privacy policy of Kitaya Industries. Learn how we collect, use, and protect your personal information when you buy Assam tea online from kitaya.in.',
  '/privacy-policy'
);

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Privacy Policy</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Privacy Policy
        </h1>
        <p className="text-warm-gray text-sm mb-12">Last updated: March 10, 2026</p>

        <div className="space-y-10 text-[15px] text-warm-gray leading-8 font-light">

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Introduction</h2>
            <p>
              Kitaya Industries Private Limited ("Kitaya Industries", "we", "us", or "our") operates the website kitaya.in. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our Assam tea products, including the Kitaya and TeaGate brands.
            </p>
            <p className="mt-4">
              By using our website, you agree to the collection and use of information as described in this policy. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Information We Collect</h2>
            <p>We may collect the following types of personal information when you interact with our website:</p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Personal Information You Provide:</strong> When you place an order for our tea products, submit an inquiry through our export or distributor forms, or contact us, we collect your name, email address, phone number, shipping address, city, state, pincode, and any other information you voluntarily provide.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Payment Information:</strong> When you make a purchase, payment is processed securely through Razorpay. We do not store your credit card, debit card, or UPI details on our servers. All payment information is handled directly by Razorpay in compliance with PCI-DSS standards.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Automatically Collected Information:</strong> When you visit kitaya.in, we may automatically collect certain information about your device and browsing activity, including your IP address (hashed for privacy), browser type, operating system, referring URLs, pages visited, and time spent on the site. This data helps us improve your experience and understand how visitors use our website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <p className="mt-4">
              To process and fulfill your orders, including shipping Kitaya and TeaGate tea products to your address. To communicate with you about your orders, including order confirmations, shipping updates, and delivery notifications. To respond to your inquiries, whether related to our products, export opportunities, distribution partnerships, or general questions. To improve our website, products, and customer experience based on usage patterns and feedback. To send you promotional communications about our Assam tea products, new arrivals, and special offers, but only if you have opted in to receive such communications. To comply with legal obligations and protect our rights.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Payment Processors:</strong> We share necessary transaction details with Razorpay to process your payments securely.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Shipping Partners:</strong> We share your shipping name and address with our logistics and courier partners to deliver your orders.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Analytics Providers:</strong> We may use third-party analytics services such as Google Analytics to understand website usage patterns. These services collect anonymized data and are governed by their own privacy policies.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or governmental request.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Cookies and Tracking Technologies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences, understand site traffic, and improve our services. You can choose to disable cookies through your browser settings, but this may affect certain features of the website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data transmitted between your browser and our website is encrypted using SSL/TLS protocols. Payment processing is handled by Razorpay, which maintains PCI-DSS compliance. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Order data is retained for a minimum period required by applicable tax and commercial laws in India. You may request deletion of your personal data by contacting us at the details provided below.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information held by us. You may also withdraw your consent to receive promotional communications at any time. To exercise any of these rights, please contact us using the details below. We will respond to your request within a reasonable timeframe, typically within 30 days.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, such as our Amazon product listings or social media profiles. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party site you visit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Children's Privacy</h2>
            <p>
              Our website and products are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 18, we will take steps to delete that information promptly.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time to reflect changes in our practices or applicable laws. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes acceptance of the updated policy.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Contact Us</h2>
            <p>
              If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="mt-4 text-charcoal">
              <strong className="font-medium">Kitaya Industries Private Limited</strong><br />
              11, Old Industrial Area, Alwar - 301001, Rajasthan, India<br />
              Email: kitayaind@gmail.com<br />
              Phone: +91 9079720031<br />
              Website: www.kitaya.in
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
