import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import {Button } from "reactstrap"
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
// import { getUserProfile, updateProfileSettings } from 'src/services/userService'
// import { fireToast } from 'src/common/toast'
// import { ReadLocalStorage, SetLocalStorage, UserDataKey } from 'src/common/utility'
// import ChangePassword from './changePassword'
// import Button from 'src/components/common/CommonButton/Button'
// import { configURl } from 'src/runtime.config'
// import SpinnerComponent from 'src/components/spinner'
import Dropzone from 'react-dropzone'
// import cloud from '../../../assets/small/cloud-file-download.svg'
import cloud from "../../../assets/images/small/cloud-file-download.svg"
import ChangePassword from '../ChangePassword'

const Profile = () => {
//   const result = ReadLocalStorage(UserDataKey)
//   const db_name = JSON.parse(result).user.databaseName
  const [image, setImage] = useState({
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
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(4, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Please enter your first name'),

    // lastName: Yup.string()
    //   .min(4, 'Too Short!')
    //   .max(20, 'Too Long!')
    //   .required('Please enter your last name'),

    // phoneNumber: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('required'),
  })
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: '',
  })

//   const fetchData = async () => {
//     try {
//       changeApiStatus(true, '')
//       const userResponse = await getUserProfile()
//       if (userResponse.status === 200) {
//         const { firstName, lastName, _id, phoneNumber, email, profileImage } = userResponse.data
//         setUser({ firstName, lastName, phoneNumber, email, userId: _id })
//         profileImage &&
//           profileImage !== null &&
//           setImage({
//             // blob: null,
//             src: `${configURl.BaseURLImg}/${db_name}/${profileImage}`,
//           })
//         changeApiStatus(false, '')
//       } else {
//         throw new Error(userResponse.error)
//       }
//     } catch (err) {
//       changeApiStatus(false, err.response.data.error)
//     }
//   }

//   useEffect(() => {
//     fetchData()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

  const [apiStatus, setApiStatus] = useState({
    inProgress: false,
    failed: false,
    failMessage: '',
  })

  const changeApiStatus = (inProgress, failMessage) => {
    setApiStatus({
      inProgress,
      failed: !!failMessage,
      failMessage,
    })
  }

//   const onSubmit = async (values) => {
//     try {
//       changeApiStatus(true, '')
//       const userSaveResponse = await updateProfileSettings({ ...values, profileImage: image.blob })
//       if (userSaveResponse.status === 200) {
//         fireToast('success', userSaveResponse.message)

//         SetLocalStorage(
//           UserDataKey,
//           JSON.stringify({
//             ...JSON.parse(ReadLocalStorage(UserDataKey)),
//             firstName: userSaveResponse.data.firstName,
//             lastName: userSaveResponse.data.lastName,
//             phoneNumber: userSaveResponse.data.phoneNumber,
//           }),
//         )
//         fetchData()
//         changeApiStatus(false, '')
//         // window.location.reload()
//       } else {
//         throw new Error(userSaveResponse.error)
//       }
//     } catch (err) {
//       fireToast('error', err.response ? err.response.data.error : 'Something went wrong')
//       changeApiStatus(false, err.response ? err.response.data.error : err.message)
//     }
//   }
  const uploadRef = useRef(null)

  return (
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="col-xl-12 col-lg-12 mx-auto mb-4 rounded shadow-md p-2">
            <div className="bg-white p-3 pb-0">
              <h5 className="mb-0">Update User Profile</h5>
              {/* <p className="mb-2 text-medium-emphasis">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam, dolorem hic
                perspiciatis aspernatur atque.
              </p> */}
            </div>
            <CCardBody>
              <div className="">
                <Formik
                  initialValues={user}
                  enableReinitialize
                  validationSchema={ProfileSchema}
                //   onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <label htmlFor="firstName">First Name: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="firstName"
                              id="firstName"
                              placeholder="Enter your first name"
                              className="form-control"
                            />
                            {/* {errors.firstName && touched.firstName ? (
                              <div className="text-danger">{errors.firstName}</div>
                            ) : null} */}
                          </div>

                          <div className="mb-3">
                            <label htmlFor="wallet_address">Last Name: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="lastName"
                              placeholder="Enter your last name"
                              id="lastName"
                              className="form-control"
                            />
                            {/* {errors.lastName && touched.lastName ? (
                              <div className="text-danger">{errors.lastName}</div>
                            ) : null} */}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="phoneNumber">Phone Number: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="phoneNumber"
                              id="phoneNumber"
                              placeholder="Enter your Phone number"
                              className="form-control"
                            />
                            {/* {errors.phoneNumber && touched.phoneNumber ? (
                              <div className="text-danger">{errors.phoneNumber}</div>
                            ) : null} */}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email">Email: </label>
                            {/* <Field disabled name="email" id="email" className="form-control" /> */}
                            <Field disabled name="email" id="email" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label>
                            <strong>Profile Image :</strong>{' '}
                          </label>
                          <div className="text-center">
                            <div className="mb-3 p-0 dragdrop-container">
                              <input
                                ref={uploadRef}
                                disabled={apiStatus.inProgress}
                                id="upload"
                                hidden
                                accept="image/*"
                                type="file"
                                // onChange={(e) => handleImageChange(e.target.files)}
                              />
                              {image.src ? (
                                <img
                                  className="banner-img"
                                  src={image.src ? image.src : cloud}
                                  alt=""
                                  onClick={() => {
                                    uploadRef.current.click()
                                  }}
                                />
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
                                            <img
                                              width={60}
                                              src={image.src ? image.src : cloud}
                                              alt=""
                                            />
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
                                                <small className="text-center ">
                                                  <strong>Supported files:</strong> jpeg, jpg, png.
                                                  | Will be resized to: 1920x1080 px.
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
                      <div className="text-center text-lg-end">
                        <Button type="submit" color="success">
                          Update
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <ChangePassword />
      </CRow>
    </>
  )
}

export default Profile
