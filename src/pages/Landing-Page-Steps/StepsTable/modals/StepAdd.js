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


const StepAdd = (props) => {
  const { isOpen, toggle, fetchData, changeApiStatus } = props
  const [loader, setLoader] = useState(false)
  // const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ title: "", content: "", stepImage: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

  const data = {
    title: network.title,
    content: network.content,
    stepImage: network.stepImage
  }

  const stepAddSchema = Yup.object().shape({
    title: Yup.string().required('Enter title'),
    content: Yup.string().required('Enter content'),
  })

  const handleAddNetwork = async (e) => {
    handleClose()
    changeApiStatus(true)
    const authUser = JSON.parse(localStorage.getItem('authUser'));

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('stepImage', data.stepImage);


    await axios.post("https://tokenmaker-apis.block-brew.com/step/newstep", formData, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        // console.log(res)
        // setApiSuccess()
        changeApiStatus(false)
        toast.success("Network Added Successfully")
        handleClose()
        fetchData()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error', err.response ? err.response.data.error : err)
        changeApiStatus(false)
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
          validationSchema={stepAddSchema}
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
                  className="form-control input-color "
                  placeholder="Enter title here"
                  name='title'
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
                  onChange={e => {
                    setNetwork({ ...network, stepImage: e.target.files[0] })
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="secondary" onClick={toggle}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Save Changes
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

StepAdd.propTypes = {
  toggle: PropTypes.func,
  changeApiStatus: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default StepAdd


























