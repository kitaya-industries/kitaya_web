import { createMeta } from '@/data/seo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createMeta(
  'Refund and Return Policy | Kitaya Industries Pvt. Ltd.',
  'Refund and return policy for Kitaya and TeaGate Assam tea products purchased on kitaya.in. Learn about return eligibility, refund process, and timelines.',
  '/refund-policy'
);

export default function RefundPolicyPage() {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-[60px] bg-bg min-h-screen">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-warm-gray tracking-[1px] mb-10">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">Refund and Return Policy</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-medium text-charcoal mb-4">
          Refund and Return Policy
        </h1>
        <p className="text-warm-gray text-sm mb-12">Last updated: March 10, 2026</p>

        <div className="space-y-10 text-[15px] text-warm-gray leading-8 font-light">

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Our Commitment to Quality</h2>
            <p>
              At Kitaya Industries, we take pride in the quality of our Assam tea products. Every batch of Kitaya CTC tea and TeaGate premium tea is tested in our NABL accredited lab and tasted by master tea tasters before packaging. We want you to be completely satisfied with your purchase from kitaya.in.
            </p>
            <p className="mt-4">
              However, we understand that issues can occasionally arise during shipping or if a product does not meet your expectations. This policy outlines the conditions under which you can request a return or refund.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Eligible for Return and Refund</h2>
            <p>
              You may request a return or refund in the following situations:
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Damaged Products:</strong> If the product arrives in a damaged condition due to shipping or handling. You must report this within 24 hours of delivery with photographs of the damaged product and packaging.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Wrong Product Delivered:</strong> If you receive a product that is different from what you ordered. For example, if you ordered TeaGate 1 Kg but received Kitaya 250g. You must report this within 48 hours of delivery.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Quality Issues:</strong> If the tea product has a genuine quality defect such as unusual odour, visible contamination, or significantly different taste from what is expected. You must report this within 7 days of delivery with a description of the issue and photographs.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Non-Delivery:</strong> If your order shows as delivered but you did not receive it, and the issue cannot be resolved with the courier partner. You must report this within 48 hours of the marked delivery date.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Not Eligible for Return and Refund</h2>
            <p>
              Since tea is a consumable food product, we cannot accept returns in certain situations:
            </p>
            <p className="mt-4">
              Products that have been opened, used, or partially consumed will not be eligible for return unless there is a genuine quality defect. Change of mind or personal taste preference after purchase is not grounds for a return. Products not purchased directly from kitaya.in are not covered under this policy. Return requests made after the applicable reporting window has passed will not be accepted.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">How to Request a Return or Refund</h2>
            <p>
              To initiate a return or refund request, please email us at kitayaind@gmail.com with the following information:
            </p>
            <p className="mt-4">
              Your order number (found in your order confirmation email). A clear description of the issue. Photographs of the product and packaging showing the problem. Your preferred resolution (replacement or refund).
            </p>
            <p className="mt-4">
              Our customer support team will review your request and respond within 24 to 48 business hours. We may ask for additional information or photographs to assess the issue.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Return Process</h2>
            <p>
              If your return request is approved, we will provide instructions for returning the product. In most cases involving damaged or wrong products, we will arrange for the courier to pick up the item from your address at no cost to you.
            </p>
            <p className="mt-4">
              Please ensure the product is packed securely in its original packaging (or similar packaging) to prevent further damage during return transit. We recommend keeping the original packaging until you are satisfied with your order.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Refund Process and Timeline</h2>
            <p>
              Once we receive and inspect the returned product (or verify the issue from photographs in the case of damaged goods), we will process your refund as follows:
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Refund Method:</strong> Refunds are issued to the original payment method used during purchase. If you paid via UPI, the refund will be credited to the same UPI account. If you paid via credit or debit card, the refund will be credited to the same card.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Refund Timeline:</strong> We initiate the refund within 3 to 5 business days of approving your return request. Depending on your bank or payment provider, it may take an additional 5 to 10 business days for the refund to reflect in your account.
            </p>
            <p className="mt-4">
              <strong className="text-charcoal font-medium">Refund Amount:</strong> The full product amount will be refunded. Shipping charges are refundable only if the return is due to our error (wrong product, damaged product, or quality issue). Shipping charges are not refundable for buyer-initiated returns.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Replacement Option</h2>
            <p>
              In case of damaged or wrong products, you may choose a replacement instead of a refund. We will ship the replacement product at no additional cost. Replacement availability depends on stock. If the product is out of stock, we will offer a full refund.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Cancellation Before Shipment</h2>
            <p>
              If you wish to cancel your order before it has been shipped, please contact us as soon as possible at kitayaind@gmail.com or call +91 9079720031. If the order has not yet been dispatched, we will cancel it and issue a full refund within 3 to 5 business days.
            </p>
            <p className="mt-4">
              Once an order has been dispatched, it cannot be cancelled. In this case, you may refuse the delivery, and we will process a refund after the product is returned to us (minus any applicable return shipping charges).
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Bulk and Export Orders</h2>
            <p>
              Return and refund terms for bulk orders, wholesale orders, and export shipments are agreed upon separately at the time of placing the order. Standard retail return policies may not apply to bulk or export orders. Please refer to the specific terms discussed during your order or contact us for details.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl text-charcoal font-medium mb-4">Contact Us</h2>
            <p>
              For any return or refund related queries, please contact us:
            </p>
            <p className="mt-4 text-charcoal">
              <strong className="font-medium">Kitaya Industries Private Limited</strong><br />
              Email: kitayaind@gmail.com<br />
              Phone: +91 9079720031<br />
              Business Hours: Monday to Saturday, 9:00 AM to 6:00 PM IST
            </p>
            <p className="mt-4">
              We value your trust and aim to resolve every concern fairly and promptly. Your satisfaction is important to us, and we are committed to providing you with the finest Assam tea and the best shopping experience on kitaya.in.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
