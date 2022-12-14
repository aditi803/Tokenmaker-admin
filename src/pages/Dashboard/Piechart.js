import React,{useState, useEffect} from "react"
import { Pie } from "react-chartjs-2"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import axios from "axios"

const PieChart = ({dataColors, category, totalVal}) => {
  console.log(category, totalVal, "Category and total avlues are here ")
   var pieChartColors =  getChartColorsArray(dataColors); 
  const data = {
    labels: category,
    datasets: [
      {
        data: totalVal,
        backgroundColor: pieChartColors,
        hoverBackgroundColor: pieChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Pie width={751} height={260} data={data} />
}

export default PieChart;
