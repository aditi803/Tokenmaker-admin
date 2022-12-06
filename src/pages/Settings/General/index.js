import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumb from '../../../components/Common/Breadcrumb';
import InputMask from "react-input-mask"
import {
     Form,
     Label,
     Card,
     CardBody,
     CardTitle,
     Input
} from "reactstrap"
import { HEADER, HEADER_PUT } from 'common/api';
import useApiStatus from 'hooks/useApiStatus';
import axios from "axios";
import { toast } from "react-toastify"
import Spinner from 'loader';
import * as Yup from 'yup';
import { Formik } from "formik";

function General(props) {

     const [header, setHeader] = useState({})
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [data, setData] = useState({ adminDocumentTitle: '', investorDocumentTitle: '' })

     const generalSchema = Yup.object().shape({
          adminDocumentTitle: Yup.string().required('Enter Parent Network Name'),
          investorDocumentTitle: Yup.string().required('Enter Sub network Name'),
     })

     const [loader, setLoader] = useState(true)
     useEffect(() => {
          changeApiStatus(true)
          setLoader(false)
          fetchData()
     }, [setHeader])

     // console.log(header, '?????????????')

     const fetchData = async () => {
          await axios.get(HEADER)
               .then((res) => {
                    setHeader(res.data.msg)
                    setData(res.data.msg)
                    setApiSuccess()
                    changeApiStatus(false)
                    console.log(res.data.msg)
               })
               .catch((err) => {
                    changeApiStatus(false)
                    setApiFailed(err.message)
               })

     }

     const onChangeHandler = async (e) => {



          e.preventDefault()
          const { name, value } = e.target;
          console.log(name, value, '>>>>>>')

          setHeader({
               ...header, [name]: value
          })
     }


     const headerUpdate = async (e) => {
          e.preventDefault()
          changeApiStatus(true)
          const authUser = JSON.parse(localStorage.getItem('authUser'));
          await axios.put("https://tokenmaker-apis.block-brew.com/cms/headertitles", data,
               { headers: { "Authorization": `Bearer ${authUser.msg.jsonWebtoken}` } })
               .then((res) => {
                    setApiSuccess()
                    changeApiStatus(false)
                    fetchData()
                    console.log(res, "general data")
                    toast.success("Updated Successfully")
               }).catch((err) => {
                    console.log(err, "general error")
                    changeApiStatus(false)
                    setApiFailed(err.message)
                    toast.error("Cannot update")
               })
          setLoader(false)
     }


     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <p
                              style={{ color: "#2a3042", fontWeight: 500, fontSize: "17px" }}
                         >General Settings</p>
                         <Row>
                              <Col lg={12}>
                                   <Card>
                                        <CardBody>
                                             <CardTitle className="mb-4">General Settings</CardTitle>
                                             <Formik
                                                  initialValues={{
                                                       adminDocumentTitle: '',
                                                       investorDocumentTitle: ''
                                                  }}
                                                  validationSchema={generalSchema}
                                                  onSubmit={(values, actions) => {
                                                       console.log(values,"ADFG<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>ADFG")
                                                       headerUpdate()
                                                  }}>
                                                  {({ values, setValues, setFieldValue, errors, touched }) => (
                                                       <Form>
                                                            <Row>
                                                                 <Row>
                                                                      <Col lg={6}>
                                                                           <div>
                                                                                <div className="form-group mb-4">
                                                                                     <Label for="input-date2"> Admin Website Title: </Label>
                                                                                     <input
                                                                                          type="text"
                                                                                          // mask="(999) 999-9999"
                                                                                          name='adminDocumentTitle'
                                                                                          value={data.adminDocumentTitle}
                                                                                          className="form-control input-color"
                                                                                          onChange={(e) => {
                                                                                               setData({ ...data, adminDocumentTitle: e.target.value });
                                                                                               setFieldValue('adminDocumentTitle', e.target.value)
                                                                                          }}
                                                                                     />
                                                                                     {errors.adminDocumentTitle && touched.adminDocumentTitle ? (
                                                                                          <div className="input-error text-danger">{errors.adminDocumentTitle}</div>
                                                                                     ) : null}
                                                                                </div>
                                                                           </div>
                                                                      </Col>
                                                                      <Col lg={6}>
                                                                           <div>
                                                                                <div className="form-group mb-4">
                                                                                     <Label for="input-date1">Investor Website Title: </Label>
                                                                                     <input
                                                                                          type='text'
                                                                                          // mask="(999) 999-9999"
                                                                                          name='investorDocumentTitle'
                                                                                          value={data.investorDocumentTitle}
                                                                                          className="form-control input-color"
                                                                                          onChange={(e) => {
                                                                                               setData({ ...data, investorDocumentTitle: e.target.value });
                                                                                               setFieldValue('investorDocumentTitle', e.target.value)
                                                                                          }}
                                                                                     />
                                                                                     {errors.investorDocumentTitle && touched.investorDocumentTitle ? (
                                                                                          <div className="input-error text-danger">{errors.investorDocumentTitle}</div>
                                                                                     ) : null}
                                                                                </div>
                                                                           </div>
                                                                      </Col>

                                                                 </Row>

                                                            </Row>
                                                            <Button
                                                                 color="success"
                                                                 className="mt-1"
                                                                 // onClick={headerUpdate}
                                                            >
                                                                 Update
                                                            </Button>

                                                       </Form>
                                                  )}
                                             </Formik>

                                        </CardBody>
                                   </Card>
                              </Col>
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
}

General.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(General);