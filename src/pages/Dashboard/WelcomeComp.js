import React, { useState, useEffect } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"
import axios from "axios"

const WelcomeComp = () => {

  const [data, setData] = useState({})
  const user = localStorage.getItem('authUser')
  const parseData = JSON.parse(user)
  const token = parseData.msg.jsonWebtoken;

  const fetchData = () => {
    axios.get("https://tokenmaker-apis.block-brew.com/dashboard/tokens", { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        setData(res.data)
        console.log(res.data, "<<<<<<<<<<<<<Dashboard data token >>>>>>>>>>>>>>>>>>")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchData()
  }, [setData])

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>Blocktech Brew</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            {/* <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">Henry Price</h5>
              <p className="text-muted mb-0 text-truncate">UI/UX Designer</p>
            </Col> */}

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">{data.totalTokens}</h5>
                    <p className="text-muted mb-0">Tokens deployed</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">${data.totalCommissionFee?.toFixed(2)}</h5>
                    <p className="text-muted mb-0">Total Commission fee</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  {/* <Link
                    to=""
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link> */}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
