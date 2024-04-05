import React, { useState, useEffect } from "react";
import { Chart } from "react-google-charts";

export const initialData = [
  ["Day", "", "", "", ""],
  ["", 20, 28, 38, 45],
  ["", 31, 38, 55, 66],
  ["", 50, 55, 77, 80],
  ["", 77, 77, 66, 50],
  ["", 68, 66, 22, 15],
];

export const options = {
  legend: "none",
  bar: { groupWidth: "100%" }, // Remove space between bars.
  candlestick: {
    fallingColor: { strokeWidth: 0, fill: "#a52714" }, // red
    risingColor: { strokeWidth: 0, fill: "#0f9d58" }, // green
  },
};

export function GoogleChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumbers = Array.from({ length: 5 }, (_, index) => {
        if (index === 0) return ""; // Set the first element to an empty string
        return Math.floor(Math.random() * 100);
      });
      setData(prevData => [...prevData, randomNumbers]);
    }, 2000); // Change the interval as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="600px"
      data={data}
      options={options}
    />
  );
}
