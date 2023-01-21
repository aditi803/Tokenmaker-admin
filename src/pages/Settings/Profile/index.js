import React, { useEffect, useState, useRef } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { Button } from "reactstrap"
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {toast} from "react-toastify"
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
import axios from "axios"
import useApiStatus from 'hooks/useApiStatus'
import Spinner from 'loader'

import { CommonContext } from 'constants/common'
import { useContext } from 'react'
const Profile = () => {
  const {toggle, setToggle} =  useContext(CommonContext);
  //   const result = ReadLocalStorage(UserDataKey)
  //   const db_name = JSON.parse(result).user.databaseName

  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()
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
        toast.error('error', 'File too large')
      }
    } else {
      changeApiStatus(false, 'Please select a valid image file')
      toast.error(
        'error',
        'Please select a valid image file(only jpg, png and jpeg images are allowed)',
      )
    }
  }
  const ProfileSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Please enter your  name'),

    // lastName: Yup.string()
    //   .min(4, 'Too Short!')
    //   .max(20, 'Too Long!')
    //   .required('Please enter your last name'),

    // phoneNumber: Yup.string().min(4, 'Too Short!').max(20, 'Too Long!').required('required'),
  })
  const [user, setUser] = useState({
    username: '',
    email: '',
  })

  const userToken = localStorage.getItem("authUser")
  const parseData = JSON.parse(userToken)
  const token = parseData.msg.jsonWebtoken

  const fetchData = async () => {
    //     try {
          changeApiStatus(true)
    const imageBaseUrl = "https://tokenmaker-apis.block-brew.com/images/"
    await axios.get("https://tokenmaker-apis.block-brew.com/user/getuser", { headers: { Authorization: `Bearer ${token}` } })
      //       if (userResponse.status === 200) {
      .then((res) => {
        console.log(res, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< User response data >>>>>>>>>>>>>>>>>>>>>>>>>>>")
        const { username, email, userImage } = res.data.msg
                setUser({ username, email })

                userImage &&
                userImage !== null &&
                  setImage({
                    src: `${imageBaseUrl}/${userImage}`,
                  })
                changeApiStatus(false)
        //       } else {
        //         throw new Error(userResponse.error)
        //       }
      })
            
        .catch ((err) => {
          changeApiStatus(false)
        })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line 
  }, [])  // use depo


  function appendData(values) {
    const formValues = { ...values }
    const formData = new FormData()
    for (const value in formValues) {
         formData.append(value, formValues[value])
    }
    return formData
}

    const onSubmit = async (values) => {
      console.log("ONSUMBIT")
      const formData = appendData({
        ...values,
        userImage: image.blob
   })
      try {
        changeApiStatus(true, '')
        const userSaveResponse = await axios.put("https://tokenmaker-apis.block-brew.com/user/update",formData, { headers: { Authorization: `Bearer ${token}` } })
        if (userSaveResponse.status === 200) {
          setToggle(!toggle)
          toast.success('Updated Successfully', userSaveResponse.message)

          // SetLocalStorage(
          //   UserDataKey,
          //   JSON.stringify({
          //     ...JSON.parse(ReadLocalStorage(UserDataKey)),
          //     firstName: userSaveResponse.data.firstName,
          //     lastName: userSaveResponse.data.lastName,
          //     phoneNumber: userSaveResponse.data.phoneNumber,
          //   }),
          // )
          fetchData()
          changeApiStatus(false, '')
          // window.location.reload()
        } else {
          throw new Error(userSaveResponse.error)
        }
      } catch (err) {
        toast.error('error', err.response ? err.response.data.error : 'Something went wrong')
        changeApiStatus(false, err.response ? err.response.data.error : err.message)
      }
    }
  const uploadRef = useRef(null)

  console.log(image, "USet image index")

  return apiStatus.inProgress ? <Spinner /> : (
    <>
      <CRow>
        <CCol md={12}>
          <CCard className="col-xl-12 col-lg-12 mx-auto mb-4 rounded shadow-md p-2 mt-5">
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
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="mb-3">
                            <label htmlFor="firstName">User Name: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="username"
                              id="username"
                              placeholder="Enter your name"
                              className="form-control"
                            />
                            {errors.username && touched.username ? (
                              <div className="text-danger">{errors.username}</div>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            {/* <label htmlFor="wallet_address">Last Name: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="lastName"
                              placeholder="Enter your last name"
                              id="lastName"
                              className="form-control"
                            /> */}
                            {/* {errors.lastName && touched.lastName ? (
                              <div className="text-danger">{errors.lastName}</div>
                            ) : null} */}
                          </div>
                          <div className="mb-3">
                            {/* <label htmlFor="phoneNumber">Phone Number: </label>
                            <Field
                              disabled={apiStatus.inProgress}
                              name="phoneNumber"
                              id="phoneNumber"
                              placeholder="Enter your Phone number"
                              className="form-control"
                            /> */}
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
                              onChange={(e) => handleImageChange(e.target.files)}
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
