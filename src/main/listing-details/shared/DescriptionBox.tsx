import React from "react";
import { Box, Typography } from "@mui/material";

interface DescriptionBoxProps {
  description: string;
}

export default function DescriptionBox({ description }: DescriptionBoxProps) {
  return (
    <Box
      sx={{
        mt: 2,
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        background: "white",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid #e5e7eb",
          px: 2,
          py: 1,
          background: "#f9fafb",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            color: "#1e293b",
          }}
        >
          Açıklama
        </Typography>
      </Box>

      <Box
        dangerouslySetInnerHTML={{ __html: description }}
        sx={{
          fontSize: "14px",
          color: "#374151",
          lineHeight: 1.2,
          px: 2,
          py: 1.5,
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          hyphens: "auto",
          "& p": { margin: "0 0 8px 0" },
          "& *": { 
            maxWidth: "100%", 
            wordWrap: "break-word",
            overflowWrap: "break-word"
          }
        }}
      />
    </Box>
  );
}