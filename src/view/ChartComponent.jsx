import React, { useState, useEffect } from "react";
import CandleStickChart from "./CandleStickChart";
import { getData } from "../utils/api";
import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const newData = await getData();
    setData(newData);
  };

  const updateData = () => {
    let payload = data;
    const Obj = {
      "date": "2010-01-03T18:30:00.000Z",
      "open": 22.436282332605284,
      "high": 21.835021381744056,
      "low": 20.411360259406774,
      "close": 20.710416,
      "volume": 38409100,
      "split": "",
      "dividend": "",
      "absoluteChange": "",
      "percentChange": ""
    }
    payload.push(Obj);
    console.log(payload,"payload")
    setData(payload);
  };

  useEffect(() => {
    let intervalId;
    let weekend = new Date().getDay();
    fetchData();

    if (weekend !== 0 && data) {
      intervalId = setInterval(async() => { await updateData() }, 1000);
    }
   
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure useEffect runs only once when component mounts

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      {!data && <h1>Loading...</h1>}
      {data && <TypeChooser>
				{type => <CandleStickChart type={type} data={data} />}
			</TypeChooser>}
    </React.Fragment>
  );
};

export default ChartComponent;
