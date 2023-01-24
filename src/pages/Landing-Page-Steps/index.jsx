import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { withTranslation } from 'react-i18next';
import Breadcrumbs from "../../components/Common/Breadcrumb";
import StepsTable from './StepsTable';
import { Formik, Form, Field } from 'formik'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import useApiStatus from 'hooks/useApiStatus';
import Spinner from 'loader';
import * as Yup from 'yup'
import { CCard, CCardBody, CCardGroup, CFormInput } from '@coreui/react'
function LandingPageSteps(props) {
     document.title = "BlockTechBrew - Landing Page Steps"
     const [items, setItems] = useState({});
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
     const [loader, setLoader] = useState(true)
     const [css, setCss] = useState({})
     const [data, setData] = useState({
          heading: "",
          headingColor: "",
     })

     const introSchema = Yup.object().shape({
          heading: Yup.string()
               .min(20, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter heading'),
          headingColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Heading color'),
     })

     const fetchData = async () => {
          // changeApiStatus(true)
          await axios.get("https://tokenmaker-apis.block-brew.com/step/steps")
               .then((result) => {
                    const {
                         heading,
                         headingColor,
                    } = result.data.msg.stepData
                    setData({
                         heading,
                         headingColor,
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
          axios.put('https://tokenmaker-apis.block-brew.com/step/stepdata',
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
                              breadcrumbItem={props.t("Steps")}
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
                                                                                <div className="input-error">{errors.heading}</div>
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
                                   </CCardBody>
                              </CCard>
                         </CCardGroup>
                         <Row>
                              <StepsTable data={data} items={items} setData={setData} />
                         </Row>
                    </Container>
               </div>
               <ToastContainer />
          </React.Fragment>
     )
}
LandingPageSteps.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageSteps);