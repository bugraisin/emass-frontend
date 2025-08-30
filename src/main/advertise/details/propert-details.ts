// types/PropertyDetails.ts

export interface BasePropertyDetails {
  subtype: string;
}

export interface HousingDetails extends BasePropertyDetails {
  // Temel bilgiler
  roomCount?: string;
  grossArea?: number;
  netArea?: number;
  buildingAge?: string;
  floorNo?: number;
  totalFloors?: number;
  heatingType?: string;
  bathroomCount?: number;
  titleDeedStatus?: string;
  facadeDirection?: string;
  siteName?: string;
  siteFee?: number;
  deposit?: number;
  usageStatus?: string;

  // Boolean özellikler - Temel
  furnished?: boolean;
  balcony?: boolean;
  terrace?: boolean;
  garden?: boolean;
  withinSite?: boolean;

  // Boolean özellikler - Otopark
  openPark?: boolean;
  closedPark?: boolean;
  garagePark?: boolean;

  // Boolean özellikler - Bina & Güvenlik
  elevator?: boolean;
  security?: boolean;
  concierge?: boolean;
  generator?: boolean;

  // Boolean özellikler - Konfor & Isıtma
  airConditioning?: boolean;
  floorHeating?: boolean;
  fireplace?: boolean;

  // Boolean özellikler - Mutfak & İç Mekan
  builtinKitchen?: boolean;
  separateKitchen?: boolean;
  americanKitchen?: boolean;
  laundryRoom?: boolean;

  // Boolean özellikler - Site İmkanları
  pool?: boolean;
  gym?: boolean;
  childrenPlayground?: boolean;
  sportsArea?: boolean;
}

export interface OfficeDetails extends BasePropertyDetails {
  // Temel bilgiler
  netArea?: number;
  buildingAge?: string;
  roomCount?: number;
  floorNo?: number;
  floorCount?: number;
  heatingType?: string;
  siteFee?: number;
  deposit?: number;
  buildingType?: string;

  // Boolean özellikler - Temel
  furnished?: boolean;
  parking?: boolean;
  elevator?: boolean;
  security?: boolean;
  generator?: boolean;

  // Boolean özellikler - Ofis Konfor
  airConditioning?: boolean;
  internet?: boolean;
  kitchen?: boolean;
  fireSystem?: boolean;

  // Boolean özellikler - Çalışma Alanları
  reception?: boolean;
  waitingArea?: boolean;
  archive?: boolean;
  library?: boolean;

  // Boolean özellikler - Teknik Altyapı
  serverRoom?: boolean;
  accessControl?: boolean;
  fiberInternet?: boolean;
  soundproof?: boolean;
}

export interface CommercialDetails extends BasePropertyDetails {
  netArea?: number;
  grossArea?: number;
  buildingAge?: string;
  floorNo?: number;
  totalFloors?: number;
  heatingType?: string;
  siteFee?: number;
  deposit?: number;
  ceilingHeight?: number;
  
  // Boolean özellikler
  furnished?: boolean;
  parking?: boolean;
  elevator?: boolean;
  security?: boolean;
  generator?: boolean;
  airConditioning?: boolean;
  storageArea?: boolean;
  showcase?: boolean;
  cornerLocation?: boolean;
  accessibleEntrance?: boolean;
}

export interface IndustrialDetails extends BasePropertyDetails {
  netArea?: number;
  grossArea?: number;
  buildingAge?: string;
  ceilingHeight?: number;
  loadCapacity?: number;
  craneCapacity?: number;
  powerCapacity?: number;
  
  // Boolean özellikler
  parking?: boolean;
  security?: boolean;
  generator?: boolean;
  compressedAir?: boolean;
  steamLine?: boolean;
  railwayAccess?: boolean;
  dockAccess?: boolean;
  officeArea?: boolean;
  changeRoom?: boolean;
}

export interface LandDetails extends BasePropertyDetails {
  area?: number;
  zoning?: string;
  developmentStatus?: string;
  titleDeedStatus?: string;
  exchangeAllowed?: boolean;
  
  // Boolean özellikler
  electricity?: boolean;
  water?: boolean;
  naturalGas?: boolean;
  roadAccess?: boolean;
  seaView?: boolean;
  forestView?: boolean;
  cityView?: boolean;
  southFacing?: boolean;
}

export interface ServiceDetails extends BasePropertyDetails {
  netArea?: number;
  roomCount?: number;
  buildingAge?: string;
  floorNo?: number;
  capacity?: number;
  
  // Boolean özellikler
  furnished?: boolean;
  parking?: boolean;
  elevator?: boolean;
  security?: boolean;
  generator?: boolean;
  airConditioning?: boolean;
  kitchen?: boolean;
  restroom?: boolean;
  disabledAccess?: boolean;
}

// Union type for all property details
export type PropertyDetails = 
  | HousingDetails 
  | OfficeDetails 
  | CommercialDetails 
  | IndustrialDetails 
  | LandDetails 
  | ServiceDetails;