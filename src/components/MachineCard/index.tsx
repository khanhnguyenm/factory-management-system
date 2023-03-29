import {
  Box,
  CardActionArea,
  LinearProgress,
  linearProgressClasses,
  styled,
  Typography,
} from "@mui/material";
import "./style.scss";

import { getMachineImg } from "../../utilities";
import { Link } from "react-router-dom";
import { mockPieData as data } from "../../assets/dummy/mockData";

interface MachineCardProps {
  item: {
    Id: string;
    DeviceName: string;
    MachineType: string;
    Label: string;
    Status: string;
    Duration: number;
  };
}

export default function MachineCard({ item }: MachineCardProps) {
  const statusColor = data.find((d) => d.label === item.Status)?.color;

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    width: 100,
    borderRadius: 7,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#e1e0e0",
      //theme.palette.grey[theme.palette.mode === "light" ? 350 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 7,
      backgroundColor:
        theme.palette.mode === "light" ? "rgb(30, 179, 62)" : "#308fe8",
    },
    position: "absolute",
    top: 0,
    bottom: 0,
    right: -50,
    margin: "auto 0",
    transform: "rotate(90deg)",
  }));

  return (
    <div className="machine-card">
      <CardActionArea component={Link} to={`/detail/${item.Id}`}>
        <Typography
          className="name"
          component="div"
          variant="caption"
          sx={{ textAlign: "center" }}
        >
          {new Date(item.Duration * 1000).toISOString().slice(11, 19)}
        </Typography>
        <div className="img-container">
          <BorderLinearProgress
            variant="determinate"
            value={36}
            sx={{
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: statusColor,
              },
            }}
          />
          <Box className="content">
            <img
              className="machine-img"
              alt="machine-img"
              src={getMachineImg(item.MachineType)}
            />
          </Box>
        </div>
        <div className="content-bg"></div>
        <Box className="machine-info" p={0.5}>
          <Typography className="name" component="div" variant="body1">
            {item.DeviceName}
          </Typography>
          <Typography
            className="status"
            component="div"
            variant="caption"
            sx={{ color: statusColor }}
          >
            {item.Status}
          </Typography>
        </Box>
      </CardActionArea>
    </div>
  );
}
