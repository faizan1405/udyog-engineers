"use client";

import React, { useState } from "react";
import { EquipmentInquiry, InquiryFormStatus } from "@/types/inquiry";
import { getAllCategories } from "@/data/categories";
import { buildWhatsAppInquiryUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InquiryFormProps {
  initialProduct?: string;
  initialProductModel?: string;
  initialCategory?: string;
  className?: string;
  hideHeader?: boolean;
}

/**
 * TECHNICAL EQUIPMENT INQUIRY FORM
 * Adheres to R2 visual system:
 * - Rounded-2xl container and rounded-xl form controls
 * - Minimum 48px touch target ergonomics
 * - DM Sans typography system
 * - WhatsApp consultation integration
 */
export function InquiryForm({
  initialProduct = "",
  initialProductModel = "",
  initialCategory = "",
  className = "",
  hideHeader = false,
}: InquiryFormProps) {
  const categories = getAllCategories();
  const whatsAppEnabled = isWhatsAppConfigured();

  const [formData, setFormData] = useState<EquipmentInquiry>({
    name: "",
    phone: "",
    email: "",
    product: initialProduct,
    productModel: initialProductModel,
    category: initialCategory,
    requirement: "General Inquiry",
    message: "",
  });

  const [status, setStatus] = useState<InquiryFormStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Form submission simulation
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const whatsAppUrl = whatsAppEnabled
    ? buildWhatsAppInquiryUrl({
        productName: formData.product,
        productModel: formData.productModel,
        categoryName: formData.category,
        customMessage: formData.message || undefined,
      })
    : null;

  return (
    <div
      className={cn(
        "p-6 sm:p-8 lg:p-10 bg-surface border border-border/80 rounded-2xl shadow-xs",
        className
      )}
    >
      {!hideHeader && (
        <div className="mb-7 pb-5 border-b border-border/70">
          <div className="flex items-center justify-between text-xs font-sans text-brand-green font-semibold mb-2">
            <span>Inquiry Specification</span>
            <span className="text-text-muted font-normal">Technical Consultation</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold font-display text-text-primary tracking-[-0.025em]">
            Send Equipment Inquiry
          </h3>
          <p className="text-sm sm:text-base font-sans text-text-secondary mt-2 leading-relaxed">
            Specify your equipment requirements, application parameters, or request official technical datasheets.
          </p>
        </div>
      )}

      {status === "success" ? (
        <div className="p-8 bg-surface-secondary/70 border border-border/80 rounded-2xl text-text-primary space-y-4">
          <div className="flex items-center gap-3 text-brand-green font-display font-semibold text-lg">
            <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0" />
            <span>Inquiry Specification Received</span>
          </div>
          <p className="text-sm sm:text-base font-sans text-text-secondary leading-[1.65]">
            Thank you for submitting your equipment requirement. Your query has been recorded. Our team will review the parameters and follow up promptly with relevant datasheets and specifications.
          </p>
          <div className="pt-3 border-t border-border/70 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setStatus("idle");
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  product: "",
                  productModel: "",
                  category: "",
                  requirement: "General Inquiry",
                  message: "",
                });
              }}
              className="font-sans text-sm text-brand-green font-semibold hover:underline"
            >
              ← Submit Another Requirement
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
              >
                Full Name <span className="text-accent-secondary">*</span>
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full min-h-[48px] px-4 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary placeholder:text-text-muted placeholder:text-[15px] focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200"
                placeholder="Dr. / Er. / Name"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-phone"
                className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
              >
                Phone Number <span className="text-accent-secondary">*</span>
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full min-h-[48px] px-4 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary placeholder:text-text-muted placeholder:text-[15px] focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Row 2: Email & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
              >
                Email Address <span className="text-accent-secondary">*</span>
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                inputMode="email"
                required
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full min-h-[48px] px-4 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary placeholder:text-text-muted placeholder:text-[15px] focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200"
                placeholder="name@organization.in"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-category"
                className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
              >
                Equipment Discipline
              </label>
              <div className="relative">
                <select
                  id="inquiry-category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full min-h-[48px] pl-4 pr-10 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Select Discipline (All Categories)</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-text-muted pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Product / Model */}
          <div>
            <label
              htmlFor="inquiry-product"
              className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
            >
              Product / Model / Instrument Type (Optional)
            </label>
            <input
              id="inquiry-product"
              name="product"
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full min-h-[48px] px-4 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary placeholder:text-text-muted placeholder:text-[15px] focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200"
              placeholder="e.g. Geological Compass, Thermal Imager, Total Station"
            />
          </div>

          {/* Row 4: Requirement Message */}
          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-[14px] sm:text-[15px] font-sans font-semibold text-text-primary mb-1.5"
            >
              Requirement Details / Parameters <span className="text-accent-secondary">*</span>
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[110px] p-4 text-base font-sans bg-background border border-border/80 rounded-xl text-text-primary placeholder:text-text-muted placeholder:text-[15px] focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 focus:outline-none transition-all duration-200 resize-y leading-relaxed"
              placeholder="Describe your project requirement, required accuracy, environmental conditions, or institutional specifications..."
            />
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans text-[15px] font-semibold rounded-xl hover:bg-brand-green-hover transition-colors duration-200 disabled:opacity-50 select-none cursor-pointer tracking-normal shadow-xs"
            >
              <Send className="w-4 h-4" />
              <span>{status === "submitting" ? "Recording Requirement..." : "Submit Inquiry"}</span>
            </button>

            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border/80 text-text-primary font-sans text-[15px] font-semibold rounded-xl hover:bg-surface-tertiary transition-colors duration-200 tracking-normal"
              >
                <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                <span>Inquire via WhatsApp</span>
              </a>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
