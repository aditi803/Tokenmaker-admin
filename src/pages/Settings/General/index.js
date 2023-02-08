import React, { useState, useEffect } from "react"
import { Col, Container, Row, Button } from "reactstrap"
import PropTypes from "prop-types"
import { withTranslation } from "react-i18next"
import "@vtaits/react-color-picker/dist/index.css"
import axios from "axios"
import { Label, Card, CardBody, CardTitle, Input } from "reactstrap"
import { HEADER } from "common/api"
import { toast } from "react-toastify"
import Spinner from "loader"
import useApiStatus from "hooks/useApiStatus"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'

function General(props) {
  const [header, setHeader] = useState({})


  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const headerSchema = Yup.object().shape({
     adminDocumentTitle: Yup.string().required('Enter admin document title'),
     investorDocumentTitle: Yup.string().required('Enter investor document title'),
  })

  const [loader, setLoader] = useState(true)
  useEffect(() => {
    changeApiStatus(true)
    setLoader(false)
    fetchData()
  }, [setHeader])


  const fetchData = async () => {
    await axios
      .get(HEADER)
      .then(res => {
        setHeader(res.data.msg)
        console.log(res.data.msg, "?>>>>>>>>>>>>>>>>>>headerMSG")
        setApiSuccess()
        changeApiStatus(false)
      })
      .catch(err => {
        changeApiStatus(false)
        setApiFailed(err.message)
      })
      setLoader(false)
  }

  const headerUpdate = async (values) => {
    // e.preventDefault()
    console.log('Enter updated header')
    changeApiStatus(true)
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    await axios
      .put("https://tokenmaker-apis.block-brew.com/cms/headertitles", values, 
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
          >General Settings</p>
          <Row>
            <Col lg={12}>
              <Formik 
              initialValues={{
               adminDocumentTitle: header?.adminDocumentTitle,
               investorDocumentTitle:header?.investorDocumentTitle,
              }}
                validationSchema={headerSchema}
                onSubmit={
                  headerUpdate
                }
              >
                {({ values, setValues, setFieldValue, errors, touched }) => (
                  <Form>
                    <Card>
                      <CardBody>
                          <Row>
                            <Col lg={6}>
                              <div>
                                <div className="form-group mb-4">
                                  <Label for="input-date1">Admin Website Title: </Label>
                                  <Field
                                    className="form-control input-color"
                                    type='text'
                                    name="adminDocumentTitle"
                                  />
                                  {errors.adminDocumentTitle && touched.adminDocumentTitle ? (
                                    <div className="input-error text-danger">{errors.adminDocumentTitle}</div>
                                ) : null}
                                </div>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div className="mt-4 mt-lg-0">
                                <div className="form-group mb-4">
                                  <Label for="input-repeat">Investor Website Name:</Label>
                                  <Field
                                    type='text'
                                    name="investorDocumentTitle"
                                    className="form-control input-color"
                                  />
                                  {errors.investorDocumentTitle && touched.investorDocumentTitle ? (
                                    <div className="input-error text-danger">{errors.investorDocumentTitle}</div>
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

General.propTypes = {
  t: PropTypes.any,
}
export default withTranslation()(General)
