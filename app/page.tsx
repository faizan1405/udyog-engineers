import React from "react";
import { Hero } from "@/components/sections/Hero";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { CategoryToProductsTransition } from "@/components/sections/CategoryToProductsTransition";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ProductsToApplicationsTransition } from "@/components/sections/ProductsToApplicationsTransition";
import { ApplicationsSection } from "@/components/sections/ApplicationsSection";
import { ApplicationsToCredibilityTransition } from "@/components/sections/ApplicationsToCredibilityTransition";
import { CredibilitySection } from "@/components/sections/CredibilitySection";
import { CredibilityToInquiryTransition } from "@/components/sections/CredibilityToInquiryTransition";
import { InquirySection } from "@/components/sections/InquirySection";

export default function HomePage() {
  return (
    <>
      {/* 01 // HERO ARCHITECTURE */}
      <Hero />

      {/* 02 // EQUIPMENT CATEGORIES EXPERIENCE */}
      <CategoryShowcase />

      {/* TRANSITION // CATEGORIES TO SELECTED EQUIPMENT CONTINUITY BRIDGE */}
      <CategoryToProductsTransition />

      {/* 03 // SELECTED EQUIPMENT EXPERIENCE */}
      <FeaturedProducts />

      {/* TRANSITION // SELECTED EQUIPMENT TO APPLICATIONS CONTINUITY BRIDGE */}
      <ProductsToApplicationsTransition />

      {/* 04 // APPLICATIONS & ENVIRONMENTS EXPERIENCE */}
      <ApplicationsSection />

      {/* TRANSITION // APPLICATIONS TO CREDIBILITY CONTINUITY BRIDGE */}
      <ApplicationsToCredibilityTransition />

      {/* 05 // WHY UDYOG ENGINEERS / CREDIBILITY EXPERIENCE */}
      <CredibilitySection />

      {/* TRANSITION // CREDIBILITY TO INQUIRY CONTINUITY BRIDGE */}
      <CredibilityToInquiryTransition />

      {/* 06 // INQUIRY & CONTACT CONVERSION EXPERIENCE */}
      <InquirySection />
    </>
  );
}
