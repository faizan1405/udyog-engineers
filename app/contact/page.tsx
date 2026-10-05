import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Equipment Inquiry",
  description:
    "Direct contact and technical equipment quotation request for Udyog Engineers.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const whatsAppUrl = buildWhatsAppInquiryUrl();

  return (
    <div>
      <PageHeader
        eyebrow="05 // DIRECT COORDINATION"
        title="Contact &amp; Equipment Inquiries"
        subtitle="Connect with our team for equipment inquiries, product datasheets, and specification details."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section variant="default" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Details & Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary">
                  Direct Inquiries
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  We assist Government Departments, Semi-Government Organizations, PSUs, and institutional sectors with reliable, technically sound solutions and verified equipment specifications.
                </p>
              </div>

              {/* Verified Contact Details Structured Panel */}
              <div className="p-5 sm:p-6 border border-border bg-surface rounded-[2px] space-y-5 shadow-[0_1px_2px_rgba(20,23,21,0.02)]">
                {/* Email Channel */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-xs min-w-0">
                    <span className="font-semibold text-text-primary block font-display mb-0.5">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-text-secondary hover:text-accent transition-colors font-mono text-xs break-all block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp Lines */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-border-subtle">
                  <div className="w-8 h-8 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-xs flex-1">
                    <span className="font-semibold text-text-primary block font-display mb-1.5">
                      Phone / WhatsApp
                    </span>
                    <div className="space-y-2">
                      {siteConfig.contact.phones.map((p) => (
                        <div
                          key={p.national}
                          className="flex items-center justify-between gap-3 p-2 rounded-[2px] bg-surface-secondary/60 border border-border-subtle"
                        >
                          {/* Callable Phone link */}
                          <a
                            href={`tel:${p.international}`}
                            className="flex items-center gap-2 hover:text-accent font-mono text-xs text-text-primary font-medium transition-colors"
                            title={`Call ${p.display}`}
                          >
                            <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>{p.display}</span>
                          </a>

                          {/* WhatsApp Chat link */}
                          <a
                            href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits) || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface border border-border rounded-[2px] text-accent-whatsapp font-mono text-[11px] font-semibold hover:bg-surface-tertiary transition-colors"
                            title={`Chat with ${p.display} on WhatsApp`}
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Registered Office Address (Text only — Google Maps link not provided) */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-border-subtle">
                  <div className="w-8 h-8 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-text-primary block font-display mb-0.5">
                      Address
                    </span>
                    <span className="text-text-secondary leading-relaxed font-sans block">
                      {siteConfig.contact.address.formatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Connect Action */}
              {whatsAppUrl && (
                <div className="p-5 border border-border bg-surface rounded-[2px] space-y-2.5 shadow-[0_1px_2px_rgba(20,23,21,0.02)]">
                  <div className="flex items-center gap-2 text-text-primary font-display font-semibold text-sm">
                    <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                    <span>Instant WhatsApp Communication</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Direct messaging channel for urgent datasheet requests, availability queries, and real-time coordination.
                  </p>
                  <div className="pt-1.5">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 bg-accent-whatsapp text-white text-xs font-display font-semibold rounded-[2px] hover:brightness-95 transition-all duration-200 ease-precision shadow-xs"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Open WhatsApp Chat</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry Form Column */}
            <div className="lg:col-span-7">
              <InquiryForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
