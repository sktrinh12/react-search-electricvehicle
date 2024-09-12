import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

type ContactInfo = {
  title: string;
  address?: string;
  phone?: string;
  email?: string;
};

interface ContactSellerProps {
  contacts: ContactInfo;
}

const ContactSeller: React.FC<ContactSellerProps> = ({ contacts }) => {
  return (
    <Box padding={3} bgcolor="#f5f5f5">
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {/* Address */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <LocationOnIcon style={{ color: "#23288C", marginRight: 8 }} />
            <Typography variant="body1">
              <strong>{contacts.title}:</strong>{" "}
              {contacts.address ? contacts.address : "None"}
            </Typography>
          </Box>
        </Grid>

        {/* Phone */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={2}>
            <PhoneIcon style={{ color: "#23288C", marginRight: 8 }} />
            <Typography variant="body1">
              <strong>Phone:</strong>{" "}
              {contacts.phone ? contacts.phone : "000-000-0000"}
            </Typography>
          </Box>
        </Grid>

        {/* Email */}
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center">
            <EmailIcon style={{ color: "#23288C", marginRight: 8 }} />
            <Typography variant="body1">
              <strong>Email:</strong>{" "}
              {contacts.email ? contacts.email : "none@mail.com"}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSeller;
