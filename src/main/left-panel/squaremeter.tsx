import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Stack } from '@mui/material';

export default function SquareMeter() {
    const [minSquareMeter, setMinSquareMeter] = useState<string>('');
    const [maxSquareMeter, setMaxSquareMeter] = useState<string>('');

    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinSquareMeter(event.target.value);
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxSquareMeter(event.target.value);
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, boxShadow: 2, maxWidth: 320 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontSize: '14px', marginBottom: 1 }}>
                    Metrekare
                </Typography>

                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        label="Min"
                        variant="outlined"
                        value={minSquareMeter}
                        onChange={handleMinChange}
                        size="small"
                        autoComplete="off"
                    />
                    <TextField
                        fullWidth
                        label="Max"
                        variant="outlined"
                        value={maxSquareMeter}
                        onChange={handleMaxChange}
                        size="small"
                        autoComplete="off"
                    />
                </Stack>
            </CardContent>
        </Card>
    );
}
