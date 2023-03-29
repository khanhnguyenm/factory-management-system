import React, { useEffect, useState } from "react";
import "./style.scss";
import * as dashboardService from "../../services/dashboard.service";
import { statusColors } from "../../constants/colors";
import moment from "moment";
import { Box } from "@mui/material";
import { diffMinutes, sortByTimestamp } from "../../utilities";

interface ITimelineChart {
  recordId: string;
  datetimeRange?: any;
}

const TimelineChart = (props: ITimelineChart) => {
  const [records, setRecords] = useState([]);

  const getHoursAndMinutes = (date = new Date()) => {
    return (
      padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes())
    );
  };

  const padTo2Digits = (num: any) => {
    return String(num).padStart(2, "0");
  };

  const convertTime = (timestemp: string): string => {
    return getHoursAndMinutes(new Date(timestemp));
  };

  const fetchTimelineData = async (params: any) => {
    if (params && params.StartDate && params.EndDate && params.MachineId) {
      const result = await dashboardService.getTimelineData(params);
      sortByTimestamp(result);
      setRecords(result);
    }
  };

  const getStatusColor = (id: string) => {
    const statusColor = statusColors.filter((color) => color.id === id);
    return statusColor[0]?.color;
  };

  useEffect(() => {
    if (props.recordId !== undefined) {
      const params = {
        MachineId: props.recordId,
        StartDate: props.datetimeRange
          ? moment(props.datetimeRange[0]).format()
          : null,
        EndDate: props.datetimeRange
          ? moment(props.datetimeRange[1]).format()
          : null,
      };
      fetchTimelineData(params);
    }
  }, [props]);
  interface statusNote {
    status: string;
    percent: number;
  }
  let arrStatus: any[] = [];

  const renderSlot = () => {
    const minusPerSlot = 30;
    return (
      (minusPerSlot /
        diffMinutes(
          props.datetimeRange ? props.datetimeRange[0] : 0,
          props.datetimeRange ? props.datetimeRange[1] : 0
        )) *
      100
    );
  };

  const calculatePercent = (record: any, i: number) => {
    const totalTime = diffMinutes(
      props.datetimeRange ? props.datetimeRange[0] : 0,
      props.datetimeRange ? props.datetimeRange[1] : 0
    );

    let minutes;
    if (i === 0) {
      minutes = diffMinutes(
        props.datetimeRange ? props.datetimeRange[0] : 0,
        record.Timestamp
      );
    } else {
      const pre: any = records[i - 1];
      minutes = diffMinutes(pre.Timestamp, record.Timestamp);
    }
    const item = {
      minutes: minutes,
      percent: Math.ceil((minutes / totalTime) * 100),
    };

    const existingObj = arrStatus.find((obj) => obj.status === record.Status);

    if (existingObj) {
      existingObj.percent += item.percent;
    } else {
      arrStatus.push({
        status: record.Status,
        percent: Math.ceil((minutes / totalTime) * 100),
      });
    }

    return item;
  };

  return (
    <>
      <div className="timeline-chart-container">
        <Box
          className="timeline-chart"
          sx={{
            "&:before": {
              backgroundImage: `repeating-linear-gradient(to right, #666666,#666666 1px, transparent 1px,transparent ${renderSlot()}%);`,
            },
          }}
        >
          <span>
            {props.datetimeRange
              ? convertTime(props.datetimeRange[0].getTime())
              : 0}
          </span>
          {records?.map((record: any, i: number) => {
            const item = calculatePercent(record, i);

            return (
              <>
                <Box
                  className="time-record"
                  key={i}
                  sx={{
                    backgroundColor: getStatusColor(record.Status),
                    width: `${item.percent}%`,
                  }}
                >
                  <span>{convertTime(record.Timestamp) + ":00"}</span>
                </Box>
              </>
            );
          })}
          <span>
            {props.datetimeRange
              ? convertTime(props.datetimeRange[1].getTime())
              : 0}
          </span>
        </Box>

        <Box marginTop="30px" className="status-color-note">
          {statusColors?.map((color: any, i: number) => {
            const status = arrStatus.filter(
              (item) => item.status === color.id
            )[0] as statusNote;
            return (
              <div key={i} className="item-color">
                <Box
                  className={`swatch`}
                  sx={{
                    backgroundColor: getStatusColor(color.id),
                  }}
                ></Box>
                {status !== undefined && (
                  <span className="title">
                    {`${color.id.charAt(0).toUpperCase()}${color.id.slice(
                      1
                    )} (${status.percent}%)`}
                  </span>
                )}
                {status === undefined && (
                  <span className="title">
                    {`${color.id.charAt(0).toUpperCase()}${color.id.slice(
                      1
                    )} (0%)`}
                  </span>
                )}
              </div>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default TimelineChart;
