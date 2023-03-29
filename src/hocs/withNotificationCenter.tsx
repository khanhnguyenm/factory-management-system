import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ComponentType, useEffect, useState } from "react";
import eventBus from "../utilities/event-bus";
import { mockPieData as data } from "../assets/dummy/mockData";
import { mockAlertData as staticData } from "../assets/dummy/alertData";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./style.scss";

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

export default function withNotificationCenter<T>(Component: ComponentType<T>) {
  return (hocProps: T | any): any => {
    const [alertInfo, setAlertInfo] = useState(null);
    const [state, setState] = useState<IState>({
      hasAlert: false,
      isOpen: false,
      isShowAll: false,
      alerts: [
        {
          message: "",
          label: "",
        },
      ],
    });
    const { hasAlert, isOpen, alerts, isShowAll } = state;

    const getRandomElement = (arr: any[]) => {
      const num = Math.floor(Math.random() * arr.length);
      if (arr.length) {
        let newArr = [];
        for (let i = 0; i < num; i++) {
          newArr.push(arr[Math.floor(Math.random() * arr.length)]);
        }
        return newArr;
      } else {
        return undefined;
      }
    };

    const ShowAll = () => {
      setState({
        ...state,
        isShowAll: true,
        alerts: { ...state.alerts, ...staticData.allAlerts },
      });
    };

    const getColor = (label: string) => {
      return data.find((d) => d.label === label)?.color;
    };

    useEffect(() => {
      /* const interval = setInterval(async () => {
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
  
      return () => clearInterval(interval); */
    }, [hasAlert, state, isShowAll]);

    useEffect(() => {
      eventBus.on("show-alert", (data: any) => {
        setAlertInfo(data.slideAlert);
      });

      return eventBus.remove("show-alert", (): void => {
        return;
      });
    }, []);
    return (
      <>
        <Component {...hocProps} />
        <div
          className={`alert-center ${alertInfo ? "show-alert" : "hide-alert"}`}
        >
          <div className="notification-header">Notifications</div>
          <Box padding={"10px"} className="notification-content">
            {Object.values(alerts)?.map((alert, index) => (
              <Typography
                variant="body1"
                component="div"
                color={getColor(alert.label)}
                key={`alert-${index}`}
              >
                {alert.message ? (
                  <Box display="flex" marginBottom="10px" component="p">
                    <ErrorOutlineIcon style={{ marginRight: "10px" }} />
                    {` ${alert.message} - ${alert.label}`}
                  </Box>
                ) : (
                  <CircularProgress
                    size={34}
                    disableShrink
                    thickness={3}
                    className="msg-loader"
                  />
                )}
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
              Show all
            </Button>
          </Box>
        </div>
      </>
    );
  };
}
