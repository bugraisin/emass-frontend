import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { City, CityComponentProps } from "../components/location-components";

const CityComponent = (props: CityComponentProps) => {
  
  const [cities, setCities] = useState<City[]>([]);

  const handleCityChange = async (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      const city = cities.find(city => city.name === value);
      if (city) {
          props.onCityChange(city);
          await axios.post('http://localhost:8080/selected-city', {
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
