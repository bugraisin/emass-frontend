export interface City {
  id: number;
  name: string;
}

export interface CityComponentProps {
  onCityChange: (city: City | null) => void;
}

export interface District {
  id: number;
  name: string;
  province: string
}

export interface DistrictSelectionProps {
  onDistrictChange: (district: District | null) => void;
  selectedCity: City | null;
}

export interface Neighbourhood {
  id: number;
  name: string;
  district: string
}

export interface NeighbourhoodSelectionProps {
  selectedDistrict: District | null;
}
