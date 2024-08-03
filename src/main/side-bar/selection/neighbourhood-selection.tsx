import { Autocomplete, FormControl, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DistrictSelectionProps, Neighbourhood, NeighbourhoodSelectionProps } from "../components/location-components";
import axios from "axios";

const NeighbourhoodSelectionComponent = (props: NeighbourhoodSelectionProps) => {
  
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<Neighbourhood | null>(null);
  const [neighbourhoods, setNeighbourhoods] = useState<Neighbourhood[]>([]);
  
  const handleDistrictChange = async (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value !== null) {
      const neighbourhood = neighbourhoods.find(neighbourhood => neighbourhood.name === value);
      if (neighbourhood) {
        setSelectedNeighbourhood(neighbourhood);
        await axios.post('http://localhost:8080/selected-neighbourhood', {
          id: neighbourhood.id,
          name: neighbourhood.name,
          district: neighbourhood.district
        });
      }
    }
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      const response = await fetch('http://localhost:8080/neighbourhoods');
      const data = await response.json();
      setNeighbourhoods(data);
    };
    fetchDistricts();
  }, [props.selectedDistrict]);


  return (
    <FormControl variant="outlined" fullWidth>
    <InputLabel id="neighbourhood-select-label"></InputLabel>
    <Autocomplete
      disablePortal
      id="neighbourhood-autocomplete"
      options={neighbourhoods.map(obj => obj.name)}
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