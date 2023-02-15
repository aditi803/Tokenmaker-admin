import React, { useEffect, useRef, useState } from 'react'
import { CCard, CCardBody, CButton, CFormInput } from '@coreui/react'
import { Formik, Form, Field } from 'formik'
import axios from "axios"
import PropTypes from "prop-types";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Button, Container } from "reactstrap"
import { withTranslation } from 'react-i18next';
import * as Yup from 'yup'
// import {
//   getHomeIntro,
//   updateHomeIntro,
//   updateHomeSideImage,
//   deleteHomeIntroImgs,
// } from 'src/services/cmsService'
// import { fireToast, toastConfirm } from 'src/common/toast'
import Dropzone from 'react-dropzone'
import TextAreaController from '../../common/TextAreaController'
import cloud from '../../assets/images/small/cloud-file-download.svg'
// import { ReadLocalStorage, UserDataKey } from 'src/common/utility'
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import Spinner from 'loader'
import { toast } from "react-toastify"
import { BANNER_DETAILS, BANNER_PUT } from 'common/api'
import useApiStatus from 'hooks/useApiStatus'

const LandingPageBanner = (props) => {
     
     const [loader, setLoader] = useState(true)

     const [data, setData] = useState({
          heading: "",
          content: "",
          headingColor: "",
          contentColor: "",
          backgroundImage: "",
          buttonBackgroundColor: "",
          buttonText: "",
          buttonTextColor: "",
     })
     const introSchema = Yup.object().shape({
          heading: Yup.string()
               .min(20, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter heading'),
          content: Yup.string()
               .min(20, 'Too Short!')
               .max(1000, 'Too Long!')
               .required('Please enter sub heading'),
          buttonText: Yup.string()
               .min(4, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter button text'),
          headingColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Heading color'),
          contentColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Sub-heading color'),
          buttonTextColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Sub-heading color'),
          buttonBackgroundColor: Yup.string()
               .min(3, 'Too Short!')
               .max(50, 'Too Long!')
               .required('Please enter Sub-heading color'),
     })
     const [image, setImage] = useState({
          blob: null,
          src: '',
     })
     const [introSideImage, setIntroSideImage] = useState({
          blob: null,
          src: '',
     })
     const handleImageChange = (files) => {
          const extn = ['image/jpg', 'image/png', 'image/jpeg']
          const [file] = files
          if (file && extn.includes(file.type)) {
               changeApiStatus(false, '')
               if (file.size <= 5242880) {
                    setImage({ blob: file, src: window.URL.createObjectURL(file) })
               } else {
                    fireToast('error', 'File too large')
               }
          } else {
               changeApiStatus(false, 'Please select a valid image file')
               fireToast(
                    'error',
                    'Please select a valid image file(only jpg, png and jpeg images are allowed)',
               )
          }

     }
     
     const [item, setItems] = useState('')

     
     const fetchData = async () => {
          // changeApiStatus(true)
          await axios.get(BANNER_DETAILS)
               .then((result) => {
                    const {
                         heading,
                         content,
                         headingColor,
                         contentColor,
                         backgroundImage,
                         buttonBackgroundColor,
                         buttonText,
                         buttonTextColor,

                    } = result.data.msg
                    setData({
                         heading,
                         content,

                         headingColor,
                         contentColor,
                         backgroundImage,
                         buttonBackgroundColor,
                         buttonText,
                         buttonTextColor,
                    })
                    backgroundImage!==null && setImage({
                         ...image,
                         // blob: bannerImage,
                         src: `https://tokenmaker-apis.block-brew.com/images/${backgroundImage}`,
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

     
     const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
          useApiStatus()

     const user = localStorage.getItem('authUser')
     const parseData = JSON.parse(user)
     const token = parseData.msg.jsonWebtoken;

     function appendData(values) {
          const formValues = { ...values }
          const formData = new FormData()
          for (const value in formValues) {
               formData.append(value, formValues[value])
          }
          return formData
     }

     const onSubmit = (values) => {
          // e.preventDefault();
          changeApiStatus(true)
          // console.log(data, "jkhgfds")
          const formData = appendData({
               ...values,
               backgroundImage: image.blob
          })
          axios.put(BANNER_PUT,
               formData, { headers: { "Authorization": `Bearer ${token}` } })
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

     const deleteBackgroundImg = () => {
          axios.delete("https://tokenmaker-apis.block-brew.com/cms/deletebannerImage",{ headers: { "Authorization": `Bearer ${token}` } })
          .then((res => {
               console.log(res, "Delete api res")
               toast.success("Deleted successfully")
               fetchData()
          }))
          .catch((err) =>{
               console.log(err, "delete  image error")
               toast.success("Unable to delete")
          })
     }

   
     const uploadRef = useRef(null)

     return apiStatus.inProgress ? <Spinner /> : (
          <>
               <div className="page-content">
                    <Container fluid>
                    <Breadcrumbs
                              title={props.t("Landing-Page")}
                              breadcrumbItem={props.t("Banner")}
                         />
                         <div className="col-xl-12 col-lg-12 mx-auto mb-xl-4 mb-2 rounded">
                              <CCard className="mb-2 border-0 pt-2">
                                   <CCardBody>
                                        <div>
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

                                                                           <div className="col-8 mb-3">
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
                                                                                     id="contentColor"
                                                                                     className="mb-2"
                                                                                     render={({ field, meta }) => (
                                                                                          <>
                                                                                               <CFormInput
                                                                                                    {...field}
                                                                                                    // style={{ width: '100%' }}
                                                                                                    type="color"
                                                                                                    id="exampleColorInput"
                                                                                                    defaultValue="#563d7c"
                                                                                                    title="Choose your color"
                                                                                               />
                                                                                               {meta.error && meta.touched ? (
                                                                                                    <div className="text-danger">{meta.error}</div>
                                                                                               ) : null}
                                                                                          </>
                                                                                     )}
                                                                                />
                                                                           </div>

                                                                           <div className='col-8'>
                                                                                <label>
                                                                                     <strong>Button Text:</strong>{' '}
                                                                                </label>
                                                                                <Field
                                                                                     // disabled={apiStatus.inProgress}
                                                                                     autoComplete="off"
                                                                                     name="buttonText"
                                                                                     placeholder="Enter button text"
                                                                                     id="buttonText"
                                                                                     className="form-control mb-2"
                                                                                />
                                                                                {errors.buttonText && touched.buttonText ? (
                                                                                     <div className="input-error">{errors.buttonText}</div>
                                                                                ) : null}
                                                                           </div>
                                                                           <div className='col-2'>
                                                                                <label htmlFor="headingColor" style={{fontSize:"13px"}}>
                                                                                     <strong>Button Color:</strong>{' '}
                                                                                </label>
                                                                                <Field
                                                                                     // disabled={apiStatus.inProgress}
                                                                                     name="buttonTextColor"
                                                                                     placeholder="Enter Sub Heading Color"
                                                                                     id="buttonTextColor"
                                                                                     type="color"
                                                                                     className="form-control form-control-color mb-2"
                                                                                // style={{ width: '100%' }}
                                                                                />
                                                                                {errors.buttonTextColor && touched.buttonTextColor ? (
                                                                                     <div className="input-error">{errors.buttonTextColor}</div>
                                                                                ) : null}
                                                                           </div>
                                                                           <div className='col-2'>
                                                                                <label htmlFor="headingColor" style={{fontSize:"13px"}}>
                                                                                     <strong>Button Background Color:</strong>{' '}
                                                                                </label>
                                                                                <Field
                                                                                     // disabled={apiStatus.inProgress}
                                                                                     name="buttonBackgroundColor"
                                                                                     placeholder="Enter Sub Heading Color"
                                                                                     id="buttonBackgroundColor"
                                                                                     type="color"
                                                                                     className="form-control form-control-color mb-2"
                                                                                // style={{ width: '100%' }}
                                                                                />
                                                                                {errors.buttonBackgroundColor && touched.buttonBackgroundColor ? (
                                                                                     <div className="input-error">{errors.buttonBackgroundColor}</div>
                                                                                ) : null}
                                                                           </div>

                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-12">
                                                                      <div className="row">
                                                                           <div className="col-md-6">
                                                                                <label>
                                                                                     <strong>Background Image : </strong>{' '}
                                                                                </label>
                                                                                <div className="text-center">
                                                                                     <div className="mb-3 dragdrop-container">
                                                                                          <input
                                                                                               ref={uploadRef}
                                                                                               // disabled={apiStatus.inProgress}
                                                                                               id="upload"
                                                                                               hidden
                                                                                               accept="image/*"
                                                                                               type="file"
                                                                                               onChange={(e) => handleImageChange(e.target.files)}
                                                                                          />
                                                                                          {image.src ? (
                                                                                               <div className="commonImgs" style={{padding:"40px"}}>
                                                                                                    <img
                                                                                                         className="banner-img m-0"
                                                                                                         style={{margin:"45px"}}
                                                                                                         src={image.src}
                                                                                                         alt=""
                                                                                                         onClick={() => {
                                                                                                              uploadRef.current.click()
                                                                                                         }}
                                                                                                    />
                                                                                                    <div className="edit">
                                                                                                         <CButton
                                                                                                              variant="text"
                                                                                                              className="newEditIcon p-2"
                                                                                                              onClick={() => {
                                                                                                                   uploadRef.current.click()
                                                                                                              }}
                                                                                                         >
                                                                                                              <CIcon icon={cilPencil} customClassName="nav-icon" />
                                                                                                         </CButton>
                                                                                                         {data.backgroundImage && (
                                                                                                              <CButton
                                                                                                                   variant="text"
                                                                                                                   className="newDeleteIcon p-2"
                                                                                                                   onClick={deleteBackgroundImg}
                                                                                                              >
                                                                                                                   <CIcon icon={cilTrash} customClassName="nav-icon" />
                                                                                                              </CButton>
                                                                                                         )}
                                                                                                    </div>
                                                                                               </div>
                                                                                          ) : (
                                                                                               <div className="drag-n-drop-container">
                                                                                                    <div>
                                                                                                         <Dropzone
                                                                                                              accept="image/*"
                                                                                                              multiple={false}
                                                                                                              onDrop={(acceptedFiles) => {
                                                                                                                   handleImageChange(acceptedFiles)
                                                                                                              }}
                                                                                                         >
                                                                                                              {({ getRootProps, getInputProps, isDragActive }) => (
                                                                                                                   <section>
                                                                                                                        <div className="drop-area" {...getRootProps()}>
                                                                                                                             <img width={60} src={cloud} alt="" />
                                                                                                                             <input
                                                                                                                                  {...getInputProps()}
                                                                                                                                  accept="image/*"
                                                                                                                                  multiple={false}
                                                                                                                             />

                                                                                                                             {isDragActive ? (
                                                                                                                                  <div>Drop your image file here</div>
                                                                                                                             ) : (
                                                                                                                                  <p>
                                                                                                                                       Drag n drop image file here, or click to select{' '}
                                                                                                                                       <br />
                                                                                                                                       <small className="text-center">
                                                                                                                                            <strong>Supported files:</strong> jpeg, jpg,
                                                                                                                                            png. | Will be resized to: 1920x1080 px.
                                                                                                                                       </small>
                                                                                                                                  </p>
                                                                                                                             )}
                                                                                                                        </div>
                                                                                                                   </section>
                                                                                                              )}
                                                                                                         </Dropzone>
                                                                                                    </div>
                                                                                               </div>
                                                                                          )}
                                                                                     </div>
                                                                                </div>
                                                                                <p className="fw-bold">
                                                                                     Note:
                                                                                     <span className="text-danger mx-2">
                                                                                          Supported image formats are:&nbsp;jpg, png and jpeg only
                                                                                     </span>
                                                                                </p>
                                                                           </div>              
                                                                      </div>
                                                                 </div>
                                                                 <div className="col-md-12 border-top pt-4 mt-4">
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
                                        </div>
                                   </CCardBody>
                              </CCard>
                         </div>
                    </Container>
               </div>
          </>
     )
}

LandingPageBanner.propTypes = {
     t: PropTypes.any
};
export default withTranslation()(LandingPageBanner);

// export default LandingPageBanner
