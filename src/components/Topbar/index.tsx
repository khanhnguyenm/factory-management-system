import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { colors } from "../../constants/colors";
import LanguagePopover from "../LanguagePopover";
import "./style.scss";
import Notification from "../Notification";
import NotificationIcon from "../NotificationIcon";

const Topbar = () => {
  const ref = useRef(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getDateFormatedAMPM = () => {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes() as any;
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getCurrentDate = () => {
    const today = new Date();
    const fullDayArr = today
      .toLocaleDateString("en-US", options as any)
      .split(/[ ,]+/);
    let finalString = "";
    fullDayArr.forEach((word, i) => {
      if (i === 0) {
        finalString += `${word}, `;
        return;
      }
      if (i === 2) {
        if (parseInt(word) === 1) finalString += `${word}st `;
        if (parseInt(word) === 2) finalString += `${word}nd `;
        if (parseInt(word) === 3) finalString += `${word}rd `;
        if (parseInt(word) > 3) finalString += `${word}th `;
      } else {
        finalString += `${word} `;
      }
    });
    return finalString.trim();
  };

  useEffect(() => {
    const firstRender = ref.current;
    if (firstRender) {
      ref.current = false;
      setCurrentTime(getDateFormatedAMPM());
      setCurrentDate(getCurrentDate());
    }
    const interval = setInterval(async () => {
      setCurrentTime(getDateFormatedAMPM());
      setCurrentDate(getCurrentDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      className="topbar-container"
      display="flex"
      justifyContent="flex-end"
      p={2}
      sx={{ backgroundColor: colors.primary[400] }}
    >
      <Box display="flex" className="time">
        <p className="hour">{currentTime}</p>
        <span>{currentDate}</span>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <LanguagePopover />
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        {/* <Notification /> */}
        <NotificationIcon />
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
