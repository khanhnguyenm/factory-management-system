import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import {
  DashboardOutlined,
  PeopleOutlined,
  FactoryRounded,
  CalendarTodayOutlined,
  HelpOutlineOutlined,
  BarChartOutlined,
  TimelineOutlined,
  MapOutlined,
  HomeOutlined
} from "@mui/icons-material";
import { colors } from "../../constants/colors";
import Logo from '../../assets/images/Logo_SMC_Corporation.png';
import './style.scss';

interface ItemProps {
  title: string;
  to: string;
  icon: any;
  selected: any;
  setSelected: any;
  disabled?: boolean;
}

const Item = (props: ItemProps) => {
  return (
    <MenuItem
      active={props.selected === props.title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => props.setSelected(props.title)}
      icon={props.icon}
      className={props?.disabled ? 'Mui-disabled' : ''}
    >
      <Typography component="div">{props.title}</Typography>
      <Link to={props.to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  const location = useLocation();
  useEffect(() => {
    const menu = location.pathname.substring(1);
    if (menu && menu !== '') {
      setSelected(`${menu.charAt(0).toUpperCase()}${menu.slice(1)}`);
    } else {
      setSelected('Home');
    }
  }, [location]);

  return (
    <Box
      className='sidebar-container'
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        }
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        {/* LOGO AND MENU ICON */}
        {isCollapsed && (
          <img
            className="logo"
            alt="logo"
            width="80px"
            src={Logo}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        {!isCollapsed && (
          <div className="logo-container">
            <img
              className="full-logo"
              alt="logo"
              width="120px"
              src={Logo}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>
          )}
        <Menu iconShape="square">
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Home"
              to="/"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<DashboardOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manufactories"
              to="/manufactories"
              icon={<FactoryRounded />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Users"
              to=""
              icon={<PeopleOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
            <Item
              title="Calendar"
              to=""
              icon={<CalendarTodayOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
            <Item
              title="Bar Chart"
              to=""
              icon={<BarChartOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
            <Item
              title="Analytics"
              to=""
              icon={<TimelineOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
            <Item
              title="Maps"
              to=""
              icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
            <Item
              title="FAQ Page"
              to=""
              icon={<HelpOutlineOutlined />}
              selected={selected}
              setSelected={setSelected}
              disabled
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
