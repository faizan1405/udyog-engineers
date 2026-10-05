/**
 * Inquiry data model for equipment inquiry workflow.
 * Udyog Engineers is a showcase/catalogue site — inquiries are direct lead conversions.
 */

export interface EquipmentInquiry {
  name: string;
  phone: string;
  email: string;
  product?: string;
  productModel?: string;
  category?: string;
  requirement?: string;
  message: string;
}

export type InquiryFormStatus = "idle" | "submitting" | "success" | "error";
