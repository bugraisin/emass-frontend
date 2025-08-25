import React, { useEffect, useMemo, useState } from "react";
import {
  Card, CardContent, Typography, List, ListItem, ListItemButton, 
  TextField, Checkbox, FormControlLabel, Collapse, Box, IconButton, 
  Popover, Paper, Chip, Radio, RadioGroup
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverType, setPopoverType] = useState<'city' | 'district' | 'neighborhood' | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const [cities, setCities] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);

  // selections are now **IDs**
  const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);
  const [selectedDistrictIds, setSelectedDistrictIds] = useState<string[]>([]);
  const [selectedNeighborhoodIds, setSelectedNeighborhoodIds] = useState<string[]>([]);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, type: 'city' | 'district' | 'neighborhood') => {
    setAnchorEl(event.currentTarget);
    setPopoverType(type);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverType(null);
    setSearchTerm('');
  };

  // Tek il seçimi için özel fonksiyon
  const selectSingleCity = (cityId: string) => {
    setSelectedCityIds([cityId]);
    handlePopoverClose();
  };

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

  const handleAccordionChange = (panel: string) => {
    // Bu fonksiyon artık kullanılmıyor ama başka yerlerde referans olabilir
  };

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

  // Arama için filtreleme fonksiyonları
  const filteredCities = useMemo(() => {
    if (!searchTerm) return cities;
    return cities.filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const filteredDistricts = useMemo(() => {
    if (!searchTerm) return districts;
    return districts.filter(district => 
      district.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [districts, searchTerm]);

  const filteredSubdistrictGroups = useMemo(() => {
    if (!searchTerm) return subdistrictGroups;
    return subdistrictGroups.map(group => ({
      ...group,
      neighborhoods: group.neighborhoods.filter(neighborhood =>
        neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.subdistrict.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.neighborhoods.length > 0);
  }, [subdistrictGroups, searchTerm]);

  const open = Boolean(anchorEl);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography variant="h6" gutterBottom sx={{ fontSize: "16px", mb: 1, fontWeight: 600 }}>
          Adres
        </Typography>

        {/* İl Seçimi */}
        <Box 
          onClick={(e) => handlePopoverOpen(e, 'city')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 10px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '6px',
            minHeight: '36px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "13px" }}>
              İl Seçin
            </Typography>
            {selectedCityIds.length > 0 && (
              <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                {getSelectedCityNames()}
              </Typography>
            )}
          </Box>
          <ChevronRightIcon sx={{ fontSize: "16px" }} />
        </Box>

        {/* İlçe Seçimi */}
        <Box 
          onClick={(e) => selectedCityIds.length > 0 && handlePopoverOpen(e, 'district')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 10px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '6px',
            cursor: selectedCityIds.length > 0 ? 'pointer' : 'not-allowed',
            marginBottom: '6px',
            minHeight: '36px',
            opacity: selectedCityIds.length > 0 ? 1 : 0.5,
            '&:hover': {
              backgroundColor: selectedCityIds.length > 0 ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
            }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "13px" }}>
              İlçe Seçin
            </Typography>
            {selectedDistrictIds.length > 0 && (
              <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                {getSelectedDistrictNames()}
              </Typography>
            )}
          </Box>
          <ChevronRightIcon sx={{ fontSize: "16px" }} />
        </Box>

        {/* Mahalle Seçimi */}
        <Box 
          onClick={(e) => selectedDistrictIds.length > 0 && handlePopoverOpen(e, 'neighborhood')}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 10px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '6px',
            cursor: selectedDistrictIds.length > 0 ? 'pointer' : 'not-allowed',
            minHeight: '36px',
            opacity: selectedDistrictIds.length > 0 ? 1 : 0.5,
            '&:hover': {
              backgroundColor: selectedDistrictIds.length > 0 ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
            }
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: "13px" }}>
              Mahalle Seçin
            </Typography>
            {selectedNeighborhoodIds.length > 0 && (
              <Typography sx={{ fontSize: '11px', color: 'primary.main', fontWeight: 'bold' }}>
                {getSelectedNeighborhoodCount()} mahalle seçili
              </Typography>
            )}
          </Box>
          <ChevronRightIcon sx={{ fontSize: "16px" }} />
        </Box>

        {/* Popover Panel */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            '& .MuiPopover-paper': {
              marginLeft: '8px',
              minWidth: '280px',
              maxHeight: '400px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          <Paper sx={{ padding: '8px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ fontSize: '14px', fontWeight: 600 }}>
                {popoverType === 'city' && 'İl Seçin'}
                {popoverType === 'district' && 'İlçe Seçin'}
                {popoverType === 'neighborhood' && 'Mahalle Seçin'}
              </Typography>
              <IconButton onClick={handlePopoverClose} size="small">
                <CloseIcon sx={{ fontSize: '16px' }} />
              </IconButton>
            </Box>

            {/* Arama Kutusu */}
            <TextField
              size="small"
              placeholder="Ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                width: '100%', 
                mb: 1.5,
                '& .MuiOutlinedInput-root': {
                  fontSize: '13px',
                  height: '32px'
                }
              }}
            />

            {/* İl Listesi - Radio Button */}
            {popoverType === 'city' && (
              <RadioGroup value={selectedCityIds[0] || ''}>
                <List sx={{ maxHeight: 250, overflowY: 'auto', padding: 0 }}>
                  {filteredCities.map((city) => (
                    <ListItem disablePadding key={city.id}>
                      <ListItemButton 
                        onClick={() => selectSingleCity(city.id)}
                        sx={{
                          p: '4px 8px',
                          borderRadius: '4px',
                          '&:hover': { backgroundColor: 'rgba(237, 149, 23, 0.1)' }
                        }}
                      >
                        <Radio
                          checked={selectedCityIds.includes(city.id)}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                        />
                        <Typography sx={{ fontSize: '13px' }}>{city.name}</Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </RadioGroup>
            )}

            {/* İlçe Listesi */}
            {popoverType === 'district' && (
              <List sx={{ maxHeight: 250, overflowY: 'auto', padding: 0 }}>
                {filteredDistricts.map((district) => (
                  <ListItem disablePadding key={district.id}>
                    <ListItemButton 
                      onClick={() => toggle(selectedDistrictIds, setSelectedDistrictIds, district.id)}
                      sx={{
                        p: '4px 8px',
                        borderRadius: '4px',
                        '&:hover': { backgroundColor: 'rgba(237, 149, 23, 0.1)' }
                      }}
                    >
                      <Checkbox
                        checked={selectedDistrictIds.includes(district.id)}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                      />
                      <Typography sx={{ fontSize: '13px' }}>{district.name}</Typography>
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Mahalle Listesi */}
            {popoverType === 'neighborhood' && (
              <List sx={{ maxHeight: 250, overflowY: 'auto', padding: 0 }}>
                {filteredSubdistrictGroups.map((group) => (
                  <Box key={group.subdistrict.id}>
                    <ListItem 
                      sx={{ 
                        p: '4px 8px', 
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        borderRadius: '4px',
                        mb: 0.5
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox
                            checked={group.neighborhoods.every(n => selectedNeighborhoodIds.includes(n.id))}
                            indeterminate={group.neighborhoods.some(n => selectedNeighborhoodIds.includes(n.id)) && 
                                          !group.neighborhoods.every(n => selectedNeighborhoodIds.includes(n.id))}
                            onChange={() => toggleGroupSelection(group)}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 14 }, mr: 1, p: 0 }}
                          />
                          <Typography sx={{ fontSize: '13px', fontWeight: 600 }}>
                            {group.subdistrict.name}
                          </Typography>
                        </Box>
                        <IconButton 
                          onClick={() => toggleGroup(group.subdistrict.name)}
                          size="small"
                          sx={{ p: 0.5 }}
                        >
                          {expandedGroups[group.subdistrict.name] ? <ExpandLessIcon sx={{ fontSize: 14 }} /> : <ExpandMoreIcon sx={{ fontSize: 14 }} />}
                        </IconButton>
                      </Box>
                    </ListItem>
                    <Collapse in={expandedGroups[group.subdistrict.name]}>
                      {group.neighborhoods.map((neighborhood) => (
                        <ListItem disablePadding key={neighborhood.id} sx={{ pl: 1.5 }}>
                          <ListItemButton 
                            onClick={() => toggle(selectedNeighborhoodIds, setSelectedNeighborhoodIds, neighborhood.id)}
                            sx={{
                              p: '3px 6px',
                              borderRadius: '3px',
                              '&:hover': { backgroundColor: 'rgba(237, 149, 23, 0.1)' }
                            }}
                          >
                            <Checkbox
                              checked={selectedNeighborhoodIds.includes(neighborhood.id)}
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 12 }, mr: 1, p: 0 }}
                            />
                            <Typography sx={{ fontSize: '12px' }}>{neighborhood.name}</Typography>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </Collapse>
                  </Box>
                ))}
              </List>
            )}
          </Paper>
        </Popover>
      </CardContent>
    </Card>
  );
}
