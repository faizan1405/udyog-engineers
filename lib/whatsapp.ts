import { siteConfig } from "@/config/site";

export interface WhatsAppInquiryPayload {
  productName?: string;
  productModel?: string;
  categoryName?: string;
  customMessage?: string;
}

/**
 * Checks if an official WhatsApp phone number is configured in siteConfig.
 */
export function isWhatsAppConfigured(): boolean {
  const rawNumber = siteConfig.contact.whatsAppNumber;
  if (!rawNumber || typeof rawNumber !== "string") {
    return false;
  }
  const trimmed = rawNumber.trim();
  if (!trimmed || trimmed.toUpperCase().includes("TODO")) {
    return false;
  }
  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 7;
}

/**
 * Normalizes any phone string to international WhatsApp digits (e.g. 919818320178).
 */
export function normalizeWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `91${digits}`;
  }
  return digits;
}

/**
 * Generates an official WhatsApp inquiry link based on product details, category, or general inquiry.
 *
 * SPECIFICATION (CLIENT REQUIREMENT):
 * - Primary WhatsApp number: +91 98183 20178 (wa.me/919818320178)
 * - Secondary WhatsApp number: +91 95559 03186
 * - Product format: "Hello Udyog Engineers India, I am interested in the {productName}. Please share more details and availability."
 * - Category format: "Hello Udyog Engineers India, I am inquiring about equipment in the {categoryName} category. Please share available models and details."
 * - General format: "Hello Udyog Engineers India, I would like to know more about your equipment and solutions. Please share your catalogue and details."
 */
export function buildWhatsAppInquiryUrl(
  payload: WhatsAppInquiryPayload = {},
  targetNumber?: string
): string {
  const rawTarget = targetNumber || siteConfig.contact.whatsAppNumber || "919818320178";
  const phoneNumber = normalizeWhatsAppNumber(rawTarget);

  const { productName, categoryName, customMessage } = payload;

  let text = "";

  if (customMessage) {
    text = customMessage;
  } else if (productName) {
    text = `Hello Udyog Engineers India, I am interested in the ${productName}. Please share more details and availability.`;
  } else if (categoryName) {
    text = `Hello Udyog Engineers India, I am inquiring about equipment in the ${categoryName} category. Please share available models and details.`;
  } else {
    text = `Hello Udyog Engineers India, I would like to know more about your equipment and solutions. Please share your catalogue and details.`;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
