import { Typography, Box, Grid, styled } from "@mui/material";
import "./style.scss";

import { Link } from "react-router-dom";

interface IItem {
  label: string;
  img: string;
  url?: string;
}
interface ImageItemStyledProps {
  to: string;
}

export interface SectionBoxProps {
  heading: string;
  backgroundColor?: string;
  listItems?: IItem[];
}

const ImageItemDisableStyled = styled(Box)(() => ({
  textAlign: "center",
  color: "#fff",
  textDecoration: "none",
  opacity: 0.3,
}));
const ImageItemStyled = styled(Box, {
  // Configure which props should be forwarded on DOM
  shouldForwardProp: (prop) =>
    prop !== "color" && prop !== "variant" && prop !== "sx",
  name: "MyThemeComponent",
  slot: "Root",
  // We are specifying here how the styleOverrides are being applied based on props
  overridesResolver: (props, styles) => [
    styles.root,
    props.color === "primary" && styles.primary,
    props.color === "secondary" && styles.secondary,
  ],
})<ImageItemStyledProps>(() => ({
  textAlign: "center",
  color: "#fff",
  textDecoration: "none",
}));

export default function GroupBox({
  heading,
  backgroundColor = "blue",
  listItems,
}: SectionBoxProps) {
  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        position: "relative",
        marginBottom: 5,
        zIndex: 1,
        "& img": {
          height: "100px",
          maxWidth: "100%",
          objectFit: "content",
          filter: "brightness(0) invert(1);",
          fill: { backgroundColor },
        },
        "&:before": {
          content: "''",
          backgroundColor: { backgroundColor },
          borderRadius: 5,
          position: "absolute",
          zIndex: -1,
          display: "block",
          top: 0,
          left: 0,
          right: 0,
          height: "130px",
        },
      }}
    >
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "130px",
        }}
      >
        <Typography
          component="h2"
          sx={{
            textTransform: "uppercase",
            fontSize: 30,
            textAlign: "center",
          }}
        >
          {heading}
        </Typography>
      </Grid>
      <Grid item xs={7} sx={{ display: "flex" }}>
        {listItems?.map((item: any, i: number) => {
          return (
            <Box
              px={3}
              pt={2}
              sx={{ textAlign: "center", width: "auto" }}
              key={i}
            >
              {item?.url !== undefined && item?.url !== "" && (
                <ImageItemStyled component={Link} to={item.url}>
                  <ImageItem item={item} />
                </ImageItemStyled>
              )}
              {item?.url === undefined && (
                <ImageItemDisableStyled>
                  <ImageItem item={item} />
                </ImageItemDisableStyled>
              )}
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
}

const ImageItem = ({ item }: { item: IItem }) => {
  return (
    <>
      {" "}
      <Box component="img" alt="" src={item.img} key={item.label} />
      <Typography
        component="div"
        px={5}
        pt={2}
        variant="body1"
        gutterBottom
        sx={{
          fontSize: 20,
        }}
      >
        {item.label}
      </Typography>
    </>
  );
};
