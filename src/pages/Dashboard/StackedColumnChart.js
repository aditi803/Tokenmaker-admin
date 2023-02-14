import React,{useState, useEffect} from "react"
import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts"
import getChartColorsArray from "../../components/Common/ChartsDynamicColor";
import useApiStatus from "hooks/useApiStatus";
import axios from "axios"

const StackedColumnChart = ({ dataColors, periodData }) => {
  console.log("Period data", periodData)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
  useApiStatus()

  const [dataColor, setDataColor] = useState([])
  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const fetchBarData = () => {
    changeApiStatus(true)
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/checkdata", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setDataColor(res.data.finalArray)
        
        changeApiStatus(false)
      })
      .catch((err) => {
        console.log(err)
        changeApiStatus(false)
      })
  }

  useEffect(() => {
    fetchBarData()
  }, [])

  const stackedColumnChartColors = getChartColorsArray(JSON.stringify(dataColor));
  const options = {
    chart: {
      stacked: !0,
      toolbar: {
        // show: 1 (it shows download options like download svg file, or png file)
        show: false 
      },
      zoom: {
        enabled: !0
      }
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "15%"
        // endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: !1
    },
    xaxis: {
      show: true,
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      labels: {
        show: true
      }
    },
    colors: stackedColumnChartColors,
    legend: {
      position: "bottom"
    },
    fill: {
      opacity: 1
    }
  }


  const series = [
    {
      name: "Series A",
      data: [0, 150, 60, 180, 90, 75, 30],
    },
    {
      name: "Series B",
      data: [0, 45, 150, 36, 60, 240, 30],
    },
    {
      name: "Series C",
      data: [0, 15, 195, 21, 360, 120, 30],
    },
  ]
  
  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={[...periodData]}
        type="bar"
        height="359"
        className="apex-charts"
      />
    </React.Fragment>
  );
}

StackedColumnChart.propTypes = {
  periodData: PropTypes.any
}
export default StackedColumnChart;
