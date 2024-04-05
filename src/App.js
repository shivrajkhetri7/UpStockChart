import "./App.css";
import ChartComponent from "./view/ChartComponent";
import { GoogleChart } from "./view/GoogleChart";
import Stock from "./view/Stock";

function App() {

  return (
    <div className="App">
      {/* <ChartComponent/> */}
      {/* <Stock/> */}
      <GoogleChart/>
    </div>
  );
}

export default App;
