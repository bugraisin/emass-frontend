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
            variant={selected ? "contained" : "outlined"}
            sx={{
                background: selected 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'transparent',
                color: selected ? 'white' : '#4a5568',
                border: selected ? 'none' : '2px solid #e2e8f0',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: selected ? '600' : '500',
                fontSize: '0.95rem',
                padding: '12px 20px',
                minHeight: '48px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: selected 
                    ? '0 10px 25px rgba(102, 126, 234, 0.3)' 
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: selected 
                        ? '0 15px 35px rgba(102, 126, 234, 0.4)' 
                        : '0 8px 25px rgba(0, 0, 0, 0.15)',
                    background: selected 
                        ? 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)' 
                        : '#f7fafc',
                    borderColor: selected ? 'none' : '#cbd5e0',
                },
                '&:active': {
                    transform: 'translateY(0px)',
                }
            }}
        >
            {label}
        </Button>
    );
};

export default StyledButton;
