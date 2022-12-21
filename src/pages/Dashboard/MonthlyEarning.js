import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios"

import ApexRadial from "./ApexRadial";
import PieChart from "./Piechart";
import useApiStatus from "hooks/useApiStatus";
import Spinner from "loader";

const MonthlyEarning = () => {

  const [pieData, setPieData] = useState([])
  // const [category, setCategory] = useState([])
  // const [totalVal, setTotalVal] = useState([])
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  var category = [];
  var totalVal = [];

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
        setPieData(res.data.msg.dataValues)

        console.log(res.data.msg.dataValues, "<<<<<<<<<<<<<Monthly earning data >>>>>>>>>>>>>>>>>>")
        changeApiStatus(false)

      })
      .catch((err) => {
        console.log(err)
        changeApiStatus(false)

      })
  }
  // pieData.forEach((val) => {
  //   console.log(1,"");
  //   category.push(val.categoryName)
  //   totalVal.push(val.total)
  // })

  console.log(category, "<<<<<<Monthly Earning category >>>>>>>>>>>>>>>>>>>>>>>")
  console.log(totalVal, "<<<<<<Monthly Earning category >>>>>>>>>>>>>>>>>>>>>>>")

  useEffect(() => {
    // setCategory([])
    // setTotalVal([])
    category = [];
    totalVal = [];
  }, [pieData])

  useEffect(() => {
    fetchData()
  }, [])

 
  return (
    <React.Fragment>
      {/* {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Monthly Earning</CardTitle> */}
      <Col lg={12} style={{height:"100%"}}>
        <Card style={{height:"100%"}}>
          <CardBody>
            <CardTitle className="mb-4">Commissions</CardTitle>
            <Row className="justify-content-center">
              {
              pieData.map((value,i) => {

                category.push(value.categoryName)
                totalVal.push(value.total)

                // return <Col sm={4} key={i}>
                //   <div className="text-center">
                //     <h5 className="mb-0">{value.total}</h5>
                //     <p className="text-muted text-truncate">{value.categoryName}</p>
                //   </div>
                // </Col>
              })}
            <PieChart dataColors='["--bs-success", "--bs-primary", "--bs-warning" ]' category={category} totalVal={totalVal} />


            </Row>

          </CardBody>
        </Card>
      </Col>
      {/* </CardBody>
      </Card> */}
    </React.Fragment>
  );
};

export default MonthlyEarning;
