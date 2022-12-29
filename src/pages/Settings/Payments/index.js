import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"
import axios from "axios"
import { Form, Label, Card, CardBody, CardTitle, Input } from "reactstrap"
import InputMask from "react-input-mask"
// import { payment, FOOTER_PUT } from "common/api"
import { toast } from "react-toastify"
import Spinner from "loader"
import useApiStatus from "hooks/useApiStatus"

function Payments(props) {
      const [payment, setPayment] = useState("")
      const [error, setError] = useState("")

    const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
        useApiStatus()
    //   const [simple_color2, setsimple_color2] = useState(0)
    //   const [simple_color3, setsimple_color3] = useState(0)
    //   const [colorHor, setcolorHor] = useState("#fffff")

    //   const [loader, setLoader] = useState(true)
    //   const handleHor = color => {
    //     setcolorHor(color.hex)
    //   }
      useEffect(() => {
        changeApiStatus(true)
        // setLoader(false)
        fetchData()
      }, [setPayment])

      const fetchData = async () => {
        await axios
          .get("https://tokenmaker-apis.block-brew.com/payment/paymentaddress")
          .then(res => {
            setPayment(res.data.msg)
            setApiSuccess()
            changeApiStatus(false)  
          })
          .catch(err => {
            changeApiStatus(false)
            setApiFailed(err.message)
          })
      }

      const onChangeHandler = async e => {
        e.preventDefault()
        // console.log(e.target.value, "onchange e target side ")
        const { name, value } = e.target
        setPayment({
        //   ...payment,
          [name]: value,
        })
      }

      const paymentUpdate = async (e) => {

        e.preventDefault();
        // console.log(payment.paymentAddress.length,"<<<<<<<<<<<<PAyment Length>>>>>>>>>>>>>")
        if(payment.paymentAddress.length === 42){
            setError("")
            changeApiStatus(true)
        const authUser = JSON.parse(localStorage.getItem("authUser"))
        await axios
          .put("https://tokenmaker-apis.block-brew.com/payment/addressupdate", {paymentAddress: payment.paymentAddress}, {
            headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` },
          })
          .then(res => {
            setApiSuccess()
            changeApiStatus(false)
            fetchData()
            toast.success("Updated Successfully")
          })
          .catch(err => {
            changeApiStatus(false)
            setApiFailed(err.message)
            toast.error("Cannot update")
          })
        }
        else{
            setError("Enter a valid wallet address.")
        }
        
        // setLoader(false)
      }

    return apiStatus.inProgress ? <Spinner /> : (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <p
                        style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
                    >Payment</p>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h2 className="mb-4">Metamask</h2>
                                    <hr></hr>
                                    <Form>
                                        <Row>
                                            <Col lg={12}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date1">Your Wallet Address: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            value={payment.paymentAddress}
                                                            className="form-control input-color"
                                                            name="paymentAddress"
                                                          onChange={onChangeHandler}
                                                        />
                                                        <p style={{color:"red"}}>{error}</p>
                                                        <p className="my-2">Note: <span style={{ color: "red" }}>You will receive all funds under this wallet address</span></p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button
                                            color="success"
                                            className="mt-1"
                                          onClick={paymentUpdate}
                                        >
                                            Update
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h2 className="mb-4">Phantom</h2>
                                    <hr></hr>
                                    <Form>
                                        <Row>
                                            <Col lg={12}>
                                                <div>
                                                    <div className="form-group mb-4">
                                                        <Label for="input-date1">Your Wallet Address: </Label>
                                                        <InputMask
                                                            // mask="(999) 999-9999"
                                                            // value={payment.paymentAddress}
                                                            placeholder="Enter your payment address"
                                                            className="form-control input-color"
                                                            name="paymentAddress"
                                                          onChange={onChangeHandler}
                                                        />
                                                        <p style={{color:"red"}}>{error}</p>
                                                        <p className="my-2">Note: <span style={{ color: "red" }}>You will receive all funds under this wallet address</span></p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Button
                                            color="success"
                                            className="mt-1"
                                          onClick={paymentUpdate}
                                        >
                                            Update
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

Payments.propTypes = {
    t: PropTypes.any,
}
export default withTranslation()(Payments)
