import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
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
  const [solanaPayment, setSolanaPayment] = useState("")
  const [error, setError] = useState("")

  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  useEffect(() => {
    changeApiStatus(true)
    // setLoader(false)
    fetchData()
  }, [setPayment, setSolanaPayment])

  const fetchData = async () => {
    await axios
      .get("https://tokenmaker-apis.block-brew.com/payment/paymentaddress")
      .then(res => {
        setPayment(res.data.msg)
        setSolanaPayment(res.data.msg)
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
    // console.log(payment, "Change payment")
    setPayment({
      //   ...payment,
      [name]: value,
    })

  }

  const onChangeHandler1 = async e => {
    e.preventDefault()
    // console.log(e.target.value, "onchange e target side ")
    const { name, value } = e.target
    // console.log(solanaPayment, "Change solana payment")
    setSolanaPayment({
      [name]: value,
    })
  }

  const paymentUpdate = async (e) => {


    e.preventDefault();
    // console.log(payment, "Payment")
    // console.log(solanaPayment, "Solana Payemnt")
    if (payment?.metamaskPaymentAddress?.length === 42 && (solanaPayment?.solanaPaymentAddress?.length >= 32 && solanaPayment?.solanaPaymentAddress?.length <= 44)) {
      setError("")
      changeApiStatus(true)
      const authUser = JSON.parse(localStorage.getItem("authUser"))
      await axios
        .put("https://tokenmaker-apis.block-brew.com/payment/addressupdate", { metamaskPaymentAddress: payment.metamaskPaymentAddress, solanaPaymentAddress: solanaPayment.solanaPaymentAddress }, {
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
    else {
      setError("Enter a valid wallet address.")
    }
    // setLoader(false)
  }
  const solanaPaymentUpdate = async (e) => {

    e.preventDefault();
    // console.log(payment.paymentAddress.length,"<<<<<<<<<<<<PAyment Length>>>>>>>>>>>>>")
    if (payment.metamaskPaymentAddress.length === 42 && (solanaPayment.solanaPaymentAddress.length >= 32 && solanaPayment.solanaPaymentAddress.length <= 44)) {
      setError("")
      changeApiStatus(true)
      const authUser = JSON.parse(localStorage.getItem("authUser"))
      await axios
        .put("https://tokenmaker-apis.block-brew.com/payment/addressupdate", { paymentAddress: solanaPayment.paymentAddress }, {
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
    else {
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
                              value={payment.metamaskPaymentAddress}
                              className="form-control input-color"
                              name="metamaskPaymentAddress"
                              onChange={onChangeHandler}
                            />
                            <p style={{ color: "red" }}>{error}</p>
                            <p className="my-2">Note: <span style={{ color: "red" }}>You will receive all (Binance, Polygon, Ethereum ) commission fee under this wallet address</span></p>
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
                              value={solanaPayment.solanaPaymentAddress}
                              placeholder="Enter your payment address"
                              className="form-control input-color"
                              name="solanaPaymentAddress"
                              onChange={onChangeHandler1}
                            />
                            <p style={{ color: "red" }}>{error}</p>
                            <p className="my-2">Note: <span style={{ color: "red" }}>You will receive all solana commission fee under this wallet address</span></p>
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
