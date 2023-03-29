import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardContent, Typography, CardMedia, Button } from "@mui/material";
import { getMachineImg } from "../../utilities";
import "./style.scss";

interface ProductDetailProps {
  item: {
    Id: string;
    DeviceName: string;
    MachineType: string;
    Label: string;
    Status: string;
    Duration: number;
  };
}

export default function MachineInfo({ item }: ProductDetailProps) {
  return (
    <Card
      sx={{
        display: "flex",
        backgroundColor: "transparent",
        color: "#fff",
        margin: 2,
        marginLeft: 0,
      }}
      className="machine-info"
    >
      <Box className="img-container">
        <CardMedia
          component="img"
          image={getMachineImg(item?.MachineType)}
          alt=""
          className="machine-img"
        />
      </Box>
      <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="h3" variant="body1" gutterBottom>
            ID: {item?.Id}
          </Typography>
          <Typography component="div" variant="body1" gutterBottom>
            Device Name: {item?.DeviceName}
          </Typography>
          <Typography component="div" variant="body1" gutterBottom>
            Type: {item?.MachineType}
          </Typography>
          <Typography component="div" variant="body1" gutterBottom>
            Label: {item?.Label}
          </Typography>
          <Button variant="contained" sx={{ marginTop: 1 }}>
            Import file
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
}
