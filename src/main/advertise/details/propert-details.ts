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
  
  // Boolean özellikler - Temel
  furnished?: boolean;
  parking?: boolean;
  elevator?: boolean;
  security?: boolean;
  generator?: boolean;

  // Boolean özellikler - Konfor & Sistem
  airConditioning?: boolean;
  internet?: boolean;
  kitchen?: boolean;
  toilet?: boolean;
  
  // Boolean Özellikler - Ticari Özel Alanlar
  showcase?: boolean;
  warehouse?: boolean;
  loadingDock?: boolean;
  cashRegister?: boolean;

  // Boolean Özellikler - Müşteri Alanları
  outdootSeating?: boolean;
  waitingArea?: boolean;
  changingRoom?: boolean;

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
  
  // Altyapı & Enerji
  threephaseElectricity?: boolean;
  naturalGasLine?: boolean;
  waterSystem?: boolean;
  wasteWaterSystem?: boolean;
  
  // Üretim & İmalat
  craneSystem?: boolean;
  ventilationSystem?: boolean;
  airConditioning?: boolean;
  wideOpenArea?: boolean;
  machineMountingSuitable?: boolean;
  
  // Depolama & Lojistik
  loadingRamp?: boolean;
  truckEntrance?: boolean;
  forkliftTraffic?: boolean;
  rackingSystem?: boolean;
  coldStorage?: boolean;
  
  // Güvenlik & Sistem
  fireExtinguishingSystem?: boolean;
  securityCameras?: boolean;
  alarmSystem?: boolean;
  fencedArea?: boolean;
}

export interface LandDetails extends BasePropertyDetails {
  area?: number;
  zoning?: string;
  developmentStatus?: string;
  titleDeedStatus?: string;
  exchangeAllowed?: boolean;
  
  // Yeni eklenen özellikler
  landArea?: number;
  zoningStatus?: string;
  adaNo?: number;
  parcelNo?: number;
  paftaNo?: string;
  kaks?: number;
  gabari?: number;
  tapuStatus?: string;
  
  // Boolean özellikler - mevcut
  electricity?: boolean;
  water?: boolean;
  naturalGas?: boolean;
  roadAccess?: boolean;
  seaView?: boolean;
  forestView?: boolean;
  cityView?: boolean;
  southFacing?: boolean;
  
  // Altyapı - ek
  sewerage?: boolean;
  
  // Konum & Manzara - ek
  cornerLot?: boolean;
  mountainView?: boolean;
  
  // Arazi Özellikler
  flat?: boolean;
  slope?: boolean;
  fenced?: boolean;
  agricultural?: boolean;
  buildingPermit?: boolean;
  
  // Tarım & Bahçe
  vineyard?: boolean;
  orchard?: boolean;
  oliveTrees?: boolean;
  greenhouse?: boolean;
  well?: boolean;
}

export interface ServiceDetails extends BasePropertyDetails {

  // ServiceDetails'den eklenen yeni özellikler
  netArea?: number;
  grossArea?: number;
  capacity?: number;
  spaceType?: string;
  deposit?: number;
  
  // Boolean özellikler - mevcut
  furnished?: boolean;
  parking?: boolean;
  elevator?: boolean;
  security?: boolean;
  generator?: boolean;
  airConditioning?: boolean;
  kitchen?: boolean;
  restroom?: boolean;
  disabledAccess?: boolean;
  
  // Temel Altyapı
  lighting?: boolean;
  cctv?: boolean;
  internet?: boolean;
  
  // Hizmet Alanları
  reception?: boolean;
  restRoom?: boolean;
  
  // Teknik Donanım
  washingArea?: boolean;
  maintenanceArea?: boolean;
  ventilationSystem?: boolean;
  
  // Ek Hizmetler
  storage?: boolean;
  officeArea?: boolean;
  customerParking?: boolean;
}

// Union type for all property details
export type PropertyDetails = 
  | HousingDetails 
  | OfficeDetails 
  | CommercialDetails 
  | IndustrialDetails 
  | LandDetails 
  | ServiceDetails;