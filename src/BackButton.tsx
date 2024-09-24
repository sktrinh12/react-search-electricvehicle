import { Button } from "@mui/material";

interface BackButtonProps {
  handleBack: () => void; // Function with no parameters and no return value
}

const BackButton: React.FC<BackButtonProps> = ({ handleBack }) => {
  return (
    <Button
      onClick={handleBack}
      sx={{
        textTransform: "none", // Disable uppercase text
        paddingX: 4,
        paddingY: 1.5,
        marginTop: 2,
        marginBottom: 3,
        borderColor: "#17292e", // Border color for the outlined variant
        color: "#17292e", // Text color
        "&:hover": {
          borderColor: "#17292e", // Border color on hover
          backgroundColor: "#ecf0f1", // Background color on hover
        },
      }}
      variant="outlined"
    >
      Back to Cars
    </Button>
  );
};

export default BackButton;
