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
import {
  CFormSelect,
} from "@coreui/react"
import axios from "axios"
import { toast } from 'react-toastify'
import useApiStatus from "hooks/useApiStatus"

const CommissionEdit = props => {
  const { isOpen, toggle, editData, fetchData, getData } = props
  const [category, setCategory] = useState([])
  const [networks, setNetworks] = useState([])

  const [editAllData, setEditAllData] = useState();



  useEffect(() => {
    setEditAllData(editData)
  }, [editData])


  useEffect(() => {
    let currentParentNet = editData?.parentNetworkName
    const afterFilter = category.filter((item) => item.categoryName == currentParentNet)
    setNetworks(afterFilter.map((items) => {
      return items.networks
    }))

  }, [editData, category])
  


  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [close, setClose] = useState(true)

  const [categoryStatus, setCategoryStatus] = useState([])
  

  const handleClose = () => {
    setClose(toggle)
  }

  

  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/network/networkdetails")
      .then(res => {
        setCategory(res.data.msg.items)
        changeApiStatus(false)
      })
      .catch(err => {
        console.log(err)
        changeApiStatus(false)
        setApiFailed(err.message)
      })
  }
  useEffect(() => {
    fetchNetwork()
  }, [])

  const onChangeParentNet = (e) => {
    const currentParentNet = e.target.value
    setCategoryStatus(e.target.value)

    const afterFilter = category.filter((item) => item.categoryName === currentParentNet)
    setNetworks(afterFilter.map((items) => {
      return items.networks
    }))



    setEditAllData((prev) => (
      {
        ...prev,
        parentNetworkName: e.target.value
      }
    ))

  }

  const data = {
    parentNetworkName: editData?.parentNetworkName,
    subNetworkName: editData?.subNetworkName,
    _id: editData?._id,
    networkCommissionFee: editAllData?.networkCommissionFee
  }

  const handleUpdate = async () => {
    axios
      .put(
        "https://tokenmaker-apis.block-brew.com/commission/commission",
        data,
        { headers: { Authorization: `Bearer ${authUser.msg.jsonWebtoken}` } }
      )
      .then(res => {
        toast.success("Updated Successfully")
        handleClose()
        fetchData()
      })
      .catch(err => {
        toast.error("Already Updated")
      })
  }
  
  const [checkValue, setCheckValue] = useState(false)
  
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
          <p>Parent-network Name</p>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            name="parentNetworkName"
            value={editAllData?.parentNetworkName}
            defaultValue={editAllData?.parentNetworkName}
            onChange={onChangeParentNet}
            disabled
          >
            {category?.map((content, i) => {
              return (
                <>
                
                  <option
                    key={i}
                    value={content.categoryName}
                  >
                    {content.categoryName}
                  </option>
                </>
              )
            })}
          </CFormSelect>
          <p className="my-2">Sub-network Name</p>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            name="subNetworkName"
            value={editAllData?.subNetworkName}
            defaultValue={editAllData?.subNetworkName}
            onChange={e => setEditAllData((...prev) => ({
              ...prev,
              subNetworkName: e.target.value
            }))}
            disabled
          >


            {networks[0]?.map((content, i) => {
              return (
                <>
                {console.log(content, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>CONTENTMMMMMMMMMMMMMMMMMMMMMMMM')}
                  <option
                    // disabled
                    key={i}
                    value={content.networkName}
                  >
                    {content.networkName}
                  </option>
                </>
              )
            })}
          </CFormSelect>
          <p className="my-2">Commission Type: <span style={{textDecoration:"underline"}}>{" "}{editAllData?.tokenType}</span></p>
          <input
            type="text"
            className="form-control"
            placeholder={editAllData?.networkCommissionFee}
            value={editAllData?.networkCommissionFee}
            onChange={e => setEditAllData((prev) => ({
              ...prev,
              networkCommissionFee: e.target.value
            }))}
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
export default CommissionEdit

CommissionEdit.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

