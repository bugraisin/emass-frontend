import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

export default function Age() {
    const [selectedAges, setSelectedAges] = useState<string[]>([]);

    const ageOptions = [
        "0 (Yeni)", "1-5", "6-10", "11-15", "16-20", "21-25",
        "25-30", "31 ve üzeri"
    ];

    const handleCheckboxChange = (age: string) => {
        setSelectedAges((prev) =>
            prev.includes(age) ? prev.filter(item => item !== age) : [...prev, age]
        );
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '14px', marginBottom: 1 }}>
                    Bina Yaşı
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {ageOptions.slice(0, 4).map((age) => (
                            <FormControlLabel
                                key={age}
                                control={
                                    <Checkbox
                                        checked={selectedAges.includes(age)}
                                        onChange={() => handleCheckboxChange(age)}
                                        sx={{ padding: "3px", '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "12px" }}>{age}</Typography>}
                                sx={{ margin: 0 }}
                            />
                        ))}
                    </FormGroup>

                    <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {ageOptions.slice(4).map((age) => (
                            <FormControlLabel
                                key={age}
                                control={
                                    <Checkbox
                                        checked={selectedAges.includes(age)}
                                        onChange={() => handleCheckboxChange(age)}
                                        sx={{ padding: "3px", '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "12px" }}>{age}</Typography>}
                                sx={{ margin: 0 }}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </CardContent>
        </Card>
    );
}
