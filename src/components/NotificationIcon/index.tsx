import { useEffect, useState } from "react";
import {
  NotificationsActive,
  NotificationsActiveOutlined
} from "@mui/icons-material";
import "./style.scss";
import { IconButton } from "@mui/material";
import eventBus from "../../utilities/event-bus";

export default function NotificationIcon() {

  const [hasAlert, setHasAlert] = useState(true);

  const showAlert = (): void => {
    setHasAlert(!hasAlert);
    eventBus.dispatch('show-alert', {
      slideAlert: hasAlert
    });
  };

  return (
    <div className="noti-icon">
      <IconButton onClick={showAlert}>
        {hasAlert ? (
          <NotificationsActive
            className="bell-active"
            sx={{ color: "red" }}
          />
        ) : (
          <NotificationsActiveOutlined />
        )}
      </IconButton>
    </div>
  );
}
