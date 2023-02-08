import React, { useState } from 'react'
import { CCard, CCardBody, CCol } from '@coreui/react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from "reactstrap"
import axios from "axios"
import { toast } from "react-toastify"

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
    changeApiStatus(true)

    axios.post("https://tokenmaker-apis.block-brew.com/user/changepassword",
      values, { headers: { "Authorization": `Bearer ${token}` } })
      .then((result) => {
        changeApiStatus(false)
        toast.success('Updated Successfully');
      })
      .catch((err) => {
        changeApiStatus(false)
        toast.error("Already Updated!!")
      })
  }

  return (
    <>
      <CCol md={12}>
        <CCard className="col-xl-12 col-lg-12 mx-auto mb-4 rounded shadow-md p-2">
          <div className="bg-white p-3 pb-0">
            <h5 className="mb-0">Change Password</h5>
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
