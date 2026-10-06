import { ProductCategory } from "@/types/category";

/**
 * 8 Primary equipment categories for Udyog Engineers.
 * All image paths point to local public assets (placeholders until official photography is provided).
 * Centralized source of truth for catalogue hierarchy.
 */
export const CATEGORIES: ProductCategory[] = [
  {
    id: "cat-optics",
    name: "Optics",
    slug: "optics",
    domain: "Field & Survey Optics",
    shortDescription: "Optical instruments for field observation and survey.",
    description:
      "Optical instruments designed for field observation, survey applications, and distance inspection.",
    image: "/images/generated/categories/category-optics.webp",
    heroImage: "/images/generated/categories/category-optics.webp",
    icon: "Binoculars",
    order: 1,
    status: "development-placeholder",
    applicationContexts: [
      "Terrestrial field survey & land triangulation",
      "Optical observation & field inspection",
      "Wildlife & environmental viewing",
    ],
  },
  {
    id: "cat-gps",
    name: "GPS",
    slug: "gps",
    domain: "Positioning & Mapping Equipment",
    shortDescription: "Positioning and mapping equipment for geospatial applications.",
    description:
      "Satellite navigation receivers, handheld GPS, and tools for field positioning and mapping.",
    image: "/images/generated/categories/category-gps.webp",
    heroImage: "/images/generated/categories/category-gps.webp",
    icon: "Navigation",
    order: 2,
    status: "development-placeholder",
    applicationContexts: [
      "Field boundary & waypoint logging",
      "Topographical field mapping & path survey",
      "GIS spatial data collection & field navigation",
    ],
  },
  {
    id: "cat-night-vision",
    name: "Night Vision",
    slug: "night-vision",
    domain: "Low-Light & Night Observation",
    shortDescription: "Equipment for low-light observation and nighttime field work.",
    description:
      "Night observation devices and low-light optical tools for nocturnal field operations.",
    image: "/images/generated/categories/category-night-vision.webp",
    heroImage: "/images/generated/categories/category-night-vision.webp",
    icon: "Eye",
    order: 3,
    status: "development-placeholder",
    applicationContexts: [
      "Nocturnal field observation",
      "Low-light reserve & perimeter inspection",
      "Night expedition monitoring",
    ],
  },
  {
    id: "cat-thermal",
    name: "Thermal",
    slug: "thermal",
    domain: "Thermal Observation & Monitoring",
    shortDescription: "Equipment for thermal observation and monitoring.",
    description:
      "Thermal observation devices, detectors, and monitoring tools for field inspection.",
    image: "/images/generated/categories/category-thermal.webp",
    heroImage: "/images/generated/categories/category-thermal.webp",
    icon: "Flame",
    order: 4,
    status: "development-placeholder",
    applicationContexts: [
      "Thermal field observation & heat detection",
      "Low-visibility environmental inspection",
      "Field diagnostic observation",
    ],
  },
  {
    id: "cat-geological-compass",
    name: "Geological Compass",
    slug: "geological-compass",
    domain: "Geological & Strike Measurement",
    shortDescription: "Instruments for structural geology, strike, dip, and field orientation.",
    description:
      "Geological compasses and inclinometers for measuring strike, dip, and spatial orientation.",
    image: "/images/generated/categories/category-geological-compass.webp",
    heroImage: "/images/generated/categories/category-geological-compass.webp",
    icon: "Compass",
    order: 5,
    status: "development-placeholder",
    applicationContexts: [
      "Structural geology strike & dip measurements",
      "Outcrop analysis & geological mapping",
      "Field rock formation surveying",
    ],
  },
  {
    id: "cat-camping-equipment",
    name: "Camping Equipment",
    slug: "camping-equipment",
    domain: "Field Outpost & Expedition Gear",
    shortDescription: "Field outpost equipment and expedition supplies.",
    description:
      "Field deployment equipment, shelters, and durable gear for remote expeditions.",
    image: "/images/generated/categories/category-camping-equipment.webp",
    heroImage: "/images/generated/categories/category-camping-equipment.webp",
    icon: "Tent",
    order: 6,
    status: "development-placeholder",
    applicationContexts: [
      "Remote field research camps & outposts",
      "Weatherproof crew shelter in field environments",
      "Expedition setups & durability",
    ],
  },
  {
    id: "cat-weather-station",
    name: "Weather Station",
    slug: "weather-station",
    domain: "Meteorological & Environmental Monitoring",
    shortDescription: "Instruments for environmental and weather monitoring.",
    description:
      "Weather observation instruments, sensors, and stations for field environmental monitoring.",
    image: "/images/generated/categories/category-weather-station.webp",
    heroImage: "/images/generated/categories/category-weather-station.webp",
    icon: "CloudSun",
    order: 7,
    status: "development-placeholder",
    applicationContexts: [
      "Microclimate logging & environmental monitoring",
      "Field atmospheric observation",
      "Baseline meteorological data recording",
    ],
  },
  {
    id: "cat-forestry-items",
    name: "Forestry Items",
    slug: "forestry-items",
    domain: "Forestry & Canopy Measurement",
    shortDescription: "Tools for forest measurement, canopy inspection, and timber survey.",
    description:
      "Forestry measurement instruments, calipers, and inspection tools for field surveys.",
    image: "/images/generated/categories/category-forestry-items.webp",
    heroImage: "/images/generated/categories/category-forestry-items.webp",
    icon: "Trees",
    order: 8,
    status: "development-placeholder",
    applicationContexts: [
      "Tree height calculation & dendrometry",
      "Canopy density inspection & timber survey",
      "Forest boundary demarcation",
    ],
  },
];

export function getAllCategories(): ProductCategory[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return CATEGORIES.find((cat) => cat.slug.toLowerCase() === slug.toLowerCase());
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((cat) => cat.slug);
}

export function getPreviousCategory(currentCategory: ProductCategory): ProductCategory {
  const all = getAllCategories();
  const currentIndex = all.findIndex((c) => c.slug === currentCategory.slug);
  const prevIndex = (currentIndex - 1 + all.length) % all.length;
  return all[prevIndex];
}

export function getNextCategory(currentCategory: ProductCategory): ProductCategory {
  const all = getAllCategories();
  const currentIndex = all.findIndex((c) => c.slug === currentCategory.slug);
  const nextIndex = (currentIndex + 1) % all.length;
  return all[nextIndex];
}
