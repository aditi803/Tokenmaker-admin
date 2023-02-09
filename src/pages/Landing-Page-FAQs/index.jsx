import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import { Container, Row, Button } from 'reactstrap'
import QuestionTable from './QuestionTable'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from 'react-i18next';

import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from 'loader';
import useApiStatus from 'hooks/useApiStatus';
import { FAQS_UPDATE, FAQS } from 'common/api';
// import InputMask from "react-input-mask"
// import InputColor from 'react-input-color';
import { CCard, CCardBody, CCardGroup, CFormInput } from '@coreui/react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import TextAreaController from 'common/TextAreaController';
function LandingPageFAQs(props) {

     // document.title = "BlockTechBrew - Landing Page FAQs"
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()

     const [items, setItems] = useState({})
     const [css, setCss] = useState({})

     const [data, setData] = useState({
          heading: "",
          headingColor: "",
          content: "",
          contentColor: ""
     })

     const introSchema = Yup.object().shape({
          heading: Yup.string()
               .min(2, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter heading'),
          headingColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Heading color'),
          content: Yup.string()
               .min(3, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter Content '),
          contentColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Content color'),
     })

     const fetchData = async () => {
          // changeApiStatus(true)
          await axios.get(FAQS)
               .then((result) => {
                    const {
                         heading,
                         headingColor,
                         content,
                         contentColor
                    } = result.data.msg.faqData
                    setData({
                         heading,
                         headingColor,
                         content,
                         contentColor
                    })
                    // setData(result.data.msg);
                    // console.log(result.data.msg, "Banner details");
                    const authUser = JSON.parse(localStorage.getItem('authUser'));
                    setItems(authUser);
                    setApiSuccess()
                    changeApiStatus(false)
               }).catch(err => {
                    console.log(err);
                    changeApiStatus(false)
                    setApiFailed(err.message)
               })
          // setLoader(false)
     };

     useEffect(() => {
          changeApiStatus(true)
          fetchData()
          // setLoader(false)
     }, [setData])

     const user = localStorage.getItem('authUser')
     const parseData = JSON.parse(user)
     const token = parseData.msg.jsonWebtoken;

     const onSubmit = (values) => {
          // e.preventDefault();
          changeApiStatus(true)
          // console.log(data, "jkhgfds")
          axios.put(FAQS_UPDATE,
               values, { headers: { "Authorization": `Bearer ${token}` } })
               .then((result) => {

                    setApiSuccess()
                    changeApiStatus(false)
                    fetchData()
                    toast.success('Updated Successfully');

               })
               .catch((err) => {
                    changeApiStatus(false)
                    toast.error("Already Updated!!")
                    console.log(err, "Banner error")
               })
          // setLoader(false)
     }
    
     return apiStatus.inProgress ? <Spinner /> : (
          <React.Fragment>
               <div className="page-content">
                    <Container fluid>
                         <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("FAQs")}
                         />
                         <CCardGroup>
                              <CCard>
                                   <CCardBody>
                                        <Formik
                                             initialValues={{ ...data }}
                                             validationSchema={introSchema}
                                             enableReinitialize
                                             onSubmit={onSubmit}
                                        >
                                             {({ errors, touched, setFieldValue, setTouched, values }) => (
                                                  <Form>
                                                       <div className="row align-items-start justify-content-center">
                                                            <div className="col-md-12">
                                                                 <div className="row">
                                                                      <div className="col-8 mb-3">
                                                                           <label htmlFor="heading">
                                                                                <strong>Heading:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                // disabled={apiStatus.inProgress}
                                                                                name="heading"
                                                                                placeholder="Enter Heading"
                                                                                id="heading"
                                                                                autoComplete="off"
                                                                                className="form-control mb-2"
                                                                           />
                                                                           {errors.heading && touched.heading ? (
                                                                                <div className="input-error text-danger">{errors.heading}</div>
                                                                           ) : null}
                                                                      </div>
                                                                      <div className="col-4">
                                                                           <label>
                                                                                <strong>Heading Color:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                name="headingColor"
                                                                                placeholder="Enter Heading Color"
                                                                                id="headingColor"
                                                                                className="mb-2"
                                                                                render={({ field, meta }) => (
                                                                                     <>
                                                                                          <CFormInput
                                                                                               {...field}
                                                                                               type="color"
                                                                                               id="exampleColorInput"
                                                                                               defaultValue="#563d7c"
                                                                                               title="Choose your color"
                                                                                          // style={{ width: '100%' }}
                                                                                          />
                                                                                          {meta.error && meta.touched ? (
                                                                                               <div className="text-danger">{meta.error}</div>
                                                                                          ) : null}
                                                                                     </>
                                                                                )}
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                 <div className="row">
                                                                      <div className="col-8 mb-3">
                                                                           {/* <label htmlFor="heading">
                                                                                <strong>Content:</strong>{' '}
                                                                           </label> */}

                                                                           <TextAreaController
                                                                                label="Content: "
                                                                                placeholder="Enter content"
                                                                                name="content"
                                                                                id="content"
                                                                                // disabled={apiStatus.inProgress}
                                                                                rows="4"
                                                                                className="form-control mb-2"
                                                                                autoComplete="off"
                                                                           />

                                                                      </div>
                                                                      <div className="col-4">
                                                                           <label>
                                                                                <strong>Content Color:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                name="contentColor"
                                                                                placeholder="Enter Heading Color"
                                                                                id="headingColor"
                                                                                className="mb-2"
                                                                                render={({ field, meta }) => (
                                                                                     <>
                                                                                          <CFormInput
                                                                                               {...field}
                                                                                               type="color"
                                                                                               id="exampleColorInput"
                                                                                               defaultValue="#563d7c"
                                                                                               title="Choose your color"
                                                                                          // style={{ width: '100%' }}
                                                                                          />
                                                                                          {meta.error && meta.touched ? (
                                                                                               <div className="text-danger">{meta.error}</div>
                                                                                          ) : null}
                                                                                     </>
                                                                                )}
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="col-md-12 pt-4 mt-2">
                                                                 <div className="text-center">
                                                                      <Button type="submit" color="success">
                                                                           Update
                                                                      </Button>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </Form>
                                             )}
                                        </Formik>
                                        {/* <Row>
                                             <Heading css={css} setCss={setCss} />
                                             <Content css={css} setCss={setCss} />
                                             <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginLeft:"9px", marginTop: '20px' }}>Update</Button>
                                        </Row> */}
                                   </CCardBody>
                              </CCard>
                         </CCardGroup>

                         <Row>
                              <QuestionTable data={data} setData={setData} setItems={setItems} items={items} />
                         </Row>
                    </Container>
               </div>
          </React.Fragment>
     )
};

LandingPageFAQs.propTypes = {
     t: PropTypes.any
};

export default withTranslation()(LandingPageFAQs);