import { deliverEnquiry } from "@/lib/enquiry-delivery";
import { createEnquiryHandler } from "@/lib/enquiry-handler";

// Vercel sets VERCEL=1 at runtime; only there are forwarded-IP headers trustworthy.
export const POST = createEnquiryHandler({
  deliver: deliverEnquiry,
  trustProxy: process.env.VERCEL === "1",
});
