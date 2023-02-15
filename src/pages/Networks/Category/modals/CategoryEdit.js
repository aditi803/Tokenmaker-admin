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
import { CFormInput, CFormSelect } from "@coreui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";



const CategoryEdit = (props) => {
  const { isOpen, toggle, fetchData, editData } = props

  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [network, setNetwork] = useState({ networkName: "", networkCommissionFee: "", networkSymbol: "" })
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
  const [networks, setNetworks] = useState()
  const [networkStatus, setNetworkStatus] = useState("")
  const handleClose = () => {
    setClose(toggle)
  }

  console.log(editData, "Edit=Data")

  const [value, setValue] = useState(editData?.categoryName)
  const [colorValue, setColorValue] = useState(editData?.color)
  useEffect(() => {
    setValue(editData?.categoryName)
    setColorValue(editData?.color)
    // console.log(editData, "COLOR TTT")
  }, [editData])

  const handleUpdate = async () => {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    axios
      .put(
        "https://tokenmaker-apis.block-brew.com/category/categoryupdate",
        { ...editData, categoryName: value, color: colorValue },
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
      )
      .then(res => {
        // console.log(res, ">>>>>>>>>>>>>")
        toast.success("Updated Successfully")
        handleClose()
        fetchData()
      })
      .catch(err => {
        // console.log(err, ">>>>>>>>>>>>>>")
        toast.error("Already Updated")
      })
  }
  // console.log(value, "value")



  // console.log(colorValue, "ColorValue" )
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
        <ModalHeader toggle={toggle}>Edit Custom Section</ModalHeader>
        <ModalBody>
          <input
            type='text'
            className="form-control"
            placeholder={value}
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <div className='col-6 mt-1'>
            <label htmlFor="categoryColor" style={{ fontSize: "13px" }}>
              <strong>Category Color:</strong>{' '}
            </label>
            <input
              type='color'
              className="form-control form-control-color"
              value={colorValue}
              onChange={(e) => setColorValue(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={handleUpdate}>
            Update
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

CategoryEdit.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CategoryEdit
