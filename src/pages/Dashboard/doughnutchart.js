import React,{useState, useEffect} from "react";
import ReactEcharts from "echarts-for-react";
// import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import getChartColorsArray from "../../components/Common/ChartsDynamicColor"
import useApiStatus from "hooks/useApiStatus";
import axios from "axios"

const Doughnut = ({dataColors, category, totalVal}) => {

  const [pieData, setPieData] = useState([])
  // const [category, setCategory] = useState([])
  // const [totalVal, setTotalVal] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()


  // pieData?.map((value) => {
  //   category.push(value.categoryName)
  // });

  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const fetchData = () => {
    changeApiStatus(true)
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/monthlydata", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setPieData(res.data.msg.ress)

        console.log(res.data.msg.newArrayOfObj, "<<<<<<<<<<<<<Monthly earning data >>>>>>>>>>>>>>>>>>")
        changeApiStatus(false)

      })
      .catch((err) => {
        console.log(err)
        changeApiStatus(false)

      })
  }

  useEffect(() => {
    fetchData()
  },[])


  const doughnutEChartColors = getChartColorsArray(dataColors);

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
      data: ["Laptop", "Tablet", "Mobile", "Others", "Desktop"],
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
