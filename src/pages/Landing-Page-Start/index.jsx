import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from 'axios';
import { toast } from "react-toastify"
import useApiStatus from 'hooks/useApiStatus';
import Spinner from 'loader';
import { Formik, Form, Field } from 'formik'
import { CCard, CCardBody, CCardGroup, CFormInput } from '@coreui/react'
import * as Yup from 'yup'

function LandingPageStart(props) {
     document.title = "BlockTechBrew - Landing Page Start"

     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [loader, setLoader] = useState(true)
     const [data, setData] = useState({
          heading: "",
          headingColor: "",
          backgroundColor: "",
          buttonText: "",
          buttonColor: "",
          buttonBackgroundColor: ""
     })

     const introSchema = Yup.object().shape({
          heading: Yup.string()
               .min(8, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter heading'),
          headingColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Heading color'),
          backgroundColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter background color'),
          buttonText: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter button text'),
          buttonColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter button color'),
          buttonBackgroundColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter button background color'),

     })


     const fetchData = async () => {
          // changeApiStatus(true)
          await axios.get("https://tokenmaker-apis.block-brew.com/cms/startsectiondetails")
               .then((result) => {
                    const {
                         heading,
                         headingColor,
                         backgroundColor,
                         buttonText,
                         buttonColor,
                         buttonBackgroundColor
                    } = result.data.msg
                    setData({
                         heading,
                         headingColor,
                         backgroundColor,
                         buttonText,
                         buttonColor,
                         buttonBackgroundColor
                    })
                    // setData(result.data.msg);
                    console.log(result.data.msg, "Banner details");
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
          console.log(data, "jkhgfds")
          axios.put('https://tokenmaker-apis.block-brew.com/cms/startsection',
               values, { headers: { "Authorization": `Bearer ${token}` } })
               .then((result) => {

                    setApiSuccess()
                    changeApiStatus(false)
                    fetchData()
                    toast.success('Updated Successfully');

               })
               .catch((err) => {
                    changeApiStatus(false)
                    // setApiFailed(err.message)
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
                              breadcrumbItem={props.t("Start")}
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
                                                                      <div className="col-6 mb-3">
                                                                           <label htmlFor="heading" style={{fontSize:"13px"}}>
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
                                                                                <div className="input-error">{errors.heading}</div>
                                                                           ) : null}
                                                                      </div>
                                                                      <div className="col-2">
                                                                           <label  style={{fontSize:"13px"}}>
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
                                                                      <div className="col-3">
                                                                           <label>
                                                                                <strong  style={{fontSize:"13px"}}>Heading Background Color:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                name="backgroundColor"
                                                                                placeholder="Enter Heading Color"
                                                                                id="backgroundColor"
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
                                                                      <div className="col-6 mb-3">
                                                                           <label htmlFor="buttonText"  style={{fontSize:"13px"}}>
                                                                                <strong>Button Text:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                // disabled={apiStatus.inProgress}
                                                                                name="buttonText"
                                                                                placeholder="Enter button text"
                                                                                id="buttonText"
                                                                                autoComplete="off"
                                                                                className="form-control mb-2"
                                                                           />
                                                                           {errors.heading && touched.heading ? (
                                                                                <div className="input-error">{errors.heading}</div>
                                                                           ) : null}
                                                                      </div>
                                                                      <div className="col-2">
                                                                           <label  style={{fontSize:"13px"}}>
                                                                                <strong>Button Text Color:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                name="buttonColor"
                                                                                placeholder="Enter Heading Color"
                                                                                id="buttonColor"
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
                                                                      <div className="col-3">
                                                                           <label style={{fontSize:"13px"}}>
                                                                                <strong>Button Background Color:</strong>{' '}
                                                                           </label>
                                                                           <Field
                                                                                name="buttonBackgroundColor"
                                                                                placeholder="Enter Heading Color"
                                                                                id="buttonBackgroundColor"
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
                                             <Heading data={data} setData={setData} />
                                             <ButtonComp data={data} setData={setData} />
                                             <Button className='btn btn-success' onClick={handleChange} style={{ width: '200px', marginLeft: "9px", marginTop: '10px' }}>Update</Button>
                                        </Row> */}
                                   </CCardBody>
                              </CCard>
                         </CCardGroup>

                    </Container>
               </div>
          </React.Fragment>
     )
}
LandingPageStart.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageStart);