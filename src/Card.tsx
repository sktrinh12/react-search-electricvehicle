import React from "react";
import { CarCardProps } from "./types";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const AZURE_BLOB_SAS_URL = (image: string) =>
  `${process.env.REACT_APP_AZURE_STORAGE_URL}${image}?${process.env.REACT_APP_AZURE_SAS_TOKEN_CO}`;

const CarCard: React.FC<CarCardProps> = ({ result }) => {

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "https://placehold.co/400x300"; // Fallback image URL
  };
  return (
    <Card>
      <CardMedia
        component="img"
        sx={{
          width: 400,
          height: 300,
          objectFit: "cover",
          objectPosition: "center",
        }}
        image={AZURE_BLOB_SAS_URL(result.image)}
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
        <Typography variant="body2">
          {`Year: ${result.year}`}
        </Typography>
        <Typography variant="body2">
          {`Usable Battery: ${result.usable_battery} kWh`}
        </Typography>
        <Typography variant="body2">
          {`Real Range: ${result.real_range} kWh`}
        </Typography>
        <Typography variant="body2">
          {`Efficiency: ${result.efficiency} Wh/km`}
        </Typography>
        <Typography variant="body2">
          {`Acceleration: ${result.acceleration} sec`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Top Speed: ${result.top_speed} km/h`}
        </Typography>
        <Typography variant="h4" color="text.primary">
          {`$${result.price.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { CarCard, Typography };
