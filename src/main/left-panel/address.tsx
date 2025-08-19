import React, { useEffect, useMemo, useState } from "react";
import {
  Card, CardContent, Typography, Accordion, AccordionSummary, AccordionDetails,
  List, ListItem, ListItemButton, TextField, Checkbox, FormControlLabel, Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BASE_URL = "http://localhost:8080/api/location";

type Province = { id: string; name: string };
type District = { id: string; name: string; provinceId: string };
type Subdistrict = { id: string; name: string; districtId: string };
type Neighborhood = { id: string; name: string; subdistrictId: string };

// Subdistrict gruplandırması için tip
type SubdistrictGroup = {
  subdistrict: Subdistrict;
  neighborhoods: Neighborhood[];
};

export default function Address() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const [cities, setCities] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  // selections are now **IDs**
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<string[]>([]);
  const [selectedNeighborhoodIds, setSelectedNeighborhoodIds] = useState<string[]>([]);

  // 1) load provinces once
  useEffect(() => {
    fetch(`${BASE_URL}/provinces`)
      .then(r => r.json())
      .then((data: Province[]) => setCities(data))
      .catch(console.error);
  }, []);

  // 2) when selected provinces change, fetch & merge districts
  useEffect(() => {
    if (selectedCityIds.length === 0) {
      setDistricts([]);
      setSubdistricts([]);
      setNeighborhoods([]);
      setSelectedDistrictIds([]);
      setSelectedNeighborhoodIds([]);
      return;
    }
    Promise.all(
      selectedCityIds.map(pid =>
        fetch(`${BASE_URL}/${pid}/districts`).then(r => r.json())
      )
    ).then((parts: District[][]) => {
      // merge unique by id
      const merged = Array.from(
        new Map(parts.flat().map(d => [d.id, d])).values()
      );
      setDistricts(merged);
      // reset downstream
      setSubdistricts([]);
      setNeighborhoods([]);
      setSelectedDistrictIds([]);
      setSelectedNeighborhoodIds([]);
    }).catch(console.error);
  }, [selectedCityIds]);

  // 3) when selected districts change, fetch & merge subdistricts
  useEffect(() => {
    if (selectedDistrictIds.length === 0) {
      setSubdistricts([]);
      setNeighborhoods([]);
      setSelectedNeighborhoodIds([]);
      return;
    }
    Promise.all(
      selectedDistrictIds.map(did =>
        fetch(`${BASE_URL}/${did}/subdistricts`).then(r => r.json())
      )
    ).then((parts: Subdistrict[][]) => {
      const merged = Array.from(
        new Map(parts.flat().map(s => [s.id, s])).values()
      );
      setSubdistricts(merged);
      
      // Aynı zamanda tüm neighborhood'ları da çek
      return Promise.all(
        merged.map(subdistrict =>
          fetch(`${BASE_URL}/${subdistrict.id}/neighborhoods`).then(r => r.json())
        )
      );
    }).then((neighborhoodParts: Neighborhood[][]) => {
      const mergedNeighborhoods = Array.from(
        new Map(neighborhoodParts.flat().map(n => [n.id, n])).values()
      );
      setNeighborhoods(mergedNeighborhoods);
      setSelectedNeighborhoodIds([]);
    }).catch(console.error);
  }, [selectedDistrictIds]);

  // Subdistrict gruplandırma fonksiyonu
  const groupNeighborhoodsBySubdistrict = (subdistricts: Subdistrict[], neighborhoods: Neighborhood[]): SubdistrictGroup[] => {
    return subdistricts.map(subdistrict => ({
      subdistrict,
      neighborhoods: neighborhoods
        .filter(n => n.subdistrictId === subdistrict.id)
        .sort((a, b) => a.name.localeCompare(b.name, 'tr'))
    }))
    .filter(group => group.neighborhoods.length > 0)
    .sort((a, b) => a.subdistrict.name.localeCompare(b.subdistrict.name, 'tr'));
  };

  // filters
  const filteredCities = useMemo(
    () => cities,
    [cities]
  );
  const filteredDistricts = useMemo(
    () => districts,
    [districts]
  );
  
  const subdistrictGroups = useMemo(() => {
    return groupNeighborhoodsBySubdistrict(subdistricts, neighborhoods);
  }, [subdistricts, neighborhoods]);

  // toggles (IDs)
  const toggle = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, id: string) =>
    setArr(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const toggleGroupSelection = (group: SubdistrictGroup) => {
    const groupNeighborhoodIds = group.neighborhoods.map(n => n.id);
    const allSelected = groupNeighborhoodIds.every(id => selectedNeighborhoodIds.includes(id));
    
    if (allSelected) {
      // Grup seçiliyse, grup mahallelerini kaldır
      setSelectedNeighborhoodIds(prev => 
        prev.filter(id => !groupNeighborhoodIds.includes(id))
      );
    } else {
      // Grup seçili değilse, grup mahallelerini ekle
      setSelectedNeighborhoodIds(prev => 
        [...new Set([...prev, ...groupNeighborhoodIds])]
      );
    }
  };

  const handleAccordionChange = (panel: string) => setExpanded(prev => (prev === panel ? false : panel));

  // Seçili il/ilçe isimlerini getiren fonksiyonlar
  const getSelectedCityNames = () => {
    if (selectedCityIds.length === 0) return "";
    const names = cities.filter(c => selectedCityIds.includes(c.id)).map(c => c.name);
    return names.length > 2 ? `${names.slice(0, 2).join(", ")} +${names.length - 2}` : names.join(", ");
  };

  const getSelectedDistrictNames = () => {
    if (selectedDistrictIds.length === 0) return "";
    const names = districts.filter(d => selectedDistrictIds.includes(d.id)).map(d => d.name);
    return names.length > 2 ? `${names.slice(0, 2).join(", ")} +${names.length - 2}` : names.join(", ");
  };

  const getSelectedNeighborhoodCount = () => {
    return selectedNeighborhoodIds.length;
  };

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontSize: '16px' }}>
          Adres
        </Typography>

        {/* Provinces */}
        <Accordion expanded={expanded === "panel1"} onChange={() => handleAccordionChange("panel1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}>
            <div>
              <Typography sx={{ fontSize: '14px' }}>İl Seçin</Typography>
              {selectedCityIds.length > 0 && (
                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                  {getSelectedCityNames()}
                </Typography>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
              {filteredCities.map((city) => (
                <ListItem disablePadding key={city.id} sx={{ p: 0 }}>
                  <ListItemButton sx={{ p: 0, display: 'flex', alignItems: 'center' }} onClick={() => toggle(selectedCityIds, setSelectedCityIds, city.id)}>
                    <Checkbox
                      checked={selectedCityIds.includes(city.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(selectedCityIds, setSelectedCityIds, city.id);
                      }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: '13px', m: 0 }}>{city.name}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Districts */}
        <Accordion expanded={expanded === "panel2"} onChange={() => handleAccordionChange("panel2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}>
            <div>
              <Typography sx={{ fontSize: '14px' }}>İlçe Seçin</Typography>
              {selectedDistrictIds.length > 0 && (
                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                  {getSelectedDistrictNames()}
                </Typography>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
              {filteredDistricts.map((d) => (
                <ListItem disablePadding key={d.id} sx={{ p: 0 }}>
                  <ListItemButton sx={{ p: 0, display: 'flex', alignItems: 'center' }} onClick={() => toggle(selectedDistrictIds, setSelectedDistrictIds, d.id)}>
                    <Checkbox
                      checked={selectedDistrictIds.includes(d.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(selectedDistrictIds, setSelectedDistrictIds, d.id);
                      }}
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                    />
                    <Typography sx={{ fontSize: '13px', m: 0 }}>{d.name}</Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Neighborhoods with Groups */}
        <Accordion expanded={expanded === "panel3"} onChange={() => handleAccordionChange("panel3")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: '18px' }} />}>
            <div>
              <Typography sx={{ fontSize: '14px' }}>Mahalle Seçin</Typography>
              {getSelectedNeighborhoodCount() > 0 && (
                <Typography sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 'bold' }}>
                  {getSelectedNeighborhoodCount()} mahalle seçili
                </Typography>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List sx={{ maxHeight: 300, overflowY: 'auto', p: 0 }}>
              {subdistrictGroups.map((group) => {
                const groupNeighborhoodIds = group.neighborhoods.map(n => n.id);
                const allSelected = groupNeighborhoodIds.every(id => selectedNeighborhoodIds.includes(id));
                const someSelected = groupNeighborhoodIds.some(id => selectedNeighborhoodIds.includes(id));
                
                return (
                  <div key={group.subdistrict.id}>
                    {/* Subdistrict Başlığı */}
                    <ListItem disablePadding sx={{ p: 0, backgroundColor: '#f5f5f5' }}>
                      <ListItemButton 
                        sx={{ p: 0, display: 'flex', alignItems: 'center' }} 
                        onClick={() => toggleGroup(group.subdistrict.id)}
                      >
                        <Checkbox
                          checked={allSelected}
                          indeterminate={someSelected && !allSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleGroupSelection(group);
                          }}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: 0, mr: 1 }}
                        />
                        <Typography sx={{ 
                          fontSize: '13px', 
                          fontWeight: 'bold',
                          m: 0,
                          flex: 1
                        }}>
                          {group.subdistrict.name} ({group.neighborhoods.length})
                        </Typography>
                        {expandedGroups[group.subdistrict.id] ? 
                          <ExpandLessIcon sx={{ fontSize: '16px', ml: 'auto' }} /> : 
                          <ExpandMoreIcon sx={{ fontSize: '16px', ml: 'auto' }} />
                        }
                      </ListItemButton>
                    </ListItem>
                    
                    {/* Grup Mahalleleri */}
                    <Collapse in={expandedGroups[group.subdistrict.id]} timeout="auto" unmountOnExit>
                      <List sx={{ pl: 2, py: 0 }}>
                        {group.neighborhoods.map((neighborhood) => (
                          <ListItem disablePadding key={neighborhood.id} sx={{ p: 0 }}>
                            <ListItemButton 
                              sx={{ p: 0, display: 'flex', alignItems: 'center' }} 
                              onClick={() => toggle(selectedNeighborhoodIds, setSelectedNeighborhoodIds, neighborhood.id)}
                            >
                              <Checkbox
                                checked={selectedNeighborhoodIds.includes(neighborhood.id)}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggle(selectedNeighborhoodIds, setSelectedNeighborhoodIds, neighborhood.id);
                                }}
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, m: 0, mr: 1 }}
                              />
                              <Typography sx={{ fontSize: '12px', m: 0 }}>{neighborhood.name}</Typography>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </div>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
