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



const CategoryEdit = (props) => {
  const { isOpen, toggle, fetchData , editData} = props

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


const [value, setValue] = useState(editData?.categoryName)
useEffect(() => {
  setValue(editData?.categoryName)
}, [editData])

const handleUpdate = async () => {
   const authUser = JSON.parse(localStorage.getItem('authUser'));
  axios
    .put(
      "https://tokenmaker-apis.block-brew.com/category/categoryupdate",
      { ...editData, categoryName: value},
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
        <ModalHeader toggle={toggle}>Add Custom Section</ModalHeader>
        <ModalBody>
          {/* <label className="my-2" name="networkName">Network Name</label> */}
          <input 
            type='text'
            className="form-control"
            placeholder={value}
            value={value}
            onChange={e => {
              setValue(e.target.value)
            }} 
            />
          {/* <label className="my-2">Commissions</label>
          <input type='text'
            name='networkCommissionFee'
            className="form-control"
            placeholder="0.05"
            onChange={e => {
              setNetwork({ ...network, networkCommissionFee: e.target.value })
            }} /> */}

          {/* <label className="my-2">Symbol</label>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            onChange={e => setNetworkStatus(e.target.value)}
            value={networkStatus}
          >
            <option hidden>Select Network</option>
            <option value={''}>All</option>

            {networks?.map((content, i) => {
              return (
                <>
                  <option
                    key={i}
                    value={content.symbol}
                  >
                    {content.symbol}
                  </option>
                </>
              )
            })}
          </CFormSelect> */}
          {/* <input type='text'
            name='networkSymbol'
            className="form-control"
            placeholder="ETH"
            onChange={e => {
              setNetwork({ ...network, networkSymbol: e.target.value })
            }}
          /> */}
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
          <Button type="button" color="success" onClick={handleUpdate}>
          {/* <Button type="button" color="success"> */}
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
