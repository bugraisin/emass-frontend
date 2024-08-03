import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export interface District {
  id: number;
  name: string;
  province: string
}

const DistrictSelection = () => {
  
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  
  const handleDistrictChange = async (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      const district = districts.find(district => district.name === value);
      if (district) {
        setSelectedDistrict(district);
        await axios.post('http://localhost:8080/selected_district', {
          id: district.id,
          name: district.name,
          province: district.province
        });
      }
    }
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch('http://localhost:8080/districts');
      const data = await response.json();
      setDistricts(data);
    };
    fetchDistricts();
  });

  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="district-select-label"></InputLabel>
    <Autocomplete
      disablePortal
      id="district-autocomplete"
      options={districts.map(districts => districts.name)}
      onChange={handleDistrictChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="İlçe Seçiniz"
          className="custom-select"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  </FormControl>

  );
};

export default DistrictSelection;