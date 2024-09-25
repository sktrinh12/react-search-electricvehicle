import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { countries } from "./data";

interface CountrySelectProps {
  selectedCountry: string;
  handleCountryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  handleCountryChange,
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Country
        </InputLabel>
        <NativeSelect
          defaultValue={countries["US"]}
          inputProps={{
            name: "country",
            id: "uncontrolled-native",
          }}
          onChange={handleCountryChange}
        >
          {Object.entries(countries).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default CountrySelect;
