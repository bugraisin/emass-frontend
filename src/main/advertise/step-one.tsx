import { Box, Card, CardContent, Typography, Divider } from "@mui/material";
import React from "react";
import StyledButton from "./advert-btn.tsx";

interface StepOneProps {
    category: string;
    setCategory: (category: string) => void;
    type: string;
    setType: (type: string) => void;
    sellType: string;
    setSellType: (sellType: string) => void;
}

export default function StepOne({ category, setCategory, type, setType, sellType, setSellType }: StepOneProps) {
    const houseTypes = ['Daire', 'Rezidans', 'Villa', 'Müstakil Ev', 'Çiftlik Evi', 'Yalı', 'Yazlık', 'Konak'];
    const workplaceTypes = ['Ofis', 'Dükkan', 'Depo', 'Fabrika', 'Plaza', 'İmalathane', 'Otopark', 'Çiftlik', 'Atölye'];

    return (
        <Box 
            sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
                width: "100vw", 
                padding: 1
            }}
        >
            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column", height: "fit-content" }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6">İlan Türü</Typography>
                        <Divider sx={{ marginBottom: 2, marginTop: 1, width: '100%' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <StyledButton 
                            selected={sellType === 'Satılık'}
                            onClick={() => setSellType('Satılık')}
                            label="Satılık"
                        />
                        <StyledButton 
                            selected={sellType === 'Kiralık'}
                            onClick={() => setSellType('Kiralık')}
                            label="Kiralık"
                        />
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column", height: "fit-content" }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6">Yapı Tipi</Typography>
                        <Divider sx={{ marginBottom: 2, marginTop: 1, width: '100%' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {(sellType === 'Satılık' || sellType === 'Kiralık') && (
                            <>
                                <StyledButton 
                                    selected={category === 'Konut'}
                                    onClick={() => setCategory('Konut')}
                                    label="Konut"
                                />
                                <StyledButton 
                                    selected={category === 'İşyeri'}
                                    onClick={() => setCategory('İşyeri')}
                                    label="İşyeri"
                                />
                                <StyledButton 
                                    selected={category === 'Arsa'}
                                    onClick={() => setCategory('Arsa')}
                                    label="Arsa"
                                />
                                <StyledButton 
                                    selected={category === 'Bina'}
                                    onClick={() => setCategory('Bina')}
                                    label="Bina"
                                />
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ flex: 1, margin: 1, padding: 2, boxShadow: 3, display: "flex", flexDirection: "column", height: "fit-content" }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6">Yapı Detayı</Typography>
                        <Divider sx={{ marginBottom: 2, marginTop: 1, width: '100%' }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {category === 'Konut' && (
                            <>
                                {houseTypes.map((typeOption) => (
                                    <StyledButton 
                                        key={typeOption}
                                        selected={type === typeOption}
                                        onClick={() => setType(typeOption)}
                                        label={typeOption}
                                    />
                                ))}
                            </>
                        )}
                        {category === 'İşyeri' && (
                            <>
                                {workplaceTypes.map((typeOption) => (
                                    <StyledButton 
                                        key={typeOption}
                                        selected={type === typeOption}
                                        onClick={() => setType(typeOption)}
                                        label={typeOption}
                                    />
                                ))}
                            </>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}