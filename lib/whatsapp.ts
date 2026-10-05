import { siteConfig } from "@/config/site";

export interface WhatsAppInquiryPayload {
  productName?: string;
  productModel?: string;
  categoryName?: string;
  customMessage?: string;
}

/**
 * Checks if an official WhatsApp phone number is configured in siteConfig.
 * Returns false if empty, undefined, placeholder, or containing 'TODO'.
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
 * Generates a formatted WhatsApp inquiry link based on product details or general inquiry.
 *
 * Sourced from `siteConfig.contact.whatsAppNumber` or an optional specific phone number.
 * If WhatsApp is unconfigured, returns `null` to avoid broken wa.me URLs.
 */
export function buildWhatsAppInquiryUrl(
  payload: WhatsAppInquiryPayload = {},
  targetNumber?: string
): string | null {
  if (!isWhatsAppConfigured()) {
    return null;
  }

  const rawTarget = targetNumber || siteConfig.contact.whatsAppNumber;
  const phoneNumber = normalizeWhatsAppNumber(rawTarget);

  const { productName, productModel, categoryName, customMessage } = payload;

  let text = "";

  if (customMessage) {
    text = customMessage;
  } else if (productName && productModel) {
    text = `Hello, I am interested in ${productName} [${productModel}]. Please share more details.`;
  } else if (productName) {
    text = `Hello, I am interested in ${productName}. Please share more details.`;
  } else if (categoryName) {
    text = `Hello, I am inquiring about equipment in the "${categoryName}" category. Please share available catalogues.`;
  } else {
    // Official client-specified general inquiry message (Phase 6C)
    text = `Hello, I would like to know more about Udyog Engineers products and solutions.`;
  }

  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phoneNumber}?text=${encodedText}`;
}
