"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import Loading from "@/app/admin/loading";
import SalesStats from "./SalesStats";
import { SalesChart } from "../charts/SalesCharts";
import { TopPerformingChart } from "../charts/TopPerformingChart";
import { useLazyGetSalesStatsQuery } from "@/redux/api/bookingApi";
import { CustomError } from "@/interfaces/customError";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [getSalesStats, { error, data, isLoading }] =
    useLazyGetSalesStatsQuery();

  useEffect(() => {
    if (error && "data" in error) {
      const customError = error?.data as CustomError;
      toast.error(customError?.errMessage);
    }

    if (startDate && endDate && !data) {
      getSalesStats({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error, data, endDate, getSalesStats, startDate]);

  const handleSubmit = () => {
    getSalesStats({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if (!data) return <Loading />;

  console.log("data", data);

  return (
    <div className="ps-4 my-5">
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <button
          className="btn form-btn btn-primary ms-4 mt-3 px-5"
          onClick={handleSubmit}
        >
          Fetch
        </button>
      </div>
      <SalesStats data={data} />

      <div className="row">
        <div className="col-12 col-lg-8">
          <h4 className="my-5 text-center">Sales History</h4>
          <SalesChart salesData={data?.sixMonthSalesData} />
        </div>

        <div className="col-12 col-lg-4 text-center">
          <h4 className="my-5">Top Performing Places</h4>
          {data?.topPlaces?.length > 0 ? (
            <TopPerformingChart places={data?.topPlaces} />
          ) : (
            <p className="mt-5">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
