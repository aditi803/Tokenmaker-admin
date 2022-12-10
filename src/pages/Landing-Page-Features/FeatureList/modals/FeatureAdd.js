import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import axios from 'axios';
import useApiStatus from "hooks/useApiStatus";
import { toast } from 'react-toastify'
import { InputMask } from "react-input-mask"
import Spinner from "loader";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'


const FeatureAdd = (props) => {
  const { isOpen, toggle, fetchData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ title: "", content: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

  const featureAddSchema = Yup.object().shape({
    title: Yup.string().required('Enter title'),
    content: Yup.string().required('Enter content'),
    // networkCommissionFee: Yup.string().required('Enter Network Commission Fee'),
  })

  const data = {
    title: network.title,
    content: network.content,
    featureImage: network.featureImage
  }

  const handleAddNetwork = async (e) => {
    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    // e.preventDefault()
    const formData = new FormData()
    formData.append('title', network.title)
    formData.append('content', network.content)
    formData.append('featureImage', network.featureImage)
    await axios.post("https://tokenmaker-apis.block-brew.com/feature/newfeature", formData, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        console.log(res)
        setApiSuccess()
        changeApiStatus(false)
        toast.success("Network Added Successfully")
        handleClose()
        fetchData()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error', err.response ? err.response.data.error : err)
        changeApiStatus(false, err.response ? err.response.data.error : err)
        setApiFailed(err.msg)
      })
    setLoader(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Add Step</ModalHeader>
        <Formik initialValues={{
          title: '',
          content: '',
        }}
          validationSchema={featureAddSchema}
          onSubmit={(values, actions) => {
            console.log('aditi noni')
            handleAddNetwork()
          }}
        >
          {({ values, setValues, setFieldValue, errors, touched }) => (
            <Form>
              <ModalBody>
                <Label className="my-2" name="networkName">Title:</Label>
                <input type='text'
                name='title'
                  className="form-control input-color "
                  placeholder="Enter title here"
                  onChange={e => {
                    setNetwork({ ...network, title: e.target.value })
                    setFieldValue('title', e.target.value)
                  }}

                />
                {errors.title && touched.title ? (
                  <div className="input-error text-danger">{errors.title}</div>
                ) : null}
                <Label className="mt-1">Content:</Label>
                <input type='text-area'
                  name='content'
                  className="form-control input-color "
                  placeholder="Enter title here"
                  onChange={e => {
                    setNetwork({ ...network, content: e.target.value })
                    setFieldValue('content', e.target.value)
                  }}
                />
                {errors.content && touched.content ? (
                  <div className="input-error text-danger">{errors.content}</div>
                ) : null}
                <Label className="mt-1">Image:</Label>
                <input
                  type="file"
                  className="form-control input-color"
                  onChange={e => { setNetwork({ ...network, featureImage: e.target.files[0] }) }}
                />
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="secondary" onClick={toggle}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  {/* <Button type="button" color="success" onClick={toggle}> */}
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

FeatureAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default FeatureAdd
