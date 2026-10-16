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
    status: "verified",
    subcategories: [
      {
        id: "subcat-binoculars",
        name: "Binoculars",
        slug: "binoculars",
        description: "High-definition terrestrial field binoculars for wildlife, survey, and long-range observation.",
        order: 1,
      },
      {
        id: "subcat-laser-rangefinders",
        name: "Laser Rangefinders",
        slug: "laser-rangefinders",
        description: "Precision laser rangefinders and forestry hypsometers for distance, elevation, and canopy angle survey.",
        order: 2,
      },
      {
        id: "subcat-spotting-scopes",
        name: "Field / Spotting Scopes",
        slug: "spotting-scopes",
        description: "High-magnification terrestrial spotting scopes with ED glass systems for distance reconnaissance.",
        order: 3,
      },
    ],
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
    shortDescription: "Positioning, mapping equipment, and rugged GPS wearables for geospatial applications.",
    description:
      "Satellite navigation receivers, handheld GPS, and rugged multisport GPS smartwatches for field positioning, expedition tracking, and mapping.",
    image: "/images/generated/categories/category-gps.webp",
    heroImage: "/images/generated/categories/category-gps.webp",
    icon: "Navigation",
    order: 2,
    status: "verified",
    subcategories: [
      {
        id: "subcat-handheld-gps",
        name: "Handheld GPS",
        slug: "handheld-gps",
        description: "Rugged multi-band GNSS handheld receivers, floating navigators, and touchscreen mapping units.",
        order: 1,
      },
      {
        id: "subcat-gps-smartwatches-wearables",
        name: "GPS Smartwatches & Wearables",
        slug: "gps-smartwatches-wearables",
        description: "Rugged multisport GPS smartwatches, expedition navigators, and tactical wrist-worn devices engineered for field operations and backcountry exploration.",
        order: 2,
      },
    ],
    applicationContexts: [
      "Field boundary & waypoint logging",
      "Topographical field mapping & path survey",
      "GIS spatial data collection & field navigation",
      "Expedition navigation & outdoor trekking",
      "Tactical field operations & dual-grid positioning",
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
    status: "verified",
    subcategories: [
      {
        id: "subcat-handheld-thermal",
        name: "Handheld Thermal Cameras",
        slug: "handheld-thermal",
        description: "Rugged standalone thermal imagers with integrated high-output illumination for field search.",
        order: 1,
      },
      {
        id: "subcat-smartphone-thermal",
        name: "Smartphone Thermal Cameras",
        slug: "smartphone-thermal",
        description: "High-resolution plug-and-play mobile thermal imaging sensor cameras for field diagnostic analysis.",
        order: 2,
      },
      {
        id: "subcat-fire-emergency-thermal",
        name: "Fire & Emergency Thermal",
        slug: "fire-emergency-thermal",
        description: "Professional high-heat thermal imaging equipment designed specifically for firefighting and emergency services.",
        order: 3,
      },
    ],
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
