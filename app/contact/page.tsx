import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { Mail, Phone, MapPin, CheckCircle2, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Equipment Inquiries | Udyog Engineers India",
  description:
    "Direct contact and WhatsApp consultation for precision field, survey, optical, and technical equipment.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const primaryWhatsAppUrl = buildWhatsAppInquiryUrl();
  const secondaryWhatsAppUrl = buildWhatsAppInquiryUrl({}, "919555903186");

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        eyebrow="Direct Coordination"
        title="Contact &amp; Equipment Inquiries"
        subtitle="Connect with our team directly on WhatsApp or by phone for product availability, datasheets, and procurement coordination."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Section variant="default" className="py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Details & Guidelines (5 cols) */}
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
                            href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits)}
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
            </div>

            {/* Direct WhatsApp Consultation Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 border border-border/80 bg-surface rounded-2xl shadow-xs space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans text-brand-green font-semibold mb-2">
                    <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                    <span>Instant Consultation · Fast Technical Response</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold font-display text-text-primary tracking-[-0.025em]">
                    Connect on WhatsApp
                  </h3>
                  <p className="mt-2 text-sm sm:text-base font-sans text-text-secondary leading-[1.65]">
                    For the fastest assistance, initiate a direct chat with our technical sales team. We share verified product datasheets, availability status, and quotation details in real time.
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
                    <span>What we provide on WhatsApp:</span>
                  </div>
                  <ul className="space-y-2 pl-6 list-disc">
                    <li>Official manufacturer datasheets &amp; technical specifications</li>
                    <li>Institutional and government procurement quotations</li>
                    <li>Stock availability and expected dispatch schedules</li>
                    <li>Technical guidance on sensor accuracy, range, and environmental ratings</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-text-muted" />
                    <span>Business Hours: Mon – Sat, 9:30 AM – 6:30 PM IST</span>
                  </div>
                  <span>Location: Gurgaon, Haryana</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
