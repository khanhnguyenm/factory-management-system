import { useEffect, useRef, useState } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import DoughnutChart from "../../components/DoughnutChart";
import MachineCard from "../../components/MachineCard";
import * as dashboardService from "../../services/dashboard.service";
import ViewMode from "../../components/ViewMode";
import { updateTabTitle } from "../../utilities/tab-title-generator";
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import "./style.scss";
import { StatusDetailModel } from "../../models/DashboardModel";
import { mockPieData as staticData } from "../../assets/dummy/mockData";
import data from "../../assets/dummy/machines.json";

const Dashboard = () => {
  const ref = useRef(true);
  const [machines, setMachines] = useState(data);
  const [machineStatuses, setMachineStatuses] = useState([] as any);
  const [totalDevices, setTotalDevices] = useState(0);
  const [cols, setCols] = useState(3);
  const [chartToggle, setChartToggle] = useState(true);

  updateTabTitle("SMC | Dashboard");
  const statusList = [
    "Warmup",
    "Operate",
    "Disconnect",
    "Alarm",
    "Emergency",
    "Suspend",
    "Stop",
    "Manual",
  ];

  const fetchMachines = async () => {
    const result = await dashboardService.getMachines();
    setMachines(result);
  };

  const tranformChartData = (inputData: any): any => {
    let outputData = [] as any;
    if (inputData && inputData.length > 0) {
      statusList.forEach((status) => {
        const filteredData = inputData.filter(
          (item: StatusDetailModel) => item._id === status
        )[0];
        outputData.push({
          id: status,
          label: status,
          value: filteredData.value,
          color: staticData.filter(
            (color) => color.label === filteredData._id
          )[0].color,
        });
      });
    }
    return outputData as any;
  };

  const fetchMachineStatuses = async () => {
    const result = await dashboardService.getMachineStatuses();
    setTotalDevices(result?.Total as number);
    setMachineStatuses(tranformChartData(result?.StatusDetails as any));
  };

  useEffect(() => {
    const firstRender = ref.current;
    if (firstRender) {
      ref.current = false;
      fetchMachines();
      fetchMachineStatuses();
    }
    const interval = setInterval(async () => {
      fetchMachines();
      fetchMachineStatuses();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value: string) => {
    setCols(Number(value));
  };

  const handleChartToggle = () => {
    setChartToggle(!chartToggle);
  };

  return (
    <>
      <Box mx="20px">
        <Grid container spacing={2}>
          <Grid
            item
            xs={
              chartToggle && machineStatuses && machineStatuses.length > 0
                ? 8
                : 12
            }
          >
            <Box className="top-action">
              <ViewMode onChange={handleChange} />
              <IconButton className="action-icon" onClick={handleChartToggle}>
                {chartToggle &&
                  machineStatuses &&
                  machineStatuses.length > 0 && <ArrowForwardRounded />}
                {!chartToggle && <ArrowBackRounded />}
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 3, md: 4 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {machines?.map((item, index) => (
                  <Grid item xs={cols} key={index}>
                    {item && <MachineCard item={item} />}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
          {machineStatuses && machineStatuses.length > 0 && (
            <Grid
              item
              xs={4}
              className={`${chartToggle ? "chart-active" : "chart-leave"}`}
            >
              <Box className="total-devices" sx={{ mt: 0, pt: 0 }}>
                <p className="title">Total Device State</p>
                <Box height="45vh">
                  <DoughnutChart
                    dataSource={machineStatuses as any}
                    totalDevices={totalDevices}
                  />
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
