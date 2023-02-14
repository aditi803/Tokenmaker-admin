import React,{useState, useEffect} from "react";
import ReactEcharts from "echarts-for-react";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"
import useApiStatus from "hooks/useApiStatus";
import axios from "axios"

const Doughnut = ({dataColors, category, totalVal}) => {

  const [pieData, setPieData] = useState([])
  const [dataColor, setDataColor] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()


  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const fetchData = () => {
    changeApiStatus(true)
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/monthlydata", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setPieData(res.data.msg.ress)
        setDataColor(res.data.msg.finalArray)
        console.log(res.data.msg.finalArray, "finalArray data")
        changeApiStatus(false)

      })
      .catch((err) => {
        console.log(err)
        changeApiStatus(false)

      })
  }

  console.log(pieData, "pieData")
  console.log(JSON.stringify(dataColor), "datacolor")

  useEffect(() => {
    fetchData()
  },[])


  const doughnutEChartColors = getChartColorsArray(JSON.stringify(dataColor));

  const options = {
    toolbox: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["Avalanche", "Solana", "Polygon", "Moon River", "Iotex", "Heco", "Fuse", "Fantom", "Ethereum","Celo","Binance Smart Chain"],
      textStyle: {
        color: ["#8791af"],
      },
    },
    color: doughnutEChartColors,
    series: [
      {
        name: "Total sales",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center",
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold",
            },
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        data: pieData
      },
    ],
  }

  return (
    <React.Fragment>
      <ReactEcharts style={{ height: "350px" }} option={options} />
    </React.Fragment>
  );
};
export default Doughnut;
