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
    domain: "ED Terrestrial & Survey Optics",
    shortDescription: "Precision optical instruments for field observation and survey.",
    description:
      "High-precision optical instruments engineered for demanding field surveys, tactical surveillance, and industrial inspection applications.",
    image: "/images/categories/optics.svg",
    heroImage: "/images/categories/optics-hero.svg",
    icon: "Binoculars",
    order: 1,
    status: "development-placeholder",
    applicationContexts: [
      "Terrestrial field survey & land triangulation",
      "High-resolution optical observation & specimen inspection",
      "Long-range wildlife & environmental viewing",
    ],
  },
  {
    id: "cat-gps",
    name: "GPS",
    slug: "gps",
    domain: "GNSS Positioning & Geodetic Mapping",
    shortDescription: "Rugged GNSS and handheld GPS receivers for positioning and mapping.",
    description:
      "Industrial-grade satellite positioning systems, differential GPS, and rugged handheld navigators designed for precision mapping and field navigation.",
    image: "/images/categories/gps.svg",
    heroImage: "/images/categories/gps-hero.svg",
    icon: "Navigation",
    order: 2,
    status: "development-placeholder",
    applicationContexts: [
      "Cadastral land boundary & geodetic point logging",
      "Topographical field mapping & contour survey",
      "GIS spatial data collection & field navigation",
    ],
  },
  {
    id: "cat-night-vision",
    name: "Night Vision",
    slug: "night-vision",
    domain: "Electro-Optical Low-Light Systems",
    shortDescription: "Electro-optical night vision devices for low-light observation.",
    description:
      "Advanced image-intensified night vision monoculars, binoculars, and goggles offering high resolution and clarity in extreme low-light environments.",
    image: "/images/categories/night-vision.svg",
    heroImage: "/images/categories/night-vision-hero.svg",
    icon: "Eye",
    order: 3,
    status: "development-placeholder",
    applicationContexts: [
      "Nocturnal wildlife census & behavioral studies",
      "Low-light biological reserve observation",
      "Site surveillance & night perimeter monitoring",
    ],
  },
  {
    id: "cat-thermal",
    name: "Thermal",
    slug: "thermal",
    domain: "Radiometric Thermography & Scopes",
    shortDescription: "High-resolution thermal imaging cameras and scopes.",
    description:
      "State-of-the-art radiometric thermal imaging devices, sensors, and scopes for heat detection, surveillance, and industrial diagnostic applications.",
    image: "/images/categories/thermal.svg",
    heroImage: "/images/categories/thermal-hero.svg",
    icon: "Flame",
    order: 4,
    status: "development-placeholder",
    applicationContexts: [
      "Thermal field observation & heat signature detection",
      "Adverse visibility & fog/dust site inspection",
      "Fauna habitat detection in dense underbrush",
    ],
  },
  {
    id: "cat-geological-compass",
    name: "Geological Compass",
    slug: "geological-compass",
    domain: "Stratum, Strike & Dip Inclinometers",
    shortDescription: "Precision stratum and geological compasses for surveying.",
    description:
      "Professional geological compasses and inclinometers built for precise strike, dip, trend, and plunge measurements in mineral exploration and field geology.",
    image: "/images/categories/geological-compass.svg",
    heroImage: "/images/categories/geological-compass-hero.svg",
    icon: "Compass",
    order: 5,
    status: "development-placeholder",
    applicationContexts: [
      "Structural geology strike & dip measurements",
      "Stratigraphic outcrop analysis & fault mapping",
      "Mineral exploration & rock formation surveying",
    ],
  },
  {
    id: "cat-camping-equipment",
    name: "Camping Equipment",
    slug: "camping-equipment",
    domain: "Engineered Field Expedition Gear",
    shortDescription: "Heavy-duty expedition and field deployment equipment.",
    description:
      "Engineered expedition shelters, field gear, power solutions, and tactical survival systems tailored for extended technical missions in harsh terrains.",
    image: "/images/categories/camping-equipment.svg",
    heroImage: "/images/categories/camping-equipment-hero.svg",
    icon: "Tent",
    order: 6,
    status: "development-placeholder",
    applicationContexts: [
      "Remote field research camps & backcountry outposts",
      "Weatherproof crew shelter in harsh terrains",
      "Off-grid expedition setups & pack durability",
    ],
  },
  {
    id: "cat-weather-station",
    name: "Weather Station",
    slug: "weather-station",
    domain: "Automated Meteorological Arrays",
    shortDescription: "Automated meteorological monitoring stations and sensors.",
    description:
      "Rugged microclimate and meteorological monitoring systems featuring precision anemometers, barometric sensors, hygrometers, and dataloggers.",
    image: "/images/categories/weather-station.svg",
    heroImage: "/images/categories/weather-station-hero.svg",
    icon: "CloudSun",
    order: 7,
    status: "development-placeholder",
    applicationContexts: [
      "Microclimate logging & environmental monitoring",
      "Hydrological & atmospheric research stations",
      "Continuous baseline meteorological data recording",
    ],
  },
  {
    id: "cat-forestry-items",
    name: "Forestry Items",
    slug: "forestry-items",
    domain: "Dendrometry & Timber Cruising Tools",
    shortDescription: "Dendrometry, canopy measurement, and timber cruising tools.",
    description:
      "Specialized forest inventory instruments including hypsometers, increment borers, callipers, relascopes, and boundary marking tools for resource management.",
    image: "/images/categories/forestry-items.svg",
    heroImage: "/images/categories/forestry-items-hero.svg",
    icon: "Trees",
    order: 8,
    status: "development-placeholder",
    applicationContexts: [
      "Dendrometric measurement & tree height calculation",
      "Crown density estimation & forest resource inventory",
      "Woodland boundary demarcation & timber cruising",
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
