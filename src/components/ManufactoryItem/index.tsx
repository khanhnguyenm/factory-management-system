import { Grid, Box } from "@mui/material";
import { IManufactoryItemProps } from "../../models/BuildingModel";
import BuildingCard from "../BuildingCard";

export default function ManufactoryItem({
  buildingList,
}: IManufactoryItemProps) {
  return (
    <>
      <Box p="20px" pt="50px" sx={{ border: 1, borderRadius: 3 }}>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {buildingList?.map((item, index) => (
            <Grid item xs={2} key={index}>
              {item && (
                <BuildingCard building={item} key={`building-${item.id}`} />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
