import { CardActionArea, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { IBuildingItemProps } from "../../models/BuildingModel";
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import "./style.scss";

export default function BuildingCard({ building }: IBuildingItemProps) {
  return (
    <>
      <div className="machine-card">
        {building.isActive && (
          <CardActionArea component={Link} to={`/dashboard`}>
            <Item building={building} />
          </CardActionArea>
        )}
        {!building.isActive && (
          <CardContent component={Box} sx={{ opacity: 0.3 }}>
            <Item building={building} />
          </CardContent>
        )}
      </div>
    </>
  );
}

const Item = ({ building }: IBuildingItemProps) => {
  return (
    <>
      <div className="img-container">
        <Box className="content">
          <ApartmentRoundedIcon fontSize="large" color="primary" />
        </Box>
      </div>
      <div className="content-bg"></div>
      <Box className="machine-info" p={0.5}>
        <Typography className="name" component="div" variant="body1">
          {building.label}
        </Typography>
      </Box>
    </>
  );
};
