import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Place {
  placeName: string;
  bookingsCount: number;
}

interface Props {
  places: Place[];
}

export function TopPerformingChart({ places }: Props) {

  const data = {
    labels: places?.map((place) => place?.placeName),
    datasets: [
      {
        label: "# of Bookings",
        data: places?.map((place) => place?.bookingsCount),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}