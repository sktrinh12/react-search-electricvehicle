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
        image={AZURE_BLOB_SAS_URL(result._source.image)}
        onError={handleImageError}
        alt={result._source.brand}
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
          {result._source.brand} {result._source.model}
        </Typography>
        <Typography variant="body2">
          {`Usable Battery: ${result._source.usable_battery} kWh`}
        </Typography>
        <Typography variant="body2">
          {`Real Range: ${result._source.real_range} kWh`}
        </Typography>
        <Typography variant="body2">
          {`Efficiency: ${result._source.efficiency} Wh/km`}
        </Typography>
        <Typography variant="body2">
          {`Acceleration: ${result._source.acceleration} sec`}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {`Top Speed: ${result._source.top_speed} km/h`}
        </Typography>
        <Typography variant="h4" color="text.primary">
          {`$${result._source.price.toFixed(2)}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { CarCard, Typography };
