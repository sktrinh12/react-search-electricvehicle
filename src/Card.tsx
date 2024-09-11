import React from "react";
import { CarCardProps } from "./types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AZURE_BLOB_SAS_URL } from './urls'

const CarCard: React.FC<CarCardProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/car-details/${result.id}`, { state: { car: result } });
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "https://placehold.co/400x300"; // Fallback image URL
  };
  const [firstImage] = result.image.split(","); 
  return (
    <Card onClick={handleClick} sx={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        sx={{
          width: 400,
          height: 300,
          objectFit: "cover",
          objectPosition: "center",
        }}
        image={AZURE_BLOB_SAS_URL(firstImage)}
        onError={handleImageError}
        alt={result.brand}
      />
      <CardContent>
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{
            fontSize: "clamp(16px, 2.5vw, 24px)", // Dynamically scale font size between 16px and 24px
            overflow: "hidden", // Hide overflow text
            textOverflow: "ellipsis", // Show ellipsis if text overflows
            whiteSpace: "nowrap", // Prevent text from wrapping to a new line
          }}
        >
          {result.brand} {result.model}
        </Typography>
        <Typography variant="body2">{`Year: ${result.year}`}</Typography>
        <Typography variant="h4" color="text.primary">
          {`$${result.price.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { CarCard, Typography };
