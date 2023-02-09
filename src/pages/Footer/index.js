import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import Breadcrumb from "components/Common/Breadcrumb"
import { SketchPicker } from "react-color"
import "@vtaits/react-color-picker/dist/index.css"
import axios from "axios"
import { Label, Card, CardBody, CardTitle, Input } from "reactstrap"
import InputMask from "react-input-mask"
import { FOOTER, FOOTER_PUT } from "common/api"
import { toast } from "react-toastify"
import Spinner from "loader"
import useApiStatus from "hooks/useApiStatus"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'

function Footer(props) {
  const [footer, setFooter] = useState({})


  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()
  const [simple_color2, setsimple_color2] = useState(0)
  const [simple_color3, setsimple_color3] = useState(0)
  const [colorHor, setcolorHor] = useState("#fffff")

  const footerSchema = Yup.object().shape({
    companyName: Yup.string().required('Enter company name'),
    websiteName: Yup.string().required('Enter website name'),
    contentColor: Yup.string().required('Choose color'),
    backgroundColor: Yup.string().required('Choose color'),
    adminCopyrightText: Yup.string().required('Enter admin copyright text'),
    investorCopyrightText: Yup.string().required('Enter investor copyright text'),
  })

  const [loader, setLoader] = useState(true)
  const handleHor = color => {
    setcolorHor(color.hex)
  }
  useEffect(() => {
    changeApiStatus(true)
    setLoader(false)
    fetchData()
  }, [setFooter])


  const fetchData = async () => {
    await axios
      .get(FOOTER)
      .then(res => {
        setFooter(res.data.msg)
        console.log(res.data.msg, "?>>>>>>>>>>>>>>>>>>FOOTERMSG")
        setApiSuccess()
        changeApiStatus(false)
      })
      .catch(err => {
        changeApiStatus(false)
        setApiFailed(err.message)
      })
      setLoader(false)
  }

  const footerUpdate = async (values) => {
    // e.preventDefault()
    console.log('Enter updated footer')
    changeApiStatus(true)
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    await axios
      .put(FOOTER_PUT, values, 
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` },
      })
      .then(res => {     
        toast.success("Updated Successfully")
        fetchData()
      })
      .catch(err => {
        toast.error("Already updated")
      })
    setLoader(false)
  }


  return apiStatus.inProgress ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <p
            style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
          >Footer</p>
          <Row>
            <Col lg={12}>
              <Formik 
              initialValues={{
                companyName: footer?.companyName,
                websiteName: footer?.websiteName,
                contentColor:footer?.contentColor,
                backgroundColor:footer?.backgroundColor,
                adminCopyrightText:footer?.adminCopyrightText,
                investorCopyrightText:footer?.investorCopyrightText,
                _id: footer?._id
              }}
                validationSchema={footerSchema}
                onSubmit={
                  footerUpdate
                }
              >
                {({ values, setValues, setFieldValue, errors, touched }) => (
                  <Form>
                    <Card>
                      <CardBody>
                        <CardTitle className="mb-4">Footer Settings</CardTitle>
                          <Row>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date1">Company Name: </Label>
                                  <Field
                                    className="form-control input-color"
                                    type='text'
                                    name="companyName"
                                  />
                                  {errors.companyName && touched.companyName ? (
                                    <div className="input-error text-danger">{errors.companyName}</div>
                                ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mt-4 mt-lg-0">
                                <div className="form-group mb-4">
                                  <Label for="input-repeat">Website Name:</Label>
                                  <Field
                                    type='text'
                                    name="websiteName"
                                    className="form-control input-color"
                                  />
                                  {errors.websiteName && touched.websiteName ? (
                                    <div className="input-error text-danger">{errors.websiteName}</div>
                                ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date1">Content Color: </Label>
                                  <Input
                                    type="text"
                                    onClick={() => {
                                      setsimple_color2(!simple_color2)
                                    }}
                                    value={footer?.contentColor}
                                    readOnly
                                  />
                                  {simple_color2 ? (
                                    <SketchPicker
                                      color={footer?.contentColor}
                                      value={simple_color2}
                                      width="160px"
                                      onChangeComplete={e => {
                                        setFooter(prev => ({
                                          ...prev,
                                          contentColor: e.hex,
                                        }))
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date2"> Background Color: </Label>
                                  <Input
                                    type="text"
                                    onClick={() => {
                                      setsimple_color3(!simple_color3)
                                    }}
                                    value={footer?.backgroundColor}
                                    readOnly
                                  />
                                  {simple_color3 ? (
                                    <SketchPicker
                                      color={footer?.backgroundColor}
                                      value={simple_color3}
                                      width="160px"
                                      onChangeComplete={e => {
                                        setFooter(prev => ({
                                          ...prev,
                                          backgroundColor: e.hex,
                                        }))
                                      }}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date1">Admin Copyright: </Label>
                                  <Field
                                    className="form-control input-color"
                                    name="adminCopyrightText"
                                    type='text'
                                  />
                                </div>
                                {errors.adminCopyrightText && touched.adminCopyrightText ? (
                                    <div className="input-error text-danger">{errors.adminCopyrightText}</div>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mt-4 mt-lg-0">
                                <div className="form-group mb-4">
                                  <Label for="input-repeat">Investor Copyright:</Label>
                                  <Field
                                    name="investorCopyrightText"
                                    className="form-control input-color"
                                    type='text'
                                  />
                                  {errors.investorCopyrightText && touched.investorCopyrightText ? (
                                    <div className="input-error text-danger">{errors.investorCopyrightText}</div>
                                ) : null}
                                </div>
                              </div>
                            </Col>
                          </Row>
                          <Button
                            color="success"
                            className="mt-1"
                            type="submit"
                          >
                            Update
                          </Button>
                      </CardBody>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Footer.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(Footer)
