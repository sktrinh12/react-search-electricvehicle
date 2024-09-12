import React from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  KeyboardDoubleArrowLeftRounded,
  KeyboardDoubleArrowRightRounded,
} from "@mui/icons-material";

interface PaginationProps {
  loading: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  loading,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const theme = useTheme();

  if (loading) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      {/* First Page Button */}
      <IconButton
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <KeyboardDoubleArrowLeftRounded sx={{ fontSize: 40 }} />
          <Typography variant="body2" sx={{ marginLeft: 1, fontSize: 20 }}>
            1
          </Typography>
        </Box>
      </IconButton>

      {/* Previous Page Button */}
      <IconButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <ArrowBack sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Next Page Button */}
      <IconButton
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        sx={{
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        <ArrowForward sx={{ fontSize: 40 }} />
      </IconButton>

      {/* Last Page Button */}
      <IconButton
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        sx={{
          "&:hover": {
            backgroundColor:  theme.palette.primary.main,
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <KeyboardDoubleArrowRightRounded sx={{ fontSize: 40 }} />
          <Typography variant="body2" sx={{ marginLeft: 1, fontSize: 20 }}>
            {totalPages}
          </Typography>
        </Box>
      </IconButton>
    </Box>
  );
};

export default Pagination;
