import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import "./style.scss";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import withNotificationCenter from "../../hocs/withNotificationCenter";

const BasicBreadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideBreakscrumb = ["/", "/manufactories"];

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate("/dashboard", { replace: true });
    console.info("You clicked a breadcrumb.");
  };
  return (
    <Box m="20px">
      <div role="presentation" className="breadcrumbs">
        {!hideBreakscrumb.includes(location.pathname) && (
          <Breadcrumbs aria-label="breadcrumb">
            <div onClick={handleClick}>
              <Link underline="hover" className="parrent">
                Project
              </Link>
            </div>
            <Typography component="div" className="active-page">
              Factory 1 / Building 9
            </Typography>
          </Breadcrumbs>
        )}
      </div>
    </Box>
  );
};

export default withNotificationCenter(BasicBreadcrumbs);
