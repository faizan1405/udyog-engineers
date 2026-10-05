"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteConfig } from "@/config/site";
import {
  FileText,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

/**
 * INQUIRY & CONTACT CONVERSION SECTION (PHASE 4C)
 *
 * Primary conversion section of the homepage.
 * Communicates: Product Interest → Requirement → Inquiry → Team Follow-Up.
 *
 * Implements an architectural two-column composition:
 * Left: Process steps, procurement guidelines, and verified contacts.
 * Right: Structured equipment inquiry form panel.
 *
 * Adheres strictly to light mode tokens, zero fake claims, and WhatsApp safety.
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
            <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2">
              <span className="font-semibold">06 // EQUIPMENT INQUIRY</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-muted">DIRECT CONVERSION</span>
            </div>
            <h2
              id="inquiry-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary font-display"
            >
              Tell Us What Equipment You Need
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Share your requirement, product category, or application and the team can respond with relevant technical information and datasheets.
            </p>
          </div>
        </motion.div>

        {/* =========================================================================
            TWO-COLUMN ARCHITECTURAL INQUIRY LAYOUT
            Left (5 cols): Workflow Architecture & Procurement Protocol
            Right (7 cols): Structured Form Panel
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Inquiry Statement & 3-Step Coordination Flow */}
          <div className="lg:col-span-5 space-y-8">
            {/* The 3-Step Workflow */}
            <div className="space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-accent-secondary font-semibold">
                HOW TECHNICAL INQUIRIES WORK
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4 p-4 rounded-[2px] border border-border bg-surface">
                  <span className="font-mono text-xs font-bold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-[2px] shrink-0">
                    01
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-text-primary">
                      Define Your Requirement
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
                      Select an equipment category or describe the specific parameters, environment, and instruments your project requires.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4 p-4 rounded-[2px] border border-border bg-surface">
                  <span className="font-mono text-xs font-bold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-[2px] shrink-0">
                    02
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-text-primary">
                      Specification &amp; Requirement Review
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
                      The team reviews your inquiry against available product references, specification parameters, and catalogue information.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4 p-4 rounded-[2px] border border-border bg-surface">
                  <span className="font-mono text-xs font-bold text-accent-secondary px-2 py-1 bg-surface-secondary rounded-[2px] shrink-0">
                    03
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-text-primary">
                      Direct Team Follow-Up
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
                      Receive relevant equipment documentation, specifications, and coordination guidance directly from our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirement Inquiry Card */}
            <div className="p-5 border border-border rounded-[2px] bg-surface relative overflow-hidden">
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/40 select-none"
              >
                +
              </span>
              <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-semibold text-accent uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>Have a Specific Equipment Requirement?</span>
              </div>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Share the category, application, product reference or specification you are looking for. The team can review the inquiry and respond with relevant available information.
              </p>
            </div>

            {/* Verified Direct Contact Channels */}
            {(hasConfiguredPhone || hasConfiguredEmail || hasConfiguredAddress) && (
              <div className="p-5 border border-border rounded-[2px] bg-surface space-y-3.5">
                <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                  <span className="font-mono text-[11px] font-semibold text-text-primary uppercase tracking-wider">
                    Direct Contact Channels
                  </span>
                  <span className="font-mono text-[10px] text-accent-secondary font-semibold">
                    VERIFIED
                  </span>
                </div>

                {/* Email */}
                {hasConfiguredEmail && (
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <Mail className="w-4 h-4 text-accent shrink-0" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="hover:text-accent font-medium font-mono transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                )}

                {/* Phone & WhatsApp Lines */}
                {siteConfig.contact.phones.length > 0 && (
                  <div className="space-y-2 pt-1 border-t border-border-subtle">
                    <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                      Phone / WhatsApp Lines
                    </span>
                    {siteConfig.contact.phones.map((p) => (
                      <div
                        key={p.national}
                        className="flex items-center justify-between gap-3 text-xs"
                      >
                        <a
                          href={`tel:${p.international}`}
                          className="flex items-center gap-2 hover:text-accent font-mono font-medium text-text-primary transition-colors"
                          title={`Call ${p.display}`}
                        >
                          <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span>{p.display}</span>
                        </a>
                        <a
                          href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits) || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-secondary border border-border rounded-[2px] text-accent-whatsapp font-mono text-[11px] font-medium hover:bg-surface-tertiary transition-colors"
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
                  <div className="flex items-start gap-3 text-xs text-text-secondary pt-1 border-t border-border-subtle">
                    <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {siteConfig.contact.address.formatted}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Structured Inquiry Form Panel */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Corner crosshairs on container frame */}
              <span
                aria-hidden="true"
                className="hidden sm:inline absolute -top-2.5 -left-2.5 font-mono text-[10px] text-accent-secondary/50 select-none z-10"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="hidden sm:inline absolute -top-2.5 -right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none z-10"
              >
                +
              </span>

              <InquiryForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
