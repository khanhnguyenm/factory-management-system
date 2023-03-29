import ManufactoryItem from "../../components/ManufactoryItem";
import { mockPieData as staticData } from "../../assets/dummy/manufactoryData";

import { Box, Typography } from "@mui/material";

export default function ManufactoriesPage() {
  return (
    <Box mx="20px">
      {staticData.map((item) => {
        return (
          <Box mb="40px" key={`manufactory-${item.id}`} marginTop="-30px">
            <Typography
              component="h3"
              variant="h3"
              bottom="-30px"
              ml="20px"
              p="20px"
              display="inline"
              position="relative"
              sx={{
                backgroundColor: "#141b2d",
              }}
            >
              {item.label}
            </Typography>
            <ManufactoryItem buildingList={item.buildings} />
          </Box>
        );
      })}
    </Box>
  );
}
