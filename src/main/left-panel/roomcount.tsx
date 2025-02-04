import React, { useState } from "react";
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box } from '@mui/material';

export default function RoomCount() {
    const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

    const roomOptions = [
        "1+0", "1+1", "2+1", "2+2",
        "3+1", "3+2", "4+1", "4+2",
        "5+1", "5+2", "6+1","7 ve üzeri"
    ];
    const handleCheckboxChange = (room: string) => {
        setSelectedRooms((prev) =>
            prev.includes(room) ? prev.filter(item => item !== room) : [...prev, room]
        );
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '14px', marginBottom: 1 }}>
                    Oda Sayısı
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {roomOptions.slice(0, Math.ceil(roomOptions.length / 2)).map((room) => (
                            <FormControlLabel
                                key={room}
                                control={
                                    <Checkbox
                                        checked={selectedRooms.includes(room)}
                                        onChange={() => handleCheckboxChange(room)}
                                        sx={{ padding: "3px", '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "12px" }}>{room}</Typography>}
                                sx={{ margin: 0 }}
                            />
                        ))}
                    </FormGroup>

                    <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                        {roomOptions.slice(Math.ceil(roomOptions.length / 2)).map((room) => (
                            <FormControlLabel
                                key={room}
                                control={
                                    <Checkbox
                                        checked={selectedRooms.includes(room)}
                                        onChange={() => handleCheckboxChange(room)}
                                        sx={{ padding: "3px", '& .MuiSvgIcon-root': { fontSize: 16 } }}
                                    />
                                }
                                label={<Typography sx={{ fontSize: "12px" }}>{room}</Typography>}
                                sx={{ margin: 0 }}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </CardContent>
        </Card>
    );
}
