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
  const { isOpen, toggle, editData, fetchData } = props
  const { apiStatus, setApiSuccess, setApiFailed, changeApiStatus } =
    useApiStatus()

  const authUser = JSON.parse(localStorage.getItem("authUser"))
  const [close, setClose] = useState(true)
  const [network, setNetwork] = useState()
  const [networkStatus, setNetworkStatus] = useState("")

  const handleClose = () => {
    setClose(toggle)
  }

  const fetchNetwork = () => {
    changeApiStatus(true)
    axios
      .get("https://tokenmaker-apis.block-brew.com/cms/networkDetails")
      .then(res => {
        setNetwork(res.data.msg)

        // setItems(authUser)
        console.log(res, "Add data view page")
        // setItems(authUser)
        changeApiStatus(false)
      })
      .catch(err => {
        console.log(err)
        changeApiStatus(false)
        setApiFailed(err.message)
      })
    // setLoader(false)
  }
  useEffect(() => {
    fetchNetwork()
  },[])

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
          <p style={{ fontSize: "22px", textDecoration: "underline" }}>{`${editData?.networkSymbol} ${editData?.networkName}`}</p>
          <p className="my-2">Commission Fee</p>
          <input
            type="text"
            className="form-control"
            placeholder={value}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <p className="my-2">Symbol</p>
          <CFormSelect
            className="form-control"
            aria-label="Small select example"
            onChange={e => setNetworkStatus(e.target.value)}
            value={networkStatus}
          >
            {console.log(networkStatus, "Network status")}
            <option hidden>Select Network</option>
            <option value={''}>All</option>

            {network?.map((content, i) => {
              return (
                <>
                  <option
                    key={i}
                    value={content.networkName}
                  >
                    {content.networkName}
                  </option>
                </>

              )
            })}
            {/* <option value="">All</option>
                          <option value="success">Completed</option>
                          <option value="rejected">Failed</option>
                          <option value="pending">Pending</option> */}
          </CFormSelect>
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
