import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export interface City {
  id: number;
  name: string;
}

const CityComponent = () => {
  
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  const handleCityChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      setSelectedCity(value);
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get<City[]>('http://localhost:8080/cities');
        setCities(response.data);
        console.log("Çekilen şehir listesi:", response.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchCities();
  }, []);


  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="city-select-label"></InputLabel>
    <div>
    </div>
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
