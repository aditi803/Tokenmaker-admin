import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import axios from 'axios';
import useApiStatus from "hooks/useApiStatus";
import { toast } from 'react-toastify'
import Spinner from "loader";
import { CFormSelect } from "@coreui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup'


const CategoryAdd = (props) => {
  const { isOpen, toggle, fetchData,changeApiStatus, setAddModal } = props
  const [loader, setLoader] = useState(false)
  // const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [category, setCategory] = useState({ categoryName: "",categoryColor: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const [networks, setNetworks] = useState()
  const [networkStatus, setNetworkStatus] = useState("")
  const handleClose = () => {
    setClose(toggle)
  }

  const categorySchema = Yup.object().shape({
    categoryName: Yup.string().required('Enter category name'),
    categoryColor: Yup.string().required("Choose category color")
  })



  const handleAddNetwork = async (e) => {
    // e.preventDefault()

    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(category, "Network bhar")

    await axios.post("https://tokenmaker-apis.block-brew.com/category/newcategory", {
      categoryName: category.categoryName, color: category.categoryColor

    }, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        console.log(res)
        // setApiSuccess()
        changeApiStatus(false)
        toast.success("Category Added Successfully")
        handleClose()
        fetchData()
      })
      .catch((err) => {
        console.log(err)
        handleClose()

        // setAddModal(false)
        toast.error('Already exisiting category')
        changeApiStatus(false, err.response ? err.response.data.error : err)
        // setApiFailed(err.msg)
        console.log(category, "Network ctahc")
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
        <ModalHeader toggle={toggle}>Add Custom Section</ModalHeader>

        <Formik initialValues={{
          categoryName: '',
          categoryColor:''
        }}
          validationSchema={categorySchema}
          onSubmit={(values, actions) => {
            console.log('aditi noni')
            handleAddNetwork()
          }}
        >
          {({ values, setValues, setFieldValue, errors, touched }) => (
            <Form>
              <ModalBody>
                <input type='text'
                  name="categoryName"
                  className="form-control"
                  placeholder="Create sections"
                  onChange={e => {
                    setCategory({ ...category, categoryName: e.target.value })
                    setFieldValue('categoryName', e.target.value)
                  }}
                />
                {errors?.categoryName && touched.categoryName ? (
                  <div className="input-error text-danger">{errors.categoryName}</div>
                ) : null}
                <div className='col-6 mt-1'>
                  <label htmlFor="categoryColor" style={{ fontSize: "13px" }}>
                    <strong>Category Color:</strong>{' '}
                  </label>
                  <Field
                    // disabled={apiStatus.inProgress}
                    name="categoryColor"
                    placeholder="Enter Category Color"
                    id="categoryColor"
                    type="color"
                    className="form-control form-control-color mb-2"
                  // style={{ width: '100%' }}
                  onChange={(e) =>{
                    setCategory({...category, categoryColor: e.target.value})
                    setFieldValue('categoryColor', e.target.value)
                  }}
                  />
                  {errors.categoryColor && touched.categoryColor ? (
                    <div className="input-error text-danger">{errors.categoryColor}</div>
                  ) : null}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button type="button" color="secondary" onClick={toggle}>
                  Close
                </Button>
                <Button type="submit" color="success">
                  Add
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  )
}

CategoryAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  changeApiStatus:PropTypes.func,
}

export default CategoryAdd
