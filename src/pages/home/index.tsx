import { Box } from "@mui/material";
import GroupBox from "../../components/Groups";
import { updateTabTitle } from "../../utilities/tab-title-generator";
import GroupMonitoringIcon from "../../assets/icons/group-monitoring.svg";
import EquipmentMonitoringIcon from "../../assets/icons/equipment.svg";
import GroupResultsIcon from "../../assets/icons/group-result.svg";
import OperationalResultsIcon from "../../assets/icons/operational.svg";
import ProductionResultsIcon from "../../assets/icons/production.svg";
import OverlookIcon from "../../assets/icons/overlook.svg";
import FileTransferIcon from "../../assets/icons/file-transfer.svg";
import IntegrationServerIcon from "../../assets/icons/integration-server.svg";
import SystemDiagnosisIcon from "../../assets/icons/system-diagnosis.svg";

 const HomePage = () => {
  updateTabTitle("SMC | Home");

  const MonitoringItems = [
    {
      label: "Building Monitor",
      img: OverlookIcon,
      url: "/manufactories",
    },
    {
      label: "Module",
      img: GroupMonitoringIcon,
    },
    {
      label: "Module",
      img: EquipmentMonitoringIcon,
    },
    {
      label: "Module",
      img: EquipmentMonitoringIcon,
    },
  ];
  const ProductionsItems = [
    {
      label: "Module",
      img: GroupResultsIcon,
    },
    {
      label: "Module",
      img: OperationalResultsIcon,
    },
    {
      label: "Module",
      img: ProductionResultsIcon,
    },
  ];

  const ConfigurationItems = [
    {
      label: "Module",
      img: FileTransferIcon,
    },
    {
      label: "Module",
      img: IntegrationServerIcon,
    },
    {
      label: "Module",
      img: SystemDiagnosisIcon,
    },
  ];
  return (
    <Box m="20px" width={'-webkit-fill-available'}>
      <GroupBox
        heading={"Monitoring"}
        backgroundColor={"#1f24b0"}
        listItems={MonitoringItems}
      />
      <GroupBox
        heading={"Productions"}
        backgroundColor={"#0060a7"}
        listItems={ProductionsItems}
      />
      <GroupBox
        heading={"Configuration"}
        backgroundColor={"#7f218f"}
        listItems={ConfigurationItems}
      />
    </Box>
  );
}

export default HomePage;
