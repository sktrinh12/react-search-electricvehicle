import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AZURE_BLOB_SAS_URL } from "./urls";

//import ContactSeller from "./ContactSeller"; // Import contact seller component

const CarDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = location.state?.car;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageArray, setImageArray] = useState<string[]>([]);

  const handleBack = () => {
    navigate("/"); // Navigate back to the main page
  };

  useEffect(() => {
    const images = car.image.split(",");
    setImageArray(images);
  }, [car.image]);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? car.image.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === car.image.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <Box
      sx={{
        boxShadow: 24,
        p: 2,
        overflow: "auto",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2}>
        <Button onClick={handleBack} variant="contained" color="primary">
          Back to Cars
        </Button>
      </Grid>
      <Grid>
        <Typography variant="h4" gutterBottom>
          {car.brand} {car.model}
        </Typography>
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          disabled={currentImageIndex === 0}
        >
          <ArrowBack />
        </IconButton>
        {imageArray.length > 0 && (
          <img
            src={AZURE_BLOB_SAS_URL(imageArray[currentImageIndex])}
            alt={`${currentImageIndex + 1} of ${car.brand} ${car.model}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectPosition: "center",
            }}
          />
        )}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          disabled={currentImageIndex === imageArray.length - 1}
        >
          <ArrowForward />
        </IconButton>
      </Grid>

      {/* Display comprehensive car data */}
      <Grid
        sx={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6} className="cell">
              <Typography>Year</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.year}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Price</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>${car.price}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Usable Battery (kWh)</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.usable_battery}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Real Range (km)</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.real_range}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Efficiency (Wh/km)</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.efficiency}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Acceleration (sec)</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.acceleration}</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>Top Speed (km/h)</Typography>
            </Grid>
            <Grid item xs={6} className="cell">
              <Typography>{car.top_speed}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Contact Seller Component */}
      {/* <ContactSeller seller={car.seller} /> */}
    </Box>
  );
};

export default CarDetails;
