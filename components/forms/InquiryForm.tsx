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
 * TECHNICAL EQUIPMENT INQUIRY FORM (PHASE 4C)
 *
 * Implements an accessible, high-contrast B2B inquiry form
 * tailored for precision field and survey instrumentation.
 *
 * Adheres to:
 * - Minimum 48px touch target ergonomics on all form controls
 * - Strict Light Mode design tokens (DESIGN_SYSTEM.md)
 * - Safe WhatsApp verification (no broken wa.me URLs)
 * - Accessible input labeling and focus management
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

    // Staged submission handler (preserves frontend architecture until backend hookup)
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
        "p-6 sm:p-8 bg-surface border border-border rounded-[2px] shadow-[0_1px_3px_rgba(20,23,21,0.03)]",
        className
      )}
    >
      {!hideHeader && (
        <div className="mb-6 pb-4 border-b border-border-subtle">
          <div className="flex items-center justify-between text-[11px] font-mono text-accent-secondary uppercase tracking-wider mb-1">
            <span>INQUIRY FORM</span>
            <span>SPECIFICATION REQUEST</span>
          </div>
          <h3 className="text-xl font-bold font-display text-text-primary">
            Send Technical Equipment Inquiry
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Specify your equipment requirements, application parameters, or request technical datasheets.
          </p>
        </div>
      )}

      {status === "success" ? (
        <div className="p-6 bg-surface-secondary/70 border border-border rounded-[2px] text-text-primary space-y-4">
          <div className="flex items-center gap-2.5 text-accent font-display font-semibold text-base">
            <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
            <span>Inquiry Specification Received</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Thank you for submitting your equipment requirement. Your technical query has been recorded. Our team will review the parameters and follow up with relevant datasheets and specifications.
          </p>
          <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
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
              className="font-mono text-xs text-accent font-semibold hover:underline"
            >
              ← Submit Another Requirement
            </button>
            <span className="font-mono text-[10px] text-text-muted">
              STATUS: ACKNOWLEDGED
            </span>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
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
                className="w-full min-h-[48px] px-3.5 text-sm bg-background border border-border rounded-[2px] text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision"
                placeholder="Dr. / Er. / Name"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-phone"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
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
                className="w-full min-h-[48px] px-3.5 text-sm bg-background border border-border rounded-[2px] text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          {/* Row 2: Email & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
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
                className="w-full min-h-[48px] px-3.5 text-sm bg-background border border-border rounded-[2px] text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision"
                placeholder="name@organization.in"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-category"
                className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
              >
                Equipment Discipline
              </label>
              <div className="relative">
                <select
                  id="inquiry-category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full min-h-[48px] pl-3.5 pr-10 text-sm bg-background border border-border rounded-[2px] text-text-primary focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision appearance-none cursor-pointer"
                >
                  <option value="">Select Category (All Disciplines)</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="w-4 h-4 text-text-muted pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          {/* Row 3: Product / Model */}
          <div>
            <label
              htmlFor="inquiry-product"
              className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
            >
              Product / Model / Instrument Type (Optional)
            </label>
            <input
              id="inquiry-product"
              name="product"
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full min-h-[48px] px-3.5 text-sm bg-background border border-border rounded-[2px] text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision"
              placeholder="e.g. Geological Compass, Thermal Imager, Total Station"
            />
          </div>

          {/* Row 4: Requirement Message */}
          <div>
            <label
              htmlFor="inquiry-message"
              className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
            >
              Requirement Details / Technical Parameters <span className="text-accent-secondary">*</span>
            </label>
            <textarea
              id="inquiry-message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full min-h-[110px] p-3.5 text-sm bg-background border border-border rounded-[2px] text-text-primary placeholder:text-text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors duration-200 ease-precision resize-y leading-relaxed"
              placeholder="Describe your project requirement, required accuracy, environmental conditions, or institutional specifications..."
            />
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display text-sm font-semibold rounded-[2px] hover:bg-accent-hover transition-colors duration-200 ease-precision disabled:opacity-50 select-none cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{status === "submitting" ? "Recording Requirement..." : "Submit Inquiry"}</span>
            </button>

            {whatsAppUrl && (
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border text-text-primary font-display text-sm font-medium rounded-[2px] hover:bg-surface-tertiary transition-colors duration-200 ease-precision"
              >
                <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                <span>Inquire via WhatsApp</span>
              </a>
            )}
          </div>

          {/* Micro Privacy & Protocol Notice */}
          <div className="pt-2 text-[11px] font-mono text-text-muted flex items-center justify-between">
            <span>DIRECT TECHNICAL INQUIRY</span>
            <span>INQUIRIES REVIEWED PROMPTLY</span>
          </div>
        </form>
      )}
    </div>
  );
}
