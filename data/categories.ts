import { ProductCategory } from "@/types/category";

/**
 * 8 Primary equipment categories for Udyog Engineers.
 * Centralized source of truth for catalogue hierarchy.
 *
 * PHASE 6B.3:
 * - Forestry Items renamed to Camera Trap (/categories/camera-trap)
 * - Geological Compass broadened to Geological Equipment (/categories/geological-equipment)
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
      "Satellite navigation receivers, handheld GPS, wrist-mounted navigators, and rugged GPS wearables for field positioning, expedition tracking, and boundary surveys.",
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
        id: "subcat-wrist-mounted-gps",
        name: "Wrist-Mounted GPS",
        slug: "wrist-mounted-gps",
        description: "Hands-free tactical and ballistic wrist-mounted GPS navigators built to military standards.",
        order: 2,
      },
      {
        id: "subcat-gps-smartwatches-wearables",
        name: "GPS Smartwatches & Wearables",
        slug: "gps-smartwatches-wearables",
        description: "Rugged multisport GPS smartwatches, expedition navigators, and tactical wrist-worn devices engineered for field operations and backcountry exploration.",
        order: 3,
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
    shortDescription: "Equipment for low-light observation, rangefinding, and nocturnal field work.",
    description:
      "Night observation devices, digital night vision monoculars, binocular rangefinders, and goggles for nocturnal field operations.",
    image: "/images/generated/categories/category-night-vision.webp",
    heroImage: "/images/generated/categories/category-night-vision.webp",
    icon: "Eye",
    order: 3,
    status: "verified",
    subcategories: [
      {
        id: "subcat-digital-night-vision",
        name: "Digital Night Vision",
        slug: "digital-night-vision",
        description: "Digital night vision monoculars, rangefinder binoculars, and head-mounted observation systems.",
        order: 1,
      },
    ],
    applicationContexts: [
      "Nocturnal field observation & wildlife monitoring",
      "Low-light reserve & perimeter inspection",
      "Night expedition reconnaissance",
    ],
  },
  {
    id: "cat-thermal",
    name: "Thermal",
    slug: "thermal",
    domain: "Thermal Observation & Acoustic Imaging",
    shortDescription: "Equipment for thermal observation, acoustic leak detection, and fire inspection.",
    description:
      "Thermal imaging instruments, acoustic cameras for sound visualization, and rugged firefighting cameras for industrial and emergency field operations.",
    image: "/images/generated/categories/category-thermal.webp",
    heroImage: "/images/generated/categories/category-thermal.webp",
    icon: "Flame",
    order: 4,
    status: "verified",
    subcategories: [
      {
        id: "subcat-handheld-thermal",
        name: "Handheld Thermal Imaging",
        slug: "handheld-thermal",
        description: "Rugged standalone thermal imagers with infrared sensors for heat signature inspection and field diagnostics.",
        order: 1,
      },
      {
        id: "subcat-firefighting-thermal",
        name: "Firefighting Thermal Imaging",
        slug: "firefighting-thermal",
        description: "High-temperature flame-retardant thermal cameras engineered specifically for firefighting and emergency rescue.",
        order: 2,
      },
      {
        id: "subcat-acoustic-imaging",
        name: "Acoustic Imaging",
        slug: "acoustic-imaging",
        description: "High-precision acoustic imaging cameras with MEMS microphone arrays for gas leak and partial discharge detection.",
        order: 3,
      },
      {
        id: "subcat-smartphone-thermal",
        name: "Smartphone Thermal Cameras",
        slug: "smartphone-thermal",
        description: "High-resolution plug-and-play mobile thermal imaging sensor cameras for field diagnostic analysis.",
        order: 4,
      },
    ],
    applicationContexts: [
      "Thermal field observation & heat loss detection",
      "Acoustic gas leak & mechanical fault diagnosis",
      "Firefighting thermal vision & search operations",
    ],
  },
  {
    id: "cat-geological-equipment",
    name: "Geological Equipment",
    slug: "geological-equipment",
    domain: "Structural Geology & Field Mineralogy",
    shortDescription: "Compasses, pocket transits, clinometers, forged rock picks, and geological field accessories.",
    description:
      "Professional geological transits, strike and dip compasses, optical clinometers, forged solid-steel rock picks, and essential field observation tools.",
    image: "/images/generated/categories/category-geological-equipment.webp",
    heroImage: "/images/generated/categories/category-geological-equipment.webp",
    icon: "Compass",
    order: 5,
    status: "verified",
    subcategories: [
      {
        id: "subcat-compasses-transits",
        name: "Compasses & Pocket Transits",
        slug: "compasses-pocket-transits",
        description: "Precision Brunton and Suunto pocket transits and sighting compasses for strike, dip, and azimuth measurement.",
        order: 1,
      },
      {
        id: "subcat-clinometers",
        name: "Clinometers",
        slug: "clinometers",
        description: "Optical hand clinometers for measuring heights, vertical angles, and slope gradients with high precision.",
        order: 2,
      },
      {
        id: "subcat-geological-hammers",
        name: "Geological Hammers",
        slug: "geological-hammers",
        description: "Solid forged American steel rock picks, chisel-edge masonry hammers, and field geological striking tools.",
        order: 3,
      },
      {
        id: "subcat-geological-field-accessories",
        name: "Geological Field Accessories",
        slug: "geological-field-accessories",
        description: "Geological field scribes, high-magnification triplet hand lenses, and all-weather waterproof geological notebooks.",
        order: 4,
      },
    ],
    applicationContexts: [
      "Structural geology strike & dip measurements",
      "Rock outcrop sampling & mineralogical inspection",
      "Field topographical mapping & geological traverse",
    ],
  },
  {
    id: "cat-camping-equipment",
    name: "Camping Equipment",
    slug: "camping-equipment",
    domain: "Field Outpost & Expedition Gear",
    shortDescription: "Field outpost equipment, all-weather tents, shelters, and durable expedition supplies.",
    description:
      "Field deployment equipment, heavy-duty crew tents, shelters, compact cooking stoves, portable power lighting, and technical expedition rucksacks.",
    image: "/images/generated/categories/category-camping-equipment.webp",
    heroImage: "/images/generated/categories/category-camping-equipment.webp",
    icon: "Tent",
    order: 6,
    status: "verified",
    subcategories: [
      {
        id: "subcat-camping-tents",
        name: "Tents",
        slug: "tents",
        description: "Weather-resistant 4-person, 6-person, adventure, vehicle-mount, and privacy outpost tents.",
        order: 1,
      },
      {
        id: "subcat-camping-shelters",
        name: "Shelters",
        slug: "shelters",
        description: "Multipurpose waterproof tarps, hexagonal weather shelters, and large expedition basecamp living shelters.",
        order: 2,
      },
      {
        id: "subcat-camping-sleeping",
        name: "Sleeping & Bedding",
        slug: "sleeping",
        description: "Cold-weather compact expedition sleeping bags and insulation gear for field camps.",
        order: 3,
      },
      {
        id: "subcat-camping-furniture",
        name: "Furniture & Outpost Gear",
        slug: "furniture",
        description: "Reinforced foldable camping chairs, aluminum roll-up field tables, and high-density ice cooler boxes.",
        order: 4,
      },
      {
        id: "subcat-camping-cooking",
        name: "Field Cooking & Stoves",
        slug: "cooking",
        description: "Compact stainless steel backpacking stoves and portable windproof butane camp burners.",
        order: 5,
      },
      {
        id: "subcat-camping-lighting",
        name: "Field Lighting",
        slug: "lighting",
        description: "High-output LED headlamps, long-throw rechargeable searchlights, and anodized aluminum torches.",
        order: 6,
      },
      {
        id: "subcat-camping-communication",
        name: "Field Communication",
        slug: "communication",
        description: "Licence-free two-way walkie-talkies for localized team communication in remote terrain.",
        order: 7,
      },
      {
        id: "subcat-camping-hydration",
        name: "Hydration & Water",
        slug: "hydration",
        description: "Integrated micro-filtration water purifier bottles and double-wall vacuum insulated hiking flasks.",
        order: 8,
      },
      {
        id: "subcat-camping-rucksacks",
        name: "Expedition Rucksacks",
        slug: "rucksacks",
        description: "Technical trekking and field backpacks across Under 50L, 50L, 60L, and 70L internal frame capacities.",
        order: 9,
      },
    ],
    applicationContexts: [
      "Remote field research camps & base outposts",
      "Weatherproof crew shelter in remote environments",
      "Multi-day survey and geological expedition logistics",
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
    subcategories: [
      {
        id: "subcat-weather-monitoring",
        name: "Environmental Monitoring",
        slug: "environmental-monitoring",
        description: "Instruments for atmospheric monitoring, wind speed, precipitation, and microclimate logging.",
        order: 1,
      },
    ],
    applicationContexts: [
      "Microclimate logging & environmental monitoring",
      "Field atmospheric observation",
      "Baseline meteorological data recording",
    ],
  },
  {
    id: "cat-camera-trap",
    name: "Camera Trap",
    slug: "camera-trap",
    domain: "Trail Cameras & Wildlife Monitoring",
    shortDescription: "Trail cameras, 4K wildlife camera traps, and covert surveillance systems.",
    description:
      "Field camera traps, high-resolution 4K trail cameras, white-flash color night imaging, and cellular observation units for wildlife survey and reserve monitoring.",
    image: "/images/generated/categories/category-camera-trap.webp",
    heroImage: "/images/generated/categories/category-camera-trap.webp",
    icon: "Camera",
    order: 8,
    status: "verified",
    subcategories: [
      {
        id: "subcat-trail-cameras",
        name: "Trail Cameras",
        slug: "trail-cameras",
        description: "4K and high-definition non-cellular camera traps with no-glow infrared LEDs and white-flash color night photography.",
        order: 1,
      },
      {
        id: "subcat-cellular-camera-traps",
        name: "Cellular Trail Cameras",
        slug: "cellular-trail-cameras",
        description: "Cellular-connected remote trail cameras transmitting automated wildlife imagery and status alerts over mobile networks.",
        order: 2,
      },
    ],
    applicationContexts: [
      "Wildlife biodiversity survey & species census",
      "Covert reserve perimeter surveillance & anti-poaching monitoring",
      "Remote habitat ecological research & nocturnal behavior capture",
    ],
  },
];

/** Slug alias map for backwards compatibility and permanent redirects */
const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  "forestry-items": "camera-trap",
  "geological-compass": "geological-equipment",
};

export function getAllCategories(): ProductCategory[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  const normalized = slug.toLowerCase();
  const canonicalSlug = CATEGORY_SLUG_ALIASES[normalized] || normalized;
  return CATEGORIES.find((cat) => cat.slug.toLowerCase() === canonicalSlug);
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
