/**
 * Central site and business configuration for Udyog Engineers.
 *
 * SINGLE SOURCE OF TRUTH for verified business credentials, contact coordination,
 * address information, and organizational leadership (Phase 6C).
 *
 * NOTE: Unknown business details (GST, registration number, Google Maps listing)
 * are intentionally kept blank ("") until confirmed by the client.
 * Never invent unverified commercial or legal metrics.
 */

export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export interface PhoneNumberConfig {
  display: string; // Readable presentation: "98183 20178"
  national: string; // Machine-readable 10-digit: "9818320178"
  international: string; // Callable tel format: "+919818320178"
  whatsAppDigits: string; // WhatsApp normalized digits: "919818320178"
  isWhatsApp: boolean;
  isPrimary?: boolean;
}

export interface BusinessAddress {
  line1: string; // Official street address / building
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  formatted: string; // Clean unified presentation
}

export interface LeadershipConfig {
  name: string; // Centralized leadership name spelling: "Mrs. Arti Singh, PhD"
  title: string;
  statement: string;
}

export interface BusinessContact {
  email: string; // Official company email: udyogengineersindia@gmail.com
  phone: string; // Primary readable phone for backward compatibility
  secondaryPhone?: string; // Secondary readable phone for backward compatibility
  whatsAppNumber: string; // Primary WhatsApp number in wa.me digits
  phones: PhoneNumberConfig[]; // Centralized list of verified phone lines
  address: BusinessAddress;
  googleMapsUrl?: string; // Empty until official listing is confirmed
}

export interface InquiryRecipientConfig {
  email: string; // Inquiry routing destination
  department?: string; // Responsible department / team
}

export interface SocialLinksConfig {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface LegalConfig {
  copyrightYear: number;
  legalEntityName?: string;
  registrationNumber?: string;
  gstNumber?: string;
}

export interface SiteConfig {
  companyName: string;
  legalName?: string;
  siteName: string; // Maintained for backward compatibility
  siteTagline: string;
  siteDescription: string;
  domain: string;
  isDomainConfirmed: boolean;
  leadership: LeadershipConfig;
  contact: BusinessContact;
  inquiryRecipient?: InquiryRecipientConfig;
  socialLinks: SocialLinksConfig;
  navItems: NavItem[];
  legal: LegalConfig;
}

export const siteConfig: SiteConfig = {
  companyName: "Udyog Engineers",
  legalName: "", // Client legal business name pending official confirmation
  siteName: "Udyog Engineers",
  siteTagline: "Precision Equipment & Technical Instruments",
  siteDescription:
    "Professional product showcase and catalogue for field, survey, optical, and technical equipment.",
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://www.udyogengineers.com",
  isDomainConfirmed: Boolean(process.env.NEXT_PUBLIC_SITE_URL), // False until domain registration is officially verified
  leadership: {
    name: "Mrs. Arti Singh, PhD",
    title: "Organization Leadership",
    statement:
      "Under the leadership of Mrs. Arti Singh, PhD, Udyog Engineers aims to establish itself as a dependable partner for organizations seeking quality products, advanced technology, and complete engineering solutions.",
  },
  contact: {
    email: "udyogengineersindia@gmail.com",
    phone: "98183 20178",
    secondaryPhone: "95559 03186",
    whatsAppNumber: "919818320178",
    phones: [
      {
        display: "98183 20178",
        national: "9818320178",
        international: "+919818320178",
        whatsAppDigits: "919818320178",
        isWhatsApp: true,
        isPrimary: true,
      },
      {
        display: "95559 03186",
        national: "9555903186",
        international: "+919555903186",
        whatsAppDigits: "919555903186",
        isWhatsApp: true,
        isPrimary: false,
      },
    ],
    address: {
      line1: "H-415, Gandhi Nagar",
      city: "Gurgaon",
      state: "Haryana",
      postalCode: "122001",
      country: "India",
      formatted: "H-415, Gandhi Nagar, Gurgaon - 122001",
    },
    googleMapsUrl: "", // Google Maps link intentionally omitted until official URL is supplied
  },
  inquiryRecipient: {
    email: "udyogengineersindia@gmail.com",
    department: "Technical Sales & Equipment Support",
  },
  socialLinks: {
    linkedin: "", // Client social profiles pending confirmation
    twitter: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },
  navItems: [
    { title: "Home", href: "/" },
    { title: "Categories", href: "/categories" },
    { title: "Products", href: "/products" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  legal: {
    copyrightYear: new Date().getFullYear(),
    legalEntityName: "", // Official registered business entity name (Pending client confirmation)
    registrationNumber: "", // Business registration number / MSME / CIN (Pending client confirmation)
    gstNumber: "", // GSTIN for tax invoice/quotation documentation (Pending client confirmation)
  },
};

/**
 * Checks whether an official phone number has been configured.
 */
export function hasConfiguredPhone(phone?: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();
  return Boolean(trimmed) && !trimmed.toUpperCase().includes("TODO");
}

/**
 * Checks whether an official email address has been configured.
 */
export function hasConfiguredEmail(email?: string): boolean {
  if (!email || typeof email !== "string") return false;
  const trimmed = email.trim();
  return Boolean(trimmed) && !trimmed.toUpperCase().includes("TODO");
}

/**
 * Checks whether an official physical address has been configured.
 */
export function hasConfiguredAddress(address?: BusinessAddress): boolean {
  if (!address || typeof address.line1 !== "string") return false;
  const trimmed = address.line1.trim();
  return Boolean(trimmed) && !trimmed.toUpperCase().includes("TODO");
}
