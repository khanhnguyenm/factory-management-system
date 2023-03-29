import { ResponsivePie } from "@nivo/pie";
import { mockPieData as staticData } from "../../assets/dummy/mockData";
import { colors } from "../../constants/colors";

interface IDoughnutChart {
  dataSource: any;
  totalDevices: number;
}
const DoughnutChart = (props: IDoughnutChart) => {

  const legendProps = {
    anchor: "bottom",
    direction: "row",
    justify: false,
    translateX: 0,
    translateY: 56,
    itemsSpacing: 0,
    itemWidth: 65,
    itemHeight: 18,
    itemTextColor: "#fff",
    itemDirection: "left-to-right",
    itemOpacity: 1,
    symbolSize: 11,
    symbolShape: "circle",
  };

  const seriesColors = staticData?.map((value: any) => value.color);

  const legends: any =
    staticData && staticData.length <= 4
      ? [
          {
            ...legendProps,
            translateY: 25,
            symbolSize: 18,
            itemsSpacing: 60,
          },
        ]
      : [
          {
            ...legendProps,
            symbolSize: 10,
            itemsSpacing: 25,
            translateY: 50,
            data: staticData
              .slice(0, Math.floor(staticData.length / 2))
              ?.map((cur: any, index: number) => ({
                id: cur.id,
                label: cur.id,
                color: seriesColors.slice(0, Math.floor(staticData.length / 2))[
                  index
                ],
              })),
          },
          {
            ...legendProps,
            symbolSize: 10,
            itemsSpacing: 25,
            translateY: 70,
            data: staticData.slice(Math.floor(staticData.length / 2))?.map((cur, index) => ({
              id: cur.id,
              label: cur.id,
              color: seriesColors.slice(Math.floor(staticData.length / 2))[index],
            })),
          },
        ];

  return (
    <>
      <div
        style={{
          fontFamily: "consolas, sans-serif",
          textAlign: "center",
          position: "relative",
          width: "auto",
          height: "400px",
        }}
      >
        <ResponsivePie
          data={props.dataSource}
          colors={seriesColors}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                background: "#333",
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0}
          cornerRadius={0}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabel={function (e: any) {
            const total = props.dataSource.reduce((a: any, b: any) => a + b.value, 0);
            const percent =
              `${e.id} ( ${Math.floor((e.value / total) * 100)} % )`;
            return percent;
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
          arcLinkLabelsThickness={2}
          arcLinkLabelsStraightLength={3}
          arcLinkLabelsTextOffset={0}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={legends}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 20,
            bottom: 50,
            left: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "100%",
            color: "#FFFFFF",
            textAlign: "center",
            pointerEvents: "none",
            fontFamily: "system-ui"
          }}
        >
          <span style={{fontSize: "2em"}}>{props.totalDevices}</span>
          <span style={{fontSize: "1em"}}>
            Devices
          </span>
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
