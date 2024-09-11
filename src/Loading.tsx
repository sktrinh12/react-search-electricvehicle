import React from "react";
import { Box } from "@mui/material";
import ReactLoading from "react-loading";

interface LoadingProps {
  loading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: "61%",
            left: "61%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <ReactLoading type="spin" color="#1976d2" height={150} width={150} />
        </Box>
      )}
    </>
  );
};

export default Loading;
