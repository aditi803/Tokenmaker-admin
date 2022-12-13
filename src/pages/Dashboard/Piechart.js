import React from "react"
import { Pie } from "react-chartjs-2"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const PieChart = ({dataColors}) => {
  var pieChartColors =  getChartColorsArray(dataColors); 
  const data = {
    labels: ["Ethereum", "Polygon", "BSC"],
    datasets: [
      {
        data: [150, 180,80],
        backgroundColor: pieChartColors,
        hoverBackgroundColor: pieChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Pie width={751} height={260} data={data} />
}

export default PieChart;
