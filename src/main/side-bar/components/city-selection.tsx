import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export interface City {
  id: number;
  name: string;
}

const CityComponent = () => {
  
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  const handleCityChange = async (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      const city = cities.find(city => city.name === value);
      if (city) {
        setSelectedCity(city);
          await axios.post('http://localhost:8080/selected_city', {
            id: city.id,
            name: city.name
          });
      }
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch('http://localhost:8080/cities');
      const data = await response.json();
      setCities(data);
    };
    fetchCities();
  }, []);

  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="city-select-label"></InputLabel>
    <Autocomplete
      disablePortal
      id="city-autocomplete"
      options={cities.map(city => city.name)}
      onChange={handleCityChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="İl Seçiniz"
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

export default CityComponent;
