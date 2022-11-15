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
import axios from "axios"
import {toast } from 'react-toastify'

const CommissionEdit = props => {
  const { isOpen, toggle, editData, fetchData } = props

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [close, setClose] = useState(true)
  const handleClose = () => {
    setClose(toggle)
  }

  // console.log(editData, ">>>>>>>>>>>>>>>>>")
  console.log(authUser, ">>>>>>>>>>>>>>>>>")

  const [value, setValue] = useState(editData?.networkCommissionFee)

  useEffect(() => {
    setValue(editData?.networkCommissionFee)
  }, [editData])
 
  const handleUpdate = async () => {
    axios
      .put(
        "https://tokenmaker-apis.block-brew.com/cms/commission",
        { ...editData, networkCommissionFee: value },
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
        <ModalHeader toggle={toggle}>Update Commissions</ModalHeader>
        <ModalBody>
          <p>{`${editData?.networkSymbol} ${editData?.networkName}`}</p>
          <input
            type="text"
            className="form-control"
            placeholder={value}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
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

CommissionEdit.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CommissionEdit
