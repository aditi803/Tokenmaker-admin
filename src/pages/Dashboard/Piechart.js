import React,{useState, useEffect} from "react"
import { Pie } from "react-chartjs-2"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import axios from "axios"

const PieChart = ({dataColors, category, totalVal}) => {
  console.log(category, totalVal, "Category and total avlues are here ")
   var pieChartColors =  getChartColorsArray(dataColors); 
     let newVal = []
     totalVal.map((val)=>{
         
      newVal.push(val.toFixed(4))
      console.log(val.toFixed(4),"value map--")
     })


  const data = {
    labels: category,
    datasets: [
      {
        data: newVal,
        backgroundColor: pieChartColors,
        hoverBackgroundColor: pieChartColors,
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Pie width={851} height={360} data={data} />
}

export default PieChart;
