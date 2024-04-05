import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { scaleTime } from "d3-scale";
import { utcDay } from "d3-time";

import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

function CandleStickChart({ data, width, ratio, type }) {
  const [xExtents, setXExtents] = useState([]);

  useEffect(() => {
    setXExtents([xAccessor(last(data)), xAccessor(data[data.length - 100])]);
  }, [data]);

  const xAccessor = (d) => d.date;

  return (
    <React.Fragment>
      {xExtents.length && (
        <ChartCanvas
          height={400}
          ratio={ratio}
          width={width}
          margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
          type={type}
          seriesName="MSFT"
          data={data}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          xExtents={xExtents}
        >
          <Chart id={1} yExtents={(d) => [d.high, d.low]}>
            <XAxis axisAt="bottom" orient="bottom" ticks={6} />
            <YAxis axisAt="left" orient="left" ticks={5} />
            <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
          </Chart>
        </ChartCanvas>
      )}
    </React.Fragment>
  );
}

CandleStickChart.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  // ratio: PropTypes.number.isRequired,
  // type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChart.defaultProps = {
  type: "svg",
  width: 800,
  ratio: 0.8,
};

export default CandleStickChart;
