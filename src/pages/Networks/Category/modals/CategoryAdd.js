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



const CategoryAdd = (props) => {
  const { isOpen, toggle, fetchData } = props
  const [loader, setLoader] = useState(false)
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } = useApiStatus()
  const [category, setCategory] = useState({ categoryName: ""})
  const [items, setItems] = useState([])
  const [close, setClose] = useState(true)
   const [networks, setNetworks] = useState()
  const [networkStatus, setNetworkStatus] = useState("")
  const handleClose = () => {
    setClose(toggle)
  }

//   const data = {
//     networkName: network.networkName,
//   }

  const handleAddNetwork = async (e) => {
    e.preventDefault()

    changeApiStatus(true, '')
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    console.log(category, "Network bhar")

    await axios.post("https://tokenmaker-apis.block-brew.com/category/newcategory", {
      categoryName: category.categoryName,

    }, { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } })
      .then((res) => {
        console.log(res)
        setApiSuccess()
        changeApiStatus(false)
        toast.success("Category Added Successfully")
        handleClose()
        fetchData()
      })
      .catch((err) => {
        console.log(err)
        toast.error('error', err.response ? err.response.data.error : err)
        changeApiStatus(false, err.response ? err.response.data.error : err)
        setApiFailed(err.msg)
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
        <ModalBody>
          {/* <label className="my-2" name="networkName">Network Name</label> */}
          <input type='text'
            className="form-control"
            placeholder="Create sections"
            onChange={e => {
              setCategory({ ...category, categoryName: e.target.value })
            }} 
            />
        </ModalBody>
        <ModalFooter> 
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={handleAddNetwork}>
            Add
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

CategoryAdd.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default CategoryAdd
