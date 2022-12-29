import React, { useState } from 'react'
import { CCard, CCardBody, CCol } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {Button } from "reactstrap"
import axios from "axios"
import {toast} from "react-toastify"
// import { changePassword } from 'src/services/userService'
// import { fireToast } from 'src/common/toast'
// import { RemoveFromLocalStorage, UserDataKey } from 'src/common/utility'
// import Button from 'src/components/common/CommonButton/Button'

const ChangePassword = () => {
  const SignupSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(4, 'Too Short!')
      .max(80, 'Too Long!')
      .required('Please enter your old password'),
    newPassword: Yup.string()
      .min(4, 'Too Short!')
      .max(80, 'Too Long!')
      .required('Please enter your new password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Please confirm your new password'),
  })
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
  
     const user = localStorage.getItem('authUser')
     const parseData = JSON.parse(user)
     const token = parseData.msg.jsonWebtoken;

  const onSubmit = (values) => {
    // e.preventDefault();
    changeApiStatus(true)
    // console.log(data, "jkhgfds")
   
    axios.post("https://tokenmaker-apis.block-brew.com/user/changepassword",
         values, { headers: { "Authorization": `Bearer ${token}` } })
         .then((result) => {
              // setApiSuccess()
              changeApiStatus(false)
              // fetchData()
              toast.success('Updated Successfully');
         })
         .catch((err) => {
              changeApiStatus(false)
              // setApiFailed(err.message)
              toast.error("Already Updated!!")
              // console.log(err, "Banner error")
         })
    // setLoader(false)
}
//   const onSubmit = async (values) => {
//     try {
//       changeApiStatus(true, '')
//       const userSaveResponse = await changePassword(values)
//       if (userSaveResponse.status === 200) {
//         fireToast('success', userSaveResponse.message)
//         changeApiStatus(false, '')
//         setTimeout(() => {
//           RemoveFromLocalStorage(UserDataKey)
//           localStorage.clear()
//           window.location.reload()
//         }, 15000)
//       } else {
//         throw new Error(userSaveResponse.error)
//       }
//     } catch (err) {
//       fireToast('error', err.response ? err.response.data.error : err.message)
//       changeApiStatus(false, err.response ? err.response.data.error : err.message)
//     }
//   }
  return (
    <>
      <CCol md={12}>
        <CCard className="col-xl-12 col-lg-12 mx-auto mb-4 rounded shadow-md p-2">
          <div className="bg-white p-3 pb-0">
            <h5 className="mb-0">Change Password</h5>
            {/* <p className="mb-2 text-medium-emphasis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est laboriosam, dolorem hic
              perspiciatis aspernatur atque.
            </p> */}
          </div>
          <CCardBody>
            <div className="">
              <Formik
                initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                enableReinitialize
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="firstName">Old Password: </label>
                      <Field
                        type="password"
                        disabled={apiStatus.inProgress}
                        name="oldPassword"
                        id="oldPassword"
                        placeholder="Enter your old password"
                        className="form-control"
                      />
                      {errors.oldPassword && touched.oldPassword ? (
                        <div className="text-danger">{errors.oldPassword}</div>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="wallet_address">New Password: </label>
                      <Field
                        type="password"
                        disabled={apiStatus.inProgress}
                        name="newPassword"
                        placeholder="Enter your new password"
                        id="newPassword"
                        className="form-control"
                      />
                      {errors.newPassword && touched.newPassword ? (
                        <div className="text-danger">{errors.newPassword}</div>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="wallet_address">Confirm Password: </label>
                      <Field
                        type="password"
                        disabled={apiStatus.inProgress}
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm password"
                        className="form-control"
                        onPaste={(e) => e.preventDefault()}
                      />
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="text-danger">{errors.confirmPassword}</div>
                      ) : null}
                    </div>
                    <div className="text-center text-lg-end">
                      <Button type="submit" color="success">
                        Update Password
                      </Button>
                    </div>
                    {/* <CButton
                      type="submit"
                      color="success"
                      className="text-white px-4"
                      disabled={apiStatus.inProgress}
                    >
                      Update Password
                    </CButton> */}
                  </Form>
                )}
              </Formik>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </>
  )
}

export default ChangePassword
