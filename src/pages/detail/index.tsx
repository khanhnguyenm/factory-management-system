import { Box } from "@mui/material";
import MachineInfo from "../../components/MachineInfo";
import SectionBox from "../../components/SectionBox";
import { useParams } from "react-router";
import * as dashboardService from "../../services/dashboard.service";
import { useEffect, useState } from "react";
import { updateTabTitle } from "../../utilities/tab-title-generator";
import TimelineChart from "../../components/TimelineChart";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "./style.scss";
interface IMachineInfo {
  Id: string;
  DeviceName: string;
  MachineType: string;
  Label: string;
  Status: string;
  Duration: number;
}

export default function ProductDetail() {
  const [machine, setMachine] = useState({} as IMachineInfo);
  const { id } = useParams();
  const [datetimeRange, setDatetimeRange] = useState([
    new Date(Date.now() - 3600 * 1000 * 24),
    new Date(),
  ]);

  updateTabTitle("SMC | Machine Detail");

  const fetchMachineById = async () => {
    const result = await dashboardService.getMachineById(id as string);
    setMachine(result);
  };

  useEffect(() => {
    fetchMachineById();
  }, []);

  return (
    <>
      <Box m="20px">
        <SectionBox heading={"Information"}>
          <MachineInfo item={machine} />
        </SectionBox>
        <SectionBox heading={"Timeline Chart"}>
          <Box marginTop="20px" marginBottom="30px" className="date-range">
            <DateTimeRangePicker
              onChange={setDatetimeRange as any}
              value={datetimeRange as any}
              className="datetime-range-picker"
            />
          </Box>
          <Box marginTop="20px" marginBottom="30px" className="machine-name">
            {/*  <h3>{machine.DeviceName}</h3> */}
          </Box>
          <TimelineChart
            recordId={(machine as IMachineInfo).Id}
            datetimeRange={datetimeRange}
          />
        </SectionBox>
        <SectionBox heading={"Status history"}>No data</SectionBox>
      </Box>
    </>
  );
}
