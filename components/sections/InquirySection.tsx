"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import {
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

/**
 * INQUIRY & CONTACT CONVERSION SECTION
 *
 * Primary conversion section of the homepage.
 * Communicates: View Product → Direct WhatsApp Chat → Rapid Technical Follow-Up.
 *
 * Implements an architectural two-column composition:
 * Left: Process steps, procurement guidelines, and verified contacts.
 * Right: High-converting WhatsApp Direct Consultation panel.
 */
export function InquirySection() {
  const shouldReduceMotion = useReducedMotion();
  const hasConfiguredPhone =
    Boolean(siteConfig.contact.phone) &&
    !siteConfig.contact.phone.toUpperCase().includes("TODO");

  const hasConfiguredEmail =
    Boolean(siteConfig.contact.email) &&
    !siteConfig.contact.email.toUpperCase().includes("TODO");

  const hasConfiguredAddress =
    Boolean(siteConfig.contact.address.line1) &&
    !siteConfig.contact.address.line1.toUpperCase().includes("TODO");

  const primaryWhatsAppUrl = buildWhatsAppInquiryUrl();
  const secondaryWhatsAppUrl = buildWhatsAppInquiryUrl({}, "919555903186");

  return (
    <section
      id="inquiry"
      aria-labelledby="inquiry-heading"
      className="relative bg-surface-secondary/50 border-t border-border py-16 md:py-24 overflow-hidden"
    >
      <Container>
        {/* Section Registration Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-border"
        >
          <div>
            <div className="flex items-center gap-2 font-sans text-xs text-accent-secondary mb-3 font-medium">
              <span className="font-mono font-semibold">06</span>
              <span>·</span>
              <span className="font-semibold text-accent-secondary">Equipment Consultation</span>
              <span className="text-border-strong">·</span>
              <span className="text-text-muted">Direct WhatsApp Channel</span>
            </div>
            <h2
              id="inquiry-heading"
              className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-display font-semibold tracking-[-0.035em] leading-[1.06] text-text-primary"
            >
              Tell Us What Equipment You Need
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.6]">
              Share your requirement, product category, or application directly with our engineering team on WhatsApp for prompt datasheets and quotations.
            </p>
          </div>
        </motion.div>

        {/* TWO-COLUMN ARCHITECTURAL INQUIRY LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Inquiry Statement & 3-Step Coordination Flow (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* The 3-Step Workflow */}
            <div className="space-y-6">
              <div className="font-sans text-xs text-accent-secondary font-semibold">
                How Technical Inquiries Work
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                  <span className="font-mono text-xs font-semibold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-lg shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-base text-text-primary">
                      Select Equipment or Discipline
                    </h3>
                    <p className="font-sans text-sm text-text-secondary mt-1 leading-[1.6]">
                      Explore our 94 verified instruments across 8 disciplines and click &ldquo;Inquire on WhatsApp&rdquo;.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                  <span className="font-mono text-xs font-semibold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-lg shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-base text-text-primary">
                      Instant WhatsApp Chat
                    </h3>
                    <p className="font-sans text-sm text-text-secondary mt-1 leading-[1.6]">
                      WhatsApp opens with a pre-formatted inquiry containing your selected model details.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface">
                  <span className="font-mono text-xs font-semibold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-lg shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-base text-text-primary">
                      Direct Team Follow-Up
                    </h3>
                    <p className="font-sans text-sm text-text-secondary mt-1 leading-[1.6]">
                      Receive official technical datasheets, institutional quotations, and delivery guidance directly from our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirement Inquiry Card */}
            <div className="p-5 border border-border rounded-xl bg-surface relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2 font-display text-sm font-semibold text-accent">
                <FileText className="w-4 h-4" />
                <span>Custom Tender or Research Specification?</span>
              </div>
              <p className="font-sans text-sm text-text-secondary leading-[1.6]">
                Message us with your tender parameters or accuracy tolerances. We assist Government Departments, PSUs, and universities across India.
              </p>
            </div>

            {/* Verified Direct Contact Channels */}
            {(hasConfiguredPhone || hasConfiguredEmail || hasConfiguredAddress) && (
              <div className="p-5 border border-border rounded-xl bg-surface space-y-3.5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                  <span className="font-sans text-xs font-semibold text-text-primary">
                    Direct Contact Channels
                  </span>
                  <span className="font-sans text-[11px] text-brand-green font-semibold">
                    VERIFIED
                  </span>
                </div>

                {/* Email */}
                {hasConfiguredEmail && (
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-accent font-sans font-medium text-text-primary transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                )}

                {/* Phone & WhatsApp Lines */}
                {siteConfig.contact.phones.length > 0 && (
                  <div className="space-y-2.5 pt-1 border-t border-border-subtle">
                    <span className="font-sans text-xs text-text-muted block">
                      Phone / WhatsApp Lines
                    </span>
                    {siteConfig.contact.phones.map((p) => (
                      <div
                        key={p.national}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <a
                          href={`tel:${p.international}`}
                          className="flex items-center gap-2 hover:text-accent font-sans font-medium text-text-primary transition-colors"
                          title={`Call ${p.display}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{p.display}</span>
                        </a>
                        <a
                          href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-secondary border border-border rounded-lg text-accent-whatsapp font-sans text-xs font-semibold hover:bg-surface-tertiary transition-colors"
                          title={`Message ${p.display} on WhatsApp`}
                        >
                          <WhatsAppIcon className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                )}

                {/* Address */}
                {hasConfiguredAddress && (
                  <div className="flex items-start gap-3 text-sm text-text-secondary pt-1 border-t border-border-subtle">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-sans">
                      {siteConfig.contact.address.formatted}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: High-Converting WhatsApp Consultation Panel (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 border border-border/80 bg-surface rounded-2xl shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-sans text-brand-green font-semibold mb-2">
                  <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                  <span>Immediate Assistance</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold font-display text-text-primary tracking-[-0.025em]">
                  Start a WhatsApp Inquiry
                </h3>
                <p className="mt-2 text-sm sm:text-base font-sans text-text-secondary leading-[1.65]">
                  Skip complicated forms. Connect directly with our equipment experts on WhatsApp for instant product specifications, quotation requests, and stock availability.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={primaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent-whatsapp text-white font-sans text-base font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Inquire on WhatsApp (Primary: 98183 20178)</span>
                </a>

                <a
                  href={secondaryWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-surface-secondary border border-emerald-300 text-emerald-900 font-sans text-sm font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                  <span>Inquire on WhatsApp (Secondary: 95559 03186)</span>
                </a>
              </div>

              <div className="p-5 bg-surface-secondary/70 border border-border/70 rounded-xl space-y-3 text-xs font-sans text-text-secondary">
                <div className="font-semibold text-text-primary text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>Direct services provided:</span>
                </div>
                <ul className="space-y-2 pl-6 list-disc">
                  <li>Instant equipment pricing and quotation issuance</li>
                  <li>Official PDF technical datasheets and compliance certificates</li>
                  <li>Delivery schedules across Indian institutional sites</li>
                  <li>Bulk supply and tender documentation coordination</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-text-muted">
                <span>Call Us Directly: +91 98183 20178</span>
                <span>•</span>
                <span>Email: {siteConfig.contact.email}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
