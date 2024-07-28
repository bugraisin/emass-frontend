import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import { useState } from "react";

const NeighbourhoodSelectionComponent = () => {
  
  const [selectedDistrict, setselectedDistrict] = useState<string>('');
  
  const handleCityChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      setselectedDistrict(value);
    }
  };

  const options = [
    { value: 'adana', label: 'Adana' },
  { value: 'adıyaman', label: 'Adıyaman' },
  { value: 'afyonkarahisar', label: 'Afyonkarahisar' },
  { value: 'ağrı', label: 'Ağrı' },
  { value: 'amasya', label: 'Amasya' },
  { value: 'ankara', label: 'Ankara' },
  { value: 'antalya', label: 'Antalya' },
  { value: 'artvin', label: 'Artvin' },
  { value: 'aydin', label: 'Aydın' },
  { value: 'balıkesir', label: 'Balıkesir' },
  { value: 'bartın', label: 'Bartın' },
  { value: 'batman', label: 'Batman' },
  { value: 'bayburt', label: 'Bayburt' },
  { value: 'bilecik', label: 'Bilecik' },
  { value: 'bingöl', label: 'Bingöl' },
  { value: 'bitlis', label: 'Bitlis' },
  { value: 'bolu', label: 'Bolu' },
  { value: 'burdur', label: 'Burdur' },
  { value: 'bursa', label: 'Bursa' },
  { value: 'çanakkale', label: 'Çanakkale' },
  { value: 'çankırı', label: 'Çankırı' },
  { value: 'çorum', label: 'Çorum' },
  { value: 'denizli', label: 'Denizli' },
  { value: 'diyarbakır', label: 'Diyarbakır' },
  { value: 'düzce', label: 'Düzce' },
  { value: 'edine', label: 'Edirne' },
  { value: 'elbistan', label: 'Elazığ' },
  { value: 'erzincan', label: 'Erzincan' },
  { value: 'erzurum', label: 'Erzurum' },
  { value: 'eskişehir', label: 'Eskişehir' },
  { value: 'gaziantep', label: 'Gaziantep' },
  { value: 'giresun', label: 'Giresun' },
  { value: 'gümüşhane', label: 'Gümüşhane' },
  { value: 'hakkari', label: 'Hakkari' },
  { value: 'hatay', label: 'Hatay' },
  { value: 'ısparta', label: 'Isparta' },
  { value: 'istanbul', label: 'İstanbul' },
  { value: 'izmir', label: 'İzmir' },
  { value: 'kahramanmaraş', label: 'Kahramanmaraş' },
  { value: 'karabük', label: 'Karabük' },
  { value: 'karaman', label: 'Karaman' },
  { value: 'kars', label: 'Kars' },
  { value: 'kastamonu', label: 'Kastamonu' },
  { value: 'kayseri', label: 'Kayseri' },
  { value: 'kırıkkale', label: 'Kırıkkale' },
  { value: 'kırklareli', label: 'Kırklareli' },
  { value: 'kırşehir', label: 'Kırşehir' },
  { value: 'kilis', label: 'Kilis' },
  { value: 'kocaeli', label: 'Kocaeli' },
  { value: 'konya', label: 'Konya' },
  { value: 'kütahya', label: 'Kütahya' },
  { value: 'malatya', label: 'Malatya' },
  { value: 'manisa', label: 'Manisa' },
  { value: 'mersin', label: 'Mersin' },
  { value: 'muğla', label: 'Muğla' },
  { value: 'muş', label: 'Muş' },
  { value: 'nevşehir', label: 'Nevşehir' },
  { value: 'niğde', label: 'Niğde' },
  { value: 'ordu', label: 'Ordu' },
  { value: 'osmaniye', label: 'Osmaniye' },
  { value: 'rize', label: 'Rize' },
  { value: 'sakarya', label: 'Sakarya' },
  { value: 'samsun', label: 'Samsun' },
  { value: 'siirt', label: 'Siirt' },
  { value: 'sivas', label: 'Sivas' },
  { value: 'şanlıurfa', label: 'Şanlıurfa' },
  { value: 'şırnak', label: 'Şırnak' },
  { value: 'tekirdağ', label: 'Tekirdağ' },
  { value: 'tokat', label: 'Tokat' },
  { value: 'trabzon', label: 'Trabzon' },
  { value: 'tunceli', label: 'Tunceli' },
  { value: 'şile', label: 'Şile' },
  { value: 'uzunköprü', label: 'Uzunköprü' },
  { value: 'yalova', label: 'Yalova' },
  { value: 'yozgat', label: 'Yozgat' },
  { value: 'zonguldak', label: 'Zonguldak' }
  ]

  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="city-select-label"></InputLabel>
    <Autocomplete
      disablePortal
      id="city-autocomplete"
      options={options.map(option => option.label)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Semt / Mahalle Seçiniz"
          className="custom-select"
          InputLabelProps={{
            shrink: true
          }}
        />
      )}
    />
  </FormControl>

  );
};

export default NeighbourhoodSelectionComponent;