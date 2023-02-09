import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

// Pages Components
import MonthlyEarning from "./MonthlyEarning";


//i18n
import { withTranslation } from "react-i18next";

import axios from 'axios'
//redux
import { useSelector, useDispatch } from "react-redux";
import DashboardTokens from "./DashboardTokens";
import useApiStatus from "hooks/useApiStatus";
import Spinner from "loader";

const Dashboard = props => {

  const [data, setData] = useState({})
  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const fetchData = () => {
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/data", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setData(res.data.msg)
        console.log(res.data, "<<<<<<<<<<<<<Dashboard data data >>>>>>>>>>>>>>>>>>")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [setData])

  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setSubscribemodal(true);
    }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");
  const [barData, setBarData] = useState([])

  const fetchBarData = () => {
    changeApiStatus(true)
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/checkdata", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        const data = res.data;
        const updatedData = []
        data.forEach((obj) => {
          if (obj._id) {
            let singleEntry = {};
            let arr = [];
            for (let i = 1; i <= 12; i++) {

              const hasProp = obj.data.find(({ month }) => i === month)
              // console.log(hasProp, "HasProp>>>>>>>>>>>>>>>>>>>>>>>>>>>.>>>>>>>>>>>>>>>>>>");
              if (!hasProp) {
                arr.push({ month: i, totalCommissionFee: 0 })
              } else {
                arr.push(hasProp)
              }
            }
            singleEntry = {
              data: arr.map(({ totalCommissionFee }) => totalCommissionFee)
            }

            singleEntry = {
              ...singleEntry,
              name: obj.categoryName
            }
            updatedData.push(singleEntry)
          }
        })

        // console.log(updatedData, 'updatedData')
        setBarData(updatedData)
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

  useEffect(() => {

    // console.log(barData, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Bar data charts>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    setPeriodData(barData)
    // setPeriodData(chartsData);
    // console.log(chartsData, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Charts data >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  }, [barData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  //meta title
  document.title = "Block-Tech-Brew";

  return apiStatus.inProgress ? <Spinner /> : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >Dashboard</p>

          <Row>
            <Col xl="4" style={{ marginBottom: "25px" }}>

            </Col>
            <Col xl="12">
              <Row>

                <>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              Weekly Commissions
                            </p>
                            <h4 className="mb-0">${data.last7Days?.toFixed(2)}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i className="cil-dollar"></i>
                              <i
                                className={
                                  "bx " + "bx-purchase-tag-alt" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              Monthly Commissions
                            </p>
                            <h4 className="mb-0">${data.lastMonth?.toFixed(2)}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx-purchase-tag-alt" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="4">
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              Yearly Commissions
                            </p>
                            <h4 className="mb-0">${data.total?.toFixed(2)}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + "bx-purchase-tag-alt" + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </>
              </Row>

              <Row>
                <Col md="4">
                  <Card className="h-100">
                    <CardBody>
                      <MonthlyEarning />
                    </CardBody>
                  </Card>
                </Col>
                <Col md="8">
                  <Card className="h-100 mb-0" >
                    <CardBody>
                      <div className="d-sm-flex flex-wrap">
                        <h4 className="card-title mb-4">Token Analytics</h4>
                        <div className="ms-auto">
                          <ul className="nav nav-pills">
                          </ul>
                        </div>
                      </div>
                      <StackedColumnChart periodData={periodData} dataColors='["#f3ba2f", "#454a75", "#8247e5"]' />
                    </CardBody>
                  </Card>
                </Col>
              </Row>

            </Col>
          </Row>

          <Row>
            <DashboardTokens />

          </Row>

          <Row>
            <Col lg="12">
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
