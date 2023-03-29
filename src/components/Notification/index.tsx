import * as React from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import "./style.scss";
import { IconButton, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

import { mockPieData as data } from "../../assets/dummy/mockData";
import { mockAlertData as staticData } from "../../assets/dummy/alertData";

const getRandomElement = (arr: any[]) => {
  const num = Math.floor(Math.random() * arr.length);
  if (arr.length) {
    let newArr = [];
    for (let i = 0; i < num; i++) {
      newArr.push(arr[Math.floor(Math.random() * num)]);
    }
    return newArr;
  } else {
    return undefined;
  }
};
interface IAlertProps {
  message: string;
  label: string;
}
interface IState {
  hasAlert: boolean;
  isOpen: boolean;
  isShowAll: boolean;
  alerts: IAlertProps[];
}
export default function Notification() {
  const [state, setState] = React.useState<IState>({
    hasAlert: false,
    isOpen: false,
    isShowAll: false,
    alerts: [],
  });
  const { hasAlert, isOpen, alerts, isShowAll } = state;

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, isOpen: open });
    };
  const ShowAll = () => {
    if (!isShowAll)
      setState({
        ...state,
        isShowAll: !isShowAll,
        hasAlert: true,
        alerts: { ...state.alerts, ...staticData.allAlerts },
      });
    else {
      setState({
        ...state,
        isShowAll: !isShowAll,
        hasAlert: false,
        alerts: [],
      });
    }
  };
  React.useEffect(() => {
    const interval = setInterval(async () => {
      const lastedAlerts = getRandomElement(staticData.lastedAlerts);

      if (lastedAlerts!.length > 0) {
        setState({
          ...state,
          hasAlert: true,
          alerts: { ...state.alerts, ...lastedAlerts },
        });
      }
    }, 5000);

    if (isShowAll) clearInterval(interval);
    return () => clearInterval(interval);
  }, [hasAlert, state]);
  const getColor = (label: string) => {
    return data.find((d) => d.label === label)?.color;
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        {hasAlert && !isOpen ? (
          <NotificationsActiveIcon
            className="bell-active"
            sx={{ color: "red" }}
          />
        ) : (
          <NotificationsActiveOutlinedIcon />
        )}
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        PaperProps={{
          sx: {
            width: "30%",
            padding: "20px",
            backgroundColor: "#1F2A40",
            color: "#fff",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <IconButton onClick={toggleDrawer(false)}>
            <ChevronRightIcon
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Box>
        <Box>
          {Object.values(alerts).map((alert, index) => (
            <Typography
              variant="body1"
              component="p"
              color={getColor(alert.label)}
              key={`alert-${index}`}
            >
              {alert.message}
              {" - "}
              <strong>{alert.label}</strong>
            </Typography>
          ))}
        </Box>
        <Box
          p="20px"
          mb={2}
          sx={{
            display: "flex",
            mt: "auto",
            justifyContent: "center",
          }}
        >
          <Button variant="text" sx={{ color: "#fff" }} onClick={ShowAll}>
            {!isShowAll ? "Show All" : "Show less"}
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
