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
  title: "Contact & Equipment Inquiry | Udyog Engineers",
  description:
    "Direct contact and technical equipment quotation request for Udyog Engineers.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const whatsAppUrl = buildWhatsAppInquiryUrl();

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        eyebrow="Direct Coordination"
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
                <h2 className="text-2xl sm:text-3xl font-semibold font-display text-text-primary tracking-[-0.02em]">
                  Direct Inquiries
                </h2>
                <p className="mt-2 text-sm sm:text-base font-sans text-text-secondary leading-[1.6]">
                  We assist Government Departments, Semi-Government Organizations, PSUs, and institutional sectors with reliable, technically sound solutions and verified equipment specifications.
                </p>
              </div>

              {/* Verified Contact Details Structured Panel */}
              <div className="p-6 sm:p-7 border border-border/80 bg-surface rounded-2xl space-y-6 shadow-xs">
                {/* Email Channel */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="text-sm min-w-0">
                    <span className="font-semibold text-text-primary block font-display text-sm mb-0.5">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-text-secondary hover:text-brand-green transition-colors font-sans text-sm break-all block"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                {/* Phone & WhatsApp Lines */}
                <div className="flex items-start gap-4 pt-5 border-t border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="text-sm flex-1">
                    <span className="font-semibold text-text-primary block font-display text-sm mb-2">
                      Phone &amp; WhatsApp Lines
                    </span>
                    <div className="space-y-2.5">
                      {siteConfig.contact.phones.map((p) => (
                        <div
                          key={p.national}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-secondary/70 border border-border/70"
                        >
                          {/* Callable Phone link */}
                          <a
                            href={`tel:${p.international}`}
                            className="flex items-center gap-2 hover:text-brand-green font-sans text-sm text-text-primary font-medium transition-colors"
                            title={`Call ${p.display}`}
                          >
                            <Phone className="w-3.5 h-3.5 text-brand-green shrink-0" />
                            <span>{p.display}</span>
                          </a>

                          {/* WhatsApp Chat link */}
                          <a
                            href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits) || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-emerald-300/80 rounded-lg text-accent-whatsapp font-sans text-xs font-semibold hover:bg-emerald-50 transition-colors shadow-2xs"
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

                {/* Registered Office Address */}
                <div className="flex items-start gap-4 pt-5 border-t border-border/70">
                  <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-green" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-text-primary block font-display text-sm mb-0.5">
                      Registered Address
                    </span>
                    <span className="text-text-secondary leading-relaxed font-sans block text-sm">
                      {siteConfig.contact.address.formatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick Connect Action */}
              {whatsAppUrl && (
                <div className="p-6 border border-emerald-200/90 bg-emerald-50/50 rounded-2xl space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-text-primary font-display font-semibold text-base">
                    <WhatsAppIcon className="w-5 h-5 text-accent-whatsapp" />
                    <span>Instant WhatsApp Communication</span>
                  </div>
                  <p className="text-sm font-sans text-text-secondary leading-[1.6]">
                    Direct messaging channel for urgent datasheet requests, equipment availability queries, and real-time coordination.
                  </p>
                  <div className="pt-2">
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[46px] inline-flex items-center gap-2 px-5 py-2.5 bg-accent-whatsapp text-white text-[15px] font-sans font-semibold rounded-xl hover:brightness-95 transition-all duration-200 shadow-xs tracking-normal"
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
