import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createMeta(
  'Shipping Policy | Kitaya Industries - Assam Tea Delivery Across India',
  'Shipping and delivery policy for Kitaya and TeaGate Assam tea orders on kitaya.in. Free shipping options, delivery timelines, and pan-India coverage.',
  '/shipping-policy'
);

export default function ShippingPolicyPage() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Shipping Policy</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Shipping Policy
        </h1>
        <p className="text-warm-gray text-sm mb-12">Last updated: March 10, 2026</p>

        <div className="space-y-10 text-[15px] text-warm-gray leading-8 font-light">

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Domestic Shipping</h2>
            <p>
              We deliver Kitaya and TeaGate Assam tea products across India. Whether you are ordering from a metro city or a smaller town, we strive to get your favourite tea to your doorstep as quickly as possible. Our shipping partners cover most serviceable pin codes across India.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Delivery Timelines</h2>
            <p>
              Once your order is confirmed and payment is received, we process and dispatch it within 1 to 2 business days. After dispatch, the estimated delivery time depends on your location:
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad):</strong> 3 to 5 business days from the date of dispatch.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Tier 2 and Tier 3 Cities:</strong> 5 to 7 business days from the date of dispatch.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Remote Areas:</strong> 7 to 10 business days from the date of dispatch.
            </p>
            <p className="mt-4">
              Please note that these are estimated timelines and actual delivery may vary depending on the courier partner, weather conditions, local holidays, and other factors beyond our control. We do not ship on Sundays and public holidays.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Shipping Charges</h2>
            <p>
              Shipping charges are calculated at checkout based on your delivery pin code and the total weight of your order. The exact shipping cost will be displayed before you complete your payment so there are no surprises.
            </p>
            <p className="mt-4">
              We may offer free shipping promotions on orders above a certain value from time to time. Any such offers will be clearly communicated on the website and applicable at checkout.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Order Tracking</h2>
            <p>
              Once your order is shipped, you will receive a confirmation email with the courier tracking number and a link to track your shipment in real time. If you do not receive a tracking update within 48 hours of placing your order, please contact us at kitayaind@gmail.com or call us at +91 9079720031.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Pin Code Serviceability</h2>
            <p>
              Before placing your order, you can check whether your pin code is serviceable during the checkout process. If your pin code is not currently covered by our shipping partners, we recommend reaching out to us directly so we can explore alternative delivery options for you.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Order Packaging</h2>
            <p>
              All Kitaya and TeaGate tea products are packaged securely to ensure they reach you in perfect condition. Our tea is packed in airtight packaging to preserve freshness, aroma, and flavour during transit. The outer shipping box is designed to protect the product from damage during handling and delivery.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Damaged or Missing Shipments</h2>
            <p>
              If your order arrives in a damaged condition, please do not accept the delivery. Photograph the damaged package and contact us within 24 hours of delivery at kitayaind@gmail.com with your order number and photos. We will arrange a replacement or full refund at no additional cost to you.
            </p>
            <p className="mt-4">
              If your shipment shows as delivered but you have not received it, please check with neighbours and your building security. If the package is still not found, contact us within 48 hours and we will work with our courier partner to investigate and resolve the issue.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">International Shipping</h2>
            <p>
              Currently, online orders on kitaya.in are shipped within India only. For international orders and export inquiries, please visit our <Link href="/export" className="text-gold hover:text-gold-light transition-colors">Export and B2B page</Link> or email us directly at kitayaind@gmail.com with your requirements. We offer bulk export of Assam tea to international markets with complete documentation and certifications.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Bulk Orders</h2>
            <p>
              For bulk orders, wholesale quantities, or orders for distribution, shipping terms and costs may differ from standard retail orders. Please contact us through our <Link href="/distributor" className="text-gold hover:text-gold-light transition-colors">Distributor page</Link> or <Link href="/export" className="text-gold hover:text-gold-light transition-colors">Export page</Link> for customized shipping arrangements and trade pricing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Contact Us</h2>
            <p>
              For any shipping-related questions or concerns, please reach out to us:
            </p>
            <p className="mt-4 text-charcoal">
              <strong className="font-medium">Kitaya Industries Private Limited</strong><br />
              Email: kitayaind@gmail.com<br />
              Phone: +91 9079720031<br />
              Business Hours: Monday to Saturday, 9:00 AM to 6:00 PM IST
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
