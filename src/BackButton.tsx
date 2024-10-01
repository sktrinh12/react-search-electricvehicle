import { Button } from "@mui/material";
import { COLOUR, SELECT_COLOUR2 } from "./Colour";

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
        borderColor: COLOUR,
        color: COLOUR,
        "&:hover": {
          borderColor: COLOUR,
          backgroundColor: SELECT_COLOUR2,
        },
      }}
      variant="outlined"
    >
      Back to Cars
    </Button>
  );
};

export default BackButton;
