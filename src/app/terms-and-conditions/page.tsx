import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createMeta(
  'Terms and Conditions | Kitaya Industries Pvt. Ltd.',
  'Read the terms and conditions for using kitaya.in and purchasing Assam tea products from Kitaya Industries Private Limited, including Kitaya and TeaGate brands.',
  '/terms-and-conditions'
);

export default function TermsPage() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Terms and Conditions</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Terms and Conditions
        </h1>
        <p className="text-warm-gray text-sm mb-12">Last updated: March 10, 2026</p>

        <div className="space-y-10 text-[15px] text-warm-gray leading-8 font-light">

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Agreement to Terms</h2>
            <p>
              These Terms and Conditions ("Terms") govern your use of the website kitaya.in, operated by Kitaya Industries Private Limited, a company registered in Rajasthan, India. By accessing or using our website, placing orders for our Assam tea products, or engaging with any of our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">About Us</h2>
            <p>
              Kitaya Industries Private Limited is a tea company based in Alwar, Rajasthan, India. We manufacture and sell premium Assam tea under two brands: Kitaya (our everyday CTC tea range) and TeaGate (our premium Assam tea range). Our products are sourced directly from tea gardens in Assam and are FSSAI licensed and lab tested for quality.
            </p>
            <p className="mt-4 text-charcoal">
              <strong className="font-medium">Registered Office:</strong> 11, Old Industrial Area, Alwar - 301001, Rajasthan, India<br />
              <strong className="font-medium">CIN:</strong> U01797RJ2022PTC106405<br />
              <strong className="font-medium">GST:</strong> 08AALCK2924K1ZX<br />
              <strong className="font-medium">FSSAI License:</strong> 12225010000228
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Products and Pricing</h2>
            <p>
              All product descriptions, images, and prices on kitaya.in are provided in good faith and are as accurate as possible. Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise. Shipping charges are additional and calculated at checkout based on your delivery location and order weight.
            </p>
            <p className="mt-4">
              We reserve the right to modify product prices at any time without prior notice. However, any price changes will not affect orders that have already been confirmed and paid for. In the event of a pricing error, we will notify you and offer the option to proceed with the correct price or cancel your order for a full refund.
            </p>
            <p className="mt-4">
              Product availability is subject to stock. If an ordered product becomes unavailable after your order is placed, we will inform you promptly and process a full refund for the unavailable item.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Orders and Payment</h2>
            <p>
              When you place an order on kitaya.in, you are making an offer to purchase the selected products. An order confirmation email does not constitute acceptance of your order. We reserve the right to accept or reject any order at our discretion.
            </p>
            <p className="mt-4">
              Payment must be made at the time of placing the order through our secure payment gateway powered by Razorpay. We accept UPI payments, credit and debit cards, netbanking, and popular digital wallets. All payment transactions are encrypted and processed securely in compliance with PCI-DSS standards.
            </p>
            <p className="mt-4">
              You agree to provide accurate and complete payment information. If your payment fails or is declined, your order will not be processed. You are responsible for ensuring that you have sufficient funds or credit available for the transaction.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Shipping and Delivery</h2>
            <p>
              We currently ship to addresses within India. Delivery timelines and shipping charges depend on your delivery location and the weight of your order. Estimated delivery times are provided at checkout and are approximate. We are not liable for delays caused by courier services, natural events, or other factors beyond our control.
            </p>
            <p className="mt-4">
              Risk of loss and title for products pass to you upon delivery of the products to the shipping carrier. For complete details on our shipping practices, please refer to our <Link href="/shipping-policy" className="text-gold hover:text-gold-light transition-colors">Shipping Policy</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Returns and Refunds</h2>
            <p>
              Due to the nature of food and beverage products, we have specific return and refund conditions. Please refer to our <Link href="/refund-policy" className="text-gold hover:text-gold-light transition-colors">Refund and Return Policy</Link> for detailed information on eligibility, timelines, and the refund process.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Intellectual Property</h2>
            <p>
              All content on kitaya.in, including but not limited to text, graphics, logos, images, product photographs, brand names (Kitaya and TeaGate), packaging designs, and website design, is the property of Kitaya Industries Private Limited or its content suppliers and is protected by Indian and international intellectual property laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from our website without prior written permission from Kitaya Industries Private Limited.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">User Conduct</h2>
            <p>
              By using our website, you agree not to use the site for any unlawful purpose or in a way that could damage, disable, or impair the website. You agree not to attempt to gain unauthorized access to any part of the website, other accounts, or computer systems. You agree not to use automated means (bots, scrapers, or crawlers) to access the website without our express permission. You agree not to submit false or misleading information when placing orders or contacting us.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Export and Bulk Inquiries</h2>
            <p>
              Information on our export and bulk supply services provided on the website is for general inquiry purposes only. Export pricing, minimum order quantities, and terms are subject to discussion and mutual agreement. Submitting an inquiry does not create a binding contract. Specific terms for export and bulk orders will be agreed upon separately in writing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Disclaimer of Warranties</h2>
            <p>
              The website and its content are provided on an "as is" and "as available" basis. While we make every effort to ensure the accuracy of product information, descriptions, and images, we do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
            <p className="mt-4">
              Product images are for illustrative purposes. Actual packaging and appearance may vary slightly from what is shown on the website. Nutritional information and ingredient details are provided as printed on the product packaging and may be subject to change.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Kitaya Industries Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or purchase of our products. Our total liability for any claim arising from these Terms or your use of the website shall not exceed the amount paid by you for the specific product or order giving rise to the claim.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Alwar, Rajasthan, India.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Changes to These Terms</h2>
            <p>
              We reserve the right to update or modify these Terms at any time. Changes will be posted on this page with a revised date. Your continued use of the website after any changes constitutes acceptance of the updated Terms. We encourage you to review these Terms periodically.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
