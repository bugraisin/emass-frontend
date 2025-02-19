import React from "react";
import { Button } from "@mui/material";

interface StyledButtonProps {
    selected: boolean;
    onClick: () => void;
    label: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ selected, onClick, label }) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                color: selected ? '#ed9517' : 'black',
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: selected ? 'bold' : 'normal',
            }}
        >
            {label}
        </Button>
    );
};

export default StyledButton;
